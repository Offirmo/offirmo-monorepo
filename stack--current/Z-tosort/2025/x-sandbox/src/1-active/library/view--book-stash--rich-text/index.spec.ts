import { expect } from 'chai'

import { renderⵧto_text } from '@offirmo-private/rich-text-format'
import renderⵧto_terminal from '@offirmo-private/rich-text-format--to-terminal'

import { LIB } from '../consts.ts'

import { ↆgetꓽpage } from '../model--book-stash/selectors.ts'
import { EXAMPLE } from '../model--book-stash/__fixtures/index.ts'

import { renderꓽbookshelf, renderꓽpage_result } from './index.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- 03 BookStash -- 03 RichText`, function() {

	describe('renderꓽbookshelf()', function () {

		it('should work', () => {
			const $doc = renderꓽbookshelf(EXAMPLE)
			console.log(`--- txt:`)
			console.log(renderⵧto_text($doc, { style: 'markdown' }))
			console.log(`--- terminal:`)
			console.log(renderⵧto_terminal($doc))
		})
	})

	describe('renderꓽpage_result()', function () {

		it('should work -- root', async () => {
			const experience_uid = Object.keys(EXAMPLE.experiences)[0]!
			let page_result = await ↆgetꓽpage(EXAMPLE, experience_uid)
			//console.log(`XXX page_result`, page_result)

			let $doc = renderꓽpage_result(page_result)
			//console.log(`--- txt:`)
			//console.log(renderⵧto_text($doc, { style: 'markdown' }))
			console.log(`--- terminal:`)
			console.log(renderⵧto_terminal($doc))
		})

		it('should work -- pages next to root', async () => {
			const experience_uid = Object.keys(EXAMPLE.experiences)[0]!
			let page_result = await ↆgetꓽpage(EXAMPLE, experience_uid)
			page_result = await ↆgetꓽpage(EXAMPLE, experience_uid, page_result.referenceⵧnextⵧin_tree)
			let $doc = renderꓽpage_result(page_result)
			console.log(`--- txt:`)
			console.log(renderⵧto_text($doc, { style: 'markdown' }))
			console.log(`--- terminal:`)
			console.log(renderⵧto_terminal($doc))

			console.log(`\n------- next ------`)
			page_result = await ↆgetꓽpage(EXAMPLE, experience_uid, page_result.referenceⵧnextⵧin_tree)
			$doc = renderꓽpage_result(page_result)
			console.log(`--- txt:`)
			console.log(renderⵧto_text($doc, { style: 'markdown' }))
			console.log(`--- terminal:`)
			console.log(renderⵧto_terminal($doc))
		})
	})
})
