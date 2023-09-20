import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import * as BookStashLib from '../library/state--book-stash/index.js'
import * as BookResolverLib from '../library/book-resolver/index.js'

import { BookEntryꓽBHBHⳇ001 } from './bhbv/01/index.js'
import { BookEntryꓽBHBHⳇ022 } from './bhbv/22/index.js'
import { renderꓽBookStash } from '../library/render/render--RichText.js'

/////////////////////////////////////////////////
// this technical index store the books UIDs and the loading function
BookResolverLib.registerꓽBook(BookEntryꓽBHBHⳇ022)
BookResolverLib.registerꓽBook(BookEntryꓽBHBHⳇ001)

/////////////////////////////////////////////////

let stash = BookStashLib.create()
stash = BookStashLib.addꓽbook(stash, BookEntryꓽBHBHⳇ022.uid)
stash = BookStashLib.addꓽbook(stash, BookEntryꓽBHBHⳇ001.uid)

/////////////////////////////////////////////////

console.log(to_terminal(renderꓽBookStash(
	stash
)))

/////////////////////////////////////////////////
