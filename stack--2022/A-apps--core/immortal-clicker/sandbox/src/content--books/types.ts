/////////////////////////////////////////////////
// "books" in their generic sense
//
// From wikipedia:
// > As an intellectual object, a book is prototypically a composition of such great length
// >   that it takes a considerable investment of time to compose
// >   and still considered as an investment of time to read.
// > In a restricted sense, a book is a self-sufficient section or part of a longer composition,
// >   a usage reflecting that, in antiquity,
// >   long works had to be written on several scrolls
// >   and each scroll had to be identified by the book it contained.
// > In an unrestricted sense, a book is the compositional whole of which such sections,
// >   whether called books or chapters or parts, are parts.

/////////////////////////////////////////////////

// smallest unit of a "book" that can be displayed / linked to / have a "next" button
interface Page {
	content: string
	contentⵧvisual?: string // url
	/*sub?: {
		[k: string]: string
	}*/
}

// any unit above the "page" one
// ex. volume, chapter...
interface BookPart {
	title?: string
	titleⵧsub?: string
	// author?

	parts_type?: string
	parts: {
		[k: string]: Book | BookPart | Page | string
	}
}

// top part that can be independently considered
interface Book extends BookPart {
	uuid: string // for reference
	title: string
}

// some books can be customized and thus have several instances
// ex.
// - a child book customized so that the child is the hero
// - an RPG where the book refers to a changeable settings (hero name, past actions)
interface BookInstance {
	book_uuid: string
	params: {
		[key: string]: string // TODO clarify
	}
}

////////////////////////////////////

type AccessLevel =
	| 'unaware'                  // no access + not even aware of existence
	| 'copyⵧno'                  // aware of the book existence but not in possession thus obviously can't read it
	| 'copyⵧyes'                 // has a physical copy (borrowed, stolen, bought, etc.)


// assuming we have access
type ComprehensionLevel =
	| 'forbidden'                // owner may not want to read it, ex. forbidden knowledge
	| 'unviewed'                 // not viewed at all = book never opened, page never turned
	| 'viewedⵧblocked'           // ex. can browse the book but comprehension is blocked, bc can't read or can't understand the language
	| 'understoodⵧpartially'     // ex. skimmed quickly
	| 'understoodⵧsuperficially' // ex. can barely read or missing concepts, understand the general idea but not much more (ex. Math book but math level is too low)
	| 'understood'               // normal
	| 'understoodⵧthoroughly'    // expert
	| 'understoodⵧcritically'    // can find the flaws in this book

interface BookExperience {

	comprehension_level‿by_page: {

	}

	// TODO bookmarks
}

/////////////////////////////////////////////////

export {
	type Page,
	type BookPart,
	type Book,
}
