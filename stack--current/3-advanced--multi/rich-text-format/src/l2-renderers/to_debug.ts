/* eslint-disable no-console */

import type { Immutable } from '@offirmo-private/ts-types'

import {
	type CheckedNode,
	type Node,
} from '../l1-types/index.ts'

import {
	type BaseRenderingOptions,
	type WalkerCallbacks,
	type WalkerReducer,
	type OnNodeEnterParams,
	type OnNodeExitParams,
	type OnConcatenateStringParams,
	type OnConcatenateSubNodeParams,
	type OnFilterParams,
	type OnClassParams,
	type OnTypeParams,
	walk,
	DEFAULT_RENDERING_OPTIONSⵧWalk,
} from './walk.ts'

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
const DEFAULT_RENDERING_OPTIONSⵧToDebug= Object.freeze<RenderingOptionsⵧToDebug>({
	...DEFAULT_RENDERING_OPTIONSⵧWalk,
})

type State = string

const consoleGroupStart: Function = (console.groupCollapsed || console.group || console.log).bind(console)
const consoleGroupEnd: Function = (console.groupEnd || console.log).bind(console)

const create_state: (parent_state: State | undefined, options: RenderingOptionsⵧToDebug) => State = () => ''

const on_nodeⵧenter: WalkerReducer<State, OnNodeEnterParams<State>, RenderingOptionsⵧToDebug> = ({$node, $id, state, depth}) => {
	if (depth === 0) {
		consoleGroupStart('⟩ [on_rootⵧenter]')
	}

	consoleGroupStart(indent(depth) + `⟩ [on_nodeⵧenter] #${$id}/` + debug_node_short($node))
	console.log(indent(depth) + `  [state="${state}"] (init)`)
	return state
}

const on_nodeⵧexit: WalkerReducer<State, OnNodeExitParams<State>, RenderingOptionsⵧToDebug> = ({$node, $id, state, depth}) => {
	console.log(indent(depth) + `⟨ [on_nodeⵧexit] #${$id}`)
	console.log(indent(depth) + `  [state="${state}"]`)
	consoleGroupEnd()

	if (depth === 0) {
		console.log('⟨ [on_rootⵧexit]')
		consoleGroupEnd()
	}

	return state
}


// when walking inside the content
const on_concatenateⵧstr: WalkerReducer<State, OnConcatenateStringParams<State>, RenderingOptionsⵧToDebug> = ({str, state, $node, depth}) => {
	console.log(indent(depth) + `+ [on_concatenateⵧstr] "${str}"`)
	state = state + str
	console.log(indent(depth) + `  [state="${state}"]`)
	return state
}

const on_concatenateⵧsub_node: WalkerReducer<State, OnConcatenateSubNodeParams<State>, RenderingOptionsⵧToDebug> = ({state, sub_state, depth}) => {
	console.log(indent(depth) + `+ [on_concatenateⵧsub_node] "${sub_state}"`)
	state = state + sub_state
	console.log(indent(depth) + `  [state="${state}"]`)
	return state
}

const on_filter: WalkerReducer<State, OnFilterParams<State>, RenderingOptionsⵧToDebug> = ({$filter, $filters, state, $node, depth}) => {
	console.log(indent(depth) + `  [on_filter] "${$filter}`)
	return state
}

const on_classⵧbefore: WalkerReducer<State, OnClassParams<State>, RenderingOptionsⵧToDebug> = ({$class, state, $node, depth}) => {
	console.log(indent(depth) + `  [⟩on_classⵧbefore] .${$class}`)
	return state
}
const on_classⵧafter: WalkerReducer<State, OnClassParams<State>, RenderingOptionsⵧToDebug> = ({$class, state, $node, depth}) => {
	console.log(indent(depth) + `  [⟨on_classⵧafter] .${$class}`)
	return state
}

const on_type: WalkerReducer<State, OnTypeParams<State>, RenderingOptionsⵧToDebug> = ({$type, state, $node, depth}) => {
	console.log(indent(depth) + `  [on_type] "${$type}" ${$node.$classes}`)
	return state
}

////////////////////////////////////

const callbacksⵧto_debug: Partial<WalkerCallbacks<State, RenderingOptionsⵧToDebug>> = {
	create_state,

	on_nodeⵧenter,
	on_nodeⵧexit,

	on_concatenateⵧstr,
	on_concatenateⵧsub_node,

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

function renderⵧto_debug($doc: Node, options: Partial<RenderingOptionsⵧToDebug> = {}): string {
	const full_options: RenderingOptionsⵧToDebug = {
		...DEFAULT_RENDERING_OPTIONSⵧToDebug,
		...options,
	}
	return walk<State, RenderingOptionsⵧToDebug>($doc, callbacksⵧto_debug, full_options)
}

/////////////////////////////////////////////////

export {
	DEFAULT_RENDERING_OPTIONSⵧToDebug,
	callbacksⵧto_debug,
	renderⵧto_debug,
}
