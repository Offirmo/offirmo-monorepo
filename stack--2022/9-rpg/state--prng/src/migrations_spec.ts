import { expect } from 'chai'
import { enforceꓽimmutable } from '@offirmo-private/state-utils'
import { itㆍshouldㆍmigrateㆍcorrectly } from '@offirmo-private/state-migration-tester'

import { LIB, SCHEMA_VERSION } from './consts.js'
import { migrate_toꓽlatest, MIGRATION_HINTS_FOR_TESTS } from './migrations.js'
import { DEMO_STATE } from './examples.js'
import { getꓽSEC } from './sec.js'
import { create } from './state.js'

/////////////////////////////////////////////////

describe(`${LIB} - migration`, function() {

	describe('migration of a new state', function() {

		itㆍshouldㆍmigrateㆍcorrectly({
			use_hints: false,
			//can_update_snapshots: true, // uncomment temporarily to update the snapshots
			SCHEMA_VERSION,
			LATEST_EXPECTED_DATA: enforceꓽimmutable<any>(create()),
			migrate_toꓽlatest: migrate_toꓽlatest.bind(null, getꓽSEC()),
			import_meta_url: import.meta.url, // for resolving the path below
			relative_dir_path: '../../src/migrations_of_blank_state_specs',
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
			migrate_toꓽlatest: migrate_toꓽlatest.bind(null, getꓽSEC()),
			import_meta_url: import.meta.url, // for resolving the path below
			relative_dir_path: '../../src/migrations_of_active_state_specs',
			describe, context, it, expect,
		})
	})
})
