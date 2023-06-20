import { Immutable } from '@offirmo-private/ts-types'

import {
	Options,
	State,
} from './types.js'
import { getꓽoptions } from './options.js'

////////////////////////////////////

function create_state(options: Options): State {
	return {
		o: getꓽoptions(options),

		circular: new WeakSet<object>()
	}
}

export function prettify_any(js: Immutable<any>, options: Immutable<Partial<Options>> = {}): string {
	try {
		const st = create_state(get_options(options))

		return st.o.prettify_any(js, st)
	}
	catch (err) {
		if (options?.never_throw)
			return `[error prettifying:${(err as any)?.message}]`

		throw err
	}
}

export function prettify_json(js: Immutable<any>, options: Immutable<Partial<Options>> = {}): string {
	const st = create_state(get_options(options))

	// TODO show not JSON
	return st.o.prettify_any(js, st)
}

export function dump_prettified_any(msg: string, data: Immutable<any>, options: Immutable<Partial<Options>> = {}): void {
	console.log(msg)
	console.log(prettify_any(data, options))
}

/* TODO one day
export function is_pure_json(js: Immutable<any>): boolean {
	return false
}
*/
