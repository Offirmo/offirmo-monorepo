import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { State } from './types.js'
import { Sect } from '../generator--sect/src/index.js'

function createꓽstate(): State {
	return {
		immortalᝍrankⵧmajor: 0,
		immortalᝍrankⵧminor: 0,
		sectⵧcurrent‿uid: null,
	} satisfies State
}

function join_sect(state: Immutable<State>, sect: Immutable<Sect>): Immutable<State> {
	return {
		...state,
		sectⵧcurrent‿uid: sect.uid
	}
}

function cultivate(state: Immutable<State>): Immutable<State> {
	// TODO need a technique to cultivate
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

	join_sect,
	cultivate,
	attempt_breakthrough,
}
