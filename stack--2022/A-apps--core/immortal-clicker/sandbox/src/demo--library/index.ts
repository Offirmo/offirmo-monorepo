import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import * as BookStashLib from '../library/book--stash/index.js'
import * as BookResolverLib from '../library/book--resolver/index.js'
import { renderꓽBookStash } from '../library/book--stash/render--RichText.js'
import { renderꓽBookCover, renderꓽBookPage } from '../library/book/render--RichText.js'

import { BookEntryꓽBHBHⳇ001 } from './bhbv/01/index.js'
import { BookEntryꓽBHBHⳇ022 } from './bhbv/22/index.js'

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
console.log(`\n📖📖📖 Reading… 📖📖📖`)
await BookResolverLib.ↆgetꓽBook(BookEntryꓽBHBHⳇ022.uid).then(book => {
	console.log(to_terminal(renderꓽBookPage(
		book,
		''
	)))
	console.log('TODO take the experience into account!!!')
	console.log('')
})

console.log(`\n📖📖📖 Reading… 📖📖📖`)
await BookResolverLib.ↆgetꓽBook(BookEntryꓽBHBHⳇ022.uid).then(book => {
	console.log(to_terminal(renderꓽBookPage(
		book,
		''
	)))
	console.log('TODO take the experience into account!!!')
	console.log('')
})

/////////////////////////////////////////////////
