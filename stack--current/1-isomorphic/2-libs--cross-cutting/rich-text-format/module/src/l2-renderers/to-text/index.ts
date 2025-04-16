import type { Immutable } from '@offirmo-private/ts-types'

import type { CheckedNode, NodeLike } from '../../l1-types/index.ts'
import { getꓽdisplay_type } from '../../l1-types/guards.ts'

import { promoteꓽto_node } from '../../l1-utils/promote.ts'
import { normalizeꓽnode } from '../../l1-utils/normalize.ts'

import { isꓽlink, isꓽlistⵧKV } from '../common.ts'
import {
	SPECIAL_LIST_NODE_CONTENT_KEY,
	type BaseRenderingOptions,
	type WalkerCallbacks,
	walk,
	DEFAULT_RENDERING_OPTIONSⵧWalk,
} from '../walk.ts'

/////////////////////////////////////////////////

interface RenderingOptionsⵧToText extends BaseRenderingOptions {
	use_hints?: boolean // use known hints to improve rendering? or ignore them and render the most basic style?
	style:
		| 'basic'    // text only
		| 'advanced' // more intelligent: detect KV lists; allow bullet-less lists
		| 'markdown'
}
const DEFAULT_RENDERING_OPTIONSⵧToText = Object.freeze<RenderingOptionsⵧToText>({
	...DEFAULT_RENDERING_OPTIONSⵧWalk,
	use_hints: true,
	style: 'advanced',
})

type State = {
	sub_nodes: Immutable<CheckedNode>[] // sometimes need to remember them, for ex. for K/V lists

	// whether the current $node starts or/and end with NL
	// needed to coalesce new lines.
	// for ex. if the current block starts with a NL and its immediate child also starts with a NL, we should have only 1 NL
	starts_with_block: boolean
	ends_with_block: boolean
	trailing_spaces: string

	// # of lines to put on top and bottom
	// (esp. for markdown)
	marginⵧtop‿lines: number
	marginⵧbottom‿lines: number

	nested_list_depth: number

	str: string
}

/////////////////////////////////////////////////
// callbacks

const create_state: WalkerCallbacks<State, RenderingOptionsⵧToText>['create_state'] = (parent_state) => {
	return {
		sub_nodes: [],
		starts_with_block: false,
		ends_with_block: false,
		trailing_spaces: '',
		marginⵧtop‿lines: 0,
		marginⵧbottom‿lines: 0,
		nested_list_depth: parent_state?.nested_list_depth ?? 0,
		str: '',
	}
}

const on_nodeⵧenter: WalkerCallbacks<State, RenderingOptionsⵧToText>['on_nodeⵧenter'] = ({state, $node, depth}, {style}) => {
	//console.log(`XXX to text on_nodeⵧenter`, $node?.$type)

	switch ($node.$type) {
		case 'ol':
			// fallthrough
		case 'ul':
			state.nested_list_depth += 1
			break

		default:
			break
	}

	return state
}

const on_nodeⵧexit: WalkerCallbacks<State, RenderingOptionsⵧToText>['on_nodeⵧexit'] = ({state, $node, depth}, {style}) => {
	//console.log('[on_type]', { $type, state })

	switch ($node.$type) {
		case 'ul':
			// fallthrough
		case 'ol':
			state.starts_with_block = true // in case the container type wasn't a block. It's definitely a block!
			break

		case 'br':
			// fallthrough
		case 'hr':
			state.ends_with_block = true
			state.str = '' // clear, in case the user accidentally pushed some content in this node
			break

		default:
			break
	}

	if (style === 'markdown') {
		switch ($node.$type) {
			case 'heading':
				state.str = `### ${state.str}`
				state.marginⵧtop‿lines = Math.max(state.marginⵧtop‿lines, 1)
				state.marginⵧbottom‿lines = Math.max(state.marginⵧbottom‿lines, 1)
				break

			case 'strong':
				state.str = `**${state.str}**`
				break

			case 'weak':
				// how?
				// no change...
				break

			case 'em':
				state.str = `_${state.str}_`
				break

			case 'hr':
				state.str = '---'
				break

			default:
				break
		}

		if (isꓽlink($node))
			state.str = `[${state.str}](${$node.$hints.href})`
	}
	else {
		switch ($node.$type) {
			case 'heading':
				state.marginⵧtop‿lines = Math.max(state.marginⵧtop‿lines, 1)
				break

			case 'hr':
				state.str = '------------------------------------------------------------'
				break

			default:
				break
		}

		if (style === 'advanced' && isꓽlistⵧKV($node)) {
			// rewrite completely to a better-looking one
			const key_value_pairs: [string, string][] = []

			let max_key_length = 0
			let max_value_length = 0
			state.sub_nodes.forEach(li_node => {
				//console.log({li_node})
				const kv_node = li_node.$sub[SPECIAL_LIST_NODE_CONTENT_KEY]! as CheckedNode

				const key_node = promoteꓽto_node(kv_node.$sub['key']!)
				const value_node = promoteꓽto_node(kv_node.$sub['value']!)

				const key_text = renderⵧto_text(key_node)
				const value_text = renderⵧto_text(value_node)

				max_key_length = Math.max(max_key_length, key_text.length)
				max_value_length = Math.max(max_value_length, value_text.length)

				key_value_pairs.push([key_text, value_text])
			})

			state.str = key_value_pairs.map(([key_text, value_text]) => {
				return key_text.padEnd(max_key_length + 1, '.') + value_text.padStart(max_value_length + 1, '.')
			}).join('\n')
		}
	}

	if (getꓽdisplay_type($node) === 'block') {
		state.starts_with_block = true
		state.ends_with_block = true
	}

	return state
}

const on_concatenateⵧstr: WalkerCallbacks<State, RenderingOptionsⵧToText>['on_concatenateⵧstr'] = ({state, str}) => {
	//console.log('on_concatenateⵧstr()', {str, state: structuredClone(state),})
	if (state.ends_with_block) {
		state.trailing_spaces = '' // remove them
		state.str += ''.padStart(state.marginⵧbottom‿lines + 1,'\n')
		state.ends_with_block = false
		state.marginⵧbottom‿lines = 0
	}

	state.str += state.trailing_spaces
	const without_trailing = str.trimEnd()
	state.trailing_spaces = (without_trailing.length !== str.length)
		? str.slice(without_trailing.length - str.length)
		: '' // bc slice(0) = full str
	state.str += without_trailing

	return state
}

const on_concatenateⵧsub_node: WalkerCallbacks<State, RenderingOptionsⵧToText>['on_concatenateⵧsub_node'] = ({
	state, $node, depth,
	$sub_node_id, $sub_node, sub_state
}, options) => {
	state.sub_nodes.push(normalizeꓽnode($sub_node))

	const { style } = options
	const [ sub_str, trailing_spaces ] = (() => {
		switch ($node.$type) {
			case 'ul':
			// fallthrough
			case 'ol': {
				const bullet: string = (() => {
					if (options.use_hints && $node.$hints.listⵧstyleⵧtype !== undefined)
						return $node.$hints.listⵧstyleⵧtype

					if ($node.$type === 'ul')
						return '-'

					const cleaned_index: string = (() => {
						let res = String($sub_node_id).trim()

						// trim leading 0
						while(res[0] === '0') {
							res = res.slice(1)
						}
						// trim trailing '.'
						if (res.at(-1) === '.')
							res = res.slice(0, -1)

						return res
					})()
					if (style === 'markdown')
						return `${cleaned_index}.` // no alignment, could mess with the markdown

					// alignment for readability
					return cleaned_index.padStart(2) + '.'
				})()
				const indent: string = '  '.repeat(state.nested_list_depth - 1)
				return [ indent + bullet + (bullet ? ' ' : '') + sub_state.str, sub_state.trailing_spaces ]
			}
			default:
				return [ sub_state.str, sub_state.trailing_spaces ]
		}
	})()

	if (state.str.length === 0) {
		// we are at start
		if (sub_state.starts_with_block) {
			// propagate to us
			state.starts_with_block = true
			// merge margin
			state.marginⵧtop‿lines = Math.max(state.marginⵧtop‿lines, sub_state.marginⵧtop‿lines)
		}
	}
	else {
		if (sub_state.starts_with_block) {
			// concatenate
			state.ends_with_block = true
			// collapse margins
			state.marginⵧbottom‿lines += sub_state.marginⵧtop‿lines
		}
	}

	state = on_concatenateⵧstr({
		state, $node, depth, str: sub_str + trailing_spaces,
	}, options)

	state.ends_with_block = sub_state.ends_with_block

	return state
}

const callbacksⵧto_text: Partial<WalkerCallbacks<State, RenderingOptionsⵧToText>> = {
	create_state,

	on_nodeⵧenter,
	on_nodeⵧexit,

	on_concatenateⵧstr,
	on_concatenateⵧsub_node,
}

function renderⵧto_text(
	$doc: Immutable<NodeLike>,
	options: Partial<RenderingOptionsⵧToText> = {},
	callback_overrides: Partial<WalkerCallbacks<State, RenderingOptionsⵧToText>> = {},
): string {
	const $node = promoteꓽto_node($doc)

	const full_options: RenderingOptionsⵧToText = {
		...DEFAULT_RENDERING_OPTIONSⵧToText,
		...options,
	}
	const state = walk<State, RenderingOptionsⵧToText>($node, {
		...callbacksⵧto_text,
		...callback_overrides,
	}, full_options)
	return state.str + state.trailing_spaces
}

/////////////////////////////////////////////////

type RenderToTextState = State

export {
	type RenderingOptionsⵧToText,
	type RenderToTextState,
	DEFAULT_RENDERING_OPTIONSⵧToText,
	callbacksⵧto_text,
	renderⵧto_text,
}
