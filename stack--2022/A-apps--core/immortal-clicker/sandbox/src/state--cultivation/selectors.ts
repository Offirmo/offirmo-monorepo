import { Immutable } from '@offirmo-private/ts-types'

import { State } from './types.js'

/////////////////////////////////////////////////

function isꓽcultivator(state: Immutable<State>): boolean {
	// TODO
	return false
}

function isꓽcultivatorⵧimmortal(state: Immutable<State>): boolean {
	return state.immortalᝍrankⵧmajor > 0 || state.immortalᝍrankⵧminor > 0
}

/////////////////////////////////////////////////

export {
	isꓽcultivatorⵧimmortal,
}
