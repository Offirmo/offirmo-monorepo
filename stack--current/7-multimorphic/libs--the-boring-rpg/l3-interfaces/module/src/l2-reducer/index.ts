import type { Immutable } from '@offirmo-private/ts-types'
import type { Reducer, ReducerAction, ReducerMap } from '@offirmo-private/ts-types-web'

import {
	type AllStoreFns,
	type Snapshot, type SyncStoreUnsubscribeFn,
	reduceꓽnoop,
	reduceꓽset,
	reduceꓽhack,
} from '@offirmo-private/sync-store'

import {
	type State,
	type StartSessionParams,
	type AcknowledgeEngagementMsgSeen,
} from '@tbrpg/state'

import {
	type TBRPGAction,
} from '../l1-actions/index.ts'

/////////////////////////////////////////////////

const REDUCERS_MAP: ReducerMap<State, TBRPGAction> = {

}

/////////////////////////////////////////////////

interface InitArgs {

}

function createꓽall_store_fns(): AllStoreFns<State, InitArgs | undefined, TBRPGAction> {

	function reducer(state: Immutable<State>, action: Immutable<TBRPGAction>): Immutable<State> {
		throw new Error(`Not implemented!`)
	}

	function init(args: InitArgs): Immutable<State> {
		throw new Error(`Not implemented!`)
	}

	/////////////////////////////////////////////////

	function subscribe(onStoreChange: () => void): SyncStoreUnsubscribeFn {
		throw new Error(`Not implemented!`)
	}

	function getSnapshot(): Immutable<State> {
		throw new Error(`Not implemented!`)
	}

	/////////////////////////////////////////////////

	return {
		reducer,
		init,
		subscribe,
		getSnapshot,
	}
}

/////////////////////////////////////////////////

export {
	createꓽall_store_fns,
}
