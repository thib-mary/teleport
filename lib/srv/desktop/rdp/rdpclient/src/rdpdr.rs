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

mod filesystem;
mod flags;
pub(crate) mod path;
pub(crate) mod scard;
pub(crate) mod tdp;

use self::filesystem::FilesystemBackend;
use self::scard::ScardBackend;
use self::tdp::{
    SharedDirectoryCreateResponse, SharedDirectoryDeleteResponse, SharedDirectoryInfoResponse,
    SharedDirectoryListResponse,
};
use crate::client::ClientHandle;
use crate::CgoHandle;
use ironrdp_pdu::{custom_err, PduResult};
use ironrdp_rdpdr::pdu::efs::{
    DeviceControlRequest, NtStatus, ServerDeviceAnnounceResponse, ServerDriveIoRequest,
};
use ironrdp_rdpdr::pdu::esc::{ScardCall, ScardIoCtlCode};
use ironrdp_rdpdr::RdpdrBackend;
use ironrdp_svc::impl_as_any;

#[derive(Debug)]
pub struct TeleportRdpdrBackend {
    /// The backend for smart card redirection.
    scard: ScardBackend,
    /// The backend for directory sharing.
    fs: FilesystemBackend,
}

impl_as_any!(TeleportRdpdrBackend);

impl RdpdrBackend for TeleportRdpdrBackend {
    fn handle_server_device_announce_response(
        &mut self,
        pdu: ServerDeviceAnnounceResponse,
    ) -> PduResult<()> {
        if pdu.result_code != NtStatus::SUCCESS {
            return Err(custom_err!(
                "TeleportRdpdrBackend::handle_server_device_announce_response",
                TeleportRdpdrBackendError(format!(
                    "ServerDeviceAnnounceResponse failed with NtStatus: {:?}",
                    pdu.result_code
                ))
            ));
        }

        // Nothing to send back to the server
        Ok(())
    }

    fn handle_scard_call(
        &mut self,
        req: DeviceControlRequest<ScardIoCtlCode>,
        call: ScardCall,
    ) -> PduResult<()> {
        self.scard.handle(req, call)
    }

    fn handle_drive_io_request(&mut self, req: ServerDriveIoRequest) -> PduResult<()> {
        self.fs.handle(req)
    }
}

impl TeleportRdpdrBackend {
    pub fn new(
        client_handle: ClientHandle,
        cert_der: Vec<u8>,
        key_der: Vec<u8>,
        pin: String,
        cgo_handle: CgoHandle,
    ) -> Self {
        Self {
            scard: ScardBackend::new(client_handle.clone(), cert_der, key_der, pin),
            fs: FilesystemBackend::new(cgo_handle, client_handle),
        }
    }

    pub fn handle_tdp_sd_info_response(
        &mut self,
        tdp_resp: SharedDirectoryInfoResponse,
    ) -> PduResult<()> {
        self.fs.handle_tdp_sd_info_response(tdp_resp)
    }

    pub fn handle_tdp_sd_create_response(
        &mut self,
        tdp_resp: SharedDirectoryCreateResponse,
    ) -> PduResult<()> {
        self.fs.handle_tdp_sd_create_response(tdp_resp)
    }

    pub fn handle_tdp_sd_delete_response(
        &mut self,
        tdp_resp: SharedDirectoryDeleteResponse,
    ) -> PduResult<()> {
        self.fs.handle_tdp_sd_delete_response(tdp_resp)
    }

    pub fn handle_tdp_sd_list_response(
        &mut self,
        tdp_resp: SharedDirectoryListResponse,
    ) -> PduResult<()> {
        self.fs.handle_tdp_sd_list_response(tdp_resp)
    }

    pub fn handle_tdp_sd_read_response(
        &mut self,
        tdp_resp: tdp::SharedDirectoryReadResponse,
    ) -> PduResult<()> {
        self.fs.handle_tdp_sd_read_response(tdp_resp)
    }
}

/// A generic error type for the TeleportRdpdrBackend that can contain any arbitrary error message.
#[derive(Debug)]
pub struct TeleportRdpdrBackendError(pub String);

impl std::fmt::Display for TeleportRdpdrBackendError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:#?}", self)
    }
}

impl std::error::Error for TeleportRdpdrBackendError {}
