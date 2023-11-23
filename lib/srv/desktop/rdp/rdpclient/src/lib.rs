// Copyright 2021 Gravitational, Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//! This crate contains an RDP Client with the minimum functionality required
//! for Teleport's Desktop Access feature.
//!
//! Along with core RDP functionality, it contains code for:
//! - Calling functions defined in Go (these are declared in an `extern "C"` block)
//! - Functions to be called from Go (any function prefixed with the `#[no_mangle]`
//!   macro and a `pub unsafe extern "C"`).
//! - Structs for passing between the two (those prefixed with the `#[repr(C)]` macro
//!   and whose name begins with `CGO`)

#[macro_use]
extern crate log;

use crate::client::global::get_client_handle;
use crate::client::Client;
use crate::rdpdr::tdp::SharedDirectoryAnnounce;
use client::{ClientHandle, ClientResult, ConnectParams};
use ironrdp_pdu::{other_err, PduError};
use ironrdp_session::image::DecodedImage;
use rdpdr::path::UnixPath;
use rdpdr::tdp::{
    FileSystemObject, FileType, SharedDirectoryAcknowledge, SharedDirectoryCreateResponse,
    SharedDirectoryDeleteResponse, SharedDirectoryInfoResponse, SharedDirectoryListResponse,
    SharedDirectoryMoveResponse, SharedDirectoryReadResponse, SharedDirectoryWriteResponse,
    TdpErrCode,
};
use std::convert::TryFrom;
use std::ffi::CString;
use std::fmt::Debug;
use std::io::Cursor;
use std::os::raw::c_char;
use std::{mem, ptr, time};
use util::{encode_png, from_c_string, from_go_array};
pub mod client;
mod cliprdr;
mod piv;
mod rdpdr;
mod ssl;
mod util;

#[no_mangle]
pub extern "C" fn init() {
    env_logger::try_init().unwrap_or_else(|e| println!("failed to initialize Rust logger: {e}"));
}

/// free_string is used to free memory for strings that were passed back to Go side.
///
/// # Safety
///
/// The caller must ensure that the provided pointer was created by Rust using CString::into_raw
/// method and that length of the string was not modified in the meantime.
#[no_mangle]
pub unsafe extern "C" fn free_string(ptr: *mut c_char) {
    if !ptr.is_null() {
        drop(CString::from_raw(ptr));
    }
}

/// client_run establishes an RDP connection with the provided `params`
/// and executes the RDP session, hanging until the session ends.
///
/// Sessions can end due to an error, or the caller can end the session
/// manually by calling [`client_stop`]. Failure to end a session can
/// result in a memory leak.
///
/// Caller must free memory allocated for message returned (CGOResult.message)
/// using free_string function.
///
/// Message returned by this function can be null.
///
/// # Safety
///
/// The caller must ensure that cgo_handle is a valid handle and that
/// go_addr, go_username, cert_der, key_der point to valid buffers.
#[no_mangle]
pub unsafe extern "C" fn client_run(cgo_handle: CgoHandle, params: CGOConnectParams) -> CGOResult {
    trace!("client_run");
    // Convert from C to Rust types.
    let addr = from_c_string(params.go_addr);
    let cert_der = from_go_array(params.cert_der, params.cert_der_len);
    let key_der = from_go_array(params.key_der, params.key_der_len);

    match Client::run(
        cgo_handle,
        ConnectParams {
            addr,
            cert_der,
            key_der,
            screen_width: params.screen_width,
            screen_height: params.screen_height,
            allow_clipboard: params.allow_clipboard,
            allow_directory_sharing: params.allow_directory_sharing,
            show_desktop_wallpaper: params.show_desktop_wallpaper,
        },
    ) {
        Ok(_) => CGOResult {
            err_code: CGOErrCode::ErrCodeSuccess,
            message: ptr::null_mut(),
        },
        Err(e) => {
            error!("client_run failed: {:?}", e);
            CGOResult {
                err_code: CGOErrCode::ErrCodeFailure,
                message: CString::new(format!("{}", e))
                    .map(|c| c.into_raw())
                    .unwrap_or(ptr::null_mut()),
            }
        }
    }
}

fn handle_operation<T>(cgo_handle: CgoHandle, ctx: &'static str, f: T) -> CGOErrCode
where
    T: FnOnce(ClientHandle) -> ClientResult<()>,
{
    let client_handle = match get_client_handle(cgo_handle) {
        Some(it) => it,
        None => {
            warn!("call_function_on_handle failed: handle not found");
            return CGOErrCode::ErrCodeFailure;
        }
    };
    match f(client_handle) {
        Ok(_) => CGOErrCode::ErrCodeSuccess,
        Err(e) => {
            error!("{} failed: {:?}", ctx, e);
            CGOErrCode::ErrCodeFailure
        }
    }
}

/// client_stop ensures that a connection started by [`client_run`] is stopped
/// and that all related memory is cleaned up. Calling [`client_stop`] on a handle
/// that's already been dropped is safe and will result in a no-op.
///
/// # Safety
///
/// All values of `cgo_handle` are safe to use.
#[no_mangle]
pub unsafe extern "C" fn client_stop(cgo_handle: CgoHandle) -> CGOErrCode {
    trace!("client_stop");
    handle_operation(cgo_handle, "client_stop", move |client_handle| {
        client_handle.stop()
    })
}

/// `client_update_clipboard` is called from Go, and caches data that was copied
/// client-side while notifying the RDP server that new clipboard data is available.
///
/// # Safety
///
/// client_ptr MUST be a valid pointer.
/// (validity defined by https://doc.rust-lang.org/nightly/core/primitive.pointer.html#method.as_ref-1)
///
/// data MUST be a valid pointer.
/// (validity defined by the validity of data in https://doc.rust-lang.org/std/slice/fn.from_raw_parts_mut.html)
#[no_mangle]
pub unsafe extern "C" fn client_update_clipboard(
    cgo_handle: CgoHandle,
    data: *mut u8,
    len: u32,
) -> CGOErrCode {
    let data = from_go_array(data, len);
    match String::from_utf8(data) {
        Ok(s) => handle_operation(
            cgo_handle,
            "client_update_clipboard",
            move |client_handle| client_handle.update_clipboard(s),
        ),
        Err(e) => {
            error!("can't convert clipboard data: {}", e);
            CGOErrCode::ErrCodeFailure
        }
    }
}

/// client_handle_tdp_sd_announce announces a new drive that's ready to be
/// redirected over RDP.
///
///
/// # Safety
///
/// client_ptr MUST be a valid pointer.
/// (validity defined by https://doc.rust-lang.org/nightly/core/primitive.pointer.html#method.as_ref-1)
///
/// sd_announce.name MUST be a non-null pointer to a C-style null terminated string.
#[no_mangle]
pub unsafe extern "C" fn client_handle_tdp_sd_announce(
    cgo_handle: CgoHandle,
    sd_announce: CGOSharedDirectoryAnnounce,
) -> CGOErrCode {
    let sd_announce = SharedDirectoryAnnounce::from(sd_announce);
    handle_operation(
        cgo_handle,
        "client_handle_tdp_sd_announce",
        move |client_handle| client_handle.handle_tdp_sd_announce(sd_announce),
    )
}

/// client_handle_tdp_sd_info_response handles a TDP Shared Directory Info Response
/// message
///
/// # Safety
///
/// client_ptr MUST be a valid pointer.
/// (validity defined by https://doc.rust-lang.org/nightly/core/primitive.pointer.html#method.as_ref-1)
///
/// res.fso.path MUST be a non-null pointer to a C-style null terminated string.
#[no_mangle]
pub unsafe extern "C" fn client_handle_tdp_sd_info_response(
    cgo_handle: CgoHandle,
    res: CGOSharedDirectoryInfoResponse,
) -> CGOErrCode {
    let res = SharedDirectoryInfoResponse::from(res);
    handle_operation(
        cgo_handle,
        "client_handle_tdp_sd_info_response",
        move |client_handle| client_handle.handle_tdp_sd_info_response(res),
    )
}

/// client_handle_tdp_sd_create_response handles a TDP Shared Directory Create Response
/// message
///
/// # Safety
///
/// client_ptr MUST be a valid pointer.
/// (validity defined by https://doc.rust-lang.org/nightly/core/primitive.pointer.html#method.as_ref-1)
#[no_mangle]
pub unsafe extern "C" fn client_handle_tdp_sd_create_response(
    cgo_handle: CgoHandle,
    res: CGOSharedDirectoryCreateResponse,
) -> CGOErrCode {
    let res = SharedDirectoryCreateResponse::from(res);
    handle_operation(
        cgo_handle,
        "client_handle_tdp_sd_create_response",
        move |client_handle| client_handle.handle_tdp_sd_create_response(res),
    )
}

/// client_handle_tdp_sd_delete_response handles a TDP Shared Directory Delete Response
/// message
///
/// # Safety
///
/// client_ptr MUST be a valid pointer.
/// (validity defined by https://doc.rust-lang.org/nightly/core/primitive.pointer.html#method.as_ref-1)
#[no_mangle]
pub unsafe extern "C" fn client_handle_tdp_sd_delete_response(
    cgo_handle: CgoHandle,
    res: CGOSharedDirectoryDeleteResponse,
) -> CGOErrCode {
    handle_operation(
        cgo_handle,
        "client_handle_tdp_sd_delete_response",
        move |client_handle| client_handle.handle_tdp_sd_delete_response(res),
    )
}

/// client_handle_tdp_sd_list_response handles a TDP Shared Directory List Response message.
///
/// # Safety
///
/// client_ptr MUST be a valid pointer.
/// (validity defined by https://doc.rust-lang.org/nightly/core/primitive.pointer.html#method.as_ref-1)
///
/// res.fso_list MUST be a valid pointer
/// (validity defined by the validity of data in https://doc.rust-lang.org/std/slice/fn.from_raw_parts_mut.html)
///
/// each res.fso_list[i].path MUST be a non-null pointer to a C-style null terminated string.
#[no_mangle]
pub unsafe extern "C" fn client_handle_tdp_sd_list_response(
    cgo_handle: CgoHandle,
    res: CGOSharedDirectoryListResponse,
) -> CGOErrCode {
    let res = SharedDirectoryListResponse::from(res);
    handle_operation(
        cgo_handle,
        "client_client_handle_tdp_sd_list_response",
        move |client_handle| client_handle.handle_tdp_sd_list_response(res),
    )
}

/// client_handle_tdp_sd_read_response handles a TDP Shared Directory Read Response
/// message
///
/// # Safety
///
/// client_ptr must be a valid pointer
#[no_mangle]
pub unsafe extern "C" fn client_handle_tdp_sd_read_response(
    cgo_handle: CgoHandle,
    res: CGOSharedDirectoryReadResponse,
) -> CGOErrCode {
    let res = SharedDirectoryReadResponse::from(res);
    handle_operation(
        cgo_handle,
        "client_handle_tdp_sd_read_response",
        move |client_handle| client_handle.handle_tdp_sd_read_response(res),
    )
}

/// client_handle_tdp_sd_write_response handles a TDP Shared Directory Write Response
/// message
///
/// # Safety
///
/// client_ptr must be a valid pointer
#[no_mangle]
pub unsafe extern "C" fn client_handle_tdp_sd_write_response(
    cgo_handle: CgoHandle,
    res: CGOSharedDirectoryWriteResponse,
) -> CGOErrCode {
    warn!("unimplemented: client_handle_tdp_sd_write_response");
    CGOErrCode::ErrCodeSuccess
}

/// client_handle_tdp_sd_move_response handles a TDP Shared Directory Move Response
/// message
///
/// # Safety
///
/// client_ptr MUST be a valid pointer.
/// (validity defined by https://doc.rust-lang.org/nightly/core/primitive.pointer.html#method.as_ref-1)
#[no_mangle]
pub unsafe extern "C" fn client_handle_tdp_sd_move_response(
    cgo_handle: CgoHandle,
    res: CGOSharedDirectoryMoveResponse,
) -> CGOErrCode {
    warn!("unimplemented: client_handle_tdp_sd_move_response");
    CGOErrCode::ErrCodeSuccess
}

/// client_handle_tdp_rdp_response_pdu handles a TDP RDP Response PDU message. It takes a raw encoded RDP PDU
/// created by the ironrdp client on the frontend and sends it directly to the RDP server.
///
/// res is the raw RDP response message to be sent back to the RDP server, without the TDP message type or
/// array length header.
///n
/// # Safety
///
/// client_ptr MUST be a valid pointer.
/// (validity defined by https://doc.rust-lang.org/nightly/core/primitive.pointer.html#method.as_ref-1)
#[no_mangle]
pub unsafe extern "C" fn client_handle_tdp_rdp_response_pdu(
    cgo_handle: CgoHandle,
    res: *mut u8,
    res_len: u32,
) -> CGOErrCode {
    let res = from_go_array(res, res_len);
    handle_operation(
        cgo_handle,
        "client_handle_tdp_rdp_response_pdu",
        move |client_handle| client_handle.write_raw_pdu(res),
    )
}

/// # Safety
///
/// client_ptr MUST be a valid pointer.
/// (validity defined by https://doc.rust-lang.org/nightly/core/primitive.pointer.html#method.as_ref-1)
#[no_mangle]
pub unsafe extern "C" fn client_write_rdp_pointer(
    cgo_handle: CgoHandle,
    pointer: CGOMousePointerEvent,
) -> CGOErrCode {
    handle_operation(
        cgo_handle,
        "client_write_rdp_pointer",
        move |client_handle| client_handle.write_rdp_pointer(pointer),
    )
}

/// # Safety
///
/// client_ptr MUST be a valid pointer.
/// (validity defined by https://doc.rust-lang.org/nightly/core/primitive.pointer.html#method.as_ref-1)
#[no_mangle]
pub unsafe extern "C" fn client_write_rdp_keyboard(
    cgo_handle: CgoHandle,
    key: CGOKeyboardEvent,
) -> CGOErrCode {
    handle_operation(
        cgo_handle,
        "client_write_rdp_keyboard",
        move |client_handle| client_handle.write_rdp_key(key),
    )
}

/// # Safety
///
/// client_ptr must be a valid pointer to a Client.
#[no_mangle]
pub unsafe extern "C" fn client_close_rdp(cgo_reg: usize) -> CGOErrCode {
    warn!("unimplemented: client_close_rdp");
    CGOErrCode::ErrCodeSuccess
}

#[repr(C)]
pub struct CGOConnectParams {
    go_addr: *const c_char,
    cert_der_len: u32,
    cert_der: *mut u8,
    key_der_len: u32,
    key_der: *mut u8,
    screen_width: u16,
    screen_height: u16,
    allow_clipboard: bool,
    allow_directory_sharing: bool,
    show_desktop_wallpaper: bool,
}

/// CGOPNG is a CGO-compatible version of PNG that we pass back to Go.
#[repr(C)]
pub struct CGOPNG {
    pub dest_left: u16,
    pub dest_top: u16,
    pub dest_right: u16,
    pub dest_bottom: u16,
    /// The memory of this field is managed by the Rust side.
    pub data_ptr: *mut u8,
    pub data_len: usize,
    pub data_cap: usize,
}

impl TryFrom<&DecodedImage> for CGOPNG {
    type Error = PduError;

    fn try_from(image: &DecodedImage) -> Result<Self, Self::Error> {
        let w: u16 = image.width();
        let h: u16 = image.height();
        let mut res = CGOPNG {
            dest_left: 0,
            dest_top: 0,
            dest_right: w,
            dest_bottom: h,
            data_ptr: ptr::null_mut(),
            data_len: 0,
            data_cap: 0,
        };

        let mut encoded = Vec::with_capacity(8192);
        encode_png(&mut encoded, w, h, image.data().to_vec()).map_err(|err| {
            other_err!(
                "TryFrom<&DecodedImage> for CGOPNG",
                "failed to encode bitmap to png"
            )
        })?;

        res.data_ptr = encoded.as_mut_ptr();
        res.data_len = encoded.len();
        res.data_cap = encoded.capacity();

        // Prevent the data field from being freed while Go handles it.
        // It will be dropped once CGOPNG is dropped (see below).
        mem::forget(encoded);

        Ok(res)
    }
}

impl Drop for CGOPNG {
    fn drop(&mut self) {
        // Reconstruct into Vec to drop the allocated buffer.
        unsafe {
            Vec::from_raw_parts(self.data_ptr, self.data_len, self.data_cap);
        }
    }
}

/// CGOKeyboardEvent is a CGO-compatible version of KeyboardEvent that we pass back to Go.
/// KeyboardEvent is a keyboard update from the user.
#[repr(C)]
#[derive(Copy, Clone, Debug)]
pub struct CGOKeyboardEvent {
    // Note: there's only one key code sent at a time. A key combo is sent as a sequence of
    // KeyboardEvent messages, one key at a time in the "down" state. The RDP server takes care of
    // interpreting those.
    pub code: u16,
    pub down: bool,
}

#[repr(C)]
pub enum CGODisconnectCode {
    /// DisconnectCodeUnknown is for when we can't determine whether
    /// a disconnect was caused by the RDP client or server.
    DisconnectCodeUnknown = 0,
    /// DisconnectCodeClient is for when the RDP client initiated a disconnect.
    DisconnectCodeClient = 1,
    /// DisconnectCodeServer is for when the RDP server initiated a disconnect.
    DisconnectCodeServer = 2,
}

#[repr(C)]
pub struct CGOReadRdpOutputReturns {
    user_message: *const c_char,
    disconnect_code: CGODisconnectCode,
    err_code: CGOErrCode,
}

#[repr(C)]
pub struct CGOClientOrError {
    client: u64,
    err: CGOErrCode,
}

/// CGOMousePointerEvent is a CGO-compatible version of PointerEvent that we pass back to Go.
/// PointerEvent is a mouse move or click update from the user.
#[repr(C)]
#[derive(Copy, Clone, Debug)]
pub struct CGOMousePointerEvent {
    pub x: u16,
    pub y: u16,
    pub button: CGOPointerButton,
    pub down: bool,
    pub wheel: CGOPointerWheel,
    pub wheel_delta: i16,
}

#[repr(C)]
#[derive(Copy, Clone, PartialEq, Debug)]
pub enum CGOPointerButton {
    PointerButtonNone,
    PointerButtonLeft,
    PointerButtonRight,
    PointerButtonMiddle,
}

#[repr(C)]
#[derive(Copy, Clone, Debug, PartialEq)]
pub enum CGOPointerWheel {
    PointerWheelNone,
    PointerWheelVertical,
    PointerWheelHorizontal,
}

#[repr(C)]
#[derive(Copy, Clone, PartialEq, Eq, Debug)]
pub enum CGOErrCode {
    ErrCodeSuccess = 0,
    ErrCodeFailure = 1,
    ErrCodeClientPtr = 2,
}

#[repr(C)]
pub struct CGOResult {
    pub err_code: CGOErrCode,
    pub message: *mut c_char,
}

#[repr(C)]
pub struct CGOSharedDirectoryAnnounce {
    pub directory_id: u32,
    pub name: *const c_char,
}

pub type CGOSharedDirectoryAcknowledge = SharedDirectoryAcknowledge;

#[repr(C)]
pub struct CGOSharedDirectoryInfoRequest {
    pub completion_id: u32,
    pub directory_id: u32,
    pub path: *const c_char,
}

#[repr(C)]
pub struct CGOSharedDirectoryInfoResponse {
    pub completion_id: u32,
    pub err_code: TdpErrCode,
    pub fso: CGOFileSystemObject,
}

#[repr(C)]
#[derive(Clone)]
pub struct CGOFileSystemObject {
    pub last_modified: u64,
    pub size: u64,
    pub file_type: FileType,
    pub is_empty: u8,
    pub path: *const c_char,
}

impl From<CGOFileSystemObject> for FileSystemObject {
    fn from(cgo_fso: CGOFileSystemObject) -> FileSystemObject {
        // # Safety
        //
        // This function MUST NOT hang on to any of the pointers passed in to it after it returns.
        // In other words, all pointer data that needs to persist after this function returns MUST
        // be copied into Rust-owned memory.
        unsafe {
            FileSystemObject {
                last_modified: cgo_fso.last_modified,
                size: cgo_fso.size,
                file_type: cgo_fso.file_type,
                is_empty: cgo_fso.is_empty,
                path: UnixPath::from(from_c_string(cgo_fso.path)),
            }
        }
    }
}

#[derive(Debug)]
#[repr(C)]
pub struct CGOSharedDirectoryWriteRequest {
    pub completion_id: u32,
    pub directory_id: u32,
    pub offset: u64,
    pub path_length: u32,
    pub path: *const c_char,
    pub write_data_length: u32,
    pub write_data: *mut u8,
}

#[repr(C)]
pub struct CGOSharedDirectoryReadRequest {
    pub completion_id: u32,
    pub directory_id: u32,
    pub path_length: u32,
    pub path: *const c_char,
    pub offset: u64,
    pub length: u32,
}

#[derive(Debug)]
#[repr(C)]
pub struct CGOSharedDirectoryReadResponse {
    pub completion_id: u32,
    pub err_code: TdpErrCode,
    pub read_data_length: u32,
    pub read_data: *mut u8,
}

pub type CGOSharedDirectoryWriteResponse = SharedDirectoryWriteResponse;

#[repr(C)]
pub struct CGOSharedDirectoryCreateRequest {
    pub completion_id: u32,
    pub directory_id: u32,
    pub file_type: FileType,
    pub path: *const c_char,
}

#[repr(C)]
pub struct CGOSharedDirectoryListResponse {
    completion_id: u32,
    err_code: TdpErrCode,
    fso_list_length: u32,
    fso_list: *mut CGOFileSystemObject,
}

#[repr(C)]
pub struct CGOSharedDirectoryMoveRequest {
    pub completion_id: u32,
    pub directory_id: u32,
    pub original_path: *const c_char,
    pub new_path: *const c_char,
}

#[repr(C)]
pub struct CGOSharedDirectoryCreateResponse {
    pub completion_id: u32,
    pub err_code: TdpErrCode,
    pub fso: CGOFileSystemObject,
}

#[repr(C)]
pub struct CGOSharedDirectoryDeleteRequest {
    pub completion_id: u32,
    pub directory_id: u32,
    pub path: *const c_char,
}

pub type CGOSharedDirectoryDeleteResponse = SharedDirectoryDeleteResponse;

pub type CGOSharedDirectoryMoveResponse = SharedDirectoryMoveResponse;

#[repr(C)]
pub struct CGOSharedDirectoryListRequest {
    pub completion_id: u32,
    pub directory_id: u32,
    pub path: *const c_char,
}

// These functions are defined on the Go side. Look for functions with '//export funcname'
// comments.
extern "C" {
    fn handle_png(cgo_handle: CgoHandle, b: *mut CGOPNG) -> CGOErrCode;
    fn handle_remote_copy(cgo_handle: CgoHandle, data: *mut u8, len: u32) -> CGOErrCode;
    fn handle_fastpath_pdu(cgo_handle: CgoHandle, data: *mut u8, len: u32) -> CGOErrCode;
    fn handle_rdp_channel_ids(
        cgo_handle: CgoHandle,
        io_channel_id: u16,
        user_channel_id: u16,
    ) -> CGOErrCode;
    fn tdp_sd_acknowledge(
        cgo_handle: CgoHandle,
        ack: *mut CGOSharedDirectoryAcknowledge,
    ) -> CGOErrCode;
    fn tdp_sd_info_request(
        cgo_handle: CgoHandle,
        req: *mut CGOSharedDirectoryInfoRequest,
    ) -> CGOErrCode;
    fn tdp_sd_create_request(
        cgo_handle: CgoHandle,
        req: *mut CGOSharedDirectoryCreateRequest,
    ) -> CGOErrCode;
    fn tdp_sd_delete_request(
        cgo_handle: CgoHandle,
        req: *mut CGOSharedDirectoryDeleteRequest,
    ) -> CGOErrCode;
    fn tdp_sd_list_request(
        cgo_handle: CgoHandle,
        req: *mut CGOSharedDirectoryListRequest,
    ) -> CGOErrCode;
    fn tdp_sd_read_request(
        cgo_handle: CgoHandle,
        req: *mut CGOSharedDirectoryReadRequest,
    ) -> CGOErrCode;
    fn tdp_sd_write_request(
        cgo_handle: CgoHandle,
        req: *mut CGOSharedDirectoryWriteRequest,
    ) -> CGOErrCode;
    fn tdp_sd_move_request(
        cgo_handle: CgoHandle,
        req: *mut CGOSharedDirectoryMoveRequest,
    ) -> CGOErrCode;
}

/// Payload represents raw incoming RDP messages for parsing.
pub(crate) type Payload = Cursor<Vec<u8>>;
/// Message represents a raw outgoing RDP message to send to the RDP server.
pub(crate) type Message = Vec<u8>;
pub(crate) type Messages = Vec<Message>;

/// A [cgo.Handle] passed to us by Go.
///
/// [cgo.Handle]: https://pkg.go.dev/runtime/cgo#Handle
type CgoHandle = usize;

/// This is the maximum size of an RDP message which we will accept
/// over a virtual channel.
///
/// Note that this is not an RDP defined value, but rather one we've chosen
/// in order to harden system security.
const MAX_ALLOWED_VCHAN_MSG_SIZE: usize = 2 * 1024 * 1024; // 2MB

const RDP_CONNECT_TIMEOUT: time::Duration = time::Duration::from_secs(5);
const RDP_HANDSHAKE_TIMEOUT: time::Duration = time::Duration::from_secs(10);
const RDPSND_CHANNEL_NAME: &str = "rdpsnd";
