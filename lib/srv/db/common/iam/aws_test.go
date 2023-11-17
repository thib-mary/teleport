/*
Copyright 2022 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package iam

import (
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/gravitational/teleport/api/types"
	awslib "github.com/gravitational/teleport/lib/cloud/aws"
	"github.com/gravitational/teleport/lib/fixtures"
)

func TestGetAWSPolicyDocument(t *testing.T) {
	redshift, err := types.NewDatabaseV3(types.Metadata{
		Name: "aws-redshift",
	}, types.DatabaseSpecV3{
		Protocol: "postgres",
		URI:      fixtures.AWSRedshiftURI,
	})
	require.NoError(t, err)

	rds, err := types.NewDatabaseV3(types.Metadata{
		Name: "aws-rds",
	}, types.DatabaseSpecV3{
		Protocol: "postgres",
		URI:      fixtures.AWSRDSInstanceURI,
		AWS: types.AWS{
			AccountID: fixtures.AWSAccountID,
			RDS: types.RDS{
				ResourceID: "abcdef",
			},
		},
	})
	require.NoError(t, err)

	rdsProxy, err := types.NewDatabaseV3(types.Metadata{
		Name: "aws-rds-proxy",
	}, types.DatabaseSpecV3{
		Protocol: "postgres",
		URI:      fixtures.AWSRDSProxyURI,
		AWS: types.AWS{
			AccountID: fixtures.AWSAccountID,
			RDSProxy: types.RDSProxy{
				ResourceID: "qwerty",
			},
		},
	})
	require.NoError(t, err)

	elasticache, err := types.NewDatabaseV3(types.Metadata{
		Name: "aws-elasticache",
	}, types.DatabaseSpecV3{
		Protocol: "redis",
		URI:      fixtures.AWSElastiCacheClusterURI,
		AWS: types.AWS{
			AccountID: fixtures.AWSAccountID,
			ElastiCache: types.ElastiCache{
				ReplicationGroupID: "some-group",
			},
		},
	})
	require.NoError(t, err)

	memorydb, err := types.NewDatabaseV3(types.Metadata{
		Name: "aws-memorydb",
	}, types.DatabaseSpecV3{
		Protocol: "redis",
		URI:      fixtures.AWSMemoryDBURI,
		AWS: types.AWS{
			AccountID: fixtures.AWSAccountID,
			MemoryDB: types.MemoryDB{
				ClusterName:  "my-memorydb",
				TLSEnabled:   true,
				EndpointType: "cluster",
			},
		},
	})
	require.NoError(t, err)

	tests := []struct {
		inputDatabase        types.Database
		expectPolicyDocument string
		expectPlaceholders   Placeholders
		expectError          bool
	}{
		{
			inputDatabase: redshift,
			expectPolicyDocument: `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "redshift:GetClusterCredentials",
            "Resource": [
                "arn:aws:redshift:us-east-1:{account_id}:dbuser:redshift-cluster-1/*",
                "arn:aws:redshift:us-east-1:{account_id}:dbname:redshift-cluster-1/*",
                "arn:aws:redshift:us-east-1:{account_id}:dbgroup:redshift-cluster-1/*"
            ]
        }
    ]
}`,
			expectPlaceholders: Placeholders{"{account_id}"},
		},
		{
			inputDatabase: rds,
			expectPolicyDocument: `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "rds-db:connect",
            "Resource": "arn:aws:rds-db:us-east-1:123456789012:dbuser:abcdef/*"
        }
    ]
}`,
		},
		{
			inputDatabase: rdsProxy,
			expectPolicyDocument: `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "rds-db:connect",
            "Resource": "arn:aws:rds-db:us-east-1:123456789012:dbuser:qwerty/*"
        }
    ]
}`,
		},
		{
			inputDatabase: elasticache,
			expectPolicyDocument: `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "elasticache:Connect",
            "Resource": [
                "arn:aws:elasticache:us-east-1:123456789012:replicationgroup:some-group",
                "arn:aws:elasticache:us-east-1:123456789012:user:*"
            ]
        }
    ]
}`,
		},
		{
			inputDatabase: memorydb,
			expectPolicyDocument: `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "memorydb:Connect",
            "Resource": [
                "arn:aws:memorydb:us-east-1:123456789012:cluster/my-memorydb",
                "arn:aws:memorydb:us-east-1:123456789012:user/*"
            ]
        }
    ]
}`,
		},
	}

	for _, test := range tests {
		t.Run(test.inputDatabase.GetName(), func(t *testing.T) {
			policyDoc, placeholders, err := GetAWSPolicyDocument(test.inputDatabase)
			if test.expectError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				require.Equal(t, test.expectPlaceholders, placeholders)
			}

			readablePolicyDoc, err := GetReadableAWSPolicyDocument(test.inputDatabase)
			if test.expectError {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				require.Equal(t, test.expectPolicyDocument, readablePolicyDoc)

				readablePolicyDocParsed, err := awslib.ParsePolicyDocument(readablePolicyDoc)
				require.NoError(t, err)
				require.Equal(t, policyDoc, readablePolicyDocParsed)
			}
		})
	}
}

func TestGetAWSPolicyDocumentForAssumedRole(t *testing.T) {
	redshift, err := types.NewDatabaseV3(types.Metadata{
		Name: "aws-redshift",
	}, types.DatabaseSpecV3{
		Protocol: "postgres",
		URI:      fixtures.AWSRedshiftURI,
		AWS: types.AWS{
			AccountID: fixtures.AWSAccountID,
			Region:    fixtures.AWSRegion,
		},
	})
	require.NoError(t, err)
	redshiftServerless, err := types.NewDatabaseV3(types.Metadata{
		Name: "aws-redshift-serverless",
	}, types.DatabaseSpecV3{
		Protocol: "postgres",
		URI:      fixtures.AWSRedshiftServerlessURI,
	})
	require.NoError(t, err)

	tests := []struct {
		inputDatabase        types.Database
		expectPolicyDocument string
		expectPlaceholders   Placeholders
	}{
		{
			inputDatabase: redshift,
			expectPolicyDocument: `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "redshift:GetClusterCredentialsWithIAM",
            "Resource": "arn:aws:redshift:us-east-1:123456789012:dbname:redshift-cluster-1/*"
        }
    ]
}`,
		},
		{
			inputDatabase: redshiftServerless,
			expectPolicyDocument: `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "redshift-serverless:GetCredentials",
            "Resource": "arn:aws:redshift-serverless:us-east-1:123456789012:workgroup/{workgroup_id}"
        }
    ]
}`,
			expectPlaceholders: Placeholders{"{workgroup_id}"},
		},
	}

	for _, test := range tests {
		t.Run(test.inputDatabase.GetName(), func(t *testing.T) {
			policyDoc, placeholders, err := GetAWSPolicyDocumentForAssumedRole(test.inputDatabase)
			require.NoError(t, err)
			require.Equal(t, test.expectPlaceholders, placeholders)

			readablePolicyDoc, err := GetReadableAWSPolicyDocumentForAssumedRole(test.inputDatabase)
			require.NoError(t, err)
			require.Equal(t, test.expectPolicyDocument, readablePolicyDoc)

			readablePolicyDocParsed, err := awslib.ParsePolicyDocument(readablePolicyDoc)
			require.NoError(t, err)
			require.Equal(t, policyDoc, readablePolicyDocParsed)
		})
	}
}
