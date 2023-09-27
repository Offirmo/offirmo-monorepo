//////////////////////////////////////////////////////////////////////

import {
	Immutable,
	enforceꓽimmutable,
	LastMigrationStep,
	MigrationStep,
	generic_migrate_to_latest,
} from '@offirmo-private/state-utils'
import { generate_uuid } from '@offirmo-private/uuid'
import { PRNGState } from '@offirmo/random'

import { LIB, SCHEMA_VERSION } from './consts.js'
import { State } from './types.js'
import { SoftExecutionContext } from './sec.js'

//////////////////////////////////////////////////////////////////////

// some hints may be needed to migrate to demo state
// need to export them for composing tests
const MIGRATION_HINTS_FOR_TESTS = enforceꓽimmutable<any>({
})

/////////////////////

type StateForMigration = State

function migrate_to_latest(SEC: SoftExecutionContext, legacy_state: Immutable<any>, hints: Immutable<any> = {}): Immutable<StateForMigration> {
	return generic_migrate_to_latest<StateForMigration>({
		SEC: SEC as any,
		LIB,
		SCHEMA_VERSION,
		legacy_state,
		hints,
		sub_states_migrate_to_latest: {},
		pipeline: [
			_migrate_to_4x,
			_migrate_to_3,
			_migrate_to_2,
		]
	})
}

/////////////////////

const _migrate_to_4x: LastMigrationStep<StateForMigration, any> = (SEC, legacy_state, hints, previous, legacy_schema_version) => {
	if (legacy_schema_version < 3)
		legacy_state = previous(SEC, legacy_state, hints)

	const { seed, use_count, ...rest } = legacy_state

	let state: any = {
		...rest,
		schema_version: 4,
		prng_state: {
			seed: seed as PRNGState['seed'],
			call_count: use_count as PRNGState['call_count'],
			algorithm_id: use_count === 0 ? 'ISAAC32' : 'MT19937', // we now recommend ISAAC32 but v3 states were using MT19937
		}
	}

	return state
}

const _migrate_to_3: MigrationStep = (SEC, legacy_state, hints, previous, legacy_schema_version) => {
	if (legacy_schema_version < 2)
		legacy_state = previous(SEC, legacy_state, hints)

	let state: any = {
		...legacy_state,
		schema_version: 3,
		uuid: legacy_state.uuid || generate_uuid(),
	}

	return state
}

const _migrate_to_2: MigrationStep = () => {
	throw new Error('Schema is too old, can’t migrate!')
}

/////////////////////

export {
	migrate_to_latest,
	MIGRATION_HINTS_FOR_TESTS,
}

//////////////////////////////////////////////////////////////////////
