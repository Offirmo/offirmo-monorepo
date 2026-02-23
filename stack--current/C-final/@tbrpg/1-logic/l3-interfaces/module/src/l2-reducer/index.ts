import assert from 'tiny-invariant'
import EventEmitter from 'emittery'



import type { Immutable } from '@monorepo-private/ts--types'
import {
	type ReducerAction, type Reducer, type ReducerMap,
	createꓽaction__base, createꓽaction,
	ACTION_TYPEꘌUPDATE_TO_NOW, type ActionUpdateToNow, createꓽactionꘌupdate_to_now,
	ACTION_TYPEꘌNOOP,          type ActionNoop,        createꓽactionꘌnoop,
	ACTION_TYPEꘌSET,           type ActionSet_,        createꓽactionꘌset,
	ACTION_TYPEꘌHACK,          type ActionHack_,       createꓽactionꘌhack,
} from '@monorepo-private/ts--types--web'
import {
	type AllStoreFns,
	type Snapshot, type SyncStoreUnsubscribeFn,
	reduceꓽnoop,
	reduceꓽset,
	reduceꓽhack,
} from '@monorepo-private/sync-store'

import { type TBRSoftExecutionContext } from '@tbrpg/definitions'
import * as TBRPGState from '@tbrpg/state'
import { type State } from '@tbrpg/state'

import {
	ActionType,
	type TBRPGAction,
} from '../l1-actions/index.ts'

/////////////////////////////////////////////////

const EMITTER_EVT = 'change'

function createꓽall_store_fns(SXC?: TBRSoftExecutionContext): AllStoreFns<State, TBRPGState.CreateParams, TBRPGAction> {

	function init(args?: TBRPGState.CreateParams): Immutable<State> {
		return TBRPGState.create(SXC, args)
	}

	function reducer(state: Immutable<State>, action: Immutable<TBRPGAction>): Immutable<State> {
		const action_ts_discrimination_not_working = action as any
		switch (action.type) {
			case ActionType['play']:
				return TBRPGState.play(state, action)
			case ActionType['equip_item']:
				return TBRPGState.equip_item(state, action_ts_discrimination_not_working)
			case ActionType['sell_item']:
				return TBRPGState.sell_item(state, action_ts_discrimination_not_working)
			case ActionType['rename_avatar']:
				return TBRPGState.rename_avatar(state, action_ts_discrimination_not_working)
			case ActionType['switch_class']:
				return TBRPGState.switch_class(state, action_ts_discrimination_not_working)
			case ActionType['redeem_code']:
				return TBRPGState.attempt_to_redeem_code(state, action_ts_discrimination_not_working)
			case ActionType['re_seed']:
				return TBRPGState.re_seed(state, action_ts_discrimination_not_working)
			case ActionType['on_start_session']:
				return TBRPGState.on_start_session(state, action_ts_discrimination_not_working)
			case ActionType['on_logged_in_refresh']:
				return TBRPGState.on_logged_in_refresh(state, action_ts_discrimination_not_working)
			case ActionType['acknowledge_engagement_msg_seen']:
				return TBRPGState.acknowledge_engagement_msg_seen(state, action_ts_discrimination_not_working)
			case ACTION_TYPEꘌUPDATE_TO_NOW:
				return TBRPGState.update_to_now(state, action_ts_discrimination_not_working)
			case ACTION_TYPEꘌNOOP:
				return reduceꓽnoop(state, action_ts_discrimination_not_working)
			case ACTION_TYPEꘌSET:
				return reduceꓽset(state, action_ts_discrimination_not_working)
			case ACTION_TYPEꘌHACK:
				return reduceꓽhack(state, action_ts_discrimination_not_working)
			default:
				throw new Error(`Unknown action type "${action.type}"!`)
		}
	}

	/////////////////////////////////////////////////
	let state: Immutable<State> = init()
	const emitter = new EventEmitter<{ [EMITTER_EVT]: string }>()

	function subscribe(onStoreChange: () => void): SyncStoreUnsubscribeFn {
		const unbind = emitter.on(EMITTER_EVT, (src: string) => {
			onStoreChange()
		})

		return unbind
	}

	function getSnapshot(): Immutable<State> {
		return state
	}

	function dispatch(action: Immutable<TBRPGAction>): void {
		state = reducer(state, action)
		emitter.emit(EMITTER_EVT, `[dispatch]`)
	}

	/////////////////////////////////////////////////

	return {
		reducer,
		init,
		subscribe,
		getSnapshot,
		dispatch,
	}
}

/////////////////////////////////////////////////

export {
	createꓽall_store_fns,
}
