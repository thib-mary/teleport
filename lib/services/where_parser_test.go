package services

import (
	"testing"

	"github.com/davecgh/go-spew/spew"
	"github.com/gravitational/trace"
	"github.com/stretchr/testify/require"
)

func TestWhereParser(t *testing.T) {
	for _, tc := range []struct {
		expr                  string
		expectParseError      []string
		expectEvaluationError []string
	}{
		{
			expr: "user",
			expectEvaluationError: []string{
				"expected type bool",
			},
		},
		{
			expr: "user.spec",
			expectEvaluationError: []string{
				"expected type bool",
			},
		},
		{
			expr: "user.spec.traits",
			expectParseError: []string{
				"expected type bool",
				"got expression returning type (map[string][]string)",
			},
		},
	} {
		t.Run(tc.expr, func(t *testing.T) {
			parsed, err := ParseWhereExpression(tc.expr)
			if len(tc.expectParseError) > 0 {
				require.Error(t, err)
				for _, msg := range tc.expectParseError {
					require.ErrorContains(t, err, msg)
				}
				return
			}
			require.NoError(t, err, "unexpected parse error %s", trace.DebugReport(err))

			result, err := parsed.Evaluate(&Context{
				User: emptyUser,
			})
			if len(tc.expectEvaluationError) > 0 {
				require.Error(t, err)
				for _, msg := range tc.expectEvaluationError {
					require.ErrorContains(t, err, msg)
				}
				return
			}
			require.NoError(t, err, "unexpected evaluation error %s", trace.DebugReport(err))

			spew.Dump(result)
		})
	}
}
