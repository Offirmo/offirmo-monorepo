import { expect } from 'chai'

import { LIB } from '../consts.js'
import { getꓽSXC } from '../services/sec.js'
import { Store } from '../types'

import * as DemoStateLib from '../_test/state-demo/index.js'

/////////////////////////////////////////////////

type DemoStore = Store<DemoStateLib.State, DemoStateLib.Action>

function itᐧshouldᐧbeᐧaᐧstandardᐧstore(create: (_: typeof DemoStateLib) => DemoStore): void {
	describe(`[generic Store tests]`, function() {
		let store: DemoStore = undefined as any
		beforeEach(() => {
			store = create(DemoStateLib)
		})

		describe(`get()`, function() {

			context('when not initialised', function () {

				it('should throw', () => {
					expect(() => store.get()).to.throw('should be initialized')
				})
			})

			context('when initialised', function () {

				it('should return what was last set -- init', () => {
					store.init(DemoStateLib.DEMO_STATE)
					expect(store.get()).to.equal(DemoStateLib.DEMO_STATE)
				})

				it('should return the same value over repeated calls', () => {
					store.init(DemoStateLib.DEMO_STATE)
					expect(store.get()).to.equal(DemoStateLib.DEMO_STATE)
					expect(store.get()).to.equal(DemoStateLib.DEMO_STATE)
					expect(store.get()).to.equal(DemoStateLib.DEMO_STATE)
				})

				it('should return what was last set -- dispatch -- reduced', () => {
					store.init(DemoStateLib.DEMO_STATE)
					store.onꓽdispatch(DemoStateLib.DEMO_ACTION)
					const new_state = store.get()
					expect(new_state).not.to.equal(DemoStateLib.DEMO_STATE)
					expect(store.get()).to.equal(new_state) // stability
				})

				it('should return what was last set -- dispatch -- hinted', () => {
					const storeMain = store
					const storeRepl = create(DemoStateLib)
					storeMain.init(DemoStateLib.DEMO_STATE)
					storeRepl.init(storeMain.get())

					storeMain.onꓽdispatch({} as any)
					storeRepl.onꓽdispatch({} as any, storeMain.get())

					expect(storeRepl.get()).to.equal(storeMain.get())
				})
			})
		})

		describe(`init()`, function() {

			context('when not initialised', function () {

				it('should work', () => {
					store.init(DemoStateLib.DEMO_STATE)
					expect(store.get()).to.equal(DemoStateLib.DEMO_STATE)
				})

				it('should have a safety against bugs', () => {
					expect(() => store.init({} as any)).to.throw('invalid state')
				})
			})

			context('when already initialised', function () {

				it('should throw', () => {
					store.init(DemoStateLib.DEMO_STATE)
					expect(() => store.init({} as any)).to.throw('already initialized')
				})

				it('should tolerate an echo -- same value', () => {
					store.init(DemoStateLib.DEMO_STATE)
					store.init(DemoStateLib.DEMO_STATE)
					expect(store.get()).to.equal(DemoStateLib.DEMO_STATE)
				})

				it('should tolerate an echo -- equivalent value -- revision')

				it('should tolerate an echo -- equivalent value -- tstate')
			})
		})

		describe(`subscribe()`, function() {


		})

		describe(`onꓽdispatch()`, function() {

			it('should accept a hint', () => {
				const hinted_state = {
					...DemoStateLib.DEMO_STATE,
				}
				store.init(DemoStateLib.DEMO_STATE)
				store.onꓽdispatch(DemoStateLib.DEMO_ACTION, hinted_state)
				expect(store.get()).to.equal(hinted_state)
			})

			it('should have a safety against bugs', () => {
				store.init(DemoStateLib.DEMO_STATE)
				expect(() => store.onꓽdispatch(DemoStateLib.DEMO_ACTION, {} as any)).to.throw('invalid action')
			})
		})

		if (create(DemoStateLib).setꓽdispatcher) {
			describe(`setꓽdispatcher()`, function() {

				it('should work', () => {
					throw new Error('NIMP!')
				})
			})
		}
	})
}

/////////////////////////////////////////////////

export {
	itᐧshouldᐧbeᐧaᐧstandardᐧstore,
}
