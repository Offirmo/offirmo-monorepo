import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { expect } from 'chai'
import sinon from 'sinon'

import { enforce_immutability } from '@offirmo-private/state-utils'
import { itㆍshouldㆍmigrateㆍcorrectly } from '@offirmo-private/state-migration-tester'

import { LIB, SCHEMA_VERSION } from './consts.js'
import { migrate_to_latest, MIGRATION_HINTS_FOR_TESTS } from './migrations.js'
import { DEMO_STATE } from './examples.js'
import { get_lib_SEC } from '../../services/sec.js'
import { create } from './index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe(`${LIB} - migration`, function() {
	/*const TEST_DATE_MS = 1234567890
	beforeEach(function () {
		this.clock = sinon.useFakeTimers(TEST_DATE_MS)
	})
	afterEach(function () {
		this.clock.restore()
	})*/

	describe('migration of a new state', function() {

		itㆍshouldㆍmigrateㆍcorrectly({
			use_hints: false,
			//can_update_snapshots: true, // uncomment temporarily to update the snapshots
			SCHEMA_VERSION,
			LATEST_EXPECTED_DATA: () => enforce_immutability<any>(create('test')),
			migrate_to_latest: migrate_to_latest.bind(null, get_lib_SEC()),
			absolute_dir_path: path.join(__dirname, '../../../../src/state/notes/migrations_of_blank_state_specs'),
			describe, context, it, expect,
		})
	})

	describe('migration of an existing state', function() {

		itㆍshouldㆍmigrateㆍcorrectly({
			use_hints: true,
			//can_update_snapshots: true, // uncomment temporarily to update the snapshots
			migration_hints_for_chaining: MIGRATION_HINTS_FOR_TESTS,
			SCHEMA_VERSION,
			LATEST_EXPECTED_DATA: DEMO_STATE,
			migrate_to_latest: migrate_to_latest.bind(null, get_lib_SEC()),
			absolute_dir_path: path.join(__dirname, '../../../../src/state/notes/migrations_of_active_state_specs'),
			describe, context, it, expect,
		})
	})
})