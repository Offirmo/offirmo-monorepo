import { Enum } from 'typescript-string-enums'
import type { Emoji, Immutable, JSON } from '@offirmo-private/ts-types'
import type { Hyperlink‿x } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////


// using type instead of interface to prevent extra properties
// (bc not supposed to extend this)
type CheckedNode = {
	$v: number // schema version

	$type: NodeType

	$heading: NodeLike | null
	$content:
		| NodeLike
		| Array<NodeLike>

	$sub: {
		// content that can be referenced by their id
		// Note: unused are allowed for convenience, excess will not be checked
		[id: SubNodeId]: NodeLike // Immutable to clearly convey that a node will not modify its given sub-nodes NOO! actually it allows to prepare node and improving them later!
	}

	// hints for renderers. May or may not be used.
	// NOTE should be still working even if stripped TODO review
	$classes: string[]
	$hints: Hints
}


const NodeType = Enum(
	// https://stackoverflow.com/questions/9189810/css-display-inline-vs-inline-block

	// display "inline"
	// strong > em > normal > weak
	// https://www.shecodes.io/athena/7571-understanding-the-difference-between-strong-and-em-in-html
	// https://stackoverflow.com/questions/1936864/what-is-the-difference-between-strong-and-em-tags
	'strong', // emphasis -- strong (but less strong than heading) usually rendered as bold.
	'em',     // emphasis -- medium. usually rendered as italic.
	'weak',   // DE-emphasis, ex. ansi.dim
	'emoji', // OPTIONAL but useful to ensure a good rendering.
	         // This node type represent a single emoji.
	         // As of 2024, emojis are still very hard to handle properly
	         // ref: https://nolanlawson.com/2024/09/17/the-continuing-tragedy-of-emoji-on-the-web/
	         // hence deserving the help of this special node type
	'fragmentⵧinline', // = span

	// display "block"
	//'heading', integrated
	'ol',
	'ul',
	'hr',
	'fragmentⵧblock',  // = div

	// special
	'br', // Useful for poems etc.
	      // do not abuse, use other semantic elements (heading, lists) as much as possible before this one.
	      // REMINDER the client should be the one doing line breaks for long content

	// internally used, don't use directly
	// the key-value semantic is already semantic enough to describe a list
	'_li',
)
type NodeType = Enum<typeof NodeType> // eslint-disable-line no-redeclare

// hints for progressive enhancement
// - for rendering, hints should be OPTIONAL and any renderer should be able to render decently without them
// - for non-rendering (ex. hypermedia features) hints can be made mandatory
// UnderlyingData = JSON =  no, causes error "Type instantiation is excessively deep and possibly infinite."
interface Hints<UnderlyingData = any, HyperLink = Hyperlink‿x> {

	// string or keyword to use as bullets. to remove bullets: ''
	// https://www.w3schools.com/cssref/pr_list-style-type.php
	list__style__type?: string

	possible_emoji?: Emoji // this emoji can be used to represent/augment this node

	underlying__data?: UnderlyingData // the resource data this representation was rendered from. Usage: a better renderer (ex. interactive widget) may ignore the rich text and re-render from this instead
	//underlying__uuid?: string // for ex. to recognize a specific resource without attaching it to the content TODO review duplicate of href?

	// Hypermedia
	href?: HyperLink // make this node as an anchor to another Hypermedia resource
	// advanced = moved to dedicated OHA lib

	// TODO styles TODO colors

	key?: string // for ex. to recognize a specific content (do not abuse! Reminder to keep everything text-compatible)

	// anything allowed
	[k: string]: any
}

type SubNodeId = string


type Node = Partial<CheckedNode>

// Node + stuff trivial+safe to promote to a Node
type NodeLike =
	| string
	| number
	| Node
	// We want Nodes to be natively JSON serializable, so no BigInt, date...
	// boolean, null = let's wait before assigning meaning to them

///////

// aliases
type Document = Node

/////////////////////////////////////////////////

export {
	NodeType,

	type Hints,

	type SubNodeId,
	type CheckedNode,
	type Node,
	type NodeLike,

	type Document,
}
