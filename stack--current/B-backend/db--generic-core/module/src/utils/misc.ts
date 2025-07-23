import stable_stringify from '@offirmo-private/json-stable-stringify'

import type { Immutable } from '@offirmo-private/ts-types'


export function deep_equals_stable<T>(a: Immutable<T>, b: Immutable<T>): boolean {
	return stable_stringify(a) === stable_stringify(b)
}
