/* Slightly complex book
 * https://en.wikipedia.org/wiki/Red_Book_of_Westmarch
 */

import type { Book, BookCover, BookUId } from '../../model--book/types/types.ts'

/////////////////////////////////////////////////

const uid: BookUId = '〖BOOKꓽLotR【Red Book of Westmarch】〗'

const AUTHOR: Book['author'] = "Bilbo Baggins, Frodo Baggins et al."

const COVER: BookCover = {
	uid,
	title: 'The Downfall of the Lord of the Rings and the Return of the King',
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

/////////////////////////////////////////////////

export {
	COVER,
}
