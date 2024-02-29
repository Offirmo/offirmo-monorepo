import { expect } from 'chai'

import { Immutable } from '@offirmo-private/ts-types'

import { hasꓽcontent } from './index.js'

/////////////////////////////////////////////////

describe('@offirmo-private/ts-utils', function () {

	describe('hasꓽcontent()', function () {

		it('should work -- strings', () => {
			expect(hasꓽcontent('')).to.be.false
			expect(hasꓽcontent(' ')).to.be.true
		})

		it('should work -- arrays', () => {
			expect(hasꓽcontent([])).to.be.false
			//expect(hasꓽcontent([,]), 'sparse').to.be.false
			expect(hasꓽcontent([0])).to.be.true
		})

		it('should work -- objects', () => {
			expect(hasꓽcontent({})).to.be.false
			expect(hasꓽcontent({ '': 0 })).to.be.true
		})

		it('should work -- numbers', () => {
			expect(hasꓽcontent(0)).to.be.false
			expect(hasꓽcontent(-0)).to.be.false
			expect(hasꓽcontent(0.)).to.be.false
			expect(hasꓽcontent(NaN)).to.be.false
			expect(hasꓽcontent(1)).to.be.true
		})
	})
})
