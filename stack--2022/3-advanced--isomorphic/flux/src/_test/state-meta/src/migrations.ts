//////////////////////////////////////////////////////////////////////

import {
	Immutable,
	enforceꓽimmutable,
	LastMigrationStep,
	MigrationStep,
	migrateⵧto_latestⵧgeneric,
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

function migrateⵧto_latest(SEC: SoftExecutionContext, legacy_state: Immutable<any>, hints: Immutable<any> = {}): Immutable<StateForMigration> {
	return migrateⵧto_latestⵧgeneric<StateForMigration>({
		SEC: SEC as any,
		LIB,
		SCHEMA_VERSION,
		legacy_state,
		hints,
		sub_states_migrateⵧto_latest: {},
		pipeline: [
			_migrate_to_3x,
			_migrate_to_2,
		]
	})
}

/////////////////////

const _migrate_to_3x: LastMigrationStep<StateForMigration, any> = (SEC, legacy_state, hints, previous, legacy_schema_version) => {
	//console.log('hello from _migrate_to_3', legacy_state, hints, legacy_schema_version)
	if (legacy_schema_version < 2)
		legacy_state = previous(SEC, legacy_state, hints)

	let state: any = {
		...legacy_state,
		schema_version: 3,
		slot_id: 0,
	}
	delete state.persistence_id

	return state
}

const _migrate_to_2: MigrationStep = () => {
	throw new Error('Schema is too old, can’t migrate!')
}

/////////////////////

export {
	migrateⵧto_latest,
	MIGRATION_HINTS_FOR_TESTS,
}

//////////////////////////////////////////////////////////////////////
