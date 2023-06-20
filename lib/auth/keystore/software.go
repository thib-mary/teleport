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

package keystore

import (
	"context"
	"crypto"
	"crypto/ecdsa"
	"crypto/ed25519"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"

	"github.com/gravitational/trace"
	"github.com/sirupsen/logrus"

	"github.com/gravitational/teleport/api/types"
	"github.com/gravitational/teleport/api/utils/keys"
	"github.com/gravitational/teleport/lib/utils"
)

type softwareKeyStore struct {
	rsaKeyPairSource RSAKeyPairSource
}

// RSAKeyPairSource is a function type which returns new RSA keypairs.
type RSAKeyPairSource func() (priv []byte, pub []byte, err error)

// SoftwareConfig holds configuration parameters for a software keystore.
type SoftwareConfig struct {
	RSAKeyPairSource RSAKeyPairSource
}

// CheckAndSetDefaults checks the SoftwareConfig and sets any applicable default
// parameters.
func (cfg *SoftwareConfig) CheckAndSetDefaults() error {
	if cfg.RSAKeyPairSource == nil {
		return trace.BadParameter("must provide RSAKeyPairSource")
	}
	return nil
}

func newSoftwareKeyStore(config *SoftwareConfig, logger logrus.FieldLogger) *softwareKeyStore {
	return &softwareKeyStore{
		rsaKeyPairSource: config.RSAKeyPairSource,
	}
}

// generateRSA creates a new RSA private key and returns its identifier and a
// crypto.Signer. The returned identifier for softwareKeyStore is a pem-encoded
// private key, and can be passed to getSigner later to get the same
// crypto.Signer.
func (s *softwareKeyStore) generateRSA(ctx context.Context, bits int) ([]byte, crypto.Signer, error) {
	privKey, err := rsa.GenerateKey(rand.Reader, bits)
	if err != nil {
		return nil, nil, trace.Wrap(err)
	}
	// We encode the private key in PKCS #1, ASN.1 DER form
	// instead of PKCS #8 to maintain compatibility with some
	// third party clients.
	keyPEM := pem.EncodeToMemory(&pem.Block{
		Type:    keys.PKCS1PrivateKeyType,
		Headers: nil,
		Bytes:   x509.MarshalPKCS1PrivateKey(privKey),
	})
	return keyPEM, privKey, nil
}

func (s *softwareKeyStore) generateECDSA(ctx context.Context) ([]byte, crypto.Signer, error) {
	privKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if err != nil {
		return nil, nil, trace.Wrap(err)
	}
	keyDER, err := x509.MarshalPKCS8PrivateKey(privKey)
	if err != nil {
		return nil, nil, trace.Wrap(err)
	}
	keyPEM := pem.EncodeToMemory(&pem.Block{
		Type:    keys.PKCS8PrivateKeyType,
		Headers: nil,
		Bytes:   keyDER,
	})
	return keyPEM, privKey, nil
}

func (s *softwareKeyStore) generateEd25519(ctx context.Context) ([]byte, crypto.Signer, error) {
	_, privKey, err := ed25519.GenerateKey(rand.Reader)
	keyDER, err := x509.MarshalPKCS8PrivateKey(privKey)
	if err != nil {
		return nil, nil, trace.Wrap(err)
	}
	keyPEM := pem.EncodeToMemory(&pem.Block{
		Type:    keys.PKCS8PrivateKeyType,
		Headers: nil,
		Bytes:   keyDER,
	})
	return keyPEM, privKey, nil
}

func (s *softwareKeyStore) generateKey(ctx context.Context, params types.KeyParams) ([]byte, crypto.Signer, error) {
	switch params.Algorithm {
	case types.KeyAlgorithm_RSA2048_PKCS1_SHA256, types.KeyAlgorithm_RSA2048_PKCS1_SHA512:
		return s.generateRSA(ctx, 2048)
	case types.KeyAlgorithm_RSA3072_PKCS1_SHA256, types.KeyAlgorithm_RSA3072_PKCS1_SHA512:
		return s.generateRSA(ctx, 3072)
	case types.KeyAlgorithm_RSA4096_PKCS1_SHA256, types.KeyAlgorithm_RSA4096_PKCS1_SHA512:
		return s.generateRSA(ctx, 4096)
	case types.KeyAlgorithm_ECDSA_P256_SHA256:
		return s.generateECDSA(ctx)
	case types.KeyAlgorithm_Ed25519:
		return s.generateEd25519(ctx)
	default:
		return nil, nil, trace.BadParameter("algorithm %s unsupported", params.Algorithm)
	}
}

// GetSigner returns a crypto.Signer for the given pem-encoded private key.
func (s *softwareKeyStore) getSigner(ctx context.Context, rawKey []byte) (crypto.Signer, error) {
	signer, err := utils.ParsePrivateKeyPEM(rawKey)
	return signer, trace.Wrap(err)
}

// canSignWithKey returns true if the given key is a raw key.
func (s *softwareKeyStore) canSignWithKey(ctx context.Context, _ []byte, keyType types.PrivateKeyType) (bool, error) {
	return keyType == types.PrivateKeyType_RAW, nil
}

// deleteKey deletes the given key from the KeyStore. This is a no-op for
// softwareKeyStore.
func (s *softwareKeyStore) deleteKey(_ context.Context, _ []byte) error {
	return nil
}

// DeleteUnusedKeys deletes all keys from the KeyStore if they are:
// 1. Labeled by this KeyStore when they were created
// 2. Not included in the argument activeKeys
// This is a no-op for rawKeyStore.
func (s *softwareKeyStore) DeleteUnusedKeys(ctx context.Context, activeKeys [][]byte) error {
	return nil
}
