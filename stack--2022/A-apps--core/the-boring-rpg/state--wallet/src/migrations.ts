//////////////////////////////////////////////////////////////////////

import {
	Immutable,
	enforceꓽimmutable,
	LastMigrationStep,
	MigrationStep,
	migrate_toꓽlatestⵧgeneric,
} from '@offirmo-private/state-utils'

import { LIB, SCHEMA_VERSION } from './consts.js'
import { State } from './types.js'
import { TBRSoftExecutionContext } from './sec.js'

//////////////////////////////////////////////////////////////////////

// some hints may be needed to migrate to demo state
// need to export them for composing tests
const MIGRATION_HINTS_FOR_TESTS = enforceꓽimmutable<any>({
})

/////////////////////

type StateForMigration = State

function migrate_toꓽlatest(SEC: TBRSoftExecutionContext, legacy_state: Immutable<any>, hints: Immutable<any> = {}): Immutable<StateForMigration> {
	return migrate_toꓽlatestⵧgeneric<StateForMigration>({
		SEC: SEC as any,
		LIB,
		SCHEMA_VERSION,
		legacy_state,
		hints,
		sub_states_migrate_toꓽlatest: {},
		pipeline: [
			_migrate_to_X,
		]
	})
}

/////////////////////

const _migrate_to_X: LastMigrationStep<StateForMigration, any> = (SEC, legacy_state, hints, next, legacy_schema_version) => {
	throw new Error('Schema is too old (pre-beta), can’t migrate!')
}

/////////////////////

export {
	migrate_toꓽlatest,
	MIGRATION_HINTS_FOR_TESTS,
}

//////////////////////////////////////////////////////////////////////
