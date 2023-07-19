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


interface CheckedNode {
	$v: number // schema version
	$type: NodeType
	$classes: string[]
	$content: string
	// sub-nodes referenced in she content
	$sub: {
		[id: string]: Partial<CheckedNode>
	}
	// hints for renderers. May or may not be used.
	$hints: {
		[k: string]: any
	}
}

type Node = Partial<CheckedNode>

///////

// aliases
type Document = Node

/////////////////////////////////////////////////

export {
	NodeType,
	type CheckedNode,
	type Node,

	type Document,
}
