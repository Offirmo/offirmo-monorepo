import { expect } from 'chai'
import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import { LIB } from '../../consts.ts'
import type { Book, BookNodeReference, BookPage, BookPart, BookPartKey, Text } from '../../model--book/types/types.ts'
import { isꓽBook, isꓽBookCover, isꓽBookPart, isꓽPageⵧlike, isꓽPage } from '../../model--book/types/types-guards.ts'
import { NODE_REFERENCEⵧSEPARATOR, NODE_REFERENCEꘌROOT } from '../../model--book/consts.ts'
import { getꓽpage } from '../../model--book/selectors.ts'

import { BOOK } from './content.ts'
import { keyꓺvalue } from '@offirmo-private/rich-text-format'

/////////////////////////////////////////////////

function _recursively_enqueue(book_part: Immutable<BookPart>, current_path‿split: BookPartKey[], ordered_refs: BookNodeReference[]) {
	const { parts } = book_part

	// add a pseudo-page for the cover
	ordered_refs.push(current_path‿split.join(NODE_REFERENCEⵧSEPARATOR))

	const part_keys = Object.keys(parts)
	if (part_keys.every(key => isꓽPageⵧlike(parts[key]))) {
		part_keys.forEach(key  => {
			ordered_refs.push( [...current_path‿split, key].join(NODE_REFERENCEⵧSEPARATOR))
		})
	}
	else if (part_keys.every(key => isꓽBookPart(parts[key]))) {
		part_keys.forEach(key  => {
			_recursively_enqueue(parts[key] as Immutable<BookPart>, [...current_path‿split, key], ordered_refs)
		})
	}
	else {
		throw new Error(`For book "${BOOK.title}", path "${current_path‿split.join(NODE_REFERENCEⵧSEPARATOR)}", parts must be either all pages or all parts, no mixing allowed!`)
	}
}
function _get_all_refs_ordered(book: Immutable<Book>): BookNodeReference[] {
	let book_part: Immutable<BookPart> = book
	const ordered_refs: BookNodeReference[] = []
	_recursively_enqueue(book_part, [], ordered_refs)
	return ordered_refs
}

function expectㆍbookㆍtoㆍbeㆍcorrect(book: Immutable<Book>): void {
	const ordered_refs = _get_all_refs_ordered(book) // side effect of checking the structure

	ordered_refs.forEach((ref, index) => {
		const page_result = getꓽpage(book, ref)

		// 1. core result
		expect(isꓽPage(page_result.content), 'is page').to.be.true

		// 2b.
		expect(page_result.referenceⵧcurrent, 'referenceⵧcurrent').to.equal(ref)
		expect(page_result.referenceⵧpreviousⵧin_tree, 'referenceⵧpreviousⵧin_tree').to.equal(ordered_refs[index - 1] || NODE_REFERENCEꘌROOT)
		expect(page_result.referenceⵧnextⵧin_tree, 'referenceⵧnextⵧin_tree').to.equal(ordered_refs[index + 1] || NODE_REFERENCEꘌROOT)

		// 2a.
		if (page_result.relative_index‿human === 0) {
			expect(page_result.breadcrumbs, 'breadcrumbs--0').to.have.lengthOf(page_result.referenceⵧcurrent.split(NODE_REFERENCEⵧSEPARATOR).length - 1)
		}
		else {
			expect(page_result.breadcrumbs, 'breadcrumbs').to.have.lengthOf(page_result.referenceⵧcurrent.split(NODE_REFERENCEⵧSEPARATOR).length)
		}
	})
}

describe(`${LIB} -- Book -- Content -- ${BOOK.title}`, function() {


	it('should pass the type guards', () => {
		expect(isꓽBookCover(BOOK), 'isꓽBookCover').to.be.true
		expect(isꓽBookPart(BOOK), 'isꓽBookPart').to.be.true
		expect(isꓽBook(BOOK), 'isꓽBook').to.be.true
	})

	it('should pass the deep test', () => {
		expectㆍbookㆍtoㆍbeㆍcorrect(BOOK)
	})
})
