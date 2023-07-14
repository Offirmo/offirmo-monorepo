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
}

interface BookPart {
	parts_type?: string
	parts: {
		[k: string]: BookPart | Page | string
	}
}
interface Book extends BookPart {
	title: string
	titleⵧsub?: string

}

type ComprehensionLevel =
	| 'unaware'
	| 'noaccess'                 // pretend this book or book part is not in the reader's possession = they know about the book existence but obviously can't read it
	| 'forbidden'
	| 'unviewed'                 // not viewed at all = book never opened, page never turned
	| 'viewedⵧblocked'           // ex. can't read or can't understand the language
	| 'understoodⵧpartially'     // ex. skimmed quickly
	| 'understoodⵧsuperficially' // ex. can barely read or missing concepts, understand the general idea but not much more
	| 'understood'               // normal
	| 'understoodⵧthoroughly'    // expert
	| 'understoodⵧcritically'    // can find the flaws in this book

interface BookReadingStatus {

	comprehension_level‿by_page: {

	}

	// TODO bookmarks
}

/////////////////////////////////////////////////

export {
	type Page,
	type BookPart,
	type Book,
	type BookReadingStatus,
}
