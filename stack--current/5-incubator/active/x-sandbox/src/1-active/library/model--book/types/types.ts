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
//
// Hence we do not use Thing, Author bc we are "in-character" (also, bc. using rich text)

import type { Emoji, PositiveInteger } from '@offirmo-private/ts-types'
import type { Url‿str, CssⳇColor‿str } from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'

/////////////////////////////////////////////////
// Those types purely describe the technical aspect of displaying a book
// any "meta" feature is in the subsequent "book experience" type (later)

type BookUId = string

type Text = RichText.Document | string

type Author = Text | undefined // undef = unknown

/////////////////////////////////////////////////

/** The Book minus its content.
 * Because we want lazy loading, we want to be able to progressively load a book, starting from the most basic infos.
 * Cover = 1st level, needed to display a list of books to the user who will then choose one to read
 *
 * https://fr.wikipedia.org/wiki/Glossaire_de_la_reliure
 */
interface BookCover {
	uid: BookUId // needed to later load the content

	title: Text

	author?: Author

	subtitles?: Array<Text> // "title" in a wide sense. Anything accompanying the title we want to be displayed on the cover. By order of most importance.

	description?: Text // a quick pitch / summary trying to sell the book for further engagement. May not displayed depending on the type of UI

	flavor?: Text // empirically seen, a small text on the cover adding some "flavor" (see ex. in fixtures) ref. https://mtg.fandom.com/wiki/Parts_of_a_card

	// since we have lazy loading, allow hints for overall data
	// that would otherwise need a complete load, ex. number of pages
	hints?: {
		pages_count?: PositiveInteger // help get a sense of the investment needed to read

		// cover picture
		picture?: Url‿str

		// useful for a single-line listing / Spine
		emoji?: Emoji // 📔📕📗📘📙📓📒📃📜📄📰🗺
		icon?: Url‿str
		// spine
		color_bg?: CssⳇColor‿str
		color_fg?: CssⳇColor‿str
	}
}

// page = smallest unit of a "book" that can be displayed / linked to / have a "next" button
// TODO review "auto splitting of long text" aka. auto splitting into pages?
interface BookPage {
	content: Text

	// TODO clarify whether the visual replaces or complement the text? We'll decide later with real use cases
	contentⵧvisual?: Url‿str
}

// any unit above the "page" final leave, ex. volume, chapter...
// Can form a tree of any depth.
type BookPartKey = string
const BOOK_PART_KEY_KEYWORDSᐧFIRST: BookPartKey = '⟦first⟧' // TODO usage??
const BOOK_PART_KEY_KEYWORDSᐧLAST: BookPartKey = '⟦last⟧'
interface BookPart {
	parts_type?: string // ex. volume, chapter...
	parts: {
		[k: BookPartKey]: BookPart | BookPage | Text
	}

	// optionally a part may have its own infos
	title?: Text
	subtitles?: Array<Text>
	author?: Author
}

// top part
// that can be independently considered
interface Book extends BookPart, BookCover {
	title: Text // needed to resolve the conflicting inheritance

	is_template?: true // TODO review
	// TODO declare template slots?
}

/////////////////////////////////////////////////

// basic types needed for advanced stuff

// path to a specific page, for ex. for bookmarking
type BookPageReference = string // TODO clarify the format, BookPartKey separated by XX

// path to any part of a book
type BookPartReference = string // TODO clarify the format

/////////////////////////////////////////////////

export {
	type BookPage,
	type BookPartKey,
	type BookPart,

	type BookUId,
	type BookCover,
	type Book,

	type BookPageReference,
	type BookPartReference,
	BOOK_PART_KEY_KEYWORDSᐧFIRST,
	BOOK_PART_KEY_KEYWORDSᐧLAST,

	//type BookInstance,
}
