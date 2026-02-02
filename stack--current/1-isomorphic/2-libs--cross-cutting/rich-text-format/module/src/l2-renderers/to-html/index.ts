import memoize_one from 'memoize-one'
import type { Immutable } from '@offirmo-private/ts-types'

import { type CheckedNode, type Node, isꓽlist, type NodeLike } from '../../l1-types/index.ts'

import { isꓽlink, isꓽlistⵧKV, isꓽlistⵧuuid } from '../common.ts'
import {
	type BaseRenderingOptions,
	NodeType,
	type WalkerCallbacks,
	walk,
	DEFAULT_RENDERING_OPTIONSⵧWalk,
} from '../walk.ts'
import { promoteꓽto_node } from '../../l1-utils/index.ts'

/////////////////////////////////////////////////
// much simpler than "to text" since HTML is doing a lot for us

const LIB = 'rich_text_to_html'

const MANY_TABS = '																																							'

interface RenderingOptionsⵧToHtml extends BaseRenderingOptions {}
const DEFAULT_RENDERING_OPTIONSⵧToHtml = Object.freeze<RenderingOptionsⵧToHtml>({
	...DEFAULT_RENDERING_OPTIONSⵧWalk,
})

type State = {
	sub_nodes: Immutable<CheckedNode>[]
	str: string
}

function indent(n: number): string {
	return MANY_TABS.slice(0, n)
}

const NODE_TYPE_TO_HTML_ELEMENT: { [k: string]: string } = {
	// will default to own tag if not in this list (ex. strong => strong)
	[NodeType.weak]: 'span',
	[NodeType.heading]: 'h3',
	[NodeType.fragmentⵧinline]: 'span',
	[NodeType.fragmentⵧblock]: 'div',
}

const create_state: WalkerCallbacks<State, RenderingOptionsⵧToHtml>['create_state'] = () => ({
	sub_nodes: [],
	str: '',
})

const onꓽconcatenateⵧstr: WalkerCallbacks<State, RenderingOptionsⵧToHtml>['onꓽconcatenateⵧstr'] = ({
	state,
	str,
}) => {
	state.str += str
	return state
}

const onꓽconcatenateⵧsub_node: WalkerCallbacks<
	State,
	RenderingOptionsⵧToHtml
>['onꓽconcatenateⵧsub_node'] = ({ $node, state, sub_state }) => {
	state.sub_nodes.push($node)
	state.str = state.str + sub_state.str
	return state
}

const onꓽnodeⵧexit: WalkerCallbacks<State, RenderingOptionsⵧToHtml>['onꓽnodeⵧexit'] = ({
	state,
	$node,
	depth,
}) => {
	const { $type, $classes, $sub, $hints } = $node
	const $sub_node_count = Object.keys($sub).length

	if ($type === 'br') {
		state.str = '<br/>\n'
		return state
	}

	if ($type === 'hr') {
		state.str = '\n<hr/>\n'
		return state
	}

	let result = ''
	let is_inline = false
	const classes = [...$classes]

	switch ($type) {
		case 'strong':
		case 'em':
			is_inline = true
			break
		case 'weak':
			classes.push('o⋄colorꘌsecondary')
			is_inline = true
			break
		case 'fragmentⵧinline':
			//classes.push('o⋄rich-text⋄inline')
			is_inline = true
			break
		default:
			break
	}

	if (!is_inline) result += '\n' + indent(depth)

	const element: string = NODE_TYPE_TO_HTML_ELEMENT[$type] || $type

	if (isꓽlist($node)) {
		classes.push('o⋄rich-text⋄list')

		switch ($hints.list__style__type) {
			case '':
				classes.push('o⋄rich-text⋄list--no-bullet')
				break

			default:
				break
		}

		if (isꓽlistⵧuuid($node)) {
			//console.log(`${LIB} seen uuid list`)
			classes.push('o⋄rich-text⋄list--interactive')
		}
	}

	result += `<${element}`
	if (classes.length) result += ` class="${classes.join(' ')}"`
	result += '>' + state.str + ($sub_node_count ? '\n' + indent(depth) : '') + `</${element}>`

	if (isꓽlink($node)) result = `<a href="${$hints.href}" target="_blank">${result}</a>`

	// for demo only
	if ($hints['uuid'])
		result = `<button class="o⋄button--inline o⋄rich-text⋄interactive" ${$hints['uuid']}">${result}</button>`

	state.str = result
	return state
}

const callbacksⵧto_html: Partial<WalkerCallbacks<State, RenderingOptionsⵧToHtml>> = {
	create_state,

	onꓽconcatenateⵧstr,
	onꓽconcatenateⵧsub_node,
	onꓽnodeⵧexit,
}

function renderⵧto_html(
	$doc: Immutable<NodeLike>,
	options: Partial<RenderingOptionsⵧToHtml> = {},
): string {
	const $node = promoteꓽto_node($doc)

	const full_options: RenderingOptionsⵧToHtml = {
		...DEFAULT_RENDERING_OPTIONSⵧToHtml,
		...options,
	}

	// TODO review classes
	return `
<div class="o⋄rich-text">
	${walk<State, RenderingOptionsⵧToHtml>($node, callbacksⵧto_html, full_options).str}
</div>
`
}

/////////////////////////////////////////////////

export { callbacksⵧto_html, renderⵧto_html }
