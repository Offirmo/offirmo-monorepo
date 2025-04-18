import { expect } from 'chai'

import { LIB } from '../../consts.ts'
import {
	$DEMOⵧSIMPLE,
	$DEMOⵧKV,
	DOC_DEMO_LIST_ORDERED,
	DOC_DEMO_LIST_UNORDERED,
	DOC_DEMO_LIST_NESTED,
} from '../../__examples/index.ts'

import * as RichText from '../../index.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- renderers -- to text`, () => {
	let rendering_options = {}
	beforeEach(() => {
		rendering_options = {}
	})

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
			expect(str).to.contain('🏆')
			expect(str).to.contain('Finish the game')
		})

		it('should work -- lists -- ol', () => {
			const str = RichText.renderⵧto_text(DOC_DEMO_LIST_ORDERED, rendering_options)
			console.log(str)

			expect(str).to.equal(
` 1. ol #1
 2. ol #2
 3. ol #3`)
		})

		it('should work -- lists -- ul', () => {
			const str = RichText.renderⵧto_text(DOC_DEMO_LIST_UNORDERED, rendering_options)
			console.log(str)

			expect(str).to.equal(
`- ul #1
- ul #2
- ul #3`
			)
		})

		it('should work -- lists -- nested', () => {
			const str = RichText.renderⵧto_text(DOC_DEMO_LIST_NESTED, rendering_options)
			console.log(str)

			expect(str).to.equal(`
- immediately nested ol:
   1. ol #1
   2. ol #2
   3. ol #3
- simple text
- immediately nested ul:
  - ul #1
  - ul #2
  - ul #3
- deep nesting:
  - immediately nested ol:
     1. ol #1
     2. ol #2
     3. ol #3
  - another simple text
  - immediately nested ul:
    - ul #1
    - ul #2
    - ul #3
  			`.trim())
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
			expect(str).to.contain('🏆')
			expect(str).to.contain('Finish the game')
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
			expect(str).to.contain('🏆')
			expect(str).to.contain('Finish the game')

			// and formatted
			expect(str).to.contain('**Finish the game**')
		})

		it('should work -- lists -- ol', () => {
			const str = RichText.renderⵧto_text(DOC_DEMO_LIST_ORDERED, rendering_options)
			console.log(str)

			expect(str).to.equal(`
1. ol #1
2. ol #2
3. ol #3
			`.trim())
		})

		it('should work -- lists -- ul', () => {
			const str = RichText.renderⵧto_text(DOC_DEMO_LIST_UNORDERED, rendering_options)
			console.log(str)

			expect(str).to.equal(
				`- ul #1
- ul #2
- ul #3`
			)
		})

		it('should work -- lists -- nested', () => {
			const str = RichText.renderⵧto_text(DOC_DEMO_LIST_NESTED, rendering_options)
			console.log(str)

			expect(str).to.equal(`
- immediately nested ol:
  1. ol #1
  2. ol #2
  3. ol #3
- simple text
- immediately nested ul:
  - ul #1
  - ul #2
  - ul #3
- deep nesting:
  - immediately nested ol:
    1. ol #1
    2. ol #2
    3. ol #3
  - another simple text
  - immediately nested ul:
    - ul #1
    - ul #2
    - ul #3
  			`.trim())
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

		it('should properly add block margins')
	})
})
