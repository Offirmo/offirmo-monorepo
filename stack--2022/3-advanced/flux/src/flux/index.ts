/* A helper for actual games using this model
 */
import assert from 'tiny-invariant'
import EventEmitter from 'emittery'

import { Immutable } from '@offirmo-private/ts-types'
import { SoftExecutionContext } from '@offirmo-private/soft-execution-context'
import {
	AnyOffirmoState,
	BaseAction,
	createꓽActionⳇReconcile,
	cast_toꓽimmutable,
	getꓽrevision,
	getꓽschema_version,
} from '@offirmo-private/state-utils'

/*
import { Immutable, StorageⳇSync } from '@offirmo-private/ts-types'
import { get_UTC_timestamp_ms } from '@offirmo-private/timestamps'

import { schedule_when_idle_but_not_too_far } from '@offirmo-private/async-utils'
import {
	AnyOffirmoState,
	OverallMigrateToLatest,
	BaseAction,
	get_revision_loose,
} from '@offirmo-private/state-utils'
*/

import { LIB } from '../consts.js'
import { getꓽSXC } from '../services/sec.js'
import { Store, Dispatcher, Flux } from '../types.js'

/*
import { create as create_dispatcher } from './dispatcher'
import create_store__local_storage from './stores/local-storage'
import create_store__in_memory from './stores/in-memory'
*/

/////////////////////////////////////////////////

const EMITTER_EVT = 'change'

// TODO improve logging (too verbose)
interface CreateParams<State extends AnyOffirmoState, Action extends BaseAction> {
	SXC?: SoftExecutionContext

	storesⵧordered: Array<Store<State, Action>>

	// needed in case no existing
	create: (SXC: SoftExecutionContext) => Immutable<State>

	// safety to detect non-migrated states
	SCHEMA_VERSION: number

	//migrate_toꓽlatest: FullMigrateToLatestFn<State>
	//reduceꓽaction: ActionReducer<State, Action>


	// TODO ordered stores list!

	//local_storage: StorageⳇSync
	//storage_key_radix: string

	//post_create?: (state: Immutable<State>) => Immutable<State>
	//updateꓽto_now?: (state: Immutable<State>) => Immutable<State>
}
function createꓽinstance<State extends AnyOffirmoState, Action extends BaseAction>({
	SXC = getꓽSXC(),

	storesⵧordered,

	create,

	SCHEMA_VERSION,
	//migrate_toꓽlatest,
	//reduceꓽaction,


	/*
	                                                                          storage_key_radix,
	create,
	post_create = (state: Immutable<State>) => state,
	update_to_now = (state: Immutable<State>) => state,
	reduce_action,*/
}: CreateParams<State, Action>): Flux<State, Action> {
	return SXC.xTry('creating flux instance', ({SXC, logger}) => {
		logger.trace(`[${LIB}].createꓽinstance()…`)

		const emitter = new EventEmitter<{ [EMITTER_EVT]: string }>()

		/////////////////////////////////////////////////
		logger.trace(`[${LIB}] linking the flux architecture = dispatcher and stores…`)

		const [ storeⵧmain, ...storeⵧreplicas ] = storesⵧordered
		assert(storeⵧmain, `[${LIB}] At least one store should be provided!`)

		/*const _dispatcher = createꓽdispatcher(SXC, SCHEMA_VERSION)
		storesⵧordered.forEach(store => {
			if (store.setꓽdispatcher) {
				store.setꓽdispatcher(_dispatcher)
			}
		})*/

		/////////////////////////////////////////////////
		;(function init() {
			// by any chance, has any store already synchronously un-persisted itself?
			// ex. local storage
			// ex. cloud storage serialized by SSR
			let initial_value_candidates_ordered = storesⵧordered
				.map(store => {
					try {
						return store.get()
					}
					catch {
						return undefined
					}
				})
				.filter(state => !!state)

			if (initial_value_candidates_ordered.length === 0) {
				logger.verbose(`[${LIB}] initial state: no sync persistence → creating from scratch… 🆕`)
			}
			else {
				logger.trace(`[${LIB}] initial state: 💾 restoring from ${initial_value_candidates_ordered.length} persistent store(s)…`)
			}

			const [
				initial_valueⵧfirst = create(SXC), // if no sync candidate, start over
				...initial_valueⵧother
			] = initial_value_candidates_ordered

			initial_value_candidates_ordered.forEach((state, index) => {
				// reminder: stores are responsible for migrating their candidate
				const schema_version = getꓽschema_version(state!)
				assert(schema_version === SCHEMA_VERSION, `[${LIB}] candidate state #${index} schema version mismatch!`)
			})

			storeⵧmain.init(initial_valueⵧfirst)
			initial_valueⵧother.forEach(competing_initial_state => {
				storeⵧmain.onꓽdispatch(
					cast_toꓽimmutable(
						createꓽActionⳇReconcile<State>(competing_initial_state!)
					)
				)
			})

			// pass to other stores
			// use case: after a long offline session,
			// the cloud stores need to be passed the current valuable local state!
			storeⵧreplicas.forEach(store => {
				// note that stores have to tolerate an "echo" = being re-init'ed with their own state
				store.init(storeⵧmain.get())
			})
		})()

		logger.silly(`[${LIB}] state initialised:`, storeⵧmain.get())

		// NO "post create", it's up to the flux creator to call that if needed
		// TODO should we update to now? or up to the caller?

		////////////////////////////////////

		function dispatch(action: Immutable<Action>) {
			throw new Error('NIMP!')
			/*if (action.type !== 'update_to_now') console.groupEnd()

			assert(get_schema_version_loose(some_state) === SCHEMA_VERSION, `_enqueue_in_bkp_pipeline(): schema version === ${SCHEMA_VERSION} (current)!`)

			;(console.groupCollapsed as any)(`——————— ⚡ action dispatched: "${action.type}" ⚡ ———————`)
			schedule_when_idle_but_not_too_far(console.groupEnd)

			//logger.trace('current state:', { action: other_fields_for_debug })
			const { type, time, expected_revisions, ...other_fields_for_debug } = action
			logger.log('⚡ action dispatched:', { ...other_fields_for_debug })

			_dispatcher.dispatch(action)*/
		}

		return {
			get: storeⵧmain.get,
			subscribe: storeⵧmain.subscribe,

			dispatch,

			/*
				// currently used by the savegame editor
				reset() {
					const new_state = TBRPGState.reseed(TBRPGState.create())
					logger.info('Savegame reseted:', { new_state })

					_dispatcher.set(new_state)
				},
*//*
			_libs: {
				'@tbrpg/state': TBRPGState,
			},*/
		}
	})
}

export {
	type CreateParams,
	createꓽinstance,
}
export default createꓽinstance
