import { expect } from 'chai'

import { LIB } from '../../consts.js'
import { getꓽSEC } from '../../services/sec.js'

import { createꓽstoreⵧlocal_storage } from './index.js'

import { itᐧshouldᐧbeᐧaᐧstandardᐧstore } from '../_spec.js'
import { createꓽstorageⵧin_mem } from '../../_test/in-mem-storage.js'

/////////////////////////////////////////////////

describe.only(`${LIB}`, function() {

	describe('Store -- local storage', function () {
		function reduceꓽaction(state: any, action: any): any {
			return {
				...state,
				revision: state.revision + 1,
			}
		}
		function create() {
			return createꓽstoreⵧlocal_storage({
				SEC: getꓽSEC(),
				storage: createꓽstorageⵧin_mem(),
				reduceꓽaction,
				migrate_toꓽlatest: (state: any) => state,
			})
		}

		describe('creation', function() {

			it('should work', () => {
				const store = create()
			})
		})

		describe('standard store interface', function() {

			itᐧshouldᐧbeᐧaᐧstandardᐧstore(create)
		})

		describe('specific feature', function() {

			describe('persistence', function() {

				describe('to', function() {

					it('should persist meaningful changes')

					it('should not persist useless changes')

					it('should have a safety against bugs -- reducer')

					it('should have a safety against bugs -- schema migration')
				})

				describe('from', function() {

					it('should synchronously un-persist on creation')

					// XXX what should we do?
					// no current bkp BUT older backups??
					// what if the user accidentally uses an old code?
					// what if a backup has higher investment?

				})
			})
		})
	})
})
