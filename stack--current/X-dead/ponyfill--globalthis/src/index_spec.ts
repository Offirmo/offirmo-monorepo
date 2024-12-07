import { expect } from 'chai'

import getGlobalThis from './index.js'

declare global {
	var _bar: number // var is important, not let
}

describe('@offirmo/globalthis-ponyfill', function() {
	function _clean_global_scope() {
		// @ts-expect-error TS7017
		delete globalThis._foo
		// @ts-expect-error TS2790
		delete globalThis._bar
	}
	before(_clean_global_scope)
	afterEach(_clean_global_scope)

	it('should actually return globalThis', () => {
		const gthis = getGlobalThis()

		expect(gthis).to.equal(globalThis)
		expect(gthis).to.have.property('setImmediate', setImmediate)
	})

	it('should always return globalThis', () => {
		const gthis = getGlobalThis()

		expect(gthis).to.equal(globalThis)
		expect(getGlobalThis()).to.equal(globalThis)
		expect(getGlobalThis()).to.equal(gthis)
	})

	it('should be typed', () => {
		const gthis = getGlobalThis()

		// @ts-expect-error TS7017
		gthis._foo = 33 // unknown in interface global
		// @ts-expect-error TS7017
		expect(gthis._foo).to.equal(33)

		_clean_global_scope() // https://github.com/mochajs/mocha/issues/4954
	})

	it('should be extensible -- using type declaration', () => {
		const gthis = getGlobalThis()

		gthis._bar = 33 // cf. top of this file
		expect(gthis._bar).to.equal(33)
		expect(_bar).to.equal(33) // it's a global var

		_clean_global_scope() // https://github.com/mochajs/mocha/issues/4954
	})

	it('should be extensible -- using "typecast any"', () => {
		const gthis = getGlobalThis<any>()

		gthis._foo = 33
		expect(gthis._foo).to.equal(33)

		_clean_global_scope() // https://github.com/mochajs/mocha/issues/4954
	})
})
