/////////////////////////////////////////////////
// Book EXPERIENCE
// = meta customization

import { Enum } from 'typescript-string-enums'




/////////////////////////////////////////////////

import type { BookUId, BookPageReference, BookPartReference } from '../model--book/types/index.ts'

/////////////////////////////////////////////////
// Note: not all use cases need AccessLevel and ComprehensionLevel

// tslint:disable-next-line: variable-name
export const AccessLevel = Enum(
	'unaware',                  // no access + not even aware of existence
	'accessⵧno',                // aware of existence but not in possession thus obviously can't read it. Ex. need to be bought or found.
	'accessⵧyes',               // has a physical copy (given, bought, borrowed, found, stolen, etc.)
)
export type AccessLevel = Enum<typeof AccessLevel> // eslint-disable-line no-redeclare


// assuming we have access
// tslint:disable-next-line: variable-name
export const ComprehensionLevel = Enum(
	'forbidden',                // owner do not want to read it, ex. forbidden knowledge
	'unviewed',                 // not viewed at all = book never opened, page never turned
	'viewedⵧblocked',           // ex. can browse the book but comprehension is blocked, bc can't read or can't understand the language
	'understoodⵧpartially',     // ex. skimmed quickly
	'understoodⵧsuperficially', // ex. can barely read or missing concepts, understand the general idea but not much more (ex. Math book but math level is too low)
	'understood',               // normal
	'understoodⵧthoroughly',    // expert
	'understoodⵧcritically',    // such comprehension that can find flaws in this book and rewrite it better
)
export type ComprehensionLevel = Enum<typeof ComprehensionLevel> // eslint-disable-line no-redeclare


interface BookExperience {
	book_uid: BookUId // TODO review: redundant? or should be experience ID?

	current_bookmark?: BookPageReference

	// by path bc we can have complex situations
	// for ex. 10 volumes be we only have access to the first 3
	comprehension_level‿by_path?: {
		[place: BookPartReference]: AccessLevel | ComprehensionLevel
	}

	// TODO one day multiple bookmarks?
	// TODO one day allow customization
}

/////////////////////////////////////////////////

export {
	type BookExperience,
}
