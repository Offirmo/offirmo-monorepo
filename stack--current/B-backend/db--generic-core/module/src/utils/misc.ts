import stable_stringify from '@monorepo-private/json-stable-stringify'

import type { Immutable } from '@monorepo-private/ts--types'


export function deep_equals_stable<T>(a: Immutable<T>, b: Immutable<T>): boolean {
	return stable_stringify(a) === stable_stringify(b)
}
