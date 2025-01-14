import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'
import to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import {
	BookPageReference,
} from '../book/l1-types/types.ts'
import {
	getꓽBookPageⵧchain,
	getꓽBookPageRefⵧfrom_chain,
	getꓽBookPageⵧchainⵧfrom_chain,
} from '../book/selectors/selectors.ts'
import {
	renderꓽBookCover,
	renderꓽBookPage,
	renderꓽBookPageⵧfrom_chain,
} from '../book/selectors/render--RichText.ts'
import * as BookResolverLib from '../book--resolver'
import * as BookStashLib from '../book--stash'
import { renderꓽBookStash } from '../book--stash/render--RichText.ts'

import { BookEntryꓽBHBHⳇ001 } from './bhbv/01'
import { BookEntryꓽBHBHⳇ022 } from './bhbv/22'

/////////////////////////////////////////////////
// this technical index store the books UIDs and the loading function
BookResolverLib.registerꓽBook(BookEntryꓽBHBHⳇ001)
BookResolverLib.registerꓽBook(BookEntryꓽBHBHⳇ022)

/////////////////////////////////////////////////

let stash = BookStashLib.create()
stash = BookStashLib.addꓽbook(stash, BookEntryꓽBHBHⳇ001.uid)
stash = BookStashLib.addꓽbook(stash, BookEntryꓽBHBHⳇ022.uid)

/////////////////////////////////////////////////

// imagine a landing page, with the list of books
console.log(`\n📚📚📚 Stash 📚📚📚`)
console.log(to_terminal(renderꓽBookStash(
	stash
)))
console.log('')

// now let's imagine we click on one to learn more
console.log(`\n🔎🔎🔎 Inspecting a book: 🔎🔎🔎`)
console.log(to_terminal(renderꓽBookCover(
	BookResolverLib.getꓽBookCover(BookEntryꓽBHBHⳇ022.uid),
	//BookStashLib.getꓽexperience(stash, BookEntryꓽBHBHⳇ022.uid), TODO
)))
console.log('TODO take the experience into account!!!')
console.log('')

// now let's start reading it
/*console.log(`\n📖📖📖 Reading… 📖📖📖`)
await BookResolverLib.ↆgetꓽBook(BookEntryꓽBHBHⳇ022.uid).then(book => {
	console.log(to_terminal(renderꓽBookPage(
		book,
		''
	)))
	console.log('TODO take the experience into account!!!')
	console.log('')
})*/

console.log(`\n📖📖📖 Reading… 📖📖📖`)
await BookResolverLib.ↆgetꓽBook(BookEntryꓽBHBHⳇ022.uid).then(book => {

	let current_page_ref: BookPageReference = '' // empty = first
	let chain = getꓽBookPageⵧchain(book, '')
	console.log(to_terminal(renderꓽBookPageⵧfrom_chain(chain)))
	console.log('TODO take the experience into account!!!')
	current_page_ref = getꓽBookPageRefⵧfrom_chain(chain)
	console.log(`TODO Bookmark current page: "${current_page_ref}"`)
	console.log('')

	for(let i = 0; i < 3; ++i) {
		chain = getꓽBookPageⵧchainⵧfrom_chain(chain, 'next')
		console.log(to_terminal(renderꓽBookPageⵧfrom_chain(chain)))
		console.log('TODO take the experience into account!!!')
		current_page_ref = getꓽBookPageRefⵧfrom_chain(chain)
		console.log(`TODO Bookmark current page: "${current_page_ref}"`)
		console.log('')
	}

	for(let i = 0; i < 5; ++i) {
		chain = getꓽBookPageⵧchainⵧfrom_chain(chain, 'previous')
		console.log(to_terminal(renderꓽBookPageⵧfrom_chain(chain)))
		console.log('TODO take the experience into account!!!')
		current_page_ref = getꓽBookPageRefⵧfrom_chain(chain)
		console.log(`TODO Bookmark current page: "${current_page_ref}"`)
		console.log('')
	}
})

/////////////////////////////////////////////////
