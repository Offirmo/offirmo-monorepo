import { expect } from 'chai'

import {
	hasꓽshape
} from './index.ts'


describe('@offirmo-private/type-detection -- shape', function() {

	describe('hasꓽshape()', function() {
		const REFERENCE = {
			foo: 'bar',
			baz: 42,
		}
		const MATCHING__EXACT = {
			// same props, same types
			foo: 'baz',
			baz: -1,
		}
		const MATCHING__WITH_EXTRA = {
			...MATCHING__EXACT,
			gloups: 'gnokman', // extra prop
		}
		const MATCHING__PARTIAL = {
			foo: 'baz', // only one prop
		}
		const MATCHING__PARTIAL__WITH_EXTRA = {
			foo: 'baz', // only one prop
			gloups: 'gnokman', // extra prop
		}

		const NOT_MATCHING__TYPE = {
			foo: 'baz',
			baz: 'oh no!',
		}

		describe('default', function () {
			it('should work', () => {
				// should always match
				expect(hasꓽshape(REFERENCE, MATCHING__EXACT), 'MATCHING__EXACT').to.be.true

				// extra allowed by default
				expect(hasꓽshape(REFERENCE, MATCHING__WITH_EXTRA), 'MATCHING__WITH_EXTRA').to.be.true

				// partial not allowed by default
				expect(hasꓽshape(REFERENCE, MATCHING__PARTIAL), 'MATCHING__PARTIAL').to.be.false
				expect(hasꓽshape(REFERENCE, MATCHING__PARTIAL__WITH_EXTRA), 'MATCHING__PARTIAL__WITH_EXTRA').to.be.false

				// mismatching type
				expect(hasꓽshape(REFERENCE, NOT_MATCHING__TYPE), 'NOT_MATCHING__TYPE').to.be.false
			})
		})

		it('should work -- extraneous = true', () => {
			const allow_extra_props = true
			expect(hasꓽshape(REFERENCE, MATCHING__WITH_EXTRA, { allow_extra_props }), 'MATCHING__WITH_EXTRA').to.be.true
			expect(hasꓽshape(REFERENCE, MATCHING__PARTIAL__WITH_EXTRA, { allow_extra_props, match_reference_props: 'some' }), 'MATCHING__PARTIAL__WITH_EXTRA').to.be.true
		})

		it('should work -- extraneous = false', () => {
			const allow_extra_props = false
			expect(hasꓽshape(REFERENCE, MATCHING__WITH_EXTRA, { allow_extra_props })).to.be.false
			expect(hasꓽshape(REFERENCE, MATCHING__PARTIAL__WITH_EXTRA, { allow_extra_props, match_reference_props: 'some' })).to.be.false
		})

		it('should work -- match_reference_props = some', () => {
			const match_reference_props = 'some'

			expect(hasꓽshape(REFERENCE, MATCHING__EXACT, {match_reference_props}), 'MATCHING__EXACT').to.be.true

			expect(hasꓽshape(REFERENCE, MATCHING__WITH_EXTRA, {match_reference_props}), 'MATCHING__WITH_EXTRA').to.be.true

			expect(hasꓽshape(REFERENCE, MATCHING__PARTIAL, {match_reference_props}), 'MATCHING__PARTIAL').to.be.true
			expect(hasꓽshape(REFERENCE, MATCHING__PARTIAL__WITH_EXTRA, {match_reference_props}), 'MATCHING__PARTIAL__WITH_EXTRA').to.be.true

			expect(hasꓽshape(REFERENCE, NOT_MATCHING__TYPE, {match_reference_props}), 'NOT_MATCHING__TYPE').to.be.false
		})


		it('should work -- match_reference_props = all', () => {
			const match_reference_props = 'all'

			expect(hasꓽshape(REFERENCE, MATCHING__EXACT, {match_reference_props}), 'MATCHING__EXACT').to.be.true

			expect(hasꓽshape(REFERENCE, MATCHING__WITH_EXTRA, {match_reference_props}), 'MATCHING__WITH_EXTRA').to.be.true

			expect(hasꓽshape(REFERENCE, MATCHING__PARTIAL, {match_reference_props}), 'MATCHING__PARTIAL').to.be.false
			expect(hasꓽshape(REFERENCE, MATCHING__PARTIAL__WITH_EXTRA, {match_reference_props}), 'MATCHING__PARTIAL__WITH_EXTRA').to.be.false

			expect(hasꓽshape(REFERENCE, NOT_MATCHING__TYPE, {match_reference_props}), 'NOT_MATCHING__TYPE').to.be.false
		})
	})
})
