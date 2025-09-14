import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type { Node, JsRuntimeSpec, NodeId } from '@infinite-monorepo/types'

import type { State } from './types.ts'

/////////////////////////////////////////////////

function getꓽnodesⵧnew(state: Immutable<State>): Immutable<Array<Node>> {
	return Object.values(state.graph.nodesⵧsemantic).filter(node => node.status === 'new')
}

function getꓽfile__content(state: Immutable<State>): Immutable<Array<Node>> {
	throw new Error('nimp!')
}

function getꓽruntimeⵧlocal(state: Immutable<State>, node: Immutable<Node>): JsRuntimeSpec {
	const result: JsRuntimeSpec = {
		name: 'node', // most standard 2025/08
		versionsⵧacceptable: '^22', // current LTS 2025/08
		versionⵧrecommended: '22.19.0', // 2025/08
	}

	// TODO 1D get from spec & node

	return result
}

/////////////////////////////////////////////////

export { getꓽnodesⵧnew, getꓽruntimeⵧlocal }
