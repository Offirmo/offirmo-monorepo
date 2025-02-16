import { LIB, SCHEMA_VERSION } from '../consts.ts'

import {
	NodeType,
	type Hints,
	type CheckedNode,
	type Node, type Document, type NodeLike,
} from '../l1-types/index.ts'
import { promoteꓽto_node } from '../l1-utils/promote.ts'
import { normalizeꓽnode } from '../l1-utils/normalize.ts'

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

	pushInlineFragment(str: string, options?: CommonOptions): Builder
	pushBlockFragment(str: string, options?: CommonOptions): Builder

	pushStrong(str: NodeLike, options?: CommonOptions): Builder
	pushEm(str: NodeLike, options?: CommonOptions): Builder
	pushWeak(str: NodeLike, options?: CommonOptions): Builder
	pushHeading(str: NodeLike, options?: CommonOptions): Builder
	pushHorizontalRule(): Builder
	pushLineBreak(): Builder

	pushKeyValue(key: NodeLike, value: NodeLike, options?: CommonOptions): Builder

	// node ref is auto added into content
	pushNode(node: NodeLike, options?: CommonOptions): Builder

	// Raw = NOTHING is added into content
	// useful for
	// 1. lists
	// 2. manual stuff
	pushRawNode(node: CheckedNode['$sub'][string], options?: CommonOptions): Builder
	pushRawNodes(nodes: CheckedNode['$sub']): Builder // batch version

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
		pushEm,
		pushWeak,
		pushHeading,
		pushHorizontalRule,
		pushLineBreak,

		pushKeyValue,

		done,
	}

	let sub_id = 0

	function addClass(...classes: string[]): Builder {
		$node.$classes = Array.from(new Set<string>([ ...$node.$classes, ...classes]))
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

	function _buildAndPush(builder: Builder, str: NodeLike, options: CommonOptions = {}) {
		if (typeof str === 'string')
			builder.pushText(str)
		else {
			builder.pushNode(str)
		}
		builder.addClass(...(options.classes || []))

		return pushNode(builder.done(), options)
	}


	function pushRawNode(node: CheckedNode['$sub'][string], options: CommonOptions = {}): Builder {
		const id = options.id || String(++sub_id).padStart(4, '0')
		$node.$sub[id] = node
		if (options.classes)
			$node.$classes.push(...options.classes)
		return builder
	}
	function pushRawNodes(nodes: CheckedNode['$sub']): Builder {
		$node.$sub = {
			...$node.$sub,
			...nodes,
		}
		return builder
	}

	function pushNode(node: NodeLike, options: CommonOptions = {}): Builder {
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

	function pushStrong(str: NodeLike, options?: CommonOptions): Builder {
		return _buildAndPush(strong(), str, options)
	}

	function pushEm(str: NodeLike, options?: CommonOptions): Builder {
		return _buildAndPush(em(), str, options)
	}

	function pushWeak(str: NodeLike, options?: CommonOptions): Builder {
		return _buildAndPush(weak(), str, options)
	}

	function pushHeading(str: NodeLike, options?: CommonOptions): Builder {
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

function em(): Builder {
	return create(NodeType.em)
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
	em,
	weak,
	emoji,
	listⵧordered,
	listⵧunordered,
	key_value,
}
