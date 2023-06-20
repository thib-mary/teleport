package rsa

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"

	"github.com/gravitational/teleport/api/utils/keys"
	"github.com/gravitational/trace"
)

// KeySourceConfig holds configuration parameters for a KeySource.
type KeySourceConfig struct {
	// PrivateKeyBits configures the bit size for generated RSA private keys.
	PrivateKeyBits int
	// PrecomputeKeys configures how many keys to pre-generate in the background.
	PrecomputeKeys uint
}

// KeySource is a source of RSA keys with a specific private key size, which
// supports precomputation of private keys for better performance in bursty
// conditions.
type KeySource struct {
	cfg             KeySourceConfig
	precomputedKeys chan keyOrErr
	stopped         chan struct{}
}

// NewKeySource returns a new KeySource with the given configuration. It also
// starts a goroutines to precompute keys if config.PrecomputeKeys is greater
// than 0.
func NewKeySource(cfg KeySourceConfig) KeySource {
	k := KeySource{
		cfg:     cfg,
		stopped: make(chan struct{}),
	}
	if cfg.PrecomputeKeys > 0 {
		k.precomputedKeys = make(chan keyOrErr, cfg.PrecomputeKeys)
		go k.precomputeKeys()
	}
	return k
}

// NewKeyPair returns a new RSA key pair.
func (k *KeySource) NewKeyPair() ([]byte, []byte, error) {
	priv, err := k.NewPrivateKey()
	if err != nil {
		return nil, nil, err
	}
	return priv.PrivateKeyPEM(), priv.MarshalSSHPublicKey(), nil
}

// NewPrivateKey returns a new [*keys.PrivateKey].
func (k *KeySource) NewPrivateKey() (*keys.PrivateKey, error) {
	rsaKey, err := k.getOrGenerateRSAPrivateKey()
	if err != nil {
		return nil, err
	}
	// We encode the private key in PKCS #1, ASN.1 DER form
	// instead of PKCS #8 to maintain compatibility with some
	// third party clients.
	keyPEM := pem.EncodeToMemory(&pem.Block{
		Type:    keys.PKCS1PrivateKeyType,
		Headers: nil,
		Bytes:   x509.MarshalPKCS1PrivateKey(rsaKey),
	})
	return keys.NewPrivateKey(rsaKey, keyPEM)
}

// NewRSAPrivateKey returns a new [*rsa.PrivateKey].
func (k *KeySource) NewRSAPrivateKey() (*rsa.PrivateKey, error) {
	return k.getOrGenerateRSAPrivateKey()
}

func (k *KeySource) getOrGenerateRSAPrivateKey() (*rsa.PrivateKey, error) {
	select {
	case keyOrErr := <-k.precomputedKeys:
		return keyOrErr.key, trace.Wrap(keyOrErr.err)
	default:
		return k.generatePrivateKey()
	}
}

func (k *KeySource) generatePrivateKey() (*rsa.PrivateKey, error) {
	key, err := rsa.GenerateKey(rand.Reader, k.cfg.PrivateKeyBits)
	return key, trace.Wrap(err)
}

func (k *KeySource) precomputeKeys() {
	for {
		select {
		case <-k.stopped:
			return
		default:
		}
		key, err := k.generatePrivateKey()
		// It's non-deterministic which branch will be taken here so the other
		// select at the top of the loop is necessary.
		select {
		case k.precomputedKeys <- keyOrErr{key, err}:
		case <-k.stopped:
			return
		}
	}
}

type keyOrErr struct {
	key *rsa.PrivateKey
	err error
}
