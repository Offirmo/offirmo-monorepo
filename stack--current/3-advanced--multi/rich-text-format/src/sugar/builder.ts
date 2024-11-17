import { LIB, SCHEMA_VERSION } from '../consts.js'

import {
	NodeType,
	type Hints,
	type CheckedNode,
	type Node,
	type Document, NodeLike,
} from '../types/index.js'
import { promoteꓽto_node } from '../utils/promote.js'
import { normalizeꓽnode } from '../utils/normalize.js'

/////////////////////////////////////////////////

interface CommonOptions {
	id?: string
	classes?: string[]
}

interface Builder {
	addClass(...classes: string[]): Builder
	addHints(hints: Partial<Hints>): Builder

	pushText(str: string): Builder
	pushEmoji(e: string, options?: CommonOptions): Builder

	// node ref is auto added into content
	pushNode(node: Node, options?: CommonOptions): Builder

	// nothing is added in content
	// useful for
	// 1. lists
	// 2. manual stuff
	pushRawNode(node: Node, options?: CommonOptions): Builder
	pushRawNodes(nodes: { [id: string]: Node }): Builder // batch version

	pushInlineFragment(str: string, options?: CommonOptions): Builder
	pushBlockFragment(str: string, options?: CommonOptions): Builder

	pushStrong(str: string, options?: CommonOptions): Builder
	pushWeak(str: string, options?: CommonOptions): Builder
	pushHeading(str: string, options?: CommonOptions): Builder
	pushHorizontalRule(): Builder
	pushLineBreak(): Builder

	pushKeyValue(key: Node | string, value: Node | string | number, options?: CommonOptions): Builder

	done(): CheckedNode
}

/////////////////////////////////////////////////

function _create($node: CheckedNode): Builder {
	const builder: Builder = {
		addClass,
		addHints,

		pushText,
		pushEmoji,

		pushNode,
		pushRawNode,
		pushRawNodes,

		pushInlineFragment,
		pushBlockFragment,

		pushStrong,
		pushWeak,
		pushHeading,
		pushHorizontalRule,
		pushLineBreak,

		pushKeyValue,

		done,
	}

	let sub_id = 0

	function addClass(...classes: string[]): Builder {
		$node.$classes.push(...classes)
		return builder
	}

	function addHints(hints: Hints): Builder {
		$node.$hints = {
			...$node.$hints,
			...hints,
		}
		return builder
	}

	function pushText(str: string): Builder {
		$node.$content += str
		return builder
	}

	function _buildAndPush(builder: Builder, str: string, options: CommonOptions = {}) {
		options = {
			classes: [],
			...options,
		}
		const node = builder
			.pushText(str)
			.addClass(...options.classes!)
			.done()
		delete options.classes // TODO immu

		return pushNode(node, options)
	}


	function pushRawNode(node: Node, options: CommonOptions = {}): Builder {
		const id = options.id || String(++sub_id).padStart(4, '0')
		$node.$sub[id] = node
		if (options.classes)
			$node.$classes.push(...options.classes)
		return builder
	}
	function pushRawNodes(nodes: { [id: string]: Node }): Builder {
		$node.$sub = {
			...$node.$sub,
			...nodes,
		}
		return builder
	}

	function pushNode(node: Node, options: CommonOptions = {}): Builder {
		const id = options.id || ('000' + ++sub_id).slice(-4)
		$node.$content += `⎨⎨${id}⎬⎬`
		return pushRawNode(node, { ...options, id })
	}

	function pushInlineFragment(str: string, options?: CommonOptions): Builder {
		return _buildAndPush(fragmentⵧinline(), str, options)
	}

	function pushBlockFragment(str: string, options?: CommonOptions): Builder {
		return _buildAndPush(fragmentⵧblock(), str, options)
	}

	function pushEmoji(str: string, options?: CommonOptions): Builder {
		// TODO extra emoji details
		// TODO recognize emoji code
		return _buildAndPush(emoji(), str, options)
	}

	function pushStrong(str: string, options?: CommonOptions): Builder {
		return _buildAndPush(strong(), str, options)
	}

	function pushWeak(str: string, options?: CommonOptions): Builder {
		return _buildAndPush(weak(), str, options)
	}

	function pushHeading(str: string, options?: CommonOptions): Builder {
		return _buildAndPush(heading(), str, options)
	}

	function pushHorizontalRule(): Builder {
		$node.$content += '⎨⎨hr⎬⎬'
		return builder
	}

	function pushLineBreak(): Builder {
		$node.$content += '⎨⎨br⎬⎬'
		return builder
	}

	function pushKeyValue(key: Node | string, value: Node | string | number, options: CommonOptions = {}): Builder {
		if ($node.$type !== NodeType.ol && $node.$type !== NodeType.ul)
			throw new Error(`${LIB}: Key/value is intended to be used in a ol/ul only!`)

		options = {
			classes: [],
			...options,
		}
		const kv_node: Node = key_value(key, value)
			.addClass(...options.classes!)
			.done()
		delete options.classes // TODO review

		return pushRawNode(kv_node, options)
	}

	// TODO rename to value() like lodash chain?
	function done(): CheckedNode {
		return $node
	}

	return builder
}

function create($type: NodeType): Builder {

	const $node: CheckedNode = {
		$v: SCHEMA_VERSION,
		$type,
		$classes: [],
		$content: '',
		$sub: {},
		$hints: {} as Hints,
	}

	return _create($node)
}

function createⵧfrom_content($raw: NodeLike): Builder {
	return _create(
		normalizeꓽnode(
			promoteꓽto_node($raw)
		)
	)
}

function fragmentⵧinline(): Builder {
	return create(NodeType.fragmentⵧinline)
}
function fragmentⵧblock(): Builder {
	return create(NodeType.fragmentⵧblock)
}

function heading(): Builder {
	return create(NodeType.heading)
}

function strong(): Builder {
	return create(NodeType.strong)
}

function weak(): Builder {
	return create(NodeType.weak)
}

function emoji(): Builder {
	return create(NodeType.emoji)
}

function listⵧordered(): Builder {
	return create(NodeType.ol)
}
function listⵧunordered(): Builder {
	return create(NodeType.ul)
}

function key_value(key: Node | string, value: Node | string | number): Builder {
	const key_node: Node = promoteꓽto_node(key)

	const value_node: Node = promoteꓽto_node(value)

	return fragmentⵧinline()
		.pushNode(key_node, { id: 'key' })
		.pushText(': ')
		.pushNode(value_node, { id: 'value' })
}

/////////////////////////////////////////////////

export {
	// for convenience
	NodeType,
	type Document,
	type Builder,

	create,
	createⵧfrom_content,

	fragmentⵧinline,
	fragmentⵧblock,
	heading,
	strong,
	weak,
	emoji,
	listⵧordered,
	listⵧunordered,
	key_value,
}
