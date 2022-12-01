import { expect } from 'chai'

import { LIB } from '../consts'

import * as RichText from '..'

describe(`${LIB}`, () => {

	describe(`utils -- builder`, () => {

		it('should work', () => {
			const builder = RichText.inline_fragment()
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
	})
})
