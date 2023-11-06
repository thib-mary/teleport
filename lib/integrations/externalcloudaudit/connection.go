package externalcloudaudit

import (
	"context"
	"strings"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	ecatypes "github.com/gravitational/teleport/api/types/externalcloudaudit"
	"github.com/gravitational/trace"
)

const (
	dummyFileName = "/_connection-test"
)

// ConnectionTestS3Client is a subset of [s3.Client] methods needed for athena test connection.
type ConnectionTestS3Client interface {
	// Adds an object to a bucket.
	PutObject(ctx context.Context, params *s3.PutObjectInput, optFns ...func(*s3.Options)) (*s3.PutObjectOutput, error)
}

type ConnectionTestParams struct {
	Athena BootstrapAthenaClient
	Glue   BootstrapGlueClient
	S3     ConnectionTestS3Client

	Spec *ecatypes.ExternalCloudAuditSpec
}

func ConnectionTest(ctx context.Context, params ConnectionTestParams) error {
	switch {
	case params.Athena == nil:
		return trace.BadParameter("param Athena required")
	case params.Glue == nil:
		return trace.BadParameter("param Glue required")
	case params.S3 == nil:
		return trace.BadParameter("param S3 required")
	case params.Spec == nil:
		return trace.BadParameter("param Spec required")
	}

	buckets, err := parseS3Buckets(params.Spec)
	if err != nil {
		return trace.Wrap(err)
	}

	sessionBucketKey := dummyFileName
	if buckets.sessionsBucketURL.Path != "" {
		sessionBucketKey = "/" + strings.Trim(buckets.sessionsBucketURL.Path, "/") + dummyFileName
	}

	// Test Session Recording Bucket
	if _, err = params.S3.PutObject(ctx, &s3.PutObjectInput{
		Bucket: &buckets.sessionsBucketURL.Host,
		Key:    &sessionBucketKey,
	}); err != nil {
		return trace.Wrap(err)
	}

	eventsBucketKey := dummyFileName
	if buckets.eventsBucketURL.Path != "" {
		sessionBucketKey = "/" + strings.Trim(buckets.eventsBucketURL.Path, "/") + dummyFileName
	}

	// Test Audit Events Bucket
	if _, err = params.S3.PutObject(ctx, &s3.PutObjectInput{
		Bucket: &buckets.eventsBucketURL.Host,
		Key:    &eventsBucketKey,
	}); err != nil {
		return trace.Wrap(err)
	}

	return nil
}
