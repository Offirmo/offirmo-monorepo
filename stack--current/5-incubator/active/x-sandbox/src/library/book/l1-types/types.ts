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

import type { Emoji, PositiveInteger, Url‿str } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

/////////////////////////////////////////////////
// Those types purely describe the technical aspect of displaying a book
// any "meta" feature is in the subsequent "book experience" type (later)

type BookUId = string

type Text = RichText.Document | string

type Author = Text | undefined // undef = unknown

/////////////////////////////////////////////////

// Because we have lazy loading,
// we want to be able to progressively load a book, starting from the most basic infos
// cover = 1st level, needed to display a list of books and decide whether one wants to read it
interface BookCover {
	title: Text
	author?: Author
	subtitles?: Array<Text> // "title" in a wide sense. Anything accompanying the title we want to be displayed on the cover. By order of most importance.

	// since we have lazy loading, allow hints for overall data
	// that would otherwise need a complete load, ex. number of pages
	hints?: {
		pages_count?: PositiveInteger
		emoji?: Emoji // 📔📕📗📘📙📓📒📃📜📄📰🗺
		icon?: Url‿str
		picture?: Url‿str
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
	uid: BookUId // for referencing

	title: Text // mandatory property (needed to properly inherit)

	is_template?: true // TODO review
	// TODO declare template slots?
}

// basic types needed for advanced stuff

// path to a specific page, for ex. for bookmarking
type BookPageReference = string // TODO clarify the format, BookPartKey separated by XX

// path to any part of a book
type BookPartReference = string // TODO clarify the format


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
