import { expect } from 'chai'

import { LIB } from '../consts.js'

import * as RichText from './builder.js'
import { renderⵧto_text } from '../renderers/to_text.js'

/////////////////////////////////////////////////

describe(`${LIB}`, () => {

	describe(`utils -- builder`, () => {

		it('should work', () => {
			const builder = RichText.fragmentⵧinline()
				.addClass('achievement')

			builder
				.pushText('🏆')
				.pushText('  ')

			builder.pushStrong('finish the game')
			// builder.pushWeak(legend)

			builder.addHints({ uuid: '1234' })


			const $doc = builder.done()
			expect($doc).not.to.be.null // TODO more
		})

		it('should allow loose nodes', () => {
			const n1 = RichText.listⵧordered().pushKeyValue('foo', '42').done()
			expect(renderⵧto_text(n1)).to.equal('foo..42')

			const n2 = RichText.listⵧordered().pushKeyValue('foo', 42).done()
			expect(renderⵧto_text(n2)).to.equal('foo..42')

			const n3 = RichText.listⵧordered().pushKeyValue('foo', { $content: '42' }).done()
			expect(renderⵧto_text(n3)).to.equal('foo..42')
		})

		it('should perform some checks', () => {
			const builder = RichText.fragmentⵧinline()

			expect(
				() => builder.pushKeyValue('foo', 42)
			).to.throw('Key/value is intended to be used in a ol/ul only!')
		})
	})
})
