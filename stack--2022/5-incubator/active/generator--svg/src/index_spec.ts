
// TODO https://jwatt.org/svg/authoring/


import { expect } from 'chai'

import { LIB } from './consts.js'

import {
	createꓽfrom_emoji,
	getꓽsvg‿str,
} from './index.js'

/////////////////////////////////////////////////

describe(`${LIB}`, function() {

	describe('emoji SVG', function () {

		it('should work', () => {
			const svg = createꓽfrom_emoji('🦄')
			const str = getꓽsvg‿str(svg, { wantsꓽcompact: true })
			expect(str).to.equal(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦄</text></svg>`)
		})
	})
})
