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
//
// Spec:
// We want a lib that can be use in:
// - a serious environment (reader app)
// - inside a game, RPG setting

// TODO allow RichText!!

/////////////////////////////////////////////////
// Those types purely describe the technical aspect of displaying a book
// any "meta" feature is in the subsequent "book experience" type (later)

type BookUId = string

type Author = string // TODO implement

/////////////////////////////////////////////////

// Because we have lazy loading,
// we want to be able to progressively load a book, starting from the most basic infos
// cover = 1st level, needed to display a list of books and decide whether one wants to read it
interface BookCover {
	title: string
	author?: Author
	subtitles?: string[] // TODO allow rich text?

	// since we have lazy loading, allow hints for overall data
	// that would otherwise need a complete load, ex. number of pages
	hints?: {
		pages_count?: number
		emoji?: string // 📔📕📗📘📙📓📒📃📜📄📰🗺
	}
}

// page = smallest unit of a "book" that can be displayed / linked to / have a "next" button
// TODO review "auto splitting of long text" aka. auto splitting into pages?
interface BookPage {
	// TODO clarify if the visual replaces or complement the text? We'll decide later with real use cases
	content: string
	contentⵧvisual?: string // url

	/*sub?: {
		[k: string]: string
	}*/
}

// any unit above the "page" one
// ex. volume, chapter...
// Can form a tree of any depth
interface BookPart {
	parts_type?: string
	parts: {
		[k: string]: Book | BookPart | BookPage | string
	}

	// optionally a part may have its own infos
	title?: string
	subtitles?: string[]
	author?: Author
}

// top part
// that can be independently considered
interface Book extends BookPart, BookCover {
	uid: BookUId // for referencing

	title: string // mandatory

	is_template?: true // TODO review
	// TODO declare template slots?
}

// basic types needed for advanced stuff

// path to a specific page, for ex. for bookmarking
type PageReference = string // TODO clarify the format

// path to any part of a book
type PartPath = string // TODO clarify the format
const PATH = {
	whole: '*' as PartPath,
}

// some books can be customized and thus have several instances
// ex.
// - a child book customized so that the hero has the child's name
// - an RPG where the book refers to a changeable settings (randomized wordlbuiding, hero name, past actions...)
// NO!! The customization will now directly go in the "book experience"
/*interface BookInstance {
	book_uid: string
	params: { // TODO clarify
		[key: string]: string
	}
}*/

/////////////////////////////////////////////////

export {
	type BookPage,
	type BookPart,

	type BookUId,
	type BookCover,
	type Book,

	type PageReference,
	type PartPath,
	PATH,

	//type BookInstance,
}
