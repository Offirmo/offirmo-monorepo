import { expect } from 'chai'

import * as RichText from '@offirmo-private/rich-text-format'
import { dumpꓽanyⵧprettified } from '@offirmo-private/prettify-any'

import { generate_random_demo_weapon, DEMO_WEAPON_1, DEMO_WEAPON_2 } from '@tbrpg/logic--weapons'

import rich_text_to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import { render_weapon_detailed } from './index.js'


describe('🔠  view to @offirmo-private/rich-text-format - items -- weapon', function() {

	context('when not enhanced', function() {

		it('should render properly', () => {
			const $doc = render_weapon_detailed(DEMO_WEAPON_1)
			const str = RichText.renderⵧto_text($doc)
			expect(str).to.be.a('string')
			expect(str).to.include('Axe')
			expect(str).to.include('Admirable')
			expect(str).to.include('Adjudicator’s')
			expect(str).not.to.include('+')
		})
	})

	context('when enhanced', function() {

		it('should render properly', () => {
			const $doc = render_weapon_detailed(DEMO_WEAPON_2)
			const str = RichText.renderⵧto_text($doc)
			expect(str).to.be.a('string')
			expect(str).to.include('Bow')
			expect(str).to.include('Arcanic')
			expect(str).to.include('Ambassador’s')
			expect(str).to.include('+8')
		})
	})

	describe('demos', function() {

		it('shows off weapons', () => {

			const doc1 = render_weapon_detailed(DEMO_WEAPON_1, 2000)
			//dumpꓽanyⵧprettified(doc1)
			let str = rich_text_to_terminal(doc1)
			// should just not throw

			const doc2 = render_weapon_detailed(DEMO_WEAPON_2, 2000)
			//dumpꓽanyⵧprettified(doc2)
			str = rich_text_to_terminal(doc2)
			// should just not throw

			for(let i = 0; i < 10; ++i) {
				const item = generate_random_demo_weapon()
				const $doc = render_weapon_detailed(item, 2000)
				//dumpꓽanyⵧprettified($doc)
				const str = rich_text_to_terminal($doc)
				//console.log(str)
				// should just not throw
			}
		})
	})
})
