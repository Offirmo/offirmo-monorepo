import { expect } from 'chai'

import { LIB } from '../consts.js'

import * as RichText from '../index.js'
import { fragmentⵧblock, listⵧordered, renderⵧto_text } from '../index.js'

/////////////////////////////////////////////////

describe(`${LIB}`, () => {
	let rendering_options = RichText.DEFAULT_RENDERING_OPTIONSⵧToText
	beforeEach(() => {
		rendering_options = {
			...RichText.DEFAULT_RENDERING_OPTIONSⵧToText,
		}
	})

	describe(`rendered -- to text`, () => {
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

		describe(`mode = basic`, function () {
			beforeEach(() => {
				rendering_options = {
					...rendering_options,
					style: 'basic',
				}
			})

			it('should work -- basic', () => {
				const str = RichText.renderⵧto_text($DEMOⵧSIMPLE, rendering_options)
				//console.log(str)

				// the content should be included
				expect(str).to.contain('🏆  ')
				expect(str).to.contain('finish the game')
			})

			it('should work -- KV', () => {
				const str = RichText.renderⵧto_text($DEMOⵧKV, rendering_options)
				//console.log(str)

				// the content should be included
				expect(str).to.contain('Your character:')
				expect(str).to.contain('Max health')
				expect(str).to.contain('123')
				expect(str).to.contain('Intelligence')
				expect(str).to.contain('45')
				expect(str).to.contain('Strength')
				expect(str).to.contain('6')

				// the content should have been formatted
				// TO OL
			})
		})

		describe(`mode = advanced`, function () {
			beforeEach(() => {
				rendering_options = {
					...rendering_options,
					style: 'advanced',
				}
			})

			it('should work -- basic', () => {
				const str = RichText.renderⵧto_text($DEMOⵧSIMPLE, rendering_options)
				//console.log(str)

				// the content should be included
				expect(str).to.contain('🏆  ')
				expect(str).to.contain('finish the game')
			})

			it('should work -- KV', () => {
				const str = RichText.renderⵧto_text($DEMOⵧKV, rendering_options)
				//console.log(str)

				// the content should be included
				expect(str).to.contain('Your character:')
				expect(str).to.contain('Max health')
				expect(str).to.contain('123')
				expect(str).to.contain('Intelligence')
				expect(str).to.contain('45')
				expect(str).to.contain('Strength')
				expect(str).to.contain('6')

				// the content should have been formatted = aligned

				expect(str).to.contain('Max health....123')
				expect(str).to.contain('Intelligence...45')
				expect(str).to.contain('Strength........6')
			})
		})

		describe(`mode = markdown`, function () {
			beforeEach(() => {
				rendering_options = {
					...rendering_options,
					style: 'markdown',
				}
			})

			it('should work -- basic', () => {
				const str = RichText.renderⵧto_text($DEMOⵧSIMPLE, rendering_options)
				//console.log(str)

				// the content should be included
				expect(str).to.contain('🏆  ')
				expect(str).to.contain('finish the game')

				// and formatted
				expect(str).to.contain('**finish the game**')
			})

			it('should work -- KV', () => {
				const str = RichText.renderⵧto_text($DEMOⵧKV, rendering_options)
				//console.log(str)

				// the content should be included
				expect(str).to.contain('Your character:')
				expect(str).to.contain('Max health')
				expect(str).to.contain('123')
				expect(str).to.contain('Intelligence')
				expect(str).to.contain('45')
				expect(str).to.contain('Strength')
				expect(str).to.contain('6')

				// the content should have been formatted
				// TO OL
			})
		})
	})
})
