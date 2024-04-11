import type { IETFLanguageType, Thing as SimplerThing } from '@offirmo-private/ts-types'

import { Author } from '../20-author/types.js'
import { WithLang } from '../../00-base/types.js'

/////////////////////////////////////////////////

export interface Thing extends SimplerThing, WithLang {
	//lang?: IETFLanguageType
	//description: string // must be simple, a paragraph at most
	// or should be title?? = a painting has a title
	author: Author | undefined // undef = unknown :-(
	//since‿y?: number // for copyright notice
}
