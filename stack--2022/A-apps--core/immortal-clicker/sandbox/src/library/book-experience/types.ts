/////////////////////////////////////////////////
// Book EXPERIENCE
// = meta customization


// specs
// know of a book
// own a book
// comprehension:
// can't


/////////////////////////////////////////////////

import { BookUId, PageReference, PartPath } from '../book/types.js'

/////////////////////////////////////////////////

type AccessLevel =
	| 'unaware'                  // no access + not even aware of existence
	| 'accessⵧno'                // aware of existence but not in possession thus obviously can't read it
	| 'accessⵧyes'               // has a physical copy (borrowed, stolen, bought, etc.)

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

	current_bookmark?: PageReference

	// by path bc we can have complex situations
	// for ex. 10 volumes be we only have access to the first 3
	comprehension_level‿by_path?: {
		[place: PartPath]: AccessLevel | ComprehensionLevel
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
