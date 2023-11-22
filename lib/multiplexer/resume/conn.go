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
	"bufio"
	"encoding/binary"
	"io"
	"net"
	"os"
	"sync"
	"syscall"
	"time"

	"github.com/gravitational/trace"
	"github.com/sirupsen/logrus"
	"golang.org/x/sync/errgroup"
)

const (
	readBufferSize  = 128 * 1024
	writeBufferSize = 2 * 1024 * 1024

	maxFrameSize = 128 * 1024
)

func NewConn(localAddr, remoteAddr net.Addr) *Conn {
	c := &Conn{
		localAddr:  localAddr,
		remoteAddr: remoteAddr,

		receive: buffer{data: make([]byte, 4096)},
		replay:  buffer{data: make([]byte, 4096)},
	}
	c.cond.L = &c.mu

	return c
}

type Conn struct {
	mu   sync.Mutex
	cond sync.Cond

	localAddr    net.Addr
	remoteAddr   net.Addr
	allowRoaming bool

	localClosed  bool
	remoteClosed bool
	// current is set iff the Conn is attached; it's cleared at the end of run()
	current io.Closer

	readDeadline  deadline
	writeDeadline deadline

	receive buffer
	replay  buffer
}

var _ net.Conn = (*Conn)(nil)

// AllowRoaming allows attaching underlying connections with a different remote
// address than the Conn's remote address. Before calling this function,
// attaching a new connection will fail if the current and new remote addresses
// are not [*net.TCPAddr]s with the same IP.
func (c *Conn) AllowRoaming() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.allowRoaming = true
}

// sameTCPSourceAddress returns true if the two [net.Addr]s are both
// [*net.TCPAddr] (like golang.org/x/crypto/ssh.checkSourceAddress requires) and
// if the IP addresses are equal.
func sameTCPSourceAddress(addr1, addr2 net.Addr) bool {
	t1, ok := addr1.(*net.TCPAddr)
	if !ok {
		return false
	}
	t2, ok := addr2.(*net.TCPAddr)
	if !ok {
		return false
	}

	return t1.IP.Equal(t2.IP)
}

// HandleFirstConnection attaches the [net.Conn] as the underlying connection,
// skipping the initial offset exchange (which is assumed to be zero). Takes
// ownership of the net.Conn and blocks while
func (c *Conn) HandleFirstConnection(nc net.Conn) error {
	const isFirstConn = true
	return c.handleConnection(nc, isFirstConn)
}

// HandleConnection attaches the [net.Conn] as the underlying connection. Takes ownership of the net.Conn and blocks until
func (c *Conn) HandleConnection(nc net.Conn) error {
	const isNotFirstConn = false
	return c.handleConnection(nc, isNotFirstConn)
}

func (c *Conn) handleConnection(nc net.Conn, firstConn bool) error {
	localAddr := nc.LocalAddr()
	remoteAddr := nc.RemoteAddr()

	c.mu.Lock()
	// the first conn will always overwrite localAddr and remoteAddr but we
	// still need to pass them to the constructor to avoid returning nil from
	// RemoteAddr and LocalAddr between NewConn and HandleFirstConnection
	if !firstConn && !c.allowRoaming && !sameTCPSourceAddress(c.remoteAddr, remoteAddr) {
		c.mu.Unlock()
		nc.Close()
		return trace.AccessDenied("invalid TCP source address for resumable non-roaming connection")
	}

	c.waitForDetachLocked()

	if c.localClosed {
		c.mu.Unlock()
		nc.Close()
		return trace.ConnectionProblem(net.ErrClosed, "attaching to a closed resumable connection: %v", net.ErrClosed.Error())
	}

	if c.remoteClosed {
		c.mu.Unlock()
		nc.Close()
		return trace.ConnectionProblem(syscall.ECONNRESET, "attaching to a closed resumable connection: %v", syscall.ECONNRESET.Error())
	}

	c.localAddr = localAddr
	c.remoteAddr = remoteAddr
	c.current = nc
	c.cond.Broadcast()
	c.mu.Unlock()

	return c.run(nc, firstConn)
}

func (c *Conn) waitForDetachLocked() {
	for c.current != nil {
		c.current.Close()
		c.cond.Wait()
	}
}

func (c *Conn) Detach() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.waitForDetachLocked()
}

func (c *Conn) Status() (closed, attached bool) {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.localClosed, c.current != nil
}

func (c *Conn) run(nc net.Conn, firstRun bool) error {
	var closeOnReturn bool
	defer func() {
		c.mu.Lock()
		defer c.mu.Unlock()
		c.current = nil
		if closeOnReturn {
			c.localClosed = true
		}
		c.cond.Broadcast()
	}()
	defer nc.Close()

	// this will succeed if the conn is a [*multiplexer.Conn], for example
	ncReader, ok := nc.(interface {
		io.Reader
		io.ByteReader
	})
	if !ok {
		ncReader = bufio.NewReader(nc)
	}

	c.mu.Lock()
	sentReceivePosition := c.receive.end
	c.mu.Unlock()

	var peerReceivePosition uint64
	if !firstRun {
		if err := binary.Write(nc, binary.BigEndian, sentReceivePosition); err != nil {
			return trace.ConnectionProblem(err, "writing position during handshake: %v", err)
		}

		if err := binary.Read(ncReader, binary.BigEndian, &peerReceivePosition); err != nil {
			return trace.ConnectionProblem(err, "reading position during handshake: %v", err)
		}
	} else {
		logrus.Error("first run, skipped handshake")
	}

	c.mu.Lock()
	if peerReceivePosition < c.replay.start || peerReceivePosition > c.replay.end {
		// we advanced our replay buffer past the read point of the peer, or the
		// read point of the peer is in the future - can't continue, either way
		c.mu.Unlock()
		closeOnReturn = true
		_, _ = nc.Write(binary.AppendUvarint(nil, 0xffff_ffff_ffff_ffff))
		return trace.BadParameter("incompatible resume position")
	}

	if c.replay.start != peerReceivePosition {
		c.replay.advance(peerReceivePosition - c.replay.start)
		c.cond.Broadcast()
	}
	c.mu.Unlock()

	if !firstRun {
		logrus.Error("handshake completed successfully")
	}

	var eg errgroup.Group
	var done bool
	setDone := func() {
		c.mu.Lock()
		defer c.mu.Unlock()
		if done {
			return
		}
		done = true
		c.cond.Broadcast()
	}

	eg.Go(func() error {
		defer setDone()
		defer nc.Close()

		for {
			ack, err := binary.ReadUvarint(ncReader)
			if err != nil {
				return trace.ConnectionProblem(err, "failed reading ack: %v", err)
			}

			if ack > 0 {
				if ack == 0xffff_ffff_ffff_ffff {
					closeOnReturn = true
					return trace.BadParameter("closed by remote end")
				}
				c.mu.Lock()

				if replayLen := c.replay.len(); ack > replayLen {
					// trying to move our cursor past the replay buffer?
					c.mu.Unlock()
					return trace.BadParameter("ack past end of replay buffer (got %v, len %v)", ack, replayLen)
				}
				c.replay.advance(ack)
				c.cond.Broadcast()

				c.mu.Unlock()
			}

			frameSize, err := binary.ReadUvarint(ncReader)
			if err != nil {
				return trace.ConnectionProblem(err, "failed reading frame size: %v", err)
			}

			if frameSize > maxFrameSize {
				return trace.BadParameter("oversized frame (got %v)", frameSize)
			}

			c.mu.Lock()
			for frameSize > 0 {
				for c.receive.len() >= readBufferSize {
					c.cond.Wait()
					if done {
						c.mu.Unlock()
						return err
					}
				}

				c.receive.reserve(min(readBufferSize-c.receive.len(), frameSize))
				receiveTail, _ := c.receive.free()
				receiveTail = receiveTail[:min(frameSize, len64(receiveTail))]
				c.mu.Unlock()

				n, err := io.ReadFull(ncReader, receiveTail)

				c.mu.Lock()
				if n > 0 {
					c.receive.append(receiveTail[:n])
					frameSize -= uint64(n)
					c.cond.Broadcast()
				}

				if err != nil {
					c.mu.Unlock()
					return trace.ConnectionProblem(err, "reading frame: %v", err)
				}
			}
			c.mu.Unlock()
		}
	})

	eg.Go(func() error {
		defer setDone()
		defer nc.Close()

		varintBuf := make([]byte, 0, 2*binary.MaxVarintLen64)

		for {
			var sendAck uint64
			var sendBuf []byte

			c.mu.Lock()
			for {
				sendBuf = nil
				if c.replay.end > peerReceivePosition {
					skip := peerReceivePosition - c.replay.start
					d1, d2 := c.replay.allocated()
					if len64(d1) <= skip {
						sendBuf = d2[skip-len64(d1):]
					} else {
						sendBuf = d1[skip:]
					}
					if len(sendBuf) > maxFrameSize {
						sendBuf = sendBuf[:maxFrameSize]
					}
				}
				sendAck = c.receive.end - sentReceivePosition
				if len(sendBuf) > 0 || sendAck > 0 {
					break
				}
				c.cond.Wait()
				if done {
					c.mu.Unlock()
					return nil
				}
			}
			c.mu.Unlock()

			hdrBuf := binary.AppendUvarint(varintBuf, sendAck)
			hdrBuf = binary.AppendUvarint(hdrBuf, len64(sendBuf))
			if _, err := nc.Write(hdrBuf); err != nil {
				return trace.ConnectionProblem(err, "writing frame header: %v", err)
			}
			if _, err := nc.Write(sendBuf); err != nil {
				return trace.ConnectionProblem(err, "writing frame data: %v", err)
			}

			c.mu.Lock()
			sentReceivePosition += sendAck
			peerReceivePosition += len64(sendBuf)
			c.mu.Unlock()
		}
	})

	err := eg.Wait()
	logrus.Infof("Detaching connection: %v", err)
	return trace.Wrap(err)
}

// Close implements [net.Conn].
func (c *Conn) Close() error {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.waitForDetachLocked()

	if c.localClosed {
		return net.ErrClosed
	}

	c.localClosed = true
	c.cond.Broadcast()

	return nil
}

// LocalAddr implements [net.Conn].
func (c *Conn) LocalAddr() net.Addr {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.localAddr
}

// RemoteAddr implements [net.Conn].
func (c *Conn) RemoteAddr() net.Addr {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.remoteAddr
}

// SetDeadline implements [net.Conn].
func (c *Conn) SetDeadline(t time.Time) error {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.localClosed {
		return net.ErrClosed
	}

	c.readDeadline.setDeadlineLocked(t, &c.cond)
	c.writeDeadline.setDeadlineLocked(t, &c.cond)

	return nil
}

// SetReadDeadline implements [net.Conn].
func (c *Conn) SetReadDeadline(t time.Time) error {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.localClosed {
		return net.ErrClosed
	}

	c.readDeadline.setDeadlineLocked(t, &c.cond)

	return nil
}

// SetWriteDeadline implements [net.Conn].
func (c *Conn) SetWriteDeadline(t time.Time) error {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.localClosed {
		return net.ErrClosed
	}

	c.writeDeadline.setDeadlineLocked(t, &c.cond)

	return nil
}

// Read implements [net.Conn].
func (c *Conn) Read(b []byte) (n int, err error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	for {
		if c.localClosed {
			return 0, net.ErrClosed
		}

		if c.readDeadline.timeout {
			return 0, os.ErrDeadlineExceeded
		}

		if len(b) == 0 {
			return 0, nil
		}

		n := c.receive.read(b)
		if n > 0 {
			c.cond.Broadcast()
			return n, nil
		}

		c.cond.Wait()
	}
}

// Write implements [net.Conn].
func (c *Conn) Write(b []byte) (n int, err error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.localClosed {
		return 0, net.ErrClosed
	}

	if c.writeDeadline.timeout {
		return 0, os.ErrDeadlineExceeded
	}

	for {
		if c.replay.len() < writeBufferSize {
			s := min(writeBufferSize-c.replay.len(), len64(b))
			c.replay.append(b[:s])
			b = b[s:]
			n += int(s)
			c.cond.Broadcast()

			if len(b) == 0 {
				return n, nil
			}
		}

		c.cond.Wait()

		if c.localClosed {
			return n, net.ErrClosed
		}

		if c.writeDeadline.timeout {
			return n, os.ErrDeadlineExceeded
		}
	}
}

func len64(s []byte) uint64 {
	return uint64(len(s))
}

// buffer represents a view of contiguous data in a bytestream, between the
// absolute positions start and end (with 0 being the beginning of the
// bytestream). The byte at absolute position i is data[i % len(data)],
// len(data) is always a power of two (therefore it's always non-empty), and
// len(data) == cap(data).
type buffer struct {
	data  []byte
	start uint64
	end   uint64
}

// bounds returns the indexes of start and end in the current data slice. It's
// possible for left to be greater than right, which happens when the data is
// stored across the end of the slice.
func (w *buffer) bounds() (left, right uint64) {
	return w.start % len64(w.data), w.end % len64(w.data)
}

func (w *buffer) len() uint64 {
	return w.end - w.start
}

func (w *buffer) allocated() ([]byte, []byte) {
	if w.len() == 0 {
		return nil, nil
	}

	left, right := w.bounds()

	if left >= right {
		return w.data[left:], w.data[:right]
	}
	return w.data[left:right], nil
}

func (w *buffer) free() ([]byte, []byte) {
	if w.len() == 0 {
		return w.data, nil
	}

	left, right := w.bounds()

	if left >= right {
		return w.data[right:left], nil
	}
	return w.data[right:], w.data[:left]
}

func (w *buffer) reserve(n uint64) {
	if w.len()+n <= len64(w.data) {
		return
	}

	d1, d2 := w.allocated()
	capacity := len64(w.data) * 2
	for w.len()+n > capacity {
		capacity *= 2
	}
	w.data = make([]byte, capacity)
	left := w.start % capacity
	copy(w.data[left:], d1)
	mid := left + len64(d1)
	if mid > capacity {
		mid -= capacity
	}
	copy(w.data[mid:], d2)
}

func (w *buffer) append(b []byte) {
	w.reserve(len64(b))
	f1, f2 := w.free()
	copy(f2, b[copy(f1, b):])
	w.end += len64(b)
}

func (w *buffer) advance(n uint64) {
	w.start += n
	if w.start > w.end {
		w.end = w.start
	}
}

func (w *buffer) read(b []byte) int {
	d1, d2 := w.allocated()
	n := copy(b, d1)
	n += copy(b[n:], d2)
	w.advance(uint64(n))
	return n
}

type deadline struct {
	timeout bool
	stopped bool
	timer   *time.Timer
}

func (d *deadline) setDeadlineLocked(t time.Time, cond *sync.Cond) {
	if d.timer != nil && !d.stopped {
		if d.timer.Stop() {
			// the happy path: we stopped the timer with plenty of time left, so
			// we prevented the execution of the func, and we can just reuse the
			// timer; unfortunately, timer.Stop() again will return false, so we
			// have to keep an additional boolean flag around
			d.stopped = true
		} else {
			// the timer has fired but the func hasn't completed yet (it'll get
			// stuck acquiring the lock that we're currently holding), so we
			// reset d.timer to tell the func that it should do nothing after
			// acquiring the lock
			d.timer = nil
		}
	}

	// if we got here, either timer is nil and stopped is unset, or timer is not
	// nil but it's not running (and can be reused), and stopped is set

	if t.IsZero() {
		d.timeout = false
		return
	}

	dt := time.Until(t)

	if dt <= 0 {
		d.timeout = true
		cond.Broadcast()
		return
	}

	d.timeout = false

	if d.timer == nil {
		thisTimer := new(*time.Timer)
		d.timer = time.AfterFunc(dt, func() {
			cond.L.Lock()
			defer cond.L.Unlock()
			if d.timer != *thisTimer {
				return
			}
			d.timeout = true
			d.stopped = true
			cond.Broadcast()
		})
		*thisTimer = d.timer
	} else {
		d.timer.Reset(dt)
		d.stopped = false
	}
}
