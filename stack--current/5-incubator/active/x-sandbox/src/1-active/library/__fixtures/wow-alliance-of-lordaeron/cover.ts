/* plain, basic example of an in-game book
 * https://www.wowhead.com/item=145298/the-alliance-of-lordaeron
 */

import type { Book, BookCover, BookUId } from '../../model--book/index.ts'

/////////////////////////////////////////////////

const uid: BookUId = '〖BOOKꓽWoW【The Alliance of Lordaeron】〗'

const AUTHOR: Book['author'] = "a scholar from the Alliance"

const COVER: BookCover = {
	uid,
	title: 'The Alliance of Lordaeron',
	author: AUTHOR,
	flavor: 'Copy commissioned by Archmage Newhearth of the Curators. Do not worry about returning the book, it will return on its own.',
	hints: {
		pages_count: 16,
		emoji: '📘',
		icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_misc_hellifrepvphonorholdfavor.jpg',
		color_bg: 'hsl(42, 100%, 87%)',
		color_fg: 'hsl(337, 16%, 28%)',
	}
}

/////////////////////////////////////////////////

export {
	COVER,
}
