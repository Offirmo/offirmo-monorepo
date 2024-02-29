import type { IETFLanguageType, Thing as SimplerThing } from '@offirmo-private/ts-types'

import { Author } from '../20-author/types.js'

/////////////////////////////////////////////////

export interface Thing extends SimplerThing {
	lang?: IETFLanguageType
	description: string // must be simple, a paragraph at most
	author: Author | undefined // undef = unknown :-(
}
