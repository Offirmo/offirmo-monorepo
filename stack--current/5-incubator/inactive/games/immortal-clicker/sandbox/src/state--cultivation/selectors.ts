import type { Immutable } from '@offirmo-private/ts-types'

import { type State } from './types.js'

/////////////////////////////////////////////////

function isꓽcultivatorⵧimmortal(state: Immutable<State>): boolean {
	return state.immortalᝍrankⵧmajor > 0 || state.immortalᝍrankⵧminor > 0
}

// TODO crippling / mortal
function getꓽcultivationⵧtype(state: Immutable<State>): 'none' | 'mortal' | 'immortal' | 'crippled' {

	const has_immortal_cultivation = isꓽcultivatorⵧimmortal(state)

	return has_immortal_cultivation
		? 'immortal'
		: 'none'
}

/*
function isꓽcultivator(state: Immutable<State>): boolean {
	// TODO
	return false
}*/



/////////////////////////////////////////////////

export {
	isꓽcultivatorⵧimmortal,
	getꓽcultivationⵧtype,
}
