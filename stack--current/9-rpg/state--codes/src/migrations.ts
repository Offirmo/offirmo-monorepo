//////////////////////////////////////////////////////////////////////

import {
	Immutable,
	enforceꓽimmutable,
	LastMigrationStep,
	MigrationStep,
	migrate_toꓽlatestⵧgeneric,
} from '@offirmo-private/state-utils'

import { LIB, SCHEMA_VERSION } from './consts.js'
import { type State } from './types.js'
import { type SoftExecutionContext } from './sec.js'

//////////////////////////////////////////////////////////////////////

// some hints may be needed to migrate to demo state
// need to export them for composing tests
const MIGRATION_HINTS_FOR_TESTS = enforceꓽimmutable<any>({
})

/////////////////////

type StateForMigration = State

function migrate_toꓽlatest(SXC: SoftExecutionContext, legacy_state: Immutable<any>, hints: Immutable<any> = {}): Immutable<StateForMigration> {
	return migrate_toꓽlatestⵧgeneric<StateForMigration>({
		SXC: SXC as any,
		LIB,
		SCHEMA_VERSION,
		legacy_state,
		hints,
		sub_states_migrate_toꓽlatest: {},
		pipeline: [
			_migrate_to_Xx,
		]
	})
}

/////////////////////

const _migrate_to_Xx: LastMigrationStep<StateForMigration, any> = (SXC, legacy_state, hints, next, legacy_schema_version) => {
	throw new Error('Schema is too old, can’t migrate!')
}

/////////////////////

export {
	migrate_toꓽlatest,
	MIGRATION_HINTS_FOR_TESTS,
}

//////////////////////////////////////////////////////////////////////
