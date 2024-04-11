import { expect } from 'chai'

import { LIB } from '../consts.js'
import { getꓽSEC } from '../services/sec.js'


import create from './index.js'
import createꓽstoreⵧin_memory from '../stores/in-memory/index.js'

import * as DemoStateLib from '../_test/state-demo/index.js'

/////////////////////////////////////////////////

describe(`${LIB}`, function() {

	describe('Flux', function () {
		function getꓽdemo() {
			const storeⵧin_mem = createꓽstoreⵧin_memory<DemoStateLib.State, DemoStateLib.Action>({
				SEC: getꓽSEC(),
				reduceꓽaction: DemoStateLib.reduceꓽaction,
				//debug_id: 'in-mem',
			})

			const storeⵧlocal_storage = createꓽstoreⵧin_memory<DemoStateLib.State, DemoStateLib.Action>({
				SEC: getꓽSEC(),
				reduceꓽaction: DemoStateLib.reduceꓽaction,
				debug_id: 'fake LS',
			})

			const flux_instance = create<DemoStateLib.State, DemoStateLib.Action>({
				SCHEMA_VERSION: DemoStateLib.SCHEMA_VERSION,
				//migrate_toꓽlatest: DemoStateLib.migrate_toꓽlatest,
				//reduceꓽaction: DemoStateLib.reduceꓽaction,
				storesⵧordered: [storeⵧin_mem, storeⵧlocal_storage],
				create: DemoStateLib.create,
			})

			return {
				storeⵧin_mem,
				storeⵧlocal_storage,
				flux_instance,
			}
		}

		describe('creation & wiring', function() {

			context('with a single store', function () {

				it('should work')
			})

			context('with multiple stores', function () {

				it('should successfully restore and propagate the state if any', () => {

					// usually the in-memory store, has no persistence
					const storeⵧmain = createꓽstoreⵧin_memory<DemoStateLib.State, DemoStateLib.Action>({
						SEC: getꓽSEC(),
						reduceꓽaction: DemoStateLib.reduceꓽaction,
						debug_id: 'main',
					})

					// usually a LS store, has sync persistence
					const storeⵧsecondaryⵧa = createꓽstoreⵧin_memory<DemoStateLib.State, DemoStateLib.Action>({
						SEC: getꓽSEC(),
						reduceꓽaction: DemoStateLib.reduceꓽaction,
						debug_id: '2A',
					})
					storeⵧsecondaryⵧa.init(DemoStateLib.DEMO_STATE)

					// usually a cloud store, not implemented
					const storeⵧsecondaryⵧb = createꓽstoreⵧin_memory<DemoStateLib.State, DemoStateLib.Action>({
						SEC: getꓽSEC(),
						reduceꓽaction: DemoStateLib.reduceꓽaction,
						debug_id: '2B',
					})

					const flux_instance = create<DemoStateLib.State, DemoStateLib.Action>({
						SCHEMA_VERSION: DemoStateLib.SCHEMA_VERSION,
						//migrate_toꓽlatest: DemoStateLib.migrate_toꓽlatest,
						//reduceꓽaction: DemoStateLib.reduceꓽaction,
						storesⵧordered: [storeⵧmain, storeⵧsecondaryⵧa, storeⵧsecondaryⵧb],
						create: DemoStateLib.create,
					})

					// the main store should have been restored from the secondary
					expect(storeⵧmain.get()).to.deep.equal(DemoStateLib.DEMO_STATE)

					// the tertiary store should have been passed the state as well
					expect(storeⵧsecondaryⵧb.get()).to.deep.equal(DemoStateLib.DEMO_STATE)

					// and of course the secondary store should have been left untouched
					expect(storeⵧsecondaryⵧa.get()).to.deep.equal(DemoStateLib.DEMO_STATE)
				})

				it('should detect incorrect older states')

				it('should merge conflicting candidates -- auto algorithm', () => {

					// usually the in-memory store, has no persistence
					const storeⵧmain = createꓽstoreⵧin_memory<DemoStateLib.State, DemoStateLib.Action>({
						SEC: getꓽSEC(),
						reduceꓽaction: DemoStateLib.reduceꓽaction,
						debug_id: 'main',
					})

					// usually a LS store, has sync persistence
					const storeⵧsecondaryⵧa = createꓽstoreⵧin_memory<DemoStateLib.State, DemoStateLib.Action>({
						SEC: getꓽSEC(),
						reduceꓽaction: DemoStateLib.reduceꓽaction,
						debug_id: '2A',
					})
					storeⵧsecondaryⵧa.init(DemoStateLib.DEMO_STATE)

					// usually a cloud store, not implemented
					const storeⵧsecondaryⵧb = createꓽstoreⵧin_memory<DemoStateLib.State, DemoStateLib.Action>({
						SEC: getꓽSEC(),
						reduceꓽaction: DemoStateLib.reduceꓽaction,
						debug_id: '2B',
					})
					storeⵧsecondaryⵧb.init({
						...DemoStateLib.DEMO_STATE,
						revision: 9999, // much higher
					})

					const flux_instance = create<DemoStateLib.State, DemoStateLib.Action>({
						SCHEMA_VERSION: DemoStateLib.SCHEMA_VERSION,
						//migrate_toꓽlatest: DemoStateLib.migrate_toꓽlatest,
						//reduceꓽaction: DemoStateLib.reduceꓽaction,
						storesⵧordered: [storeⵧmain, storeⵧsecondaryⵧa, storeⵧsecondaryⵧb],
						create: DemoStateLib.create,
					})

					// the main store should have been restored from the secondary
					expect(storeⵧmain.get()).to.deep.equal(DemoStateLib.DEMO_STATE)

					// the tertiary store should have been passed the state as well
					expect(storeⵧsecondaryⵧb.get()).to.deep.equal(DemoStateLib.DEMO_STATE)

					// and of course the secondary store should have been left untouched
					expect(storeⵧsecondaryⵧa.get()).to.deep.equal(DemoStateLib.DEMO_STATE)
				})
			})
		})

		describe('flux interface', function() {

			describe('get()', function () {

				it('should work', () => {
					const { flux_instance } = getꓽdemo()

					const s = flux_instance.get()
				})
			})

			describe('subscribe()', function () {

				it('should work', () => {
					const { flux_instance } = getꓽdemo()

					function onꓽchange() {
						console.log('onꓽchange', flux_instance.get())
					}
					flux_instance.subscribe(onꓽchange, 'test')
				})
			})


			describe('persistence', function () {

				describe('init = un-persistence', function () {

					it('should properly init from persistence')

					it('should properly respect main vs replica stores')

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
