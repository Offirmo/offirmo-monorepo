import { Enum } from 'typescript-string-enums'

/////////////////////////////////////////////////

const NodeType = Enum(
	// https://stackoverflow.com/questions/9189810/css-display-inline-vs-inline-block

	// display "inline"
	'fragmentⵧinline', // = span
	'strong', // strong but less strong than heading. Ex. ansi.bold
	'weak', // opposite of strong ;) Ex. ansi.dim
	'em', // TODO semantic difference with strong? Alternate? (= italic)

	// display "block"
	'fragmentⵧblock',  // = div
	'heading',
	'ol',
	'ul',
	'hr',

	// special
	'br',

	// internally used, don't mind, don't use directly
	'li',
)
type NodeType = Enum<typeof NodeType> // eslint-disable-line no-redeclare

// hints for progressive enhancement
// - for rendering, hints should be OPTIONAL and any renderer should be able to render decently without them
// - for non-rendering (ex. hypermedia features) hints can be made mandatory
interface BaseHints {
	[k: string]: any

	bullets_style?: 'none' // to remove bullets from lists

	// TODO clarify
	// known:
	// key, uuid, href, possible_emoji...
	// TODO "one-line summary?" does it belong here?
}

// using type instead of interface to prevent extra properties
// (not supposed to extend this)
type CheckedNode<Hints = BaseHints> = {
	$v: number // schema version
	$type: NodeType
	$classes: string[]
	$content: string
	// sub-nodes referenced in she content
	$sub: {
		[id: string]: Partial<CheckedNode<Hints>>
	}
	// hints for renderers. May or may not be used.
	$hints: Hints
}

type Node<Hints = BaseHints> = Partial<CheckedNode<Hints>>

// Node + stuff trivial to promote to a Node
type NodeLike<Hints = BaseHints> = Node<Hints> | string | number

///////

// aliases
type Document<Hints = {[k: string]: any}> = Node<Hints>

/////////////////////////////////////////////////

export {
	NodeType,

	type BaseHints,

	type CheckedNode,
	type Node,
	type NodeLike,

	type Document,
}
