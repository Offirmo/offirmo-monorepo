
/////////////////////////////////////////////////
// Book EXPERIENCE
// = meta customization

// path to a part or a page
type Reference = string

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
	current_reading_path: Reference
	
	comprehension_level‿by_path: {
		[place: Reference]: AccessLevel | ComprehensionLevel
	}

	// TODO bookmarks
	// TODO allow custom extension
}

/////////////////////////////////////////////////

export {
	type Reference,
	type AccessLevel,
	type ComprehensionLevel,

	type BookExperience,
}