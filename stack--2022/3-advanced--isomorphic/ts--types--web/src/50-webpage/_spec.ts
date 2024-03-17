import { expect } from 'chai'

import {
	Contentⳇweb,
	getꓽhtml,
	getꓽcssⵧcritical,
	getꓽcss,
	getꓽjsⵧcritical,
	getꓽjs,
	getꓽtitle,
} from './index.js'

/////////////////////////////////////////////////

describe(`Web types -- webpage`, function() {

	describe('selectors', function () {

		it('should work -- empty', () => {
			const spec: Contentⳇweb = {
				/*title: 'TITLE'
				html: []
				css: []
				js: []
				cssⵧcritical: []
				jsⵧcritical: []*/
			}

			expect(getꓽhtml(spec)).to.deep.equal([])

			expect(getꓽcssⵧcritical(spec)).to.deep.equal([])
			expect(getꓽcss(spec)).to.deep.equal([])

			expect(getꓽjsⵧcritical(spec)).to.deep.equal([])
			expect(getꓽjs(spec)).to.deep.equal([])

			expect(getꓽtitle(spec)).to.deep.equal('Index')
		})
	})
})
