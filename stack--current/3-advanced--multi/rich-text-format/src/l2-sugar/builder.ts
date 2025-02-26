import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { hasꓽemoji } from '@offirmo-private/type-detection'
import {
	assertꓽstringⵧnormalized,
	assertꓽstringⵧnormalized_and_trimmed,
} from '@offirmo-private/normalize-string'

import { LIB, SCHEMA_VERSION } from '../consts.ts'

import {
	NodeType,
	type Hints,
	type CheckedNode,
	type Node, type Document, type NodeLike,
	isꓽNode,
	getꓽtype,
	getꓽdisplay_type,
} from '../l1-types/index.ts'
import { promoteꓽto_node, promoteꓽto_string_for_node_content } from '../l1-utils/promote.ts'

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
	//pushListItem No! this is an internal node type, just use pushNode(1, 'xxx') instead

	// node ref is auto added into content
	pushNode(node: SubNode, options?: Immutable<Pick<CommonOptions, 'id'>>): Builder

	// Raw = NOTHING is added into content (this node may end up not being referenced)
	// useful for
	// 1. lists
	// 2. manual stuff
	pushRawNode(node: SubNode, options?: Immutable<CommonOptions>): Builder
	pushRawNodes(nodes: SubNodes): Builder // batch version

	done(): CheckedNode
}

/////////////////////////////////////////////////

function _createꓽbuilder($node: CheckedNode): Builder {
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

	const built_node__display_type = getꓽdisplay_type($node)

	let sub_id = 0
	function _get_next_id() {
		return String(++sub_id).padStart(4, '0')
	}

	//let locale = 'en-US' TODO one day

	function addClass(...classes: ReadonlyArray<string>): Builder {
		try {
			classes.forEach(assertꓽstringⵧnormalized_and_trimmed)
		}
		catch (cause) {
			const err = new Error(`${LIB}: sugar: addClass(): Invalid class name(s) !`)
			err.cause = cause
			throw err
		}

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

		switch (typeof str) {
			case 'number':
				// fallthrough
			case 'string': {
				str = promoteꓽto_string_for_node_content(str) // contains assertions
				assert(!!str, `${LIB}: sugar: pushText(): Empty string?!`)

				// TODO one day
				//if (hasꓽemoji(str)) {
					//assert($node.$type === NodeType.emoji, `${LIB}: sugar: pushText(): Emoji detected in a non-emoji node!`)
				//}
				break
			}

			default:
				assert(false, `${LIB}: sugar: pushText(): Unknown pseudo-node type!`)
		}

		$node.$content += str
		return builder
	}

	function _buildAndPush(builder: Builder, str: SubNode, options: Immutable<CommonOptions> = {}) {
		if (isꓽNode(str))
			builder.pushNode(str)
		else
			builder.pushText(str)

		builder.addClass(...(options.classes || []))

		return pushNode(builder.done(), options.id ? { id: options.id } : undefined)
	}


	function pushRawNode(subnode: SubNode, options: Immutable<CommonOptions> = {}): Builder {

		// params check
		if (Object.keys(options).filter(k => k !== 'id').length)
			assert(false, `${LIB}: sugar: pushRawNode(): Cannot pass any option other than id!`) // make no sense at the level of this primitive. Other options should be filtered out by the caller.

		// sanity checks
		assert(getꓽtype(subnode) !== NodeType._li, `${LIB}: sugar: The LI type is just for internal use during walk, end users should not use it!`)
		// 1. inline vs block
		assert(built_node__display_type === 'block' || getꓽdisplay_type(subnode) !== 'block', `${LIB}: sugar: Cannot push a block node into an inline node!`)
		// 2. list item
		/*if (isꓽlist($node)) {
			if (getꓽtype(subnode) !== NodeType.li) {
				assert(false, `${LIB}: sugar: Cannot push a non-list-item node into a list!`)
			}
		}
		else {
			if (getꓽtype(subnode) === NodeType.li) {
				assert(false, `${LIB}: sugar: Cannot push a list-item node into a non-list!`)
			}
		}*/

		const id = options.id || _get_next_id()
		assertꓽstringⵧnormalized_and_trimmed(id)
		$node.$sub[id] = subnode
		return builder
	}
	function pushRawNodes(nodes: SubNodes): Builder {
		Object.entries(nodes).forEach(([id, node]) => pushRawNode(node, { id }))
		return builder
	}

	function pushNode(node: SubNode, options: Immutable<CommonOptions> = {}): Builder {
		const id = options.id || _get_next_id()
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
		assert(built_node__display_type === 'block', `${LIB}: sugar: Cannot push a hr block node into an inline node!`)
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

function _create($type: NodeType, content: Immutable<NodeLike> = ''): Builder {
	const $node_base = ((): Immutable<Node> => {
		if (isꓽNode(content)) {
			// "lift" it to avoid an unneeded subnode
			// also make mutable

			const display_typeⵧsource = getꓽdisplay_type(content)
			const display_typeⵧtarget = getꓽdisplay_type({ $type })
			if (display_typeⵧtarget === 'inline' && display_typeⵧsource === 'block') {
				// wrong lifting
				assert(false, `${LIB}: sugar: Cannot lift init block node into an inline node!`)
			}

			const typeⵧsource = getꓽtype(content)
			if (typeⵧsource === $type) {
				// TODO review, could be an assertion from an unknown type
				assert(false, `${LIB}: sugar: No reason to lift init node into the same node type! Are you sure you want to do that?`)
			}
			if (typeⵧsource !== NodeType.fragmentⵧinline && typeⵧsource !== NodeType.fragmentⵧblock) {
				// we're losing semantic infos. This should be pushed as a sub-node instead
				// TODO review should this happen automatically?
				assert(false, `${LIB}: sugar: Cannot lift non-trivial init node into another node type!`)
			}

			return content
		}

		return promoteꓽto_node(content)
	})()

	const $node: CheckedNode =  {
		$v: SCHEMA_VERSION,
		$type,
		$classes: [...($node_base.$classes || [])],
		$content: $node_base.$content || '',
		$sub: $node_base.$sub || {},
		$hints: $node_base.$hints
			? structuredClone<CheckedNode['$hints']>($node_base.$hints as any)
			: {},
	}

	return _createꓽbuilder($node)
}

function fragmentⵧinline(content?: Immutable<NodeLike>): Builder {
	return _create(NodeType.fragmentⵧinline, content)
}
function strong(content?: Immutable<NodeLike>): Builder {
	return _create(NodeType.strong, content)
}
function em(content?: Immutable<NodeLike>): Builder {
	return _create(NodeType.em, content)
}
function weak(content?: Immutable<NodeLike>): Builder {
	return _create(NodeType.weak, content)
}
function emoji(content?: Immutable<NodeLike>): Builder {
	return _create(NodeType.emoji, content)
}

function fragmentⵧblock(content?: Immutable<NodeLike>): Builder {
	return _create(NodeType.fragmentⵧblock, content)
}
function heading(content?: Immutable<NodeLike>): Builder {
	return _create(NodeType.heading, content)
}
function listⵧordered(): Builder {
	return _create(NodeType.ol)
}
function listⵧunordered(): Builder {
	return _create(NodeType.ul)
}
// reminder: hr is through pushHorizontalRule

// reminder: br is through pushLineBreak
// reminder: li is through pushListItem

function keyꓺvalue(key: SubNode, value: SubNode): Builder {
	return fragmentⵧblock() // K/V are meant to be separated, they can't be inline
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

	_create,

	fragmentⵧinline,
	strong,
	em,
	weak,
	emoji,

	fragmentⵧblock,
	heading,
	listⵧordered,
	listⵧunordered,

	keyꓺvalue,
}
