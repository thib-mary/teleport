package externalcloudaudit

import (
	"net/url"

	ecatypes "github.com/gravitational/teleport/api/types/externalcloudaudit"
	"github.com/gravitational/trace"
)

// validateAndParseS3Input parses and checks s3 input uris against our strict rules.
// We currently enforce two buckets one for long term storage and one for transient short term storage.
func validateAndParseS3Input(input *ecatypes.ExternalCloudAuditSpec) (auditHost, resultHost string, err error) {
	buckets, err := parseS3Buckets(input)
	if err != nil {
		return "", "", trace.Wrap(err)
	}

	switch {
	case buckets.eventsBucketURL.Scheme != "s3":
		return "", "", trace.BadParameter("invalid scheme for audit events bucket URI")
	case buckets.sessionsBucketURL.Scheme != "s3":
		return "", "", trace.BadParameter("invalid scheme for session bucket URI")
	case buckets.resultsBucketURL.Scheme != "s3":
		return "", "", trace.BadParameter("invalid scheme for athena results bucket URI")
	case buckets.eventsBucketURL.Host != buckets.sessionsBucketURL.Host:
		return "", "", trace.BadParameter("audit events bucket URI must match session bucket URI")
	case buckets.eventsBucketURL.Host == buckets.resultsBucketURL.Host:
		return "", "", trace.BadParameter("athena results bucket URI must not match audit events or session bucket URI")
	}

	return buckets.eventsBucketURL.Host, buckets.resultsBucketURL.Host, nil
}

// parsedBuckets is the return struct for the [parseS3Buckets] function.
type parsedBuckets struct {
	sessionsBucketURL *url.URL
	eventsBucketURL   *url.URL
	resultsBucketURL  *url.URL
}

// parseS3Buckets is a helper method that parses the three provided s3 urls.
func parseS3Buckets(input *ecatypes.ExternalCloudAuditSpec) (*parsedBuckets, error) {
	sessions, err := url.Parse(input.SessionsRecordingsURI)
	if err != nil {
		return nil, trace.Wrap(err, "parsing session recordings URI")
	}

	events, err := url.Parse(input.AuditEventsLongTermURI)
	if err != nil {
		return nil, trace.Wrap(err, "parsing audit events URI")
	}

	results, err := url.Parse(input.AthenaResultsURI)
	if err != nil {
		return nil, trace.Wrap(err, "parsing athena results URI")
	}

	return &parsedBuckets{sessions, events, results}, nil
}
