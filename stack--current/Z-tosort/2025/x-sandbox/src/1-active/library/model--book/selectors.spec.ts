import { expect } from 'chai'

import { LIB } from '../consts.ts'


import {
	getꓽpage,
} from './selectors.ts'

import { BOOK } from '../__fixtures/wow-alliance-of-lordaeron/content.ts'
import * as RichText from '@monorepo-private/rich-text-format'

/////////////////////////////////////////////////

describe(`${LIB} -- Model: Book -- selectors`, function() {

	describe('getꓽpage', function () {

		describe('simple, 1 dimensional book', function () {

			it('should work -- page 0 (cover)', () => {
				const result0 = getꓽpage(BOOK)
				//console.log(result0)

				// 1.
				expect(result0).to.have.nested.property('content.content')
				expect(RichText.isꓽNode(result0.content.content)).to.be.true
				const content = RichText.renderⵧto_text(result0.content.content, {style: 'markdown'})
				//console.log(content)
				expect(content).to.contain(`### ${BOOK.title}`)
				if (BOOK.subtitles?.length) expect(content).to.contain(`*${BOOK.subtitles[0]}*`)
				if (BOOK.author) expect(content).to.contain(`### ${BOOK.author}`)

				// 2a.
				expect(result0.breadcrumbs).to.have.lengthOf(0)
				expect(result0).to.have.property('part_type', 'book')
				expect(result0).to.have.property('relative_index‿human', 0)
				expect(result0).to.have.property('group_count', 16)

				// 2b.
				expect(result0).to.have.property('referenceⵧpreviousⵧin_tree', '.')
				expect(result0).to.have.property('referenceⵧcurrent', '')
				expect(result0).to.have.property('referenceⵧnextⵧin_tree', '1')
			})

			it('should work -- page 1 (first)', () => {
				const result0 = getꓽpage(BOOK)
				const result1 = getꓽpage(BOOK, result0.referenceⵧnextⵧin_tree)
				//console.log(result1)

				// 1.
				expect(result1).to.have.nested.property('content.content', BOOK.parts['1'])

				// 2a.
				expect(result1.breadcrumbs).to.deep.equal([ BOOK.title ])
				expect(result1).to.have.property('part_type', 'page')
				expect(result1).to.have.property('relative_index‿human', 1)
				expect(result1).to.have.property('group_count', 16)

				// 2b.
				expect(result1).to.have.property('referenceⵧpreviousⵧin_tree', '.')
				expect(result1).to.have.property('referenceⵧcurrent', '1')
				expect(result1).to.have.property('referenceⵧnextⵧin_tree', '2')
			})

			it('should work -- page 2', () => {
				const result0 = getꓽpage(BOOK)
				const result1 = getꓽpage(BOOK, result0.referenceⵧnextⵧin_tree)
				const result2 = getꓽpage(BOOK, result1.referenceⵧnextⵧin_tree)
				//console.log(result2)

				// 1.
				expect(result2).to.have.nested.property('content.content', BOOK.parts['2'])

				// 2a.
				expect(result2.breadcrumbs).to.deep.equal([ BOOK.title ])
				expect(result2).to.have.property('part_type', 'page')
				expect(result2).to.have.property('relative_index‿human', 2)
				expect(result2).to.have.property('group_count', 16)

				// 2b.
				expect(result2).to.have.property('referenceⵧpreviousⵧin_tree', '1')
				expect(result2).to.have.property('referenceⵧcurrent', '2')
				expect(result2).to.have.property('referenceⵧnextⵧin_tree', '3')
			})

			it('should work -- page 16 (last)', () => {
				const result16 = getꓽpage(BOOK, '16')
				//console.log(result16)

				// 1.
				expect(result16).to.have.nested.property('content.content', BOOK.parts['16'])

				// 2a.
				expect(result16.breadcrumbs).to.deep.equal([ BOOK.title ])
				expect(result16).to.have.property('part_type', 'page')
				expect(result16).to.have.property('relative_index‿human', 16)
				expect(result16).to.have.property('group_count', 16)

				// 2b.
				expect(result16).to.have.property('referenceⵧpreviousⵧin_tree', '15')
				expect(result16).to.have.property('referenceⵧcurrent', '16')
				expect(result16).to.have.property('referenceⵧnextⵧin_tree', '.')
			})
		})
	})
})
