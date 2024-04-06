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
	root: CraftNode | undefined

	// also store nodes by uid for convenience
	// (ex. checking uid uniqueness)
	nodesⵧby_uid: {
		[uid: NodeUId]: CraftNode
	}
}

interface CraftNode<Payload = Rsrc> extends Node<Payload> {
	children: CraftNode[]
}

function createꓽnode(rsrcⵧraw: Immutable<Partial<Rsrc>>): CraftNode {
	const payload = getꓽfull_fledged(rsrcⵧraw)
	return {
		uid: payload.descr,
		payload,
		children: []
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
	let { uid } = node
	if (node.payload.type === 'material') {
		uid = `material#${tree.generator_ofꓽUId}`
		tree.generator_ofꓽUId++
	}
	assert(!tree.nodesⵧby_uid[uid], `non-unique uid "${uid}"!`)

	// in-place mod, never mind...
	tree.root = tree.root ?? node
	tree.nodesⵧby_uid = {
		...tree.nodesⵧby_uid,
		[uid]: node,
	}

	return node
}

function insertꓽlink(tree: CraftTree, node_to: CraftNode, node_from: CraftNode): CraftTree {
	node_from.children.push(node_to)

	if (tree.root === node_to) {
		tree.root = node_from
	}

	return tree
}

function getꓽroot(tree: Immutable<CraftTree>): Immutable<CraftNode> | undefined {
	return tree.root
}

/////////////////////////////////////////////////

type StringTree = Array<string | StringTree>

function getꓽrepresentationⵧlinesⵧpayload(rsrc: Rsrc, depth = 0): string[] {
	const result = []

	const { type, descr, quantity } = rsrc
	result.push(`${type}: ${descr}`)

	return result
}

function _getꓽrepresentationⵧlines(node: Immutable<CraftNode>, prefix: string = '', depth = 0): string[] {
	const result = getꓽrepresentationⵧlinesⵧpayload(node.payload).map(l => prefix + l)

	const { children } = node
	children.forEach((child, index) => {
		const r = _getꓽrepresentationⵧlines(child, '', depth + 1)
		const is_last_child = index === children.length - 1
		result.push(...r.map((l, i) => {
			const is_first_line = index === 0
			if (is_first_line) {
				if (is_last_child) {
					return '└ ' + l
				}
				else {
					return '├ ' + l
				}
			}

			if (is_last_child) {
				return '  ' + l
			}
			else {
				return '│ ' + l
			}
		}))
	})

	return result
}

function getꓽrepresentationⵧlines(tree: Immutable<CraftTree>): string[] {
	if (!tree.root) {
		return [ '[empty tree' ]
	}

	// TODO check orphans?
	// TODO check cycles?

	return _getꓽrepresentationⵧlines(tree.root)
}

/////////////////////////////////////////////////

describe(`${LIB} -- example -- craft (mochi cake)`, function() {

	it('should work', () => {
		const { graph, rsrc } = createꓽgraphⵧmochi_cake<CraftTree, CraftNode>(create, insertꓽnode, insertꓽlink)
		console.log(graph)
		//console.log(rsrc)
		getꓽrepresentationⵧlines(graph).forEach(line => {
			console.log(line)
		})
	})
})
