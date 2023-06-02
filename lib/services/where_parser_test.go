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
			expectEvaluationError: []string{
				"expected type bool",
			},
		},
	} {
		t.Run(tc.expr, func(t *testing.T) {
			parsed, err := ParseWhereExpression(tc.expr)
			require.NoError(t, err, "unexpected parse error %s", trace.DebugReport(err))

			result, err := parsed.Evaluate(WhereEnv{
				User: emptyUser,
			})
			if len(tc.expectEvaluationError) > 0 {
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
