import assert from 'tiny-invariant'
import {
	Immutable,
	LastMigrationStep,
	MigrationStep,
	SubStatesMigrationFns,
	CleanupStep,
	migrate_toꓽlatestⵧgeneric,
} from '@offirmo-private/state-utils'
import { getꓽUTC_timestamp‿ms } from '@offirmo-private/timestamps'

import * as CharacterState from '@tbrpg/state--character'
import * as WalletState from '@tbrpg/state-wallet'
import * as InventoryState from '@tbrpg/state--inventory'
import * as PRNGState from '@oh-my-rpg/state-prng'
import * as EnergyState from '@tbrpg/state-energy'
import * as EngagementState from '@oh-my-rpg/state-engagement'
import * as CodesState from '@oh-my-rpg/state-codes'
import * as ProgressState from '@tbrpg/state--progress'
import * as MetaState from '@oh-my-rpg/state-meta'

import { LIB, SCHEMA_VERSION } from '../consts.js'
import { State } from '../types.js'
import { TBRSoftExecutionContext } from '../services/sec.js'
import { _refresh_achievements } from '../reducers/achievements/index.js'
import { reset_and_salvage } from './salvage.js'
import { getꓽengine } from '@offirmo/random'


/////////////////////

// this state is a top one, not composable.
// hints are defined in the unit tests

/////////////////////

const SUB_STATES_MIGRATIONS: SubStatesMigrationFns = {
	avatar:     CharacterState.migrate_toꓽlatest,
	codes:      CodesState.migrate_toꓽlatest,
	energy:     EnergyState.migrate_toꓽlatest,
	engagement: EngagementState.migrate_toꓽlatest,
	inventory:  InventoryState.migrate_toꓽlatest,
	meta:       MetaState.migrate_toꓽlatest,
	prng:       PRNGState.migrate_toꓽlatest,
	progress:   ProgressState.migrate_toꓽlatest,
	wallet:     WalletState.migrate_toꓽlatest,
}

export function migrate_toꓽlatest(SEC: TBRSoftExecutionContext, legacy_state: Immutable<any>, hints: Immutable<any> = {}): Immutable<State> {
	let state = legacy_state as Immutable<State> // for starter

	try {
		state = migrate_toꓽlatestⵧgeneric({
			SEC: SEC as any,

			LIB,
			SCHEMA_VERSION,
			legacy_state,
			hints,
			sub_states_migrate_toꓽlatest: SUB_STATES_MIGRATIONS,
			cleanup,
			pipeline: [
				migrate_to_16x,
				migrate_to_15,
				migrate_to_14,
				migrate_to_13,
				migrate_to_12,
			]
		})

		// TODO migrate adventures
		// TODO migrate items
	}
	catch (err) {
		if (err instanceof Error && err.message.includes('more recent')) {
			// don't touch a more recent savegame!
			throw err
		}

		// attempt to salvage
		SEC.getInjectedDependencies().logger.error(`${LIB}: failed migrating schema, reseting and salvaging!`, {err})
		state = reset_and_salvage(legacy_state)
		SEC.fireAnalyticsEvent('schema_migration.salvaged', { step: 'main' })
	}

	return state
}

/////////////////////

export const cleanup: CleanupStep<State> = (SEC, state, hints) => {

	// HACK
	// new achievements may appear thanks to new content !== migration
	// this is covered semantically in ~start_session()
	// HOWEVER if we don't do it here,
	// it makes it difficult to test the migration of old savegames with less content.
	// HENCE we refresh the achievements here, for test simplicity, even when it's not 100% semantic
	state = _refresh_achievements(state)

	/////// begin minor migrations (not warranting a schema_version change)
	// to be bundled in the next major schema version
	let has_change = false
	let { u_state, t_state } = state

	// ...

	if (has_change) {
		state = {
			...state,
			u_state,
			t_state,
		}
	}
	/////// end minor migrations

	return state
}

const migrate_to_16x: LastMigrationStep<State, any> = (SEC, legacy_state, hints, previous, legacy_schema_version) => {
	if (legacy_schema_version < 15)
		legacy_state = previous(SEC, legacy_state, hints)

	// XXX reminder that this step runs BEFORE the sub-state migrations
	let state: State = legacy_state

	// the PRNG lib got re-written
	// We need to switch to ISAAC-32, since we no longer have a MT implementation!

	// first migrate normally then force the new algorithm
	state = {
		...state,
		u_state: {
			...state.u_state,
			prng: {
				...PRNGState.migrate_toꓽlatest(SEC, state.u_state.prng) as any,
			}
		},
	}

	let fresh_recommended_prng_engine = getꓽengine.prng.good_enough()
	state.u_state.prng.prng_state.algorithm_id = fresh_recommended_prng_engine.get_state().algorithm_id!

	// eventually, update schema version
	state = {
		...state,
		schema_version: 16,
		u_state: {
			...state.u_state,
			schema_version: 16,
		},
		t_state: {
			...state.t_state,
			schema_version: 16,
		},
	}

	return state
}

const migrate_to_15: MigrationStep = (SEC, legacy_state, hints, previous, legacy_schema_version) => {
	if (legacy_schema_version < 14)
		legacy_state = previous(SEC, legacy_state, hints)

	// minor migration: cleanup uuid field
	const { last_user_action_tms, creation_date: creation_date_hrtmin, uuid, ...rest__u_state } = legacy_state.u_state
	const last_user_investment_tms = last_user_action_tms ?? getꓽUTC_timestamp‿ms()

	//console.log('@@@@@', { last_user_action_tms, creation_date_hrtmin, uuid, schema_version: legacy_state.schema_version })
	let state = {
		...legacy_state,
		u_state: {
			...rest__u_state,
		},
	} satisfies State // for starter

	state = {
		...state,
		ⵙapp_id: 'tbrpg',
		last_user_investment_tms,

		u_state: {
			...state.u_state,
			progress: {
				...state.u_state.progress,
				statistics: {
					...state.u_state.progress.statistics,
					creation_date_hrtday: creation_date_hrtmin.slice(0, 8),
				}
			},
		},
	}

	// minor migration: min wallet always >0
	if (WalletState.get_currency_amount(state.u_state.wallet, WalletState.Currency.coin) <= 0) {
		state = {
			...state,
			u_state: {
				...state.u_state,
				wallet: WalletState.add_amount(state.u_state.wallet, WalletState.Currency.coin, 1),
			}
		}
	}

	// eventually, update schema version
	state = {
		...state,
		schema_version: 15,
		u_state: {
			...state.u_state,
			schema_version: 15,
		},
		t_state: {
			...state.t_state,
			schema_version: 15,
		},
	}

	return state
}

const migrate_to_14: MigrationStep = (SEC, legacy_state, hints, previous, legacy_schema_version) => {
	if (legacy_schema_version < 13)
		legacy_state = previous(SEC, legacy_state, hints)

	let state = legacy_state as any // for starter

	state = {
		...state,
		t_state: {
			...state.t_state,
			revision: 0 // new prop
		},
	}

	if (state.u_state.last_adventure) {
		state.u_state = {
			...state.u_state,
			last_adventure: {
				...state.u_state.last_adventure,
				encounter: state.u_state.last_adventure.encounter || null,
			}
		}
	}

	state = {
		...state,
		schema_version: 14,
		u_state: {
			...state.u_state,
			schema_version: 14,
		},
		t_state: {
			...state.t_state,
			schema_version: 14,
		},
	}

	return state
}

const migrate_to_13: MigrationStep = (SEC, legacy_state, hints, previous, legacy_schema_version) => {
	if (legacy_schema_version < 12)
		legacy_state = previous(SEC, legacy_state, hints)

	let state = legacy_state as any // for starter

	if (state.u_state.last_adventure) {
		state = {
			...state,
			u_state: {
				...state.u_state,
				last_adventure: {
					...state.u_state.last_adventure,
					gains: {
						...state.u_state.last_adventure.gains,
						improvementⵧarmor: legacy_state.u_state.last_adventure.gains.armor_improvement,
						improvementⵧweapon: legacy_state.u_state.last_adventure.gains.weapon_improvement,
					},
				}
			}
		}
		delete (state.u_state.last_adventure.gains as any)?.armor_improvement
		delete (state.u_state.last_adventure.gains as any)?.weapon_improvement
	}

	state = {
		...state,
		schema_version: 13,
		u_state: {
			...state.u_state,
			schema_version: 13,
		},
		t_state: {
			...state.t_state,
			schema_version: 13,
		},
	}

	return state
}

const migrate_to_12: MigrationStep = (SEC, legacy_state, hints, previous, legacy_schema_version) => {
	throw new Error('Outdated schema (pre-beta), won’t migrate, would take too much time and schema is still unstable!')
}
