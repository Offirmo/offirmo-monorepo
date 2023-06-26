import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { Options, dumpꓽanyⵧprettified } from '@offirmo-private/prettify-any'

/////////////////////////////////////////////////

function renderⵧgeneric(state: Immutable<Object>): void {
	const options: Partial<Options> = {

	}
	dumpꓽanyⵧprettified('------ state ------', state, options)
}

/////////////////////////////////////////////////

export {
	renderⵧgeneric,
}
