package types

// CheckAndSetDefaults TODO
func (p *AllCAKeyParams) CheckAndSetDefaults() error {
	if p.Default == nil {
		p.Default = &CAKeyParams{
			Ssh: &KeyParams{
				Algorithm: KeyAlgorithm_Ed25519,
			},
			Tls: &KeyParams{
				Algorithm: KeyAlgorithm_ECDSA_P256_SHA256,
			},
			Jwt: &KeyParams{
				Algorithm: KeyAlgorithm_RSA2048_PKCS1_SHA256,
			},
		}
	}
	return nil
}
