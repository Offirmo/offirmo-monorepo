import { type Node, type CheckedNode } from '../types/index.js'
import { NODE_TYPE_to_DISPLAY_MODE } from '../consts.js'
import {
	type BaseRenderingOptions,
	type OnConcatenateStringParams,
	type OnConcatenateSubNodeParams,
	type OnNodeExitParams,
	walk,
	type WalkerCallbacks,
	type WalkerReducer,
} from '../walk.js'

import { isꓽlink, isꓽlistⵧKV } from './common.js'

/////////////////////////////////////////////////

interface RenderingOptionsⵧToText extends BaseRenderingOptions {
	style:
		| 'basic'    // text only
		| 'advanced' // more intelligent: detect KV lists; allow bullet-less lists
		| 'markdown'
}
const DEFAULT_RENDERING_OPTIONSⵧToText = Object.freeze<RenderingOptionsⵧToText>({
	shouldꓽrecover_from_unknown_sub_nodes: false,
	style: 'advanced',
})

type State = {
	sub_nodes: CheckedNode[] // sometimes need to remember them, for ex. for K/V lists

	// whether the current $node starts or/and end with NL
	// needed to coalesce new lines.
	// for ex. if the current block starts with a NL and its immediate child also starts with a NL, we should have only 1 NL
	starts_with_block: boolean
	ends_with_block: boolean

	// # of lines to put on top and bottom
	// (esp. for markdown)
	marginⵧtop‿lines: number
	marginⵧbottom‿lines: number

	str: string
}
const DEFAULT_STATE: State = Object.freeze({
	sub_nodes: [],
	starts_with_block: false,
	ends_with_block: false,
	marginⵧtop‿lines: 0,
	marginⵧbottom‿lines: 0,
	str: '',
})

/////////////////////////////////////////////////
// callbacks

const on_nodeⵧenter = (): State => {
	return {
		...DEFAULT_STATE,
		sub_nodes: [],
	}
}

const on_concatenateⵧstr: WalkerReducer<State, OnConcatenateStringParams<State>, RenderingOptionsⵧToText> = ({state, str}) => {
	//console.log('on_concatenateⵧstr()', {str, state: structuredClone(state),})
	if (state.ends_with_block) {
		state.str += ''.padStart(state.marginⵧbottom‿lines + 1,'\n')
		state.ends_with_block = false
		state.marginⵧbottom‿lines = 0
	}
	state.str += str
	return state
}

const on_nodeⵧexit: WalkerReducer<State, OnNodeExitParams<State>, RenderingOptionsⵧToText> = ({state, $node, depth}, {style}) => {
	//console.log('[on_type]', { $type, state })

	switch ($node.$type) {
		case 'br':
			state.ends_with_block = true
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
				const kv_node = li_node.$sub.content! as CheckedNode

				const key_node = kv_node.$sub.key!
				const value_node = kv_node.$sub.value!

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

	if (NODE_TYPE_to_DISPLAY_MODE[$node.$type] === 'block') {
		state.starts_with_block = true
		state.ends_with_block = true
	}

	return state
}

const on_concatenateⵧsub_node: WalkerReducer<State, OnConcatenateSubNodeParams<State>, RenderingOptionsⵧToText> = ({state, sub_state, $node, $id, $parent_node}, {style}) => {
	let sub_str = sub_state.str
	let sub_starts_with_block = sub_state.starts_with_block

	state.sub_nodes.push($node)

	switch ($parent_node.$type) {
		case 'ul': {
		// automake sub-state a ul > li
			const bullet: string = (() => {
				if ($parent_node.$hints.bullets_style === 'none' && style === 'advanced')
					return ''

				return '- '
			})()
			sub_starts_with_block = true
			sub_str = bullet + sub_str
			break
		}
		case 'ol': {
			// automake sub-state a ol > li
			const bullet: string = (() => {
				if (style === 'markdown')
					return `${$id}. `

				return `${(' ' + $id).slice(-2)}. `
			})()
			sub_starts_with_block = true
			sub_str = bullet + sub_str
			break
		}
		default:
			break
	}

	/*console.log('on_concatenateⵧsub_node()', {
		sub_node: $node,
		sub_state: {
			...sub_state,
				str: sub_str,
				starts_with_block: sub_starts_with_block,
		},
		state: structuredClone(state),
	})*/

	if (state.str.length === 0) {
		// we are at start
		if (sub_state.starts_with_block) {
			// propagate start
			state.starts_with_block = true
			state.marginⵧtop‿lines = Math.max(state.marginⵧtop‿lines, sub_state.marginⵧtop‿lines)
		}
	}
	else {
		if (state.ends_with_block || sub_starts_with_block) {
			state.str += ''.padStart(Math.max(state.marginⵧbottom‿lines, sub_state.marginⵧtop‿lines) + 1,'\n')
		}
	}

	state.str += sub_str

	state.ends_with_block = sub_state.ends_with_block

	return state
}

const callbacksⵧto_text: Partial<WalkerCallbacks<State, RenderingOptionsⵧToText>> = {
	on_nodeⵧenter,
	on_concatenateⵧstr,
	on_concatenateⵧsub_node,
	on_nodeⵧexit,
}

function renderⵧto_text(
	$doc: Node,
	options: RenderingOptionsⵧToText = DEFAULT_RENDERING_OPTIONSⵧToText,
	callback_overrides: Partial<WalkerCallbacks<State, RenderingOptionsⵧToText>> = {},
): string {
	return walk<State, RenderingOptionsⵧToText>($doc, {
		...callbacksⵧto_text,
		...callback_overrides,
	}, options).str
}

/////////////////////////////////////////////////

export {
	type RenderingOptionsⵧToText,
	DEFAULT_RENDERING_OPTIONSⵧToText,
	callbacksⵧto_text,
	renderⵧto_text,
}
