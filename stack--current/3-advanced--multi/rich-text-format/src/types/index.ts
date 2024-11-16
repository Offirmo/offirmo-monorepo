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
	'emoji', // unfortunately, as of 2024, emojis are still very hard to handle properly, hence deserving a special node type (optional but recommended)
	         // this node type represent a single emoji
	         // https://nolanlawson.com/2024/09/17/the-continuing-tragedy-of-emoji-on-the-web/

	// special
	'br', // Useful for poems etc.
	      // do not abuse, use other semantic elements (heading, lists) as much as possible before this one.
	      // Also the client should be the one doing line breaks for long content

	// internally used, don't use directly
	'li',
)
type NodeType = Enum<typeof NodeType> // eslint-disable-line no-redeclare

// hints for progressive enhancement
// - for rendering, hints should be OPTIONAL and any renderer should be able to render decently without them
// - for non-rendering (ex. hypermedia features) hints can be made mandatory
interface Hints {
	[k: string]: any

	bullets_style?: 'none' // for ul, to remove or customize bullets

	// TODO emoji API following https://github.com/jdecked/twemoji


	// TODO clarify
	// known:
	// key, uuid, href, possible_emoji...
	// TODO "one-line summary?" does it belong here?
}

// using type instead of interface to prevent extra properties
// (not supposed to extend this)
type CheckedNode = {
	$v: number // schema version
	$type: NodeType
	$classes: string[]
	$content: string
	// sub-nodes referenced in she content
	$sub: {
		[id: string]: Partial<CheckedNode>
	}
	// hints for renderers. May or may not be used.
	$hints: Hints
}

type Node = Partial<CheckedNode>

// Node + stuff trivial to promote to a Node
type NodeLike = Node | string | number

///////

// aliases
type Document<Hints = {[k: string]: any}> = Node

/////////////////////////////////////////////////

export {
	NodeType,

	type Hints,

	type CheckedNode,
	type Node,
	type NodeLike,

	type Document,
}
