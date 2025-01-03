import { Enum } from 'typescript-string-enums'
import { type Emoji } from '@offirmo-private/ts-types'
import { type Uri‿x, type Hyperlink } from '@offirmo-private/ts-types-web'
/////////////////////////////////////////////////

const NodeType = Enum(
	// https://stackoverflow.com/questions/9189810/css-display-inline-vs-inline-block

	// display "inline"
	'strong', // strong but less strong than heading. Ex. ansi.bold
	'weak', // opposite of strong ;) Ex. ansi.dim
	'em', // TODO clarify semantic difference with strong: Alternate? (= italic)
	'emoji', // OPTIONAL but useful to ensure a good rendering.
	         // This node type represent a single emoji.
	         // As of 2024, emojis are still very hard to handle properly
	         // ref: https://nolanlawson.com/2024/09/17/the-continuing-tragedy-of-emoji-on-the-web/
	         // hence deserving the help of this special node type
	'fragmentⵧinline', // = span

	// display "block"
	'heading',
	'ol',
	'ul',
	'hr',
	'fragmentⵧblock',  // = div

	// special
	'br', // Useful for poems etc.
	      // do not abuse, use other semantic elements (heading, lists) as much as possible before this one.
	      // REMINDER the client should be the one doing line breaks for long content

	// internally used, don't use directly
	'li',
)
type NodeType = Enum<typeof NodeType> // eslint-disable-line no-redeclare

// hints for progressive enhancement
// - for rendering, hints should be OPTIONAL and any renderer should be able to render decently without them
// - for non-rendering (ex. hypermedia features) hints can be made mandatory
interface Hints {
	href?: Uri‿x | Hyperlink // make this node a link to a specific resource
	bullets_style?: 'none' // for ul, to remove bullets (TODO ONE DAY also allow to customize?)
	key?: string // for ex. to recognize a specific content (do not abuse! Reminder to keep everything text-compatible)
	//uuid?: string // for ex. to recognize a specific resource (TODO review, should send JSON tohether instead or use actions)

	// emoji support: TODO one day, API following https://github.com/jdecked/twemoji
	possible_emoji?: Emoji // this emoji can be used to represent/augment this node

	[k: string]: any
}

// using type instead of interface to prevent extra properties
// (bc not supposed to extend this)
type CheckedNode = {
	$v: number // schema version

	$type: NodeType

	$content: string
	$sub: {
		// sub-nodes MAYBE referenced in the content by their id
		// Note: extraneous sub-nodes are allowed for convenience, excess will not be checked
		[id: string]: NodeLike
	}

	// hints for renderers. May or may not be used.
	$classes: string[]
	$hints: Hints
}

type Node = Partial<CheckedNode>

// Node + stuff trivial+safe to promote to a Node
type NodeLike = Node | string | number

///////

// aliases
type Document = Node

/////////////////////////////////////////////////

export {
	NodeType,

	type Hints,

	type CheckedNode,
	type Node,
	type NodeLike,

	type Document,
}
