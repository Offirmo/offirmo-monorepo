import { expect } from 'chai'

import { LIB } from '../../consts.js'
import { getꓽSEC } from '../../services/sec.js'

import {
	createꓽstoreⵧlocal_storage,
	getꓽstorage_keys,
} from './index.js'

import { itᐧshouldᐧbeᐧaᐧstandardᐧstore } from '../_spec.js'
import { createꓽstorageⵧin_mem } from '../../_test/in-mem-storage.js'
import * as DemoStateLib from '../../_test/state-demo/index.js'

/////////////////////////////////////////////////

describe.only(`${LIB}`, function() {

	describe('Store -- local storage', function () {
		const KEY_RADIX = 'fooapp'
		let storage = createꓽstorageⵧin_mem()
		beforeEach(() => {
			storage = createꓽstorageⵧin_mem()
		})

		function create() {
			return createꓽstoreⵧlocal_storage({
				SEC: getꓽSEC(),
				SCHEMA_VERSION: DemoStateLib.SCHEMA_VERSION,
				storage,
				storage_keys_radix: KEY_RADIX,
				reduceꓽaction: DemoStateLib.reduceꓽaction,
				migrate_toꓽlatest: DemoStateLib.migrate_toꓽlatest,
			})
		}

		describe('creation', function() {

			it('should work', () => {
				const store = create()
			})

			it('should be un-initialized on a fresh session', () => {
				const store = create()
				expect(() => store.get()).to.throw('initialized')
			})
		})

		describe('standard store interface', function() {

			itᐧshouldᐧbeᐧaᐧstandardᐧstore((DemoStateLib) => createꓽstoreⵧlocal_storage({
					SEC: getꓽSEC(),
					storage: createꓽstorageⵧin_mem(),
					storage_keys_radix: 'foo',
					SCHEMA_VERSION: DemoStateLib.SCHEMA_VERSION,
					reduceꓽaction: DemoStateLib.reduceꓽaction,
					migrate_toꓽlatest: DemoStateLib.migrate_toꓽlatest,
				}))
		})

		describe('specific features', function() {

			describe('persistence', function() {

				describe('main layer', function () {

					describe('to', function() {

						it('should persist meaningful changes', () => {

						})

						it('should not persist useless changes')

						it('should have a safety against bugs -- reducer')
					})

					describe.only('from', function() {

						it('should synchronously un-persist on creation', () => {
							storage.setItem(getꓽstorage_keys(KEY_RADIX).bkpⵧmain, JSON.stringify(DemoStateLib.DEMO_STATE))
							const store = create()
							expect(store.get()).to.deep.equal(DemoStateLib.DEMO_STATE)
						})

						it('should migrate the backup on creation', () => {
							storage.setItem(getꓽstorage_keys(KEY_RADIX).bkpⵧmain, JSON.stringify(DemoStateLib.DEMO_STATE_V2))
							const store = create()
							expect(store.get()).to.deep.equal(DemoStateLib.DEMO_STATE)
						})

						it('should reject newer versions', () => {
							const newer_state = {
								...DemoStateLib.DEMO_STATE,
								schema_version: DemoStateLib.SCHEMA_VERSION + 1,
							}
							storage.setItem(getꓽstorage_keys(KEY_RADIX).bkpⵧmain, JSON.stringify(newer_state))
							const store = create()
						})

						// XXX what should we do?
						// no current bkp BUT older backups??
						// what if the user accidentally uses an old code?
						// what if a backup has higher investment?

					})
				})

				describe('old layer', function() {

				})


			})
		})
	})
})
