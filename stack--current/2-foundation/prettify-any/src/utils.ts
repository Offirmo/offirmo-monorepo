import * as util from 'node:util'
import { type Immutable } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

// https://stackoverflow.com/a/51398944/587407
const COMPARABLE_TYPES = [ 'number', 'string' ]
function cmp<T>(a: T, b: T): number {
	const ta = typeof a
	const tb = typeof b
	if (ta !== tb)
		return cmp(ta, tb)

	if (!COMPARABLE_TYPES.includes(ta)) {
		// Very crude. mainly for symbols.
		return cmp(String(a), String(b))
	}

	return -(a < b) || +(a > b)
}


function _fast_prettify_ugly_single_line(js: Immutable<any>): string {
	return util.inspect(js, {
		depth: 100,
		colors: false,
		maxArrayLength: 100,
		breakLength: Infinity,
		compact: true,
	})
}

/////////////////////////////////////////////////

export {
	cmp,
}
