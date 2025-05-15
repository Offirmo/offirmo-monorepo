/* PROMPT
 * ’
 */

import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import {
	type ReducerMap,
	type ReducerAction, type Reducer,
	createꓽaction__base, createꓽaction,
	ACTION_TYPEꘌUPDATE_TO_NOW, type ActionUpdateToNow, createꓽactionꘌupdate_to_now,
	ACTION_TYPEꘌNOOP, type ActionNoop, createꓽactionꘌnoop,
	ACTION_TYPEꘌHACK, type ActionHack_, createꓽactionꘌhack,
	ACTION_TYPEꘌSET, type ActionSet_, createꓽactionꘌset,
} from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

function reduceꓽnoop<State>(state: Immutable<State>, action: Immutable<ActionNoop>): Immutable<State> {
	return state
}

function reduceꓽset<State>(state: Immutable<State>, action: Immutable<ActionSet_<State>>): Immutable<State> {
	return action.new_state
}

function reduceꓽhack<State>(state: Immutable<State>, action: Immutable<ActionHack_<State>>): Immutable<State> {
	return action.custom_reducer(state)
}

/////////////////////////////////////////////////

export {
	reduceꓽnoop,
	reduceꓽset,
	reduceꓽhack,
}
