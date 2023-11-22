// Copyright 2023 Gravitational, Inc
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

package resume

import (
	"context"
	"crypto/ecdh"
	"crypto/rand"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/base64"
	"fmt"
	"io"
	"net"
	"regexp"
	"strconv"
	"sync"
	"time"

	"github.com/gravitational/trace"
	"github.com/sirupsen/logrus"

	"github.com/gravitational/teleport/lib/multiplexer"
)

const (
	protocolString = "teleport-resume-v0"

	sshPrefix     = "SSH-2.0-"
	clientSuffix  = "\x00" + protocolString
	clientPrelude = sshPrefix + clientSuffix

	maxU64Bytes = "\xff\xff\xff\xff\xff\xff\xff\xff"
	maxU64      = 0xffff_ffff_ffff_ffff
)

const ecdhP256UncompressedSize = 65

type connectionHandler interface {
	HandleConnection(net.Conn)
}

func NewResumableSSHServer(sshServer connectionHandler, serverVersion, hostID string) *ResumableSSHServer {
	return &ResumableSSHServer{
		sshServer: sshServer,
		hostID:    hostID,

		log: logrus.WithField(trace.Component, "resume"),

		conns: make(map[token]keyAndConn),
	}
}

type token = [8]byte

type keyAndConn = struct {
	key  token
	conn *Conn
}

type ResumableSSHServer struct {
	sshServer connectionHandler
	log       logrus.FieldLogger

	hostID string

	mu    sync.Mutex
	conns map[token]keyAndConn
}

var _ connectionHandler = (*ResumableSSHServer)(nil)

func multiplexerConn(nc net.Conn) *multiplexer.Conn {
	if conn, ok := nc.(*multiplexer.Conn); ok {
		return conn
	}
	return multiplexer.NewConn(nc)
}

func (r *ResumableSSHServer) HandleConnection(nc net.Conn) {
	dhKey, err := ecdh.P256().GenerateKey(rand.Reader)
	if err != nil {
		r.log.Warn("Failed to generate ECDH key, proceeding without resumption (this is a bug).")
		r.sshServer.HandleConnection(nc)
		return
	}

	conn := multiplexerConn(nc)
	defer func() {
		if conn != nil {
			conn.Close()
		}
	}()

	if _, err := fmt.Fprintf(conn, "%v %v %v\r\n", protocolString, base64.RawStdEncoding.EncodeToString(dhKey.PublicKey().Bytes()), r.hostID); err != nil {
		r.log.WithError(err).Error("Error while writing resumption prelude.")
		return
	}

	isResume, err := conn.ReadPrelude(clientPrelude)
	if err != nil {
		r.log.WithError(err).Error("Error while reading resumption prelude.")
		return
	}

	if !isResume {
		r.log.Info("Handling non-resumable connection.")
		r.sshServer.HandleConnection(conn)
		conn = nil
		return
	}

	var buf [ecdhP256UncompressedSize]byte
	if _, err := io.ReadFull(conn, buf[:]); err != nil {
		r.log.WithError(err).Error("Error while reading resumption handshake.")
		return
	}

	dhPub, err := ecdh.P256().NewPublicKey(buf[:])
	if err != nil {
		r.log.WithError(err).Error("Received invalid ECDH key.")
		return
	}

	dhSecret, err := dhKey.ECDH(dhPub)
	if err != nil {
		r.log.WithError(err).Error("Received invalid ECDH key.")
		return
	}

	otp := sha256.Sum256(dhSecret)

	tag, err := conn.ReadByte()
	if err != nil {
		r.log.WithError(err).Error("Error while reading resumption handshake.")
		return
	}

	switch tag {
	default:
		r.log.Error("Unknown tag in handshake: %v.")
		return
	case 0:
		r.log.Info("Handling new resumable SSH connection.")

		resumableConn := NewConn(conn.LocalAddr(), conn.RemoteAddr())
		r.mu.Lock()
		r.conns[token(otp[:8])] = keyAndConn{
			key:  token(otp[8:16]),
			conn: resumableConn,
		}
		r.mu.Unlock()

		go r.sshServer.HandleConnection(resumableConn)
		r.log.Debugf("Handling new resumable connection: %v", resumableConn.Attach(conn, true))
		return
	case 1:
	}

	if _, err := io.ReadFull(conn, buf[:16]); err != nil {
		r.log.WithError(err).Error("Error while reading resumption handshake.")
		return
	}

	for i := 0; i < 16; i++ {
		buf[i] ^= otp[i]
	}

	r.log.Info("===== REATTACHING CONNECTION ======")

	r.mu.Lock()
	keyConn := r.conns[token(buf[:8])]
	r.mu.Unlock()

	if subtle.ConstantTimeCompare(keyConn.key[:], buf[8:16]) == 0 || keyConn.conn == nil {
		// sentinel value for the handshake to signify "unknown resumption token
		// or invalid resumption point"
		_, _ = conn.Write([]byte(maxU64Bytes))
		r.log.Info("===== UNKNOWN RESUMPTION TOKEN =====")
		return
	}

	r.log.Debugf("Handling existing resumable connection: %v", keyConn.conn.Attach(conn, false))
	conn = nil
}

var resumablePreludeLine = regexp.MustCompile(`^` + regexp.QuoteMeta(protocolString) + ` ([0-9A-Za-z+/]{` + strconv.Itoa(base64.RawStdEncoding.EncodedLen(ecdhP256UncompressedSize)) + `}) ([0-9a-z\-]+)\r\n$`)

func readVersionExchange(conn *multiplexer.Conn) (dhPubKey *ecdh.PublicKey, hostID string, err error) {
	line, err := conn.PeekLine(255)
	if err != nil {
		return
	}

	match := resumablePreludeLine.FindSubmatch(line)
	if match == nil {
		return nil, "", nil
	}

	var buf [ecdhP256UncompressedSize]byte
	if n, err := base64.RawStdEncoding.Decode(buf[:], match[1]); err != nil {
		return nil, "", trace.Wrap(err)
	} else if n != ecdhP256UncompressedSize {
		return nil, "", trace.Wrap(io.ErrUnexpectedEOF, "short ECDH encoding")
	}

	dhPubKey, err = ecdh.P256().NewPublicKey(buf[:])
	if err != nil {
		return nil, "", trace.Wrap(err)
	}

	hostID = string(match[2])

	// discard is guaranteed to work for the line we just peeked
	_, _ = conn.Discard(len(line))

	return
}

func MaybeResumableSSHClientConn(nc net.Conn, connCtx context.Context, dial func(connCtx context.Context, hostID string) (net.Conn, error)) (net.Conn, error) {
	dhC := make(chan *ecdh.PrivateKey, 1)
	go func() {
		k, err := ecdh.P256().GenerateKey(rand.Reader)
		if err != nil {
			logrus.Warnf("Failed to generate ECDH key: %v.", err.Error())
			dhC <- nil
			return
		}
		// this precalculates the public key, which we hope we have to send
		_ = k.PublicKey()
		dhC <- k
	}()

	conn := multiplexerConn(nc)

	// we must send the first 8 bytes of the version string; thankfully, no
	// matter which SSH client we'll end up using, it must send `SSH-2.0-` as
	// its first 8 bytes, as per RFC 4253 ("The Secure Shell (SSH) Transport
	// Layer Protocol") section 4.2.
	if _, err := conn.Write([]byte(sshPrefix)); err != nil {
		conn.Close()
		return nil, trace.Wrap(err)
	}

	dhPub, hostID, err := readVersionExchange(conn)
	if err != nil {
		conn.Close()
		return nil, trace.Wrap(err)
	}

	if dhPub == nil {
		// regular SSH connection, conn is about to read the SSH- line from the
		// server but we've sent sshPrefix already, so we have to skip it from
		// the application side writes
		return newWriteSkipConn(conn, uint32(len(sshPrefix))), nil
	}

	dhKey := <-dhC
	if dhKey == nil {
		// failed ECDH key generation somehow, can continue as a normal connection
		return newWriteSkipConn(conn, uint32(len(sshPrefix))), nil
	}

	dhSecret, err := dhKey.ECDH(dhPub)
	if err != nil {
		logrus.Warnf("Failed to complete ECDH key exchange: %v.", err.Error())
		return newWriteSkipConn(conn, uint32(len(sshPrefix))), nil
	}

	otp := sha256.Sum256(dhSecret)

	if _, err := conn.Write([]byte(clientSuffix)); err != nil {
		conn.Close()
		return nil, trace.Wrap(err)
	}

	if _, err := conn.Write(append(dhKey.PublicKey().Bytes(), 0)); err != nil {
		conn.Close()
		return nil, trace.Wrap(err)
	}

	resumptionToken := otp[:16]

	resumableConn := NewConn(conn.LocalAddr(), conn.RemoteAddr())
	resumableConn.AllowRoaming()

	detached := make(chan struct{})
	go func() {
		defer close(detached)
		resumableConn.Attach(conn, true)
	}()

	go func() {
		const replacementInterval = 30 * time.Second
		reconnectTicker := time.NewTicker(replacementInterval)
		defer reconnectTicker.Stop()

		var backoff time.Duration
		for {
			select {
			case <-connCtx.Done():
				resumableConn.Close()
				return
			case <-detached:
			case <-reconnectTicker.C:
			}

			closed, attached := resumableConn.Status()
			if closed {
				return
			}

			if attached {
				logrus.Debug("Attempting periodic connection replacement.")
			} else {
				logrus.Debugf("Connection lost, reconnecting after %v.", backoff)
				time.Sleep(backoff)
				backoff += 500 * time.Millisecond
			}

			if connCtx.Err() != nil {
				return
			}

			dhKey, err := ecdh.P256().GenerateKey(rand.Reader)
			if err != nil {
				logrus.Errorf("Failed to generate ECDH key: %v.", err.Error())
				continue
			}

			logrus.Debug("Dialing.")
			nc, err := dial(connCtx, hostID)
			if err != nil {
				logrus.Errorf("Failed to dial: %v.", err.Error())
				continue
			}

			c := multiplexerConn(nc)
			if _, err := c.Write([]byte(clientPrelude)); err != nil {
				logrus.Errorf("Error writing resumption prelude: %v.", err.Error())
				c.Close()
				continue
			}
			if _, err := c.Write(append(dhKey.PublicKey().Bytes(), 1)); err != nil {
				logrus.Errorf("Error writing resumption exchange: %v.", err)
				c.Close()
				continue
			}

			dhPub, _, err := readVersionExchange(c)
			if err != nil {
				logrus.Errorf("Error reading resumption version exchange: %v.", err)
				c.Close()
				continue
			}
			if dhPub == nil {
				logrus.Errorf("Somehow not a resumable connection on resumption.")
				c.Close()
				continue
			}

			dhSecret, err := dhKey.ECDH(dhPub)
			if err != nil {
				logrus.Errorf("Failed to complete ECDH key exchange: %v.", err)
				c.Close()
				continue
			}

			otp := sha256.Sum256(dhSecret)

			for i := 0; i < 16; i++ {
				otp[i] ^= resumptionToken[i]
			}

			if _, err := c.Write(otp[:16]); err != nil {
				logrus.Errorf("Error writing resumption exchange: %v.", err)
				c.Close()
				continue
			}

			if fail, err := c.ReadPrelude(maxU64Bytes); err != nil {
				logrus.Errorf("Error receiving resumption handshake: %v.", err)
				c.Close()
				continue
			} else if fail {
				if !attached {
					logrus.Errorf("Failure to resume connection.")
					c.Close()
					resumableConn.Close()
					return
				} else {
					logrus.Errorf("Failure to replace connection.")
					c.Close()
					continue
				}
			}

			logrus.Info("Attaching connection.")
			detached = make(chan struct{})
			go func() {
				defer close(detached)
				resumableConn.Attach(c, false)
			}()

			backoff = 0
			reconnectTicker.Reset(replacementInterval)
			select {
			case <-reconnectTicker.C:
			default:
			}
		}
	}()

	return resumableConn, nil
}
