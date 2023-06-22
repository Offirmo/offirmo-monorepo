import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { Options, dump_prettified_any } from '@offirmo-private/prettify-any'

/////////////////////////////////////////////////

function renderⵧgeneric(state: Immutable<Object>): void {
	const options: Partial<Options> = {

	}
	dump_prettified_any('------ state ------', state, options)
}

/////////////////////////////////////////////////

export {
	renderⵧgeneric,
}
