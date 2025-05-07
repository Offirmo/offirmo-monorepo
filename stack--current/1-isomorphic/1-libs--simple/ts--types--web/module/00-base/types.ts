/* Common building blocks for the more advanced types.
 */

import type { IETFLanguageType, Charset } from '@offirmo-private/ts-types'

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

// generic progressive enhancements
// the key here is that HINTS SHOULD ALWAYS BE OPTIONAL:
// - the object extending "WithHints" should be usable without them
// - ideally stuff should be inferrable as much as possible (single source of truth)
export interface BaseHints {
/*
		vibrate?:    { duration‿ms: 'auto' | number, alt: string },
		play_sound?: { url: Url‿str, alt: string },
		play_video?: { url: Url‿str, alt: string },
		// etc.
*/

	key?: string // for ex. to recognize a specific content (do not abuse! Reminder to keep everything text-compatible)

	// anything allowed
	//[k: string]: any NO! to allow strict typing
}
export interface WithHints<Hints = BaseHints> {
	hints?: Hints
}

/////////////////////////////////////////////////
