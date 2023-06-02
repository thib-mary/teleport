package services

import (
	"reflect"
	"strings"

	"github.com/gravitational/teleport"
	"github.com/gravitational/teleport/api/types"
	"github.com/gravitational/teleport/api/types/events"
	"github.com/gravitational/teleport/lib/utils/typical"
	"github.com/gravitational/trace"
	"golang.org/x/exp/slices"
)

type whereExpr typical.Expression[WhereEnv, bool]

func ParseWhereExpression(expr string) (whereExpr, error) {
	return whereParser.Parse(expr)
}

var whereParser = mustNewWhereParser()

func mustNewWhereParser() *typical.CachedParser[WhereEnv, bool] {
	p, err := newWhereParser()
	if err != nil {
		panic(trace.Wrap(err, "building where parser (this is a bug)"))
	}
	return p
}

func newWhereParser() (*typical.CachedParser[WhereEnv, bool], error) {
	vars, err := buildVariables()
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return typical.NewCachedParser[WhereEnv, bool](typical.ParserSpec{
		Variables: vars,
		Functions: map[string]typical.Function{
			"equals": typical.BinaryFunction[WhereEnv](func(a, b any) (bool, error) {
				return a == b, nil
			}),
			"contains": typical.BinaryFunction[WhereEnv](func(list []string, item string) (bool, error) {
				return slices.Contains(list, item), nil
			}),
			"all_end_with": typical.BinaryFunction[WhereEnv](func(list []string, suffix string) (bool, error) {
				for _, l := range list {
					if !strings.HasSuffix(l, suffix) {
						return false, nil
					}
				}
				return true, nil
			}),
			"all_equal": typical.BinaryFunction[WhereEnv](func(list []string, value string) (bool, error) {
				for _, l := range list {
					if l != value {
						return false, nil
					}
				}
				return true, nil
			}),
			"is_subset": typical.BinaryVariadicFunction[WhereEnv](func(list []string, items ...string) (bool, error) {
				s := make(map[string]struct{}, len(items))
				for _, item := range items {
					s[item] = struct{}{}
				}

				for _, l := range list {
					if _, ok := s[l]; !ok {
						return false, nil
					}
				}
				return true, nil
			}),
			"system.catype": typical.NullaryFunctionWithEnv(func(env WhereEnv) (string, error) {
				if env.Resource == nil {
					return "", nil
				}
				ca, ok := env.Resource.(types.CertAuthority)
				if !ok {
					return "", nil
				}
				return string(ca.GetType()), nil
			}),
		},
	})
}

/*
// WhereEnv is the environment for where expressions used in Teleport.

	type WhereEnv struct {
		// User is currently authenticated user
		User types.User `json:"user"`
		// Resource is an optional resource, in case if the rule
		// checks access to the resource
		Resource types.Resource `json:"resource"`
		// Session is an optional session.end or windows.desktop.session.end event.
		// These events hold information about session recordings.
		Session events.AuditEvent `json:"session"`
		// SSHSession is an optional (active) SSH session.
		SSHSession *session.Session `json:"ssh_session"`
		// HostCert is an optional host certificate.
		HostCert *HostCertContext `json:"host_cert"`
		// SessionTracker is an optional session tracker, in case if the rule checks access to the tracker.
		SessionTracker types.SessionTracker `json:"session_tracker"`
	}
*/
type WhereEnv = Context

func buildVariables() (map[string]typical.Variable, error) {
	vars := make(map[string]typical.Variable)

	for _, root := range []struct {
		name       string
		emptyValue any
		getter     func(env WhereEnv) any
	}{
		{"user", emptyUser, func(env WhereEnv) any { return env.User }},
		{"resource", emptyResource, func(env WhereEnv) any { return env.Resource }},
		{"session", events.SessionEnd{}, func(env WhereEnv) any { return env.Session }},
		{"ssh_session", ctxSession{}, func(env WhereEnv) any { return env.SSHSession }},
		{"host_cert", emptyHostCert, func(env WhereEnv) any { return env.HostCert }},
		{"session_tracker", ctxTracker{}, func(env WhereEnv) any { return env.SessionTracker }},
	} {
		root := root

		vars[root.name] = typical.DynamicVariable[WhereEnv, any](func(env WhereEnv) (any, error) {
			r := root.getter(env)
			if r == nil {
				return nil, trace.NotFound(root.name)
			}
			return r, nil
		})

		fields, err := traverseJson(fieldDesc{
			names: []string{root.name},
		}, root.emptyValue)
		if err != nil {
			return nil, trace.Wrap(err)
		}

		for _, field := range fields {
			field := field
			name := strings.Join(field.names, ".")
			vars[name] = typical.DynamicVariable[WhereEnv, any](func(env WhereEnv) (any, error) {
				r := root.getter(env)
				if r == nil {
					return nil, trace.NotFound(name)
				}
				v := reflect.ValueOf(r)
				if v.Kind() == reflect.Interface || v.Kind() == reflect.Ptr {
					v = v.Elem()
				}
				v = v.FieldByIndex(field.indices)
				if (v == reflect.Value{}) {
					return nil, trace.NotFound(name)
				}
				return v.Interface(), nil
			})
		}
	}
	return vars, nil
}

type fieldDesc struct {
	names   []string
	indices []int
}

func traverseJson(parent fieldDesc, v any) ([]fieldDesc, error) {
	val := reflect.ValueOf(v)
	if val.Kind() == reflect.Interface || val.Kind() == reflect.Ptr {
		val = val.Elem()
	}

	if val.Kind() != reflect.Struct {
		return nil, nil
	}

	fieldDescs := []fieldDesc{}

	t := val.Type()
	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		tagValue := field.Tag.Get(teleport.JSON)
		fieldName := strings.Split(tagValue, ",")[0]
		switch fieldName {
		case "", "-":
			continue
		}
		fd := fieldDesc{
			names:   append(parent.names, fieldName),
			indices: append(parent.indices, field.Index...),
		}
		fieldDescs = append(fieldDescs, fd)

		nested, err := traverseJson(fd, val.FieldByIndex(field.Index).Interface())
		if err != nil {
			return nil, trace.Wrap(err)
		}
		fieldDescs = append(fieldDescs, nested...)
	}
	return fieldDescs, nil
}
