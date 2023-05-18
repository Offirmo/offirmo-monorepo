//////////////////////////////////////////////////////////////////////

import {
	Immutable,
	enforce_immutability,
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
const MIGRATION_HINTS_FOR_TESTS = enforce_immutability<any>({
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
	migrate_to_latest,
	MIGRATION_HINTS_FOR_TESTS,
}

//////////////////////////////////////////////////////////////////////
