import { LIB, SCHEMA_VERSION } from '../consts.js'

import {
	NodeType,
	type BaseHints,
	type CheckedNode,
	type Node,
	type Document,
} from '../types.js'
import { promoteꓽto_node } from '../utils/promote.js'

/////////////////////////////////////////////////

interface CommonOptions {
	id?: string
	classes?: string[]
}

interface Builder<Hints = BaseHints> {
	addClass(...classes: string[]): Builder<Hints>
	addHints(hints: Partial<Hints>): Builder<Hints>

	pushText(str: string): Builder<Hints>

	// nothing is added in content
	// useful for
	// 1. lists
	// 2. manual stuff
	pushRawNode(node: Node<Hints>, options?: CommonOptions): Builder<Hints>

	// node ref is auto added into content
	pushNode(node: Node<Hints>, options?: CommonOptions): Builder<Hints>

	pushInlineFragment(str: string, options?: CommonOptions): Builder<Hints>
	pushBlockFragment(str: string, options?: CommonOptions): Builder<Hints>
	pushStrong(str: string, options?: CommonOptions): Builder<Hints>
	pushWeak(str: string, options?: CommonOptions): Builder<Hints>
	pushHeading(str: string, options?: CommonOptions): Builder<Hints>
	pushHorizontalRule(): Builder<Hints>
	pushLineBreak(): Builder<Hints>

	pushKeyValue(key: Node<Hints> | string, value: Node<Hints> | string | number, options?: CommonOptions): Builder<Hints>

	done(): CheckedNode<Hints>
}

/////////////////////////////////////////////////

function create<Hints>($type: NodeType): Builder<Hints> {

	const $node: CheckedNode<Hints> = {
		$v: SCHEMA_VERSION,
		$type,
		$classes: [],
		$content: '',
		$sub: {},
		$hints: {} as any,
	}

	const builder: Builder<Hints> = {
		addClass,
		addHints,

		pushText,
		pushRawNode,
		pushNode,

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

	function addClass(...classes: string[]): Builder<Hints> {
		$node.$classes.push(...classes)
		return builder
	}

	function addHints(hints: { [k: string]: any }): Builder<Hints> {
		$node.$hints = {
			...$node.$hints,
			...hints,
		}
		return builder
	}

	function pushText(str: string): Builder<Hints> {
		$node.$content += str
		return builder
	}

	function _buildAndPush(builder: Builder<Hints>, str: string, options: CommonOptions = {}) {
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


	function pushRawNode(node: Node<Hints>, options: CommonOptions = {}): Builder<Hints> {
		const id = options.id || ('000' + ++sub_id).slice(-4)
		$node.$sub[id] = node
		if (options.classes)
			$node.$classes.push(...options.classes)
		return builder
	}

	function pushNode(node: Node<Hints>, options: CommonOptions = {}): Builder<Hints> {
		const id = options.id || ('000' + ++sub_id).slice(-4)
		$node.$content += `⎨⎨${id}⎬⎬`
		return pushRawNode(node, { ...options, id })
	}

	function pushInlineFragment(str: string, options?: CommonOptions): Builder<Hints> {
		return _buildAndPush(fragmentⵧinline(), str, options)
	}

	function pushBlockFragment(str: string, options?: CommonOptions): Builder<Hints> {
		return _buildAndPush(fragmentⵧblock(), str, options)
	}

	function pushStrong(str: string, options?: CommonOptions): Builder<Hints> {
		return _buildAndPush(strong(), str, options)
	}

	function pushWeak(str: string, options?: CommonOptions): Builder<Hints> {
		return _buildAndPush(weak(), str, options)
	}

	function pushHeading(str: string, options?: CommonOptions): Builder<Hints> {
		return _buildAndPush(heading(), str, options)
	}

	function pushHorizontalRule(): Builder<Hints> {
		$node.$content += '⎨⎨hr⎬⎬'
		return builder
	}

	function pushLineBreak(): Builder<Hints> {
		$node.$content += '⎨⎨br⎬⎬'
		return builder
	}

	function pushKeyValue(key: Node<Hints> | string, value: Node<Hints> | string | number, options: CommonOptions = {}): Builder<Hints> {
		if ($node.$type !== NodeType.ol && $node.$type !== NodeType.ul)
			throw new Error(`${LIB}: Key/value is intended to be used in a ol/ul only!`)

		options = {
			classes: [],
			...options,
		}
		const kv_node: Node<Hints> = key_value<Hints>(key, value)
			.addClass(...options.classes!)
			.done()
		delete options.classes // TODO review

		return pushRawNode(kv_node, options)
	}

	// TODO rename value() like lodash chain?
	function done(): CheckedNode<Hints> {
		return $node
	}

	return builder
}

function fragmentⵧinline<Hints = BaseHints>(): Builder<Hints> {
	return create(NodeType.fragmentⵧinline)
}
function fragmentⵧblock<Hints = BaseHints>(): Builder<Hints> {
	return create(NodeType.fragmentⵧblock)
}

function heading<Hints = BaseHints>(): Builder<Hints> {
	return create(NodeType.heading)
}

function strong<Hints = BaseHints>(): Builder<Hints> {
	return create(NodeType.strong)
}

function weak<Hints = BaseHints>(): Builder<Hints> {
	return create(NodeType.weak)
}

function listⵧordered<Hints = BaseHints>(): Builder<Hints> {
	return create(NodeType.ol)
}
function listⵧunordered<Hints = BaseHints>(): Builder<Hints> {
	return create(NodeType.ul)
}

function key_value<Hints = BaseHints>(key: Node<Hints> | string, value: Node<Hints> | string | number): Builder<Hints> {
	const key_node: Node<Hints> = promoteꓽto_node<Hints>(key)

	const value_node: Node<Hints> = promoteꓽto_node<Hints>(value)

	return fragmentⵧinline<Hints>()
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

	fragmentⵧinline,
	fragmentⵧblock,
	heading,
	strong,
	weak,
	listⵧordered,
	listⵧunordered,
	key_value,
}
