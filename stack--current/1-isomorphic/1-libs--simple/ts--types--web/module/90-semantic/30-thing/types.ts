import type { IETFLanguageType, Thing as SimplerThing } from '@monorepo-private/ts--types'

import type { Author } from '../20-author/types.ts'
import type { WithLang } from '../../00-base/types.ts'

/////////////////////////////////////////////////

export interface Thing extends SimplerThing, WithLang {
	//lang?: IETFLanguageType
	//description: string // must be simple, a paragraph at most
	// or should be title?? = a painting has a title
	author: Author | undefined // undef = unknown :-(
	//since‿y?: number // for copyright notice
}
