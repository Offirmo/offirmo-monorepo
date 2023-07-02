import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { State } from './types.js'

function createꓽstate(): State {
	return {
		immortalᝍrankⵧmajor: 0,
		immortalᝍrankⵧminor: 0,
	} as State
}

function cultivate(state: Immutable<State>): Immutable<State> {
	return {
		...state,
		immortalᝍrankⵧminor: state.immortalᝍrankⵧminor + 1,
	}
}

function attempt_breakthrough(state: Immutable<State>): Immutable<State> {
	return {
		...state,
		immortalᝍrankⵧmajor: state.immortalᝍrankⵧmajor + 1,
		immortalᝍrankⵧminor: 0,
	}
}


export {
	createꓽstate,
	cultivate,
	attempt_breakthrough,
}
