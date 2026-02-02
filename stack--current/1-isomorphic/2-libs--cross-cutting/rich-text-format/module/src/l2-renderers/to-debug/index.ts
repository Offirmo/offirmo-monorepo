/* eslint-disable no-console */

import type { Immutable } from '@offirmo-private/ts-types'

import { type CheckedNode, type Node } from '../../l1-types/index.ts'

import {
	type BaseRenderingOptions,
	type WalkerCallbacks,
	walk,
	DEFAULT_RENDERING_OPTIONSⵧWalk,
} from '../walk.ts'

/////////////////////////////////////////////////

function indent(n: number) {
	return '' // indentation is provided for free by console.group() / console.groupCollapsed()
	// MANY_SPACES.slice(0, n * 2)
}

////////////////////////////////////

function debug_node_short($node: Immutable<CheckedNode>) {
	const { $type, $content } = $node

	return `${$type}."${$content}"`
}

////////////////////////////////////

interface RenderingOptionsⵧToDebug extends BaseRenderingOptions {}
const DEFAULT_RENDERING_OPTIONSⵧToDebug = Object.freeze<RenderingOptionsⵧToDebug>({
	...DEFAULT_RENDERING_OPTIONSⵧWalk,
})

type State = string

const consoleGroupStart: Function = (console.groupCollapsed || console.group || console.log).bind(
	console,
)
const consoleGroupEnd: Function = (console.groupEnd || console.log).bind(console)

const create_state: WalkerCallbacks<State, RenderingOptionsⵧToDebug>['create_state'] = () => ''

const onꓽnodeⵧenter: WalkerCallbacks<State, RenderingOptionsⵧToDebug>['onꓽnodeⵧenter'] = ({
	$node,
	$id,
	state,
	depth,
}) => {
	if (depth === 0) {
		consoleGroupStart('⟩ [onꓽrootⵧenter]')
	}

	consoleGroupStart(indent(depth) + `⟩ [onꓽnodeⵧenter] #${$id}/` + debug_node_short($node))
	console.log(indent(depth) + `  [state="${state}"] (init)`)
	return state
}

const onꓽnodeⵧexit: WalkerCallbacks<State, RenderingOptionsⵧToDebug>['onꓽnodeⵧexit'] = ({
	$node,
	$id,
	state,
	depth,
}) => {
	console.log(indent(depth) + `⟨ [onꓽnodeⵧexit] #${$id}`)
	console.log(indent(depth) + `  [state="${state}"]`)
	consoleGroupEnd()

	if (depth === 0) {
		console.log('⟨ [onꓽrootⵧexit]')
		consoleGroupEnd()
	}

	return state
}

// when walking inside the content
const onꓽconcatenateⵧstr: WalkerCallbacks<
	State,
	RenderingOptionsⵧToDebug
>['onꓽconcatenateⵧstr'] = ({ str, state, $node, depth }) => {
	console.log(indent(depth) + `+ [onꓽconcatenateⵧstr] "${str}"`)
	state = state + str
	console.log(indent(depth) + `  [state="${state}"]`)
	return state
}

const onꓽconcatenateⵧsub_node: WalkerCallbacks<
	State,
	RenderingOptionsⵧToDebug
>['onꓽconcatenateⵧsub_node'] = ({ state, sub_state, depth }) => {
	console.log(indent(depth) + `+ [onꓽconcatenateⵧsub_node] "${sub_state}"`)
	state = state + sub_state
	console.log(indent(depth) + `  [state="${state}"]`)
	return state
}

const onꓽfilter: WalkerCallbacks<State, RenderingOptionsⵧToDebug>['onꓽfilter'] = ({
	$filter,
	$filters,
	state,
	$node,
	depth,
}) => {
	console.log(indent(depth) + `  [onꓽfilter] "${$filter}`)
	return state
}

const onꓽclassⵧbefore: WalkerCallbacks<State, RenderingOptionsⵧToDebug>['onꓽclassⵧbefore'] = ({
	$class,
	state,
	$node,
	depth,
}) => {
	console.log(indent(depth) + `  [⟩onꓽclassⵧbefore] .${$class}`)
	return state
}
const onꓽclassⵧafter: WalkerCallbacks<State, RenderingOptionsⵧToDebug>['onꓽclassⵧafter'] = ({
	$class,
	state,
	$node,
	depth,
}) => {
	console.log(indent(depth) + `  [⟨onꓽclassⵧafter] .${$class}`)
	return state
}

const onꓽtype: WalkerCallbacks<State, RenderingOptionsⵧToDebug>['onꓽtype'] = ({
	$type,
	state,
	$node,
	depth,
}) => {
	console.log(indent(depth) + `  [onꓽtype] "${$type}" ${$node.$classes}`)
	return state
}

////////////////////////////////////

const callbacksⵧto_debug: Partial<WalkerCallbacks<State, RenderingOptionsⵧToDebug>> = {
	create_state,

	onꓽnodeⵧenter,
	onꓽnodeⵧexit,

	onꓽconcatenateⵧstr,
	onꓽconcatenateⵧsub_node,

	onꓽfilter,
	onꓽclassⵧbefore,
	onꓽclassⵧafter,

	onꓽtype,
	onꓽtypeꘌbr: ({ state, depth }: { state: any; depth: number }) => {
		console.log(indent(depth) + '  [onꓽtypeꘌbr]')
		return state + '\\\\br\\\\'
	},
	onꓽtypeꘌhr: ({ state, depth }: { state: any; depth: number }) => {
		console.log(indent(depth) + '  [onꓽtypeꘌhr]')
		return state + '--hr--'
	},
}

function renderⵧto_debug($doc: Node, options: Partial<RenderingOptionsⵧToDebug> = {}): string {
	const full_options: RenderingOptionsⵧToDebug = {
		...DEFAULT_RENDERING_OPTIONSⵧToDebug,
		...options,
	}
	return walk<State, RenderingOptionsⵧToDebug>($doc, callbacksⵧto_debug, full_options)
}

/////////////////////////////////////////////////

export { DEFAULT_RENDERING_OPTIONSⵧToDebug, callbacksⵧto_debug, renderⵧto_debug }
