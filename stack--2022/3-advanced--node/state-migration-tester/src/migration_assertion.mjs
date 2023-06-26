import { fileURLToPath } from 'node:url'
import path from 'node:path'

import * as fs from '@offirmo/cli-toolbox/fs/extra/index.mjs'
import sinon from 'sinon'
import { cloneDeep } from 'lodash-es'
import { prettifyꓽjson } from '@offirmo-private/prettify-any'
import { TEST_TIMESTAMP_MS, getꓽUTC_timestampⵧhuman_readable‿minutes } from '@offirmo-private/timestamps'
import { getꓽschema_version, getꓽschema_versionⵧloose } from '@offirmo-private/state-utils'

import { LIB, HINTS_FILENAME } from './consts.mjs'
import { get_advanced_diff as base_get_json_diff } from './json-diff.mjs'


export function itㆍshouldㆍmigrateㆍcorrectly({
	use_hints = true,
	migration_hints_for_chaining = undefined, // if not explicitly provided or disabled, will try to read from a file
	SCHEMA_VERSION,
	LATEST_EXPECTED_DATA,
	migrate_to_latest,
	relative_dir_path,
	import_meta_url,
	advanced_diff_json = undefined,
	clean_json_diff = undefined,
	describe, context, it, expect,

	can_update_snapshots = false,
	should_skip = false, // allow skipping the test, like it.skip
}) {
	if (typeof LATEST_EXPECTED_DATA === 'function') {
		// wrap the call with the fake timers
		const clock = sinon.useFakeTimers(TEST_TIMESTAMP_MS)
		expect(+Date.now()).to.equal(TEST_TIMESTAMP_MS) // sanity check
		LATEST_EXPECTED_DATA = LATEST_EXPECTED_DATA()
		clock.restore()
	}

	// https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#what-do-i-use-instead-of-__dirname-and-__filename
	const caller_dirname = path.dirname(fileURLToPath(import_meta_url))
	const absolute_dir_path = path.join(caller_dirname, relative_dir_path)


	const LOG_PREFIX = `[${LIB} - ${path.basename(absolute_dir_path)}]`
	console.log(`${LOG_PREFIX} building unit tests...`)
	if (!can_update_snapshots)
		console.log(`${LOG_PREFIX} note: read-only, will only report errors`)
	else
		console.log(`${LOG_PREFIX} note: write enabled, will attempt to create/update data`)
	if (should_skip)
		console.log(`${LOG_PREFIX} note: skip mode, will do the minimum`)

	// propagate the skip
	describe = should_skip ? describe.skip.bind(describe) : describe

	function get_json_diff(a, b) {
		let diff = base_get_json_diff(a, b)
		if (!diff) return

		if (advanced_diff_json) {
			diff = advanced_diff_json(a, b, {
				diff_json: base_get_json_diff,
				prettifyꓽjson,
				diff,
			})
			if (!Object.keys(diff).length)
				diff = undefined
		}

		return diff
	}

	// early tests, always valid
	describe(`[${LIB} - automatically generated migration tests]`, function() {
		beforeEach(function () {
			this.clock = sinon.useFakeTimers(TEST_TIMESTAMP_MS)
		})
		afterEach(function () {
			this.clock.restore()
		})

		context('when the version is more recent', function () {

			it('should throw with a meaningful error', () => {
				function load() {
					migrate_to_latest({schema_version: 99999})
				}

				expect(load).to.throw('ore recent version')
			})
		})

		context('when the version is up to date', function () {

			it('should return the state without change', () => {
				try {
					expect(getꓽschema_version(LATEST_EXPECTED_DATA), 'schema version').to.equal(SCHEMA_VERSION) // make sure our tests are up-to-date
					const migrated_data = migrate_to_latest(LATEST_EXPECTED_DATA)
					expect(migrated_data, 'deep no change').to.deep.equal(LATEST_EXPECTED_DATA)
					expect(migrated_data, 'immutability').to.equal(LATEST_EXPECTED_DATA)
				}
				catch (err) {
					err.message = err.message + ` [${LIB} hint: check param LATEST_EXPECTED_DATA]`
					throw err
				}
			})
		})

		/////// validate params before continuing further
		if (!(function validate_params() {
			if (should_skip)
				return true // allow outdated tests to pass

			//console.log(`${LOG_PREFIX} validating params...`)

			if (!SCHEMA_VERSION) return false // unit tests above will catch this

			if (getꓽschema_version(LATEST_EXPECTED_DATA) !== SCHEMA_VERSION)
				return false // unit tests above will catch this

			const LATEST_EXPECTED_DATA_migrated_diff = get_json_diff(
				migrate_to_latest(cloneDeep(LATEST_EXPECTED_DATA)),
				LATEST_EXPECTED_DATA,
			)
			if (LATEST_EXPECTED_DATA_migrated_diff) {
				// this error will be caught by the test, but we display the diff to help:
				console.error(`${LOG_PREFIX} ❌ LATEST_EXPECTED_DATA is not up to date! Difference when migrated:\n`, prettifyꓽjson(LATEST_EXPECTED_DATA_migrated_diff))
				return false
			}

			//console.log(`${LOG_PREFIX} params OK ✔`)
			return true
		})()) {
			console.warn(`${LOG_PREFIX} ⚠️  bad params, cf. unit tests failures`)
		}

		/////// grab the files = past snapshots and hints
		if (can_update_snapshots) fs.mkdirpSync(absolute_dir_path)

		try {
			fs.lsFilesSync(absolute_dir_path, { full_path: false })
		}
		catch (err) {
			if (should_skip) return
			throw err
		}

		const ALL_FILES = fs.lsFilesSync(absolute_dir_path, { full_path: false })
			.filter(snap_path => !snap_path.startsWith('.')) // skip .DS_STORE and like
			.filter(snap_path => snap_path.endsWith('.json')) // allows README :)
			.sort()
			.map(snap_path => path.join(absolute_dir_path, snap_path))

		// note: may not exist
		const HINTS_FILE = path.join(absolute_dir_path, HINTS_FILENAME)

		const ALL_SNAPSHOTS = ALL_FILES
			.filter(snap_path => snap_path !== HINTS_FILE)

		console.log(`${LOG_PREFIX} Found snapshots: ` + prettifyꓽjson(ALL_SNAPSHOTS.map(p => path.basename(p))))

		/////// create hints file if requested and not present
		migration_hints_for_chaining = (function generate_and_update_hints(hints_from_params) {
			if (!use_hints)
				return undefined

			if (hints_from_params) {
				//console.log(`${LOG_PREFIX} using hints, provided from params ✔`)
				return hints_from_params
			}

			const hints = ALL_FILES.find(snap_path => snap_path === HINTS_FILE)
				? fs.json.readSync(HINTS_FILE)
				: {}

			// create/update the structure (in memory)
			for( let i = 1; i <= SCHEMA_VERSION; ++i) {
				const key = `to_v${i}`
				hints[key] = hints[key] || {}
			}
			// persist the creation/update
			if (can_update_snapshots)
				fs.json.writeSync(HINTS_FILE, hints)

			//console.log(`${LOG_PREFIX} using hints, provided from a file ✔`)
			return hints
		})(migration_hints_for_chaining)

		/////// create / update latest file if allowed / not present
		;(function create_or_update_latest_snapshot_if_allowed() {
			if (should_skip) return

			const latest_snapshot_path = ALL_SNAPSHOTS.slice(-1)[0]

			const latest_snapshot_data = latest_snapshot_path
				? fs.json.readSync(latest_snapshot_path)
				: undefined

			//if (latest_snapshot_data) console.log(`${LOG_PREFIX} found latest snapshot data ✔`)
			//console.log(`${LOG_PREFIX} latest_snapshot_data:`, prettifyꓽjson(latest_snapshot_data))

			const latest_migrated_diff = get_json_diff(
				LATEST_EXPECTED_DATA,
				latest_snapshot_data,
			)

			const latest_snapshot_data_matches_latest_expected_data = typeof latest_migrated_diff === 'undefined'
			if (latest_snapshot_data_matches_latest_expected_data)
				return

			if (latest_snapshot_path) {
				console.log(`${LOG_PREFIX} ❌ Current latest snapshot is not up to date. Difference with previous:\n`, prettifyꓽjson(latest_migrated_diff))
			} else {
				console.log(`${LOG_PREFIX} ❌ Current latest, up-to-date data is missing.`)
			}

			if (!can_update_snapshots) {
				// hard to display the diff TODO https://www.npmjs.com/package/diff
				console.log(`Please check the CODE *AND* the JSON`)
				throw new Error(`${LOG_PREFIX} ❌ Current latest, up-to-date data is not up to date!`)
			}

			// create a new snapshot with the new expected data
			const name = getꓽUTC_timestampⵧhuman_readable‿minutes() + '_v' + SCHEMA_VERSION + '.json'
			console.log(`${LOG_PREFIX} Creating a new data snapshot: ${name}.`)
			fs.json.writeSync(path.join(absolute_dir_path, name), LATEST_EXPECTED_DATA)
		})()

		ALL_SNAPSHOTS.forEach(snapshot_path => {
			const LEGACY_DATA = fs.json.readSync(snapshot_path)

			context(`when the version is ${getꓽschema_versionⵧloose(LEGACY_DATA) === SCHEMA_VERSION ? 'UP TO DATE' : 'OUTDATED' }: v${getꓽschema_versionⵧloose(LEGACY_DATA)} from ${path.basename(snapshot_path)}`, function () {

				it('should migrate it to the latest version', () => {
					try {
						const migrated_data = migrate_to_latest(LEGACY_DATA, migration_hints_for_chaining)

						// JSON diff / patch is slightly more powerful,
						// here configured to ignore uuids if valids
						// so we pre-compare
						let json_diff = get_json_diff(LATEST_EXPECTED_DATA, migrated_data)
						if (json_diff && clean_json_diff) {
							// allow the caller to clean one's own diff
							json_diff = clean_json_diff({
								json_diff,
								LATEST_EXPECTED_DATA,
								migrated_data,
							})
						}
						if (json_diff) {
							console.warn('Test failure: additional diff (json) for info:', prettifyꓽjson(json_diff))
							expect(migrated_data).to.deep.equal(LATEST_EXPECTED_DATA)
						}
					} catch (err) {
						err.message = err.message + ` [${LIB} hint: check file ${path.basename(snapshot_path)}]`
						throw err
					}
				})
			})
		})
	})
}

// emulate describe.skip
itㆍshouldㆍmigrateㆍcorrectly.skip = function(options) {
	return itㆍshouldㆍmigrateㆍcorrectly({
		...options,
		should_skip: true,
	})
}
