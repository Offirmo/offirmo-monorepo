import { registry, type BookResolver } from '../../service--book-resolver/index.ts'

import { COVER } from './cover.ts'

/////////////////////////////////////////////////

const ↆget: BookResolver = async () => {
	const { BOOK } = await import('./content.ts')
	return BOOK
}

registry.registerꓽCover(COVER, ↆget)

/////////////////////////////////////////////////

export {
	COVER,
}
