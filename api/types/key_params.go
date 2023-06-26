package types

// CheckAndSetDefaults TODO
func (p *AllCAKeyParams) CheckAndSetDefaults() error {
	if p.Default == nil {
		p.Default = &CAKeyParams{
			Ssh: &KeyParams{
				Algorithm: KeyAlgorithm_Ed25519,
				AllowedSubjectKeyAlgorithms: []KeyAlgorithm{
					KeyAlgorithm_Ed25519,
					KeyAlgorithm_RSA2048_PKCS1_SHA512,
				},
			},
			Tls: &KeyParams{
				Algorithm: KeyAlgorithm_RSA2048_PKCS1_SHA256,
				AllowedSubjectKeyAlgorithms: []KeyAlgorithm{
					KeyAlgorithm_Ed25519,
					KeyAlgorithm_RSA2048_PKCS1_SHA256,
				},
			},
			Jwt: &KeyParams{
				Algorithm: KeyAlgorithm_RSA2048_PKCS1_SHA256,
				AllowedSubjectKeyAlgorithms: []KeyAlgorithm{
					KeyAlgorithm_Ed25519,
					KeyAlgorithm_RSA2048_PKCS1_SHA256,
				},
			},
		}
	}
	return nil
}
