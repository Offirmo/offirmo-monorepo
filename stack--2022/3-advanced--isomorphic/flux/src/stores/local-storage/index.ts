/*import memoize_one from 'memoize-one'*/
import assert from 'tiny-invariant'
import EventEmitter from 'emittery'
import { try_or_fallback } from '@offirmo/error-utils'
import stringifyⵧstable from '@offirmo-private/json-stable-stringify'
import { Immutable, Storage, JSONObject } from '@offirmo-private/ts-types'
import { getꓽcompareFn } from '@offirmo-private/ts-utils'
import {
	AnyOffirmoState,
	BaseAction,
	fluid_select,
	FullMigrateToLatestFn,
	getꓽbaseⵧloose,
	getꓽrevisionⵧloose,
	getꓽschema_versionⵧloose,
	cast_toꓽimmutable,
} from '@offirmo-private/state-utils'
import { schedule_when_idle_but_not_too_far } from '@offirmo-private/async-utils'

import { Store, Dispatcher } from '../../types'
import { SoftExecutionContext } from '../../services/sec.js'
import { schedule_when_idle_but_within_human_perception } from '@offirmo-private/async-utils/src'


/////////////////////////////////////////////////

// ex. the-boring-rpg.savegame
export function get_storage_key(radix: string = 'store') {
	return {
		bkp_main:        `${radix}`,          // current, up-to-date, live, version
		bkp_minor:       `${radix}-bkp`,      // recent, not too old, version (!= revision)
		// TODO add "previous active day" ?
		bkp_major_old:   `${radix}-bkp-m1`,   // 1 schema version older. Critical in case the migration code has an issue
		bkp_major_older: `${radix}-bkp-m2`,   // 2 schema versions older
	}
}

/////////////////////////////////////////////////

export function _safe_read_parse_and_validate_from_storage<State>(
	storage: Storage,
	key: string,
	onꓽerror: (err: unknown) => void,
): State | undefined {
	const fallback_result = undefined
	return try_or_fallback({
		fallback_result,
		getter: () => {
			// LS access can throw
			const ls_content = storage.getItem(key)
			if (!ls_content)
				return fallback_result

			// can throw as well
			const json: JSONObject = JSON.parse(ls_content)
			//console.log('parsed', json)

			// need this check due to some serializations returning {} for empty
			const is_empty: boolean = !json || Object.keys(json).length === 0
			if (is_empty)
				return fallback_result

			// NOTE base/root was reworked over time, can be valid while not passing those type guards
			//const is_valid_state: boolean = is_BaseState(json) || is_RootState(json) || has_versioned_schema(json)

			return json as any as State
		},
		onꓽerror,
	})
}

/////////////////////////////////////////////////

const EMITTER_EVT = '⚡️change'

interface CreateParams<State, Action> {
	SEC: SoftExecutionContext
	storage: Storage
	reduceꓽaction: (state: Immutable<State>, action: Immutable<Action>) => Immutable<State>
	SCHEMA_VERSION: number
	migrate_toꓽlatest: FullMigrateToLatestFn<State>
	storage_keys_radix?: string // this is mandatory if the same domain serves several apps and users. The key should be prefixed by the app name + maybe a container (ex. savegame slot) etc.
	                            // TODO extra app name from SEC?
	debug_id?: string
}
function createꓽstoreⵧlocal_storage<State extends AnyOffirmoState, Action extends BaseAction>({
	SEC,
	storage,
	storage_keys_radix,
	reduceꓽaction,
	migrate_toꓽlatest,
	SCHEMA_VERSION,
	debug_id,
}: CreateParams<State, Action>): Store<State, Action> {
	const LIB = [
		`⚫ store--local`,
		debug_id,
	].filter(Boolean).join('ⳇ')

	return SEC.xTry(`creating ${LIB}…`, ({SEC, logger}) => {
		logger.trace(`[${LIB}].create()…`)

		/////////////////////////////////////////////////

		// we keep an in-mem copy bc
		// 1. we're savvy about writing to disk (synchronous, takes cycles)
		// 2. the storage may not work
		let state: Immutable<State> | undefined = undefined

		function get(): Immutable<State> {
			assert(state, `[${LIB}].get(): should be initialized`)

			return state
		}

		/////////////////////////////////////////////////

		const emitter = new EventEmitter<{ [EMITTER_EVT]: undefined }>()

		function subscribe(listener: () => void, debug_id?: string): () => void {
			emitter.on(EMITTER_EVT, listener)

			return () => emitter.off(EMITTER_EVT, listener)
		}

		/////////////////////////////////////////////////

		function init(stateⵧnew: Immutable<State>): void {
			if (state) {
				// we are already initialized, this is a bug
				if (stateⵧnew === state) {
					// init from ourselves, tolerated
					// do nothing
					return
				}

				throw new Error(`[${LIB}].init(): already initialized!`)
			}

			state = stateⵧnew
			emitter.emit(EMITTER_EVT)
			_enqueue_in_bkp_pipeline(state)
				.catch(_onꓽerror)
			logger.trace(`[${LIB}].set(): init ✔`)
		}

		/////////////////////////////////////////////////

		function _onꓽerror(err: unknown) {
			logger.warn(`[${LIB}] Error while processing`, err)

			throw err // TODO report to dispatcher instead
		}

		function _storeꓽkey_valueⵧsync(key: string, json: any): void {
			const value = stringifyⵧstable(json)! // can't be undef, we have checks
			logger.trace(`[${LIB}] 💾 writing "${key}"…`, getꓽbaseⵧloose(json))
			storage.setItem(key, value)
			logger.trace(`[${LIB}] 💾 written "${key}" ✔`, {
				snapshot: JSON.parse(value)
			})
		}

		function _storeꓽkey_valueⵧlater_async(key: string, json: any): Promise<void> {
			return new Promise<void>((resolve, reject) => {
				schedule_when_idle_but_not_too_far(() => {
					try {
						resolve(_storeꓽkey_valueⵧsync(key, json))
					}
					catch (err) {
						reject(err)
					}
				})
			})
		}

		/////////////////////////////////////////////////
		// persisted + bkp pipeline
		// WARNING the bkp pipeline (~autosave) is an INTERNAL safety against bugs, esp. schema migration.
		// This is NOT a user feature!
		// There is no UI to recover from the old backups, it'll have to be manual (fiddling with local storage)
		// The logic here should ONLY un-persist the recent state, NOT try to salvage the older backups.
		// (bc the user may have intentionally reseted their current state and don't want outdated stuff)

		const STORAGE_KEYS = get_storage_key(storage_keys_radix)
		logger.verbose(`[${LIB}] FYI storage keys = "${Object.values(STORAGE_KEYS).join(', ')}"`)

		// NOTE that those variables are BACKUPS, not states (yet)
		let bkp__current: Immutable<State> | undefined = (() => {
			logger.verbose(`[${LIB}] attempting to restore the persisted state…`)
			const raw = _safe_read_parse_and_validate_from_storage<State>(storage, STORAGE_KEYS.bkp_main, _onꓽerror)
			if (!raw)
				return undefined

			const unmigrated_schema_version = getꓽschema_versionⵧloose(raw)
			assert(unmigrated_schema_version <= SCHEMA_VERSION, `[${LIB}] the active persisted state should have a lower or equal schema version than the current code!`)

			return migrate_toꓽlatest(SEC, raw)
		})()
		// older internal safety backups
		// for perf reason we don't read them now
		let bkp__recent: Immutable<State> | undefined = undefined
		let bkp__older: Array<Readonly<JSONObject>> = []

		// TODO should allow any minor overwrite, in case manual revert
		async function _enqueue_in_bkp_pipeline(some_state: Immutable<State>): Promise<void> {
			logger.trace(`[${LIB}] _enqueue_in_bkp_pipeline()`, {
				candidate: getꓽbaseⵧloose(some_state as any),
				current: getꓽbaseⵧloose(state as any),
				bkp__current: getꓽbaseⵧloose(bkp__current as any),
				//'legacy.length': recovered_backups_unmigrated_ordered_oldest_first.length,
				//some_state,
			})

			/*if (some_state === restored_migrated) {
				logger.trace(`[${LIB}] _enqueue_in_bkp_pipeline(): echo from restoration, no change ✔`)
				return
			}*/

			const has_valuable_difference = !bkp__current || fluid_select(some_state).has_valuable_difference_with(bkp__current)
			if (!has_valuable_difference) {
				logger.trace(`[${LIB}] _enqueue_in_bkp_pipeline(): no valuable change ✔`)
				return
			}

			logger.trace(`[${LIB}] _enqueue_in_bkp_pipeline(): valuable change…`)
			const promises: Promise<any>[] = []
			bkp__recent = bkp__current
			bkp__current = some_state
			promises.push(_storeꓽkey_valueⵧlater_async(STORAGE_KEYS.bkp_main, bkp__current))
			if (bkp__recent) {
				if (getꓽschema_versionⵧloose(bkp__recent) === SCHEMA_VERSION)
					promises.push(_storeꓽkey_valueⵧlater_async(STORAGE_KEYS.bkp_minor, bkp__recent))
				else {
					// cleanup, we move it to the major pipeline, cf. lines below
					storage.removeItem(STORAGE_KEYS.bkp_minor)
					bkp__recent = undefined
				}
			}
			if (recovered_backups_unmigrated_ordered_oldest_first.length)
				logger.trace(`[${LIB}] _enqueue_in_bkp_pipeline(): this is the first valuable change, moving restored states along the major bkp pipeline…`)
			while(recovered_backups_unmigrated_ordered_oldest_first.length) {
				const some_legacy_state = recovered_backups_unmigrated_ordered_oldest_first.shift()
				if (getꓽschema_versionⵧloose(some_legacy_state) < SCHEMA_VERSION)
					promises.push(_enqueue_in_major_bkp_pipeline(some_legacy_state))
			}
			await Promise.all(promises)
		}

		// EXPECTED: values are presented from the oldest to the newest!
		async function _enqueue_in_major_bkp_pipeline(legacy_state: Immutable<any>): Promise<void> {
			const most_recent_previous_major_version = bkp__older[0] as any
			logger.trace(`[${LIB}] _enqueue_in_major_bkp_pipeline()`, {
				...fluid_select(legacy_state).get_debug_infos_about_comparison_with(most_recent_previous_major_version, 'enqueued', 'most_recent_major'),
				current_major_bkp_pipeline: structuredClone(bkp__older)
			})

			assert(
				fluid_select(legacy_state).has_higher_or_equal_schema_version_than(most_recent_previous_major_version),
				`_enqueue_in_major_bkp_pipeline() candidate should >= version than most recent major`
			)

			const is_major_update = fluid_select(legacy_state).has_higher_schema_version_than(most_recent_previous_major_version)
			if (is_major_update) {
				bkp__older = [legacy_state, bkp__older[0]].filter(s => !!s)
			}
			else {
				const has_valuable_difference = fluid_select(legacy_state).has_valuable_difference_with(most_recent_previous_major_version)
				if (!has_valuable_difference)
					return

				bkp__older[0] = legacy_state
			}

			logger.trace(`[${LIB}] _enqueue_in_major_bkp_pipeline(): saving major`, getꓽbaseⵧloose(bkp__older[0] as any))
			await _storeꓽkey_valueⵧlater_async(STORAGE_KEYS.bkp_major_old, bkp__older[0])
			if (bkp__older[1]) {
				logger.trace(`[${LIB}] _enqueue_in_major_bkp_pipeline(): saving major-1`, getꓽbaseⵧloose(bkp__older[1] as any))
				await _storeꓽkey_valueⵧlater_async(STORAGE_KEYS.bkp_major_older, bkp__older[1])
			}
		}

		/////////////////////////////////////////////////
		// recover old internal safety bkps (we handle potentially sparse bkp pipeline)
		// no need to do it sync (blocking)
		// but need to be done ideally before we start dispatching
		//let recovered_backups_unmigrated_ordered_oldest_first: any[] = []
		//let restored_migrated: Immutable<State> | undefined = undefined
		schedule_when_idle_but_within_human_perception(() => {
			try {
				logger.verbose(`[${LIB}] attempting to restore the INTERNAL safety auto-backup…`)

				let bkp__recent: Immutable<State> | undefined = cast_toꓽimmutable(_safe_read_parse_and_validate_from_storage<State>(storage, STORAGE_KEYS.bkp_minor, _onꓽerror))
				let bkp__older: Array<Readonly<JSONObject>> = [
					_safe_read_parse_and_validate_from_storage<any>(storage, STORAGE_KEYS.bkp_major_old, _onꓽerror),
					_safe_read_parse_and_validate_from_storage<any>(storage, STORAGE_KEYS.bkp_major_older, _onꓽerror),
				].filter(s => !!s)
				let recovered_backups_unmigrated_ordered_oldest_first: any[] = []
				let restored_migrated: Immutable<State> | undefined = undefined


				// XXX this code block is tricky, beware sync/async

				// read and store everything needed in memory
				recovered_backups_unmigrated_ordered_oldest_first = [
					...bkp__older,
					bkp__current || bkp__recent,
				]
					.filter(s => !!s)
					.sort(getꓽcompareFn<any>(getꓽschema_versionⵧloose))
				bkp__older = [] // reset since we hold the backups in the var above now

				if (recovered_backups_unmigrated_ordered_oldest_first.length === 0) {
					// we didn't recover anything
					// most likely a brand-new session
					return
				}

				xxx
				logger.trace(`[${LIB}] found ${recovered_backups_unmigrated_ordered_oldest_first.length} past backups:`, {
					recovered_states_unmigrated_ordered_most_recent_first: structuredClone(recovered_backups_unmigrated_ordered_oldest_first),
					...(bkp__current && { main: bkp__current }),
					...(bkp__recent && { minor: bkp__recent }),
					...(bkp__older[0] && { major_1: bkp__older[0]}),
					...(bkp__older[1] && { major_2: bkp__older[1]}),
				})

				const bkpⵧmost_recentⵧunmigrated = recovered_backups_unmigrated_ordered_oldest_first.slice(-1)[0]

				if (!bkpⵧmost_recentⵧunmigrated) {
					logger.trace(`[${LIB}] found NO candidate state to be restored.`)
				}
				else {
					logger.trace(`[${LIB}] found candidate state to be restored`, getꓽbaseⵧloose(bkpⵧmost_recentⵧunmigrated))
					logger.trace(`[${LIB}] automigrating and restoring this candidate state…`)

					// rare case of a user using old code on a more recent data
					assert(getꓽschema_versionⵧloose(bkpⵧmost_recentⵧunmigrated) <= SCHEMA_VERSION, `[${LIB}] found a backup with a higher schema version than the current code!`)

					// memorize it for later
					restored_migrated = migrate_toꓽlatest(SEC,
						// deep clone in case the migration is not immutable (seen!)
						structuredClone(bkpⵧmost_recentⵧunmigrated)
					)

					// immediate sync restoration
					set(restored_migrated)

					if (dispatcher) {
						// NO DISPATCH ON RESTORATION!
						// - We can't do it SYNC because all the stores may not be plugged in yet
						// - We can't do it ASYNC because dependents would need to wait with sth like a promise
						// Eventually, we let the caller (plugging stores to dispatcher) do it.
						//logger.trace(`[${LIB}] forwarding the restored state to the dispatcher…`)
						//dispatcher.dispatch(create_action__set(restored_migrated!))
					}
				}
			}
			catch (err) {
				_onꓽerror(err)
			}
		})


		/////////////////////////////////////////////////



		function onꓽdispatch(action: Immutable<Action>, eventual_state_hint?: Immutable<State>): void {
			logger.trace(`[${LIB}] ⚡ action dispatched: ${action.type}`, {
				...(eventual_state_hint && { eventual_state_hint: getꓽbaseⵧloose(eventual_state_hint as any)}),
			})

			assert(state || eventual_state_hint, `[${LIB}].on_dispatch(): should have a previous state or be provided a hint!`)

			if (!eventual_state_hint) {
				logger.warn(`[${LIB}].on_dispatch(): (upper level architectural invariant) hint is usually expected for this store!`)
			}

			const stateⵧprevious = state
			state = eventual_state_hint || reduceꓽaction(state!, action)

			// TODO review just check difference?
			const has_valuable_difference = state !== stateⵧprevious
			//const has_valuable_difference = !previous_state || fluid_select(state).has_valuable_difference_with(previous_state)


			logger.trace(`[${LIB}] ⚡ action dispatched & reduced:`, {
				current_rev: getꓽrevisionⵧloose(stateⵧprevious as any),
				new_rev: getꓽrevisionⵧloose(state as any),
				has_valuable_difference,
			})
			if (!has_valuable_difference) {
				return
			}

			emitter.emit(EMITTER_EVT)

			_enqueue_in_bkp_pipeline(state)
				.catch(_onꓽerror)
		}


		return {
			get,
			onꓽdispatch,
			subscribe,
			init,
		}
	})
}

/////////////////////////////////////////////////

export {
	createꓽstoreⵧlocal_storage,
}
export default createꓽstoreⵧlocal_storage
