import { Immutable } from '@offirmo-private/ts-types'

import { Options, State } from './types.js'
import { getꓽoptions } from './options.js'

/////////////////////////////////////////////////

function _createꓽstate(options: Options): State {
	return {
		o: getꓽoptions(options),

		indent_level: 0,

		circular: new WeakSet<object>()
	}
}

function prettifyꓽany(js: Immutable<any>, options: Immutable<Partial<Options>> = {}): string {
	try {
		const st = _createꓽstate(getꓽoptions(options))

		return st.o.prettifyꓽany(js, st).join(st.o.eol)
	}
	catch (err) {
		if (options?.never_throw)
			return `[error prettifying:${(err as any)?.message}]`

		throw err
	}
}

function prettify_json(js: Immutable<any>, options: Immutable<Partial<Options>> = {}): string {
	const st = _createꓽstate(getꓽoptions(options))

	// TODO show not JSON
	return st.o.prettifyꓽany(js, st).join(st.o.eol)
}


function dump_prettified_any(msg: string, data: Immutable<any>, options: Immutable<Partial<Options>> = {}): void {
	console.log(msg)
	console.log(prettifyꓽany(data, options))
}

/* TODO one day
export function is_pure_json(js: Immutable<any>): boolean {
	return false
}
*/

/////////////////////////////////////////////////

export {
	prettifyꓽany,
	prettify_json,
	dump_prettified_any,
}
