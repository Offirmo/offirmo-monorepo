import { expect } from 'chai'

import { LIB } from '../../consts.js'
import { getꓽSEC } from '../../services/sec.js'

import create from './index.js'

/////////////////////////////////////////////////

describe(`${LIB}`, function() {

	describe('Store -- in-memory', function () {
		interface State {

		}

		interface Action {}
		function reducer(state: State, action: Action): State {
			return state
		}

		describe('creation', function() {

			it('should work', () => {
				const store = create(
					getꓽSEC(),
					(state, action) => state
				)
			})
		})

		describe('store interface', function() {

			describe('get()', function () {

				it('should throw if not initialised', () => {
					const store = create(
						getꓽSEC(),
						(state, action) => state
					)

					expect(() => store.get()).to.throw('should be initialized')
				})

				/*it('should work if initialised', () => {
					const store = create(
						getꓽSEC(),
						(state, action) => state
					)

					store.set({})
					expect(() => store.get()).to.throw('xxx')
				})*/
			})

			describe('set()', function () {


			})

			describe('onꓽdispatch()', function () {


			})

			describe('subscribe()', function () {


			})

			describe('subscribe()', function () {


			})
		})
	})
})
