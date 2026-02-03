import type { Immutable } from '@offirmo-private/ts-types'

import type { NodeLike } from '../../l1-types/index.ts'
import { getꓽdisplay_type } from '../../l1-utils/misc.ts'

import { isꓽlink } from '../common.ts'
import {
	type BaseRenderingOptions,
	type WalkerCallbacks,
	walk,
	DEFAULT_RENDERING_OPTIONSⵧWalk,
} from '../walk.ts'

/////////////////////////////////////////////////

interface RenderingOptionsⵧToText extends BaseRenderingOptions {
	use_hints?: boolean // use known hints to improve rendering? or ignore them and render the most basic style?
	style:
		| 'basic' // text only
		| 'advanced' // more intelligent: detect KV lists; allow bullet-less lists
		| 'markdown'
}
const DEFAULT_RENDERING_OPTIONSⵧToText = Object.freeze<RenderingOptionsⵧToText>({
	...DEFAULT_RENDERING_OPTIONSⵧWalk,
	use_hints: true,
	style: 'advanced',
})

type State = {
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

	str: string
}

function createꓽstate(): State {
	return {
		starts_with_block: false,
		ends_with_block: false,
		trailing_spaces: '',
		marginⵧtop‿lines: 0,
		marginⵧbottom‿lines: 0,
		str: '',
	}
}

/////////////////////////////////////////////////
// callbacks


const onꓽnodeⵧenter: WalkerCallbacks<State, RenderingOptionsⵧToText>['onꓽnodeⵧenter'] = (
	{ xstate, $node },
	{ style },
) => {
	//console.log(`XXX to text onꓽnodeⵧenter`, $node?.$type)

	return createꓽstate()
}

const onꓽnodeⵧexit: WalkerCallbacks<State, RenderingOptionsⵧToText>['onꓽnodeⵧexit'] = (
	{ bstate, xstate, $node },
	{ style },
) => {
	//console.log('[onꓽnodeⵧexit]', { $type, xstate })

	if (getꓽdisplay_type($node) === 'block') {
		xstate.starts_with_block = true
		xstate.ends_with_block = true
	}

	switch ($node.$type) {
		case 'br':
		// fallthrough
		case 'hr':
			xstate.str = '' // clear, in case the user accidentally pushed some content in this node
			break

		default:
			break
	}

	if (style === 'markdown') {
		switch ($node.$type) {
			case '_h':
				xstate.str = `${'#'.repeat(bstate.depthⵧh + 1)} ${xstate.str}`
				xstate.marginⵧtop‿lines = Math.max(xstate.marginⵧtop‿lines, 3 - bstate.depthⵧh)
				xstate.marginⵧbottom‿lines = Math.max(xstate.marginⵧbottom‿lines, 3 - bstate.depthⵧh)
				break

			case 'strong':
				xstate.str = `**${xstate.str}**`
				break

			case 'weak':
				// how?
				// no change...
				break

			case 'em':
				xstate.str = `_${xstate.str}_`
				break

			case 'hr':
				xstate.str = '---'
				break

			default:
				break
		}

		if (isꓽlink($node)) {
			xstate.str = `[${xstate.str}](${$node.$hints.href})`
		}

		// TODO advanced markdown features
	} else {
		switch ($node.$type) {
			case '_h':
				xstate.marginⵧtop‿lines = Math.max(xstate.marginⵧtop‿lines, 1)
				break

			case 'hr':
				xstate.str = '------------------------------------------------------------'
				break

			default:
				break
		}

		/* TODO review
		if (style === 'advanced' && isꓽlistⵧKV($node)) {
			// rewrite completely to a better-looking one
			const key_value_pairs: [string, string][] = []

			let max_key_length = 0
			let max_value_length = 0
			xstate.sub_nodes.forEach(li_node => {
				//console.log({li_node})
				const kv_node = li_node.$refs[SPECIAL_LIST_NODE_CONTENT_KEY]! as CheckedNode

				const key_node = promoteꓽto_node(kv_node.$refs['key']!)
				const value_node = promoteꓽto_node(kv_node.$refs['value']!)

				const key_text = renderⵧto_text(key_node)
				const value_text = renderⵧto_text(value_node)

				max_key_length = Math.max(max_key_length, key_text.length)
				max_value_length = Math.max(max_value_length, value_text.length)

				key_value_pairs.push([key_text, value_text])
			})

			xstate.str = key_value_pairs
				.map(([key_text, value_text]) => {
					return (
						key_text.padEnd(max_key_length + 1, '.')
						+ value_text.padStart(max_value_length + 1, '.')
					)
				})
				.join('\n')
		}*/
	}

	return xstate
}

const onꓽconcatenateⵧstr: WalkerCallbacks<State, RenderingOptionsⵧToText>['onꓽconcatenateⵧstr'] = ({
	xstate,
	str,
}) => {
	//console.log('onꓽconcatenateⵧstr()', {str, xstate: structuredClone(xstate),})
	if (xstate.ends_with_block) {
		xstate.trailing_spaces = '' // remove them
		xstate.str += '\n'.repeat(xstate.marginⵧbottom‿lines + 1)
		xstate.ends_with_block = false
		xstate.marginⵧbottom‿lines = 0
	}

	xstate.str += xstate.trailing_spaces
	const without_trailing = str.trimEnd()
	xstate.trailing_spaces =
		without_trailing.length !== str.length ? str.slice(without_trailing.length - str.length) : '' // bc slice(0) = full str
	xstate.str += without_trailing

	return xstate
}

const onꓽconcatenateⵧsub_node: WalkerCallbacks<
	State,
	RenderingOptionsⵧToText
>['onꓽconcatenateⵧsub_node'] = ({ bstate, xstate, $node, xstateⵧsub, row_index }, options) => {
	const { style } = options
	const [sub_str, trailing_spaces] = (() => {
		switch ($node.$type) {
			case 'ul':
			// fallthrough
			case 'ol': {
				if (row_index === -1) {
					// this is the heading, not a row
					return [xstateⵧsub.str, xstateⵧsub.trailing_spaces]
				}

				const bullet: string = (() => {
					if (options.use_hints && $node.$hints.list__style__type !== undefined)
						return $node.$hints.list__style__type

					if ($node.$type === 'ul') return '-'

					const cleaned_index: string = String(row_index + 1)
					if (style === 'markdown') return `${cleaned_index}.` // no alignment: could mess with the markdown

					// alignment for readability
					return cleaned_index.padStart(2) + '.'
				})()
				const indent: string = '  '.repeat(bstate.depthⵧlist)
				return [
					indent + bullet + (bullet ? ' ' : '') + xstateⵧsub.str,
					xstateⵧsub.trailing_spaces,
				]
			}
			default:
				return [xstateⵧsub.str, xstateⵧsub.trailing_spaces]
		}
	})()

	if (xstate.str.length === 0) {
		// we are at start
		if (xstateⵧsub.starts_with_block) {
			// propagate to us
			xstate.starts_with_block = true
			// collapse margins (though we don't really need them)
			xstate.marginⵧtop‿lines = Math.max(xstate.marginⵧtop‿lines, xstateⵧsub.marginⵧtop‿lines)
		}
	} else {
		if (xstateⵧsub.starts_with_block) {
			// concatenate
			xstate.ends_with_block = true
			// apply top margin, merged
			xstate.str += '\n'.repeat(Math.max(xstate.marginⵧbottom‿lines, xstateⵧsub.marginⵧtop‿lines))
			// replace bottom margin (now applied) with the concatened one's
			xstate.marginⵧbottom‿lines = xstateⵧsub.marginⵧbottom‿lines
		}
	}

	xstate = onꓽconcatenateⵧstr(
		{
			$node,
			bstate,
			xstate,
			str: sub_str + trailing_spaces,
		},
		options,
	)

	xstate.ends_with_block = xstateⵧsub.ends_with_block

	return xstate
}

const callbacksⵧto_text: Partial<WalkerCallbacks<State, RenderingOptionsⵧToText>> = {
	createꓽstate,

	onꓽnodeⵧenter,
	onꓽnodeⵧexit,

	onꓽconcatenateⵧstr,
	onꓽconcatenateⵧsub_node,
}

function renderⵧto_text(
	$doc: Immutable<NodeLike>,
	options: Partial<RenderingOptionsⵧToText> = {},
	callback_overrides: Partial<WalkerCallbacks<State, RenderingOptionsⵧToText>> = {},
): string {
	const full_options: RenderingOptionsⵧToText = {
		...DEFAULT_RENDERING_OPTIONSⵧToText,
		...options,
	}

	const xstate = walk<State, RenderingOptionsⵧToText>(
		$doc,
		{
			...callbacksⵧto_text,
			...callback_overrides,
		},
		full_options,
	)

	return xstate.str + xstate.trailing_spaces
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
