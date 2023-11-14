package anomalydetection

import (
	"net"

	"github.com/gravitational/trace"
	maxminddb "github.com/oschwald/geoip2-golang"

	"github.com/gravitational/teleport/api/types/events"
)

type AnomalyDetection struct {
	reader *maxminddb.Reader
}

func NewAnomalyDetection(databaseFile string) (*AnomalyDetection, error) {
	reader, err := maxminddb.Open(databaseFile)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return &AnomalyDetection{
		reader: reader,
	}, nil
}

func (a *AnomalyDetection) FillAuditEventMetadata(ipAddrWithPort string, evt *events.GeoLocationData) error {
	ipAddr, _, err := net.SplitHostPort(ipAddrWithPort)
	if err != nil {
		return trace.Wrap(err, "failed to split ip address and port %s", ipAddrWithPort)
	}

	ip := net.ParseIP(ipAddr)
	if ip == nil {
		return trace.BadParameter("failed to parse ip address %s", ipAddr)
	}

	city, err := a.reader.City(ip)
	if err != nil {
		return trace.Wrap(err, "failed to lookup ip address %s", ipAddr)
	}

	evt.Country = pickEnOrFirstEntry(city.Country.Names)
	evt.CountryCode = city.Country.IsoCode
	if len(city.Subdivisions) > 0 {
		evt.Region = pickEnOrFirstEntry(city.Subdivisions[0].Names)
	}
	evt.City = pickEnOrFirstEntry(city.City.Names)
	evt.Latitude = city.Location.Latitude
	evt.Longitude = city.Location.Longitude
	return nil
}

func (a *AnomalyDetection) Close() error {
	return trace.Wrap(a.reader.Close())
}

func pickEnOrFirstEntry(names map[string]string) string {
	if name, ok := names["en"]; ok {
		return name
	}
	for _, name := range names {
		return name
	}
	return ""
}
