import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { State } from './types.js'

function createꓽstate(): State {
	return {
		rankⵧmajor: 0,
		rankⵧminor: 0,
	} as State
}

function cultivate(state: Immutable<State>): Immutable<State> {
	return {
		...state,
		rankⵧminor: state.rankⵧminor + 1,
	}
}

function attempt_breakthrough(state: Immutable<State>): Immutable<State> {
	return {
		...state,
		rankⵧmajor: state.rankⵧmajor + 1,
		rankⵧminor: 0,
	}
}


export {
	createꓽstate,
	cultivate,
	attempt_breakthrough,
}
