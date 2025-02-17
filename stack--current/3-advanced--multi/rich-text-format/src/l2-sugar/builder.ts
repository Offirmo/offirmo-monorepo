import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import { LIB, SCHEMA_VERSION } from '../consts.ts'

import {
	NodeType,
	type Hints,
	type CheckedNode,
	type Node, type Document, type NodeLike, isꓽNode,
} from '../l1-types/index.ts'
import { promoteꓽto_node } from '../l1-utils/promote.ts'
import { normalizeꓽnode } from '../l1-utils/normalize.ts'

/////////////////////////////////////////////////

interface CommonOptions {
	id?: string
	classes?: string[]
}

type SubNodes = Immutable<CheckedNode['$sub']>
type SubNode = CheckedNode['$sub'][string]

interface Builder {
	addClass(...classes: ReadonlyArray<string>): Builder
	addHints(hints: Partial<Hints>): Builder

	pushText(str: Immutable<Exclude<NodeLike, Node>>): Builder
	pushEmoji(e: string, options?: Immutable<CommonOptions>): Builder

	pushInlineFragment(str: SubNode, options?: Immutable<CommonOptions>): Builder
	pushBlockFragment(str: SubNode, options?: Immutable<CommonOptions>): Builder

	pushStrong(str: SubNode, options?: Immutable<CommonOptions>): Builder
	pushEm(str: SubNode, options?: Immutable<CommonOptions>): Builder
	pushWeak(str: SubNode, options?: Immutable<CommonOptions>): Builder
	pushHeading(str: SubNode, options?: Immutable<CommonOptions>): Builder
	pushHorizontalRule(): Builder
	pushLineBreak(): Builder

	pushKeyValue(key: SubNode, value: SubNode, options?: Immutable<CommonOptions>): Builder

	// node ref is auto added into content
	pushNode(node: SubNode, options?: Immutable<CommonOptions>): Builder

	// Raw = NOTHING is added into content
	// useful for
	// 1. lists
	// 2. manual stuff
	pushRawNode(node: SubNode, options?: Immutable<CommonOptions>): Builder
	pushRawNodes(nodes: SubNodes): Builder // batch version

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
	//let locale = 'en-US' TODO one day

	function addClass(...classes: ReadonlyArray<string>): Builder {
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

	function pushText(str: Immutable<Exclude<NodeLike, Node>>): Builder {
		// TODO one day number formatting with locale
		$node.$content += str
		return builder
	}

	function _buildAndPush(builder: Builder, str: SubNode, options: Immutable<CommonOptions> = {}) {
		if (isꓽNode(str))
			builder.pushNode(str)
		else
			builder.pushText(str)

		builder.addClass(...(options.classes || []))

		return pushNode(builder.done(), options)
	}


	function pushRawNode(node: SubNode, options: Immutable<CommonOptions> = {}): Builder {
		const id = options.id || String(++sub_id).padStart(4, '0')
		$node.$sub[id] = node
		if (options.classes)
			addClass(...options.classes)
		return builder
	}
	function pushRawNodes(nodes: SubNodes): Builder {
		Object.entries(nodes).forEach(([id, node]) => pushRawNode(node, { id }))
		return builder
	}

	function pushNode(node: SubNode, options: Immutable<CommonOptions> = {}): Builder {
		const id = options.id || ('000' + ++sub_id).slice(-4)
		$node.$content += `⎨⎨${id}⎬⎬`
		return pushRawNode(node, { ...options, id })
	}

	function pushInlineFragment(str: SubNode, options?: Immutable<CommonOptions>): Builder {
		return _buildAndPush(fragmentⵧinline(), str, options)
	}

	function pushBlockFragment(str: SubNode, options?: Immutable<CommonOptions>): Builder {
		return _buildAndPush(fragmentⵧblock(), str, options)
	}

	function pushEmoji(str: string, options?: Immutable<CommonOptions>): Builder {
		// TODO extra emoji details
		// TODO recognize emoji code
		return _buildAndPush(emoji(), str, options)
	}

	function pushStrong(str: SubNode, options?: Immutable<CommonOptions>): Builder {
		return _buildAndPush(strong(), str, options)
	}

	function pushEm(str: SubNode, options?: Immutable<CommonOptions>): Builder {
		return _buildAndPush(em(), str, options)
	}

	function pushWeak(str: SubNode, options?: Immutable<CommonOptions>): Builder {
		return _buildAndPush(weak(), str, options)
	}

	function pushHeading(str: SubNode, options?: Immutable<CommonOptions>): Builder {
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

	function pushKeyValue(key: SubNode, value: SubNode, options: Immutable<CommonOptions> = {}): Builder {
		if ($node.$type !== NodeType.ol && $node.$type !== NodeType.ul)
			throw new Error(`${LIB}: Key/value is intended to be used in a ol/ul only!`)

		return pushRawNode(
				keyꓺvalue(key, value).done(),
				options,
			)
	}

	// TODO rename to value() like lodash chain?
	function done(): CheckedNode {
		return $node
	}

	return builder
}

// TODO one day add option to
function create($type: NodeType, content?: Immutable<NodeLike>): Builder {

	const $node: CheckedNode = ((): CheckedNode => {
		if (isꓽNode(content)) {
			// "lift" it to avoid an unneeded subnode
			// also make mutable
			return {
				$v: SCHEMA_VERSION,
				$type,
				$classes: [ ...(content.$classes || []) ],
				$content: content.$content || '',
				$sub: content.$sub || {},
				$hints: content.$hints
					? structuredClone<CheckedNode['$hints']>(content.$hints as any)
					: {},
			}
		}

		return {
			$v: SCHEMA_VERSION,
			$type,
			$classes: [],
			$content: '',
			$sub: {},
			$hints: {} as Hints,
		}
	})()



	return _create($node)
}

function fragmentⵧinline(content?: Immutable<NodeLike>): Builder {
	return create(NodeType.fragmentⵧinline, content)
}
function fragmentⵧblock(content?: Immutable<NodeLike>): Builder {
	return create(NodeType.fragmentⵧblock, content)
}

function heading(content?: Immutable<NodeLike>): Builder {
	return create(NodeType.heading, content)
}

function strong(content?: Immutable<NodeLike>): Builder {
	return create(NodeType.strong, content)
}

function em(content?: Immutable<NodeLike>): Builder {
	return create(NodeType.em, content)
}

function weak(content?: Immutable<NodeLike>): Builder {
	return create(NodeType.weak, content)
}

function emoji(content?: Immutable<NodeLike>): Builder {
	return create(NodeType.emoji, content)
}

function listⵧordered(): Builder {
	return create(NodeType.ol)
}
function listⵧunordered(): Builder {
	return create(NodeType.ul)
}

function keyꓺvalue(key: SubNode, value: SubNode): Builder {
	return fragmentⵧinline()
		.pushNode(key, { id: 'key' })
		.pushText(': ')
		.pushNode(value, { id: 'value' })
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
	em,
	weak,
	emoji,
	listⵧordered,
	listⵧunordered,
	keyꓺvalue,
}
