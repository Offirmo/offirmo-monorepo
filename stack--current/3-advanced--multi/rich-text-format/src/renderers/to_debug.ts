/* eslint-disable no-console */

import {
	type CheckedNode,
	type Node,
} from '../types/index.js'

import {
	WalkerCallbacks,
	WalkerReducer,
	OnRootExitParams,
	OnNodeEnterParams,
	OnNodeExitParams, OnConcatenateStringParams, OnConcatenateSubNodeParams, OnFilterParams,
	OnClassParams,
	OnTypeParams,
	walk, BaseRenderingOptions,
} from '../walk.js'

/////////////////////////////////////////////////

const MANY_SPACES = '                                                                                                '

function indent(n: number) {
	return '' // indentation is provided for free by console.group() / console.groupCollapsed()
	// MANY_SPACES.slice(0, n * 2)
}

////////////////////////////////////

function debug_node_short($node: CheckedNode) {
	const { $type, $content } = $node

	return `${$type}."${$content}"`
}

////////////////////////////////////

interface RenderingOptions extends BaseRenderingOptions {}
const DEFAULT_RENDERING_OPTIONS= Object.freeze<RenderingOptions>({
	shouldꓽrecover_from_unknown_sub_nodes: false,
})

type State = string

const consoleGroupStart: Function = (console.groupCollapsed || console.group || console.log).bind(console)
const consoleGroupEnd: Function = (console.groupEnd || console.log).bind(console)

const on_rootⵧenter = () => {
	consoleGroupStart('⟩ [on_rootⵧenter]')
}
const on_rootⵧexit = ({state}: OnRootExitParams<State>): State => {
	console.log('⟨ [on_rootⵧexit]')
	console.log(`  [state="${state}"]`)
	consoleGroupEnd()
	return state
}

const on_nodeⵧenter = ({$node, $id, depth}: OnNodeEnterParams): State => {
	consoleGroupStart(indent(depth) + `⟩ [on_nodeⵧenter] #${$id}/` + debug_node_short($node))
	const state = ''
	console.log(indent(depth) + `  [state="${state}"] (init)`)
	return state
}

const on_nodeⵧexit: WalkerReducer<State, OnNodeExitParams<State>, RenderingOptions> = ({$node, $id, state, depth}) => {
	console.log(indent(depth) + `⟨ [on_nodeⵧexit] #${$id}`)
	console.log(indent(depth) + `  [state="${state}"]`)
	consoleGroupEnd()

	return state
}


// when walking inside the content
const on_concatenateⵧstr: WalkerReducer<State, OnConcatenateStringParams<State>, RenderingOptions> = ({str, state, $node, depth}) => {
	console.log(indent(depth) + `+ [on_concatenateⵧstr] "${str}"`)
	state = state + str
	console.log(indent(depth) + `  [state="${state}"]`)
	return state
}

const on_concatenateⵧsub_node: WalkerReducer<State, OnConcatenateSubNodeParams<State>, RenderingOptions> = ({state, sub_state, depth, $id, $parent_node}) => {
	console.log(indent(depth) + `+ [on_concatenateⵧsub_node] "${sub_state}"`)
	state = state + sub_state
	console.log(indent(depth) + `  [state="${state}"]`)
	return state
}

const on_filter: WalkerReducer<State, OnFilterParams<State>, RenderingOptions> = ({$filter, $filters, state, $node, depth}) => {
	console.log(indent(depth) + `  [on_filter] "${$filter}`)
	return state
}

const on_classⵧbefore: WalkerReducer<State, OnClassParams<State>, RenderingOptions> = ({$class, state, $node, depth}) => {
	console.log(indent(depth) + `  [⟩on_classⵧbefore] .${$class}`)
	return state
}
const on_classⵧafter: WalkerReducer<State, OnClassParams<State>, RenderingOptions> = ({$class, state, $node, depth}) => {
	console.log(indent(depth) + `  [⟨on_classⵧafter] .${$class}`)
	return state
}

const on_type: WalkerReducer<State, OnTypeParams<State>, RenderingOptions> = ({$type, state, $node, depth}) => {
	console.log(indent(depth) + `  [on_type] "${$type}" ${$node.$classes}`)
	return state
}

////////////////////////////////////

const callbacksⵧto_debug: Partial<WalkerCallbacks<State, RenderingOptions>> = {
	on_rootⵧenter,
	on_rootⵧexit,

	on_nodeⵧenter,
	on_nodeⵧexit,

	on_concatenateⵧstr,
	on_concatenateⵧsub_node,
	/*
	on_sub_node_id: ({$id, state, $node, depth}) => {
		console.log(indent(depth) + `  [sub-node] #${$id}`)
		console.log(indent(depth) + `  [state="${state}"]`)
		return state
	},
	*/
	on_filter,

	on_classⵧbefore,
	on_classⵧafter,

	on_type,
	on_typeꘌbr: ({state, depth}: {state: any, depth: number}) => {
		console.log(indent(depth) + '  [on_typeꘌbr]')
		return state + '\\\\br\\\\'
	},
	on_typeꘌhr: ({state, depth}: {state: any, depth: number}) => {
		console.log(indent(depth) + '  [on_typeꘌhr]')
		return state + '--hr--'
	},
}

function renderⵧto_debug($doc: Node, options: RenderingOptions = DEFAULT_RENDERING_OPTIONS): string {
	return walk<State, RenderingOptions>($doc, callbacksⵧto_debug, options)
}

/////////////////////////////////////////////////

export {
	callbacksⵧto_debug,
	renderⵧto_debug,
}
