import { expect } from 'chai'
import { elapsed_time_ms } from '@monorepo-private/utils--async'

import { LIB } from '../../consts.js'
import { getꓽSXC } from '../../services/sec.js'

import {
	createꓽstoreⵧlocal_storage,
	getꓽstorage_keys,
} from './index.js'

import { itᐧshouldᐧbeᐧaᐧstandardᐧstore } from '../_spec.js'
import { createꓽstorageⵧin_mem } from '../../_test/in-mem-storage.js'
import * as DemoStateLib from '../../_test/state-demo/index.js'

/////////////////////////////////////////////////

describe(`${LIB}`, function() {

	describe('Store -- local storage', function () {
		const KEY_RADIX = 'fooapp'
		let storage = createꓽstorageⵧin_mem()
		beforeEach(() => {
			storage = createꓽstorageⵧin_mem()
		})

		function create() {
			return createꓽstoreⵧlocal_storage({
				SXC: getꓽSXC(),
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
					SXC: getꓽSXC(),
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

						it('should persist meaningful changes -- init', async () => {
							// pre expectations
							expect(storage.getItem(getꓽstorage_keys(KEY_RADIX).bkpⵧmain)).to.be.null

							const store = create()
							store.init(DemoStateLib.DEMO_STATE)

							expect(store.get()).to.equal(DemoStateLib.DEMO_STATE)

							await elapsed_time_ms(40)
							expect(JSON.parse(storage.getItem(getꓽstorage_keys(KEY_RADIX).bkpⵧmain)!)).to.deep.equal(store.get())
						})

						it('should persist meaningful changes -- reduce', async () => {
							// pre expectations
							expect(storage.getItem(getꓽstorage_keys(KEY_RADIX).bkpⵧmain)).to.be.null

							const store = create()
							store.init(DemoStateLib.DEMO_STATE)
							expect(store.get()).to.equal(DemoStateLib.DEMO_STATE)

							store.onꓽdispatch(DemoStateLib.DEMO_ACTION)
							expect(store.get()).not.to.equal(DemoStateLib.DEMO_STATE)

							await elapsed_time_ms(40)
							expect(JSON.parse(storage.getItem(getꓽstorage_keys(KEY_RADIX).bkpⵧmain)!)).to.deep.equal(store.get())
						})

						it('should not persist useless changes')

					})

					describe('from', function() {

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
							expect(() => create()).to.throw('version')
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
