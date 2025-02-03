/////////////////////////////////////////////////
// Book EXPERIENCE
// = meta customization


// specs
// know of a book
// own a book
// comprehension:
// can't


/////////////////////////////////////////////////

import type { BookUId, BookPageReference, BookPartReference } from '../model--book/types/index.ts'

/////////////////////////////////////////////////

type AccessLevel =
	| 'unaware'                  // no access + not even aware of existence
	| 'accessⵧno'                // aware of existence but not in possession thus obviously can't read it. Ex. need to be bought or found.
	| 'accessⵧyes'               // has a physical copy (given, bought, borrowed, found, stolen, etc.)

// assuming we have access
type ComprehensionLevel =
	| 'forbidden'                // owner may not want to read it, ex. forbidden knowledge
	| 'unviewed'                 // not viewed at all = book never opened, page never turned
	| 'viewedⵧblocked'           // ex. can browse the book but comprehension is blocked, bc can't read or can't understand the language
	| 'understoodⵧpartially'     // ex. skimmed quickly
	| 'understoodⵧsuperficially' // ex. can barely read or missing concepts, understand the general idea but not much more (ex. Math book but math level is too low)
	| 'understood'               // normal
	| 'understoodⵧthoroughly'    // expert
	| 'understoodⵧcritically'    // such comprehension that can find flaws in this book and rewrite it better

interface BookExperience {
	book_uid: BookUId

	current_bookmark?: BookPageReference

	// by path bc we can have complex situations
	// for ex. 10 volumes be we only have access to the first 3
	comprehension_level‿by_path?: {
		[place: BookPartReference]: AccessLevel | ComprehensionLevel
	}

	// TODO bookmarks
	// TODO allow customization
}

/////////////////////////////////////////////////

export {
	type AccessLevel,
	type ComprehensionLevel,

	type BookExperience,
}
