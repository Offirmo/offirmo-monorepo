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


/////////////////////////////////////////////////
// Those types purely describe the technical aspect of displaying a book
// any "meta" feature is in the subsequent "book experience" type (later)

type BookUId = string

// smallest unit of a "book" that can be displayed / linked to / have a "next" button
// TODO review "auto splitting of long text" aka. auto splitting into pages
interface Page {
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
	title?: string
	titleⵧsub?: string
	// author?

	parts_type?: string
	parts: {
		[k: string]: Book | BookPart | Page | string
	}
}

// top part
// that can be independently considered
interface Book extends BookPart {
	uuid: BookUId // for referencing
	title: string

	is_template?: true
	
	// TODO declare template slots?
}

// some books can be customized and thus have several instances
// ex.
// - a child book customized so that the hero has the child's name
// - an RPG where the book refers to a changeable settings (randomized wordlbuiding, hero name, past actions...)
interface BookInstance {
	book_uuid: string
	params: { // TODO clarify
		[key: string]: string
	}
}


/////////////////////////////////////////////////

export {
	type Page,
	type BookPart,

	type BookUId,
	type Book,
	type BookInstance,
}
