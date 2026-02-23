import assert from 'tiny-invariant'
import { dequal as is_deep_equal } from 'dequal'
import { SoftExecutionContext } from '@monorepo-private/soft-execution-context'
import {
	AnyOffirmoState,
	BaseAction,
	Immutable,
	get_schema_version_loose,
	get_base_loose,
} from '@monorepo-private/state-utils'

import { Dispatcher, Store } from '../types'


export function create<State extends AnyOffirmoState, Action extends BaseAction>(
	SEC: SoftExecutionContext,
	SCHEMA_VERSION: number,
): Dispatcher<State, Action> {
	const LIB = `Dispatcher`

	return SEC.xTry(`creating ${LIB}…`, ({ logger }) => {
		logger.trace(`[${LIB}].create()`)

		const stores: Store<State, Action>[] = []
		let seenꓽdispatches = false
		let seenꓽset = false

		function registerꓽstore(store: Store<State, Action>, debug_id: string = ''): void {
			logger.trace(`[${LIB}].registerꓽstore(${debug_id})…`)

			assert(!seenꓽset, 'Dispatcher: adding stores after initialisation!')
			assert(!seenꓽdispatches, 'Dispatcher: adding stores after dispatches began!')

			stores.push(store)
		}

		function dispatch(action: Immutable<Action>, eventual_state_hint?: Immutable<State>): void {
			logger.trace(`[${LIB}].dispatch()…`)

			assert(stores.length, 'Dispatcher: dispatching before registering any stores!')
			assert(seenꓽset, 'Dispatcher: dispatching before initialising!')
			seenꓽdispatches = true

			stores.forEach(store => {
				store.onꓽdispatch(action, eventual_state_hint)
				const store_state = store.get()
				if (eventual_state_hint) {
					assert(is_deep_equal(eventual_state_hint, store_state), 'dispatcher: state hint = store state')
				}
				eventual_state_hint = eventual_state_hint || store_state
			})
		}

		function set(new_state: Immutable<State>): void {
			logger.trace(`[${LIB}].set()`, { new_state: get_base_loose(new_state) })

			assert(stores.length, 'Dispatcher: set() before registering any stores!')

			//assert(is_RootState(new_state), `Dispatcher: set() is_RootState()!`)
			assert(get_schema_version_loose(new_state) === SCHEMA_VERSION, `Dispatcher: set() target schema version ${get_schema_version_loose(new_state)} should === ${SCHEMA_VERSION} (current)!`)

			stores.forEach(store => {
				store.set(new_state)
			})

			seenꓽset = true
		}

		return {
			dispatch,
			registerꓽstore,
			set,
		}
	})
}
