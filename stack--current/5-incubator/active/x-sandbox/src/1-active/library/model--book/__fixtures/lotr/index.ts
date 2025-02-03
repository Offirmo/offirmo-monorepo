/* Slightly complex book
 * https://en.wikipedia.org/wiki/Red_Book_of_Westmarch
 */

import type { Book, BookCover, BookPage, BookPartKey, BookUId } from '../../types/index.ts'

/////////////////////////////////////////////////

const uid: BookUId = '〖BOOKꓽLotR【Red Book of Westmarch】〗'

const AUTHOR: Book['author'] = "Bilbo Baggins, Frodo Baggins et al."

const COVER: BookCover = {
	uid,
	title: 'the downfall of the lord of the rings and the return of the king',
	author: AUTHOR,
	subtitles: [
		'(as seen by the Little People; being the memoirs of Bilbo and Frodo of the Shire, supplemented by the accounts of their friends and the learning of the Wise.)',
		'Together with extracts from Books of Lore translated by Bilbo in Rivendell.',
	],
	hints: {
		pages_count: 16,
		emoji: '📕',
	}
}

const BOOK: Book = {
	...COVER,
	parts: {
		1: 'The Hobbit, or There and Back Again',
		2: 'The Lord of the Rings',
		3: 'Appendices',
		4: 'The Adventures of Tom Bombadil',
		5: 'The Silmarillion',
	}
}

/////////////////////////////////////////////////

export {
	COVER,
	BOOK,
}
