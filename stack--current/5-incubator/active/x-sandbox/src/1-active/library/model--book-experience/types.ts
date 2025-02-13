/////////////////////////////////////////////////
// Book EXPERIENCE
// = meta customization

import { Enum } from 'typescript-string-enums'
import type { WithLastUserInvestmentTimestamp } from '@offirmo-private/state-utils'

import type { BookUId, BookPageReference, BookNodeReference, Text } from '../model--book/index.ts'

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
	//'unviewed',                 // not viewed at all = book never opened, page never turned (TOTO should it be explicit or undef?)
	'abstaining',               // owner do not want to read it, ex. forbidden knowledge
	'viewedⵧblocked',           // tried to read the book but comprehension is blocked, bc can't read or can't understand the language
	'understoodⵧpartially',     // ex. skimmed quickly
	'understoodⵧsuperficially', // ex. can barely read or missing concepts, understand the general idea but not much more (ex. Math book but math level is too low)
	'understood',               // normal
	'understoodⵧthoroughly',    // expert
	'understoodⵧcritically',    // such comprehension that can find flaws in this book and rewrite it better
)
export type ComprehensionLevel = Enum<typeof ComprehensionLevel> // eslint-disable-line no-redeclare

// implicit expectation that a node inherits from its parents
// unless explicitly specified
interface NodeExperience {

	/////// INHERITED from parent nodes if absent

	// dynamic, we can obtain access then lose it
	// if undef, user must fall back to their own preferred default
	access_level?: AccessLevel

	// refers to when we had access. Not set = we never had access or never opened it
	// can be set even if access=no => memory of when we had it
	// BUT cannot have unaware + comprehension
	// INHERITED from parent nodes if absent
	comprehension_level?: ComprehensionLevel

	/////// NOT inherited from parent nodes if absent
	starred?: boolean // ideally should not be present if false
	summary?: Text // a textual summary of this experience. This is important esp. in case of game, ex. "quest to find this book but no access"
}

interface BookExperience extends WithLastUserInvestmentTimestamp {
	book_uid: BookUId // real book id this experience is covering. IMPORTANT because we can have several experiences for the same book, with different customizations

	bookmark?: BookPageReference

	// by path bc we can have complex situations
	// for ex. 10 volumes be we only have access to the first 3
	// or missing page in a book
	// BUT inheritance is implicit! So to have missing pages, they'd need to be explicitly called out
	comprehension_level‿by_path?: {
		// TODO one day clean useless entries
		[place: BookNodeReference]: NodeExperience
	}

	// TODO % read
	// TODO one day customization
}

/////////////////////////////////////////////////

export {
	type NodeExperience,
	type BookExperience,
}
