import type { Book } from '../../model--book/types/types.ts'

import { COVER } from './cover.ts'

/////////////////////////////////////////////////

const BOOK: Book = {
	...COVER,
	parts_type: 'book',
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
	BOOK,
}
