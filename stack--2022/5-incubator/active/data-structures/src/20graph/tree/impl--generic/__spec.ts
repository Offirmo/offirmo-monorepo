import { expect } from 'chai'
import { Immutable } from '../../../00vendor/@offirmo-private/ts-types'
import assert from '../../../00vendor/tiny-invariant/index.js'

import { LIB } from '../consts.js'
import {
	Graph,
	Node, NodeUId,
} from '../../types.js'
import {
	Rsrc,
	getꓽfull_fledged,
	createꓽgraphⵧmochi_cake,
} from '../../../__fixtures/graph--recipe--mochi_cake.js'


/////////////////////////////////////////////////

interface Options {
}


interface CraftTree<Payload = Rsrc> extends Graph<Payload, undefined, Options> {
	generator_ofꓽUId: number

	// there are plenty of ways to store a graph
	// we decide to recursively link the nodes,
	// to make debugging easier
	root: Node<Payload> | undefined

	// also store nodes by uid for convenience
	// (ex. checking uid uniqueness)
	nodesⵧby_uid: {
		[uid: NodeUId]: Node<Payload>
	}
}

interface CraftNode<Payload = Rsrc> extends Node<Payload> {

}

function createꓽnode(rsrcⵧraw: Immutable<Partial<Rsrc>>): CraftNode {
	const payload = getꓽfull_fledged(rsrcⵧraw)
	return {
		uid: payload.descr,
		payload,
	}
}

function create(options: Options = {}): CraftTree {
	return {
		options,
		generator_ofꓽUId: 0,
		root: undefined,
		nodesⵧby_uid: {},
	}
}

function insertꓽnode(tree: CraftTree, rsrc: Partial<Rsrc>): CraftNode {
	const node = createꓽnode(rsrc)
	const { uid } = node
	assert(!tree.nodesⵧby_uid[uid])
	return {
		...tree,


	}
}

function insertꓽlink(tree: CraftTree, node_to: CraftNode, node_from: CraftNode): CraftTree {
	return tree
}

function getꓽroot(tree: Immutable<CraftTree>): CraftNode | undefined {
	return tree.root
}

/////////////////////////////////////////////////

function getꓽrepresentationⵧlines(g: Immutable<CraftTree>): string[] {
	return []
}

/////////////////////////////////////////////////

describe(`${LIB} -- example -- craft (mochi cake)`, function() {

	it('should work', () => {
		const { graph, nodes } = createꓽgraphⵧmochi_cake<CraftTree, CraftNode>(create, insertꓽnode, insertꓽlink)
	})
})
