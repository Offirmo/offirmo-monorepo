import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import {
	Book,
	BookPage,
	BookPart,
	BookPageReference,
	BookPartKey,
	BOOK_PART_KEY_KEYWORDSᐧFIRST,
	BOOK_PART_KEY_KEYWORDSᐧLAST,
} from '../l1-types/types.ts'
import { PAGE_REFERENCEⵧSEPARATOR } from '../consts.ts'
import { isꓽPageⵧlike } from '../l1-types/guards.ts'

/////////////////////////////////////////////////
// primitives

function _getꓽBookPart__part_keysⵧordered(book_part: Immutable<BookPart>): Array<BookPartKey> {
	const part__keys = Object.keys(book_part.parts)
	assert(part__keys.length >= 1, `_getꓽBookPart__part_keysⵧordered(): should have parts!`)

	return part__keys.sort()
}

function _getꓽBookPartKeyⵧresolved(book_part: Immutable<BookPart>, key: BookPartKey | undefined): BookPartKey {
	if (!!book_part.parts[key])
		return key

	const part__keysⵧordered = _getꓽBookPart__part_keysⵧordered(book_part)
	assert(part__keysⵧordered.length > 0, `_getꓽBookPartKeyⵧresolved()`)

	switch (key) {
		case undefined:
			/* fallthrough */
		case '':
			/* fallthrough */
		case BOOK_PART_KEY_KEYWORDSᐧFIRST:
			return part__keysⵧordered[0]
		case BOOK_PART_KEY_KEYWORDSᐧLAST:
			return part__keysⵧordered.slice(-1)[0]
		default:
			throw new Error(`Unrecognized BookPartKey, not present, not keyword!`)
	}
}

function _getꓽBookPart__childⵧby_key(book_part: Immutable<BookPart>, key: BookPartKey): Immutable<BookPart['parts']['x']> {
	assert(!!book_part.parts[key], `_getꓽBookPart__childⵧby_key(): BookPartKey "${key}" should be referencing a part!`)
	return book_part.parts[key]
}

function _ensureꓽisꓽBookPage(page: Immutable<BookPage> | string): Immutable<BookPage> {
	assert(isꓽPageⵧlike(page), `_ensureꓽBookPage: should be page-like!`)

	if (typeof page === 'string')
		return { content: page } satisfies BookPage

	return page
}

/////////////////////////////////////////////////
// intermediate: chain

/*We need the full chain in order to:
 * - display the path, ex. "volume 1/3 » part 2/2 » page 2/23"
 * - compute the next page path
 */
interface BookPageReferenceChainStep {
	book_part: Immutable<BookPart>
	keysⵧallⵧordered: BookPartKey[]
	keyⵧselected: BookPartKey
}
interface BookPageReferenceChain {
	steps: BookPageReferenceChainStep[]

	page: Immutable<BookPage>
}


function _getꓽBookPageⵧchain(
	book_part: Immutable<BookPart>,
	page_ref: Immutable<BookPartKey[]>,
): BookPageReferenceChain {
	const keysⵧallⵧordered = _getꓽBookPart__part_keysⵧordered(book_part)
	const keyⵧselected = _getꓽBookPartKeyⵧresolved(book_part, page_ref[0])

	const chain_step: BookPageReferenceChainStep = {
		book_part,
		keysⵧallⵧordered,
		keyⵧselected,
	}

	const child = _getꓽBookPart__childⵧby_key(book_part, keyⵧselected)
	if (isꓽPageⵧlike(child)) {
		// end of the chain
		// TODO REVIEW when doing NEXT/PREVIOUS, we may switch to a part that is not as deep as the previous one, hence different chain length
		assert(page_ref.length <= 1, `_getꓽBookPageⵧchain: when reaching a page, the path should be empty! (TODO IMPROVE LOGIC)`)
		return {
			steps: [chain_step],
			page: _ensureꓽisꓽBookPage(child)
		}
	}

	// not the end, recurse
	const chain = _getꓽBookPageⵧchain(
		book_part,
		page_ref.slice(1), // TODO if empty, we may want to propagate FIRST/LAST! In case different book parts don't have the same depth
	)

	return {
		steps: [chain_step, ...chain.steps],
		page: chain.page,
	}
}

function getꓽBookPageⵧchain(
	book: Immutable<Book>,
	page_ref: BookPageReference,
): BookPageReferenceChain {
	const pathⵧsplit = page_ref.split(PAGE_REFERENCEⵧSEPARATOR)
	return _getꓽBookPageⵧchain(book, pathⵧsplit)
}

// if there is no next page, return the same
function getꓽBookPageRefⵧfrom_chain(
	chain: Immutable<BookPageReferenceChain>
): BookPageReference {
	const chain_keys: BookPartKey[] = chain.steps.map(step => step.keyⵧselected)

	return chain_keys.join(PAGE_REFERENCEⵧSEPARATOR)
}

function getꓽBookPageⵧchainⵧfrom_chain(
	chain: Immutable<BookPageReferenceChain>,
	modifier: 'previous' | 'next',
): BookPageReferenceChain {
	const pathⵧsplit = [] as BookPartKey[]

	let has_advanced = false // so far
	;[...chain.steps].reverse().forEach((step: Immutable<BookPageReferenceChainStep>) => {
		if (has_advanced) {
			// no change
			pathⵧsplit.unshift(step.keyⵧselected)
			return
		}

		// try to advance
		const {
			book_part,
			keysⵧallⵧordered,
			keyⵧselected
		} = step
		const key_index = keysⵧallⵧordered.indexOf(keyⵧselected)
		assert(key_index >= 0, `getꓽBookPageⵧchainⵧnext_page key not found!`)

		switch(modifier) {
			case 'next': {
				const can_advance = (key_index + 1) < keysⵧallⵧordered.length
				if (!can_advance) {
					pathⵧsplit.unshift(BOOK_PART_KEY_KEYWORDSᐧFIRST)
				}
				else {
					pathⵧsplit.unshift(keysⵧallⵧordered[key_index + 1])
					has_advanced = true
				}
				break
			}
			case 'previous': {
				const can_advance = key_index > 0
				if (!can_advance) {
					pathⵧsplit.unshift(BOOK_PART_KEY_KEYWORDSᐧLAST)
				}
				else {
					pathⵧsplit.unshift(keysⵧallⵧordered[key_index - 1])
					has_advanced = true
				}
				break
			}
			default:
				throw new Error('Switch default!')
		}
	})

	//console.log('getꓽBookPageⵧchainⵧfrom_chain new ref[] =', pathⵧsplit)
	if (!has_advanced) {
		// this is possible and normal
		// a full chain of "first" and "last" will have been constructed
		// when doing "BACK" on the FIRST page -> will properly loop to the LAST page ✅
		// when doing "NEXT" on the LAST page -> will properly loop to the FIRST page
	}

	return _getꓽBookPageⵧchain(chain.steps[0].book_part, pathⵧsplit)
}

/////////////////////////////////////////////////

function getꓽBookPage(
	book: Immutable<Book>,
	page_ref: BookPageReference,
): Immutable<BookPage> {
	const chain = getꓽBookPageⵧchain(book, page_ref)
	return chain.page
}

/////////////////////////////////////////////////

export {
	type BookPageReferenceChain,

	getꓽBookPage,

	getꓽBookPageⵧchain,
	getꓽBookPageRefⵧfrom_chain,
	getꓽBookPageⵧchainⵧfrom_chain,
}
