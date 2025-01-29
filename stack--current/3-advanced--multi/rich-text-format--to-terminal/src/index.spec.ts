import { expect } from 'chai'

import * as RichText from '@offirmo-private/rich-text-format'
import * as DEMOS from '@offirmo-private/rich-text-format/demos'

import { LIB, renderⵧto_terminal } from './index.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- renderers -- to terminal`, () => {
	let rendering_options = {}
	beforeEach(() => {
		rendering_options = {}
	})

	describe('with default styles', function () {

		describe('primitives', function () {

			it('should work', () => {
				RichText.Enum.values(RichText.NodeType).forEach(k => {
					console.log(`------- ${k}: -------`)

					const $node = RichText.create(k)
						.pushText(k)
						.done()

					const $wrapper = RichText.fragmentⵧblock()
						.pushText('[pre]')
						.pushNode($node)
						.pushText('[post]')
						.done()

					const str = renderⵧto_terminal($wrapper, rendering_options)
					console.log(str)
				})
			})

		})

		describe('combinations', function () {
			const $DEMOⵧSIMPLE = (() => {
				const builder = RichText.fragmentⵧinline()
					.addClass('achievement')

				builder
					.pushText('🏆')
					.pushText('  ')

				builder.pushStrong('finish the game')
				// builder.pushWeak(legend)

				builder.addHints({ uuid: '1234' })


				return builder.done()
			})()

			const $DEMOⵧKV = (() => {
				const builder = RichText.fragmentⵧblock()
					.addClass('character_sheet')

				builder.pushStrong('Your character:')

				builder.pushNode(
					RichText.listⵧordered()
						// various width to test the alignment
						.pushKeyValue('Max health', 123)
						.pushKeyValue('Intelligence', 45)
						.pushKeyValue('Strength', 6)
						.done(),
					{ id: 'stats'}
				)

				return builder.done()
			})()

			it('should work -- basic', () => {
				const str = renderⵧto_terminal($DEMOⵧSIMPLE, rendering_options)
				console.log(str)
			})

			it('should work -- KV', () => {
				const str = renderⵧto_terminal($DEMOⵧKV, rendering_options)
				console.log(str)
			})

			it('should work -- demos', () => {
				Object.values(DEMOS).forEach($doc => {
					const str = renderⵧto_terminal($doc, rendering_options)
					console.log(str)
				})
			})
		})
	})
})
