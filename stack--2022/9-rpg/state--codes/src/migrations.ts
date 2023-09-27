//////////////////////////////////////////////////////////////////////

import {
	Immutable,
	enforceꓽimmutable,
	LastMigrationStep,
	MigrationStep,
	generic_migrate_to_latest,
} from '@offirmo-private/state-utils'

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
			_migrate_to_Xx,
		]
	})
}

/////////////////////

const _migrate_to_Xx: LastMigrationStep<StateForMigration, any> = (SEC, legacy_state, hints, next, legacy_schema_version) => {
	throw new Error('Schema is too old, can’t migrate!')
}

/////////////////////

export {
	migrate_to_latest,
	MIGRATION_HINTS_FOR_TESTS,
}

//////////////////////////////////////////////////////////////////////
