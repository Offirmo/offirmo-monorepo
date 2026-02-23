/* Common building blocks for the more advanced types.
 */

import type { IETFLanguageType, Charset } from '@monorepo-private/ts--types'

/////////////////////////////////////////////////

export interface WithLang {
	lang?: IETFLanguageType
}

export interface WithCharset {
	charset?: never 	// Nothing. I use utf-8 everywhere by default.
	// trivial to implement if needed.
}

export interface WithTitle {
	title?: string
}

/////////////////////////////////////////////////
