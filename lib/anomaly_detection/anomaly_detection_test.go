package anomalydetection

import (
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/gravitational/teleport/api/types/events"
)

func TestAnomalyDetection_FillAuditEventMetadata(t *testing.T) {
	const (
		databaseFile = "./maxminddb/db.mmdb"
	)

	tests := []struct {
		name string

		ipAddrWithPort string
		want           *events.GeoLocationData
	}{
		{
			name:           "polish ip",
			ipAddrWithPort: "45.66.22.210:555",
			want: &events.GeoLocationData{
				Country:     "Poland",
				CountryCode: "PL",
				Region:      "Lesser Poland",
				City:        "Krakow",
			},
		},
		{
			name:           "pt ip",
			ipAddrWithPort: "149.90.155.61:555",
			want: &events.GeoLocationData{
				Country:     "Portugal",
				CountryCode: "PT",
				Region:      "Porto",
				City:        "Maia",
			},
		},
	}

	db, err := NewAnomalyDetection(databaseFile)
	require.NoError(t, err)
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			evt := &events.GeoLocationData{}
			err := db.FillAuditEventMetadata(tt.ipAddrWithPort, evt)
			require.NoError(t, err)
			require.Equal(t, tt.want, evt)
		})
	}
}
