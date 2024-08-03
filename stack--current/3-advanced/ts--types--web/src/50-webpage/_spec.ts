import { expect } from 'chai'

import {
	getꓽtitle,
	getꓽlang,
	getꓽcharset, Css‿str,
} from '../index.js'

import {
	Contentⳇweb,
	getꓽhtml,
	getꓽcssⵧcritical,
	getꓽcss,
	getꓽcssⵧtop__layers,
	getꓽcssⵧtop__namespaces,
	getꓽcssⵧtop,
	getꓽjsⵧcritical,
	getꓽjs,
} from './index.js'

/////////////////////////////////////////////////

describe(`Web types -- webpage`, function() {

	describe('selectors', function () {

		it('should work -- empty = defaults', () => {
			const spec: Contentⳇweb = {
				/*title: 'TITLE'
				html: []
				css: []
				js: []
				cssⵧcritical: []
				jsⵧcritical: []*/
			}

			expect(getꓽlang(spec)).to.deep.equal('en')
			expect(getꓽcharset(spec)).to.deep.equal('utf-8')

			expect(getꓽhtml(spec)).to.deep.equal([])

			expect(getꓽcss(spec)).to.deep.equal([])
			expect(getꓽcssⵧcritical(spec)).to.deep.equal([])
			expect(getꓽcssⵧtop__layers(spec)).to.deep.equal([])
			expect(getꓽcssⵧtop__namespaces(spec)).to.deep.equal({})
			expect(getꓽcssⵧtop(spec)).to.deep.equal([])

			expect(getꓽjs(spec)).to.deep.equal([])
			expect(getꓽjsⵧcritical(spec)).to.deep.equal([])

			expect(getꓽtitle(spec), 'title').to.be.undefined
		})

		it('should work -- NOT empty = NOT default', () => {
			const spec: Contentⳇweb = {
				title: 'The Boring RPG',
				html: [ `<p>hello, World!</p>` ],
				css: [ `body { padding: 1em; }` ],
				cssⵧtop__namespaces: { 'svg': 'http://www.w3.org/2000/svg' },
				cssⵧtop__layers: ['reset', 'base'],
				js: [ `console.log('hello, World!');` ],
				cssⵧcritical: [ `body { color: red; }` ],
				jsⵧcritical: [],
			}

			expect(getꓽlang(spec)).to.deep.equal('en')
			expect(getꓽcharset(spec)).to.deep.equal('utf-8')

			expect(getꓽhtml(spec)).to.deep.equal(["<p>hello, World!</p>"])

			expect(getꓽcss(spec)).to.deep.equal(["body { padding: 1em; }"])
			expect(getꓽcssⵧcritical(spec)).to.deep.equal([ "body { color: red; }" ])
			expect(getꓽcssⵧtop__layers(spec)).to.deep.equal(['reset', 'base'])
			expect(getꓽcssⵧtop__namespaces(spec)).to.deep.equal({
				'svg': 'http://www.w3.org/2000/svg'
			})
			expect(getꓽcssⵧtop(spec)).to.deep.equal([
				"/* define namespaces for usage in following CSS, needs to be at the top https://github.com/parcel-bundler/parcel/issues/9534 */",
				"@namespace svg url(http://www.w3.org/2000/svg);",
				"/* define layers order, needs to be at the top to properly enforce the intended order */",
				"@layer reset, base;",
				])
			expect(getꓽcssⵧcritical(spec, { includesꓽtop: true })).to.deep.equal([
				"/* define namespaces for usage in following CSS, needs to be at the top https://github.com/parcel-bundler/parcel/issues/9534 */",
				"@namespace svg url(http://www.w3.org/2000/svg);",
				"/* define layers order, needs to be at the top to properly enforce the intended order */",
				"@layer reset, base;",
				"body { color: red; }"
			])


			expect(getꓽjs(spec)).to.deep.equal(["console.log('hello, World!');"])
			expect(getꓽjsⵧcritical(spec)).to.deep.equal([])

			expect(getꓽtitle(spec), 'title').to.equal('The Boring RPG')
		})
	})
})
