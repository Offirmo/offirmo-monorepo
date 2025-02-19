import { expect } from 'chai'

import { LIB } from '../consts.ts'

import * as RichText from './builder.ts'
import { renderⵧto_text } from '../l2-renderers/to_text.ts'

import * as DEMOS from '@offirmo-private/rich-text-format/demos'
import { isꓽNode } from '../l1-types'

/////////////////////////////////////////////////

describe(`${LIB} -- sugar -- builder`, () => {

	it('should work', () => {
		const $doc = RichText.fragmentⵧinline()
			.pushText('Hello!')
			.addHints({ uuid: '1234' })
			.done()

		expect(isꓽNode($doc)).to.be.true
		expect(renderⵧto_text($doc)).to.equal('Hello!')
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
