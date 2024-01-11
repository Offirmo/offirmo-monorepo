import { expect } from 'chai'

import { LIB } from '../consts.js'
import { getꓽSEC } from '../services/sec.js'


import create from './index.js'
import createꓽstoreⵧin_memory from '../stores/in-memory/index.js'

import * as DemoStateLib from '../_test/state-meta/index.js'

/////////////////////////////////////////////////

describe(`${LIB}`, function() {

	describe('Flux', function () {

		describe('creation', function() {

			it('should work', () => {
				const flux = create<DemoStateLib.State, DemoStateLib.Action>({
					SCHEMA_VERSION: DemoStateLib.SCHEMA_VERSION,
					migrateⵧto_latest: DemoStateLib.migrateⵧto_latest,
					reduceꓽaction: DemoStateLib.reduceꓽaction,
				})
			})
		})

		describe('flux interface', function() {

			describe('store(s)', function () {

				it('should allow to add stores')

				describe('persistence', function () {

					describe('init = un-persistence', function () {

						it('should properly init from persistence')

						it('should properly respect main vs replica stores')

					})
				})

			})

			describe('dispatcher', function () {

			})

			describe('react useReducer()', function () {

				it('should be compatible')
			})

		})
	})
})
