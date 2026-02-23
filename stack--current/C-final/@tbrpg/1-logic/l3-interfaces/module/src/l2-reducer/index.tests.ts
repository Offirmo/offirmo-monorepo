import { expect } from 'chai'

import {
	type ReducerAction, type Reducer,
	createꓽaction__base, createꓽaction,
	ACTION_TYPEꘌUPDATE_TO_NOW, type ActionUpdateToNow, createꓽactionꘌupdate_to_now,
	ACTION_TYPEꘌNOOP,          type ActionNoop,        createꓽactionꘌnoop,
	ACTION_TYPEꘌSET,           type ActionSet_,        createꓽactionꘌset,
	ACTION_TYPEꘌHACK,          type ActionHack_,       createꓽactionꘌhack,
} from '@monorepo-private/ts--types--web'

import {
	createꓽall_store_fns,
} from './index.ts'

/////////////////////////////////////////////////


describe(`TBRPG -- interfaces`, function() {

	describe('for useReducer', function () {

		it('should init -- no args', () => {
			const { init } = createꓽall_store_fns()

			const state1 = init()
			expect(state1).to.be.an('object')
		})

		it('should reduce', () => {
			const { reducer, init } = createꓽall_store_fns()

			const state1 = init()
			const state2 = reducer(state1, createꓽactionꘌnoop())
			expect(state2).to.equal(state1)
		})
	})
})
