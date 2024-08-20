import { describe, it, mock, before, beforeEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'

/////////////////////////////////////////////////
// pseudo radix tree
// applications:
// - Find all strings with common prefix: Returns an array of strings that begin with the same prefix.
// - Find predecessor: Locates the largest string less than a given string, by lexicographic order.
// - Find successor: Locates the smallest string greater than a given string, by lexicographic order.
// https://en.wikipedia.org/wiki/Radix_tree#Insertion

interface Node {
	children: {
		[radix: string]: Node
	}
	is_terminal: boolean
}

interface Tree {
	root: Node
}

/////////////////////////////////////////////////

function traverse(node: Node, prefix: string = ''): { [k: string]: Node } {
	const result = Object.keys(node.children).reduce((acc, k) => {
		const _node = node.children[k]!
		return {
			...acc,
			[prefix + k]: _node,
			...traverse(_node, prefix + k),
		}
	}, {} as ReturnType<typeof traverse>)

	if (node.is_terminal)
		result[prefix] = node
	return result
}

function lookup_closest(tree: Tree, s: string): [ Node, string] {
	let node = tree.root
	let remaining = s

	next: do {
		for (let l = 1; l <= remaining.length; ++l) {
			const radix = remaining.slice(0, l)
			if (node.children[radix]) {
				node = node.children[radix]
				remaining = remaining.slice(l)
				continue next
			}
		}
	} while (false)

	return [ node, remaining ]
}

function create_node(is_terminal: Node['is_terminal']): Node {
	return {
		children: {},
		is_terminal,
	}
}

function create_radix_tree(): Tree {
	return {
		root: create_node(false)
	}
}

function add(tree: Tree, s: string): Tree {
	s = s.normalize('NFC').trim()
	assert(!!s, `s should not be null!`)

	let [ node, remaining ] = lookup_closest(tree, s)

	next: while (remaining) {
		let existing_edge_sharing_a_prefix: undefined | Node = undefined // so far
		let prefix = ''
		for (let l = 1; l <= remaining.length; ++l) {
			const possible_radix = remaining.slice(0, l)
			let candidate_edge_key = Object.keys(node.children).find(k => k.startsWith(possible_radix))
			if (candidate_edge_key) {
				existing_edge_sharing_a_prefix = node.children[candidate_edge_key]!
				prefix = possible_radix
			}
			else {
				// no candidate with this much in common
				if (existing_edge_sharing_a_prefix) {
					// we had a previous candidate with less in common
					break
				}

				// add a brand new
				node = node.children[remaining] = create_node(true)
				remaining = ''
				continue next
			}
		}
		// if we're here, we need to split the existing key
		const new_node = create_node(prefix === remaining)
		Object.keys(node.children).forEach(k => {
			if (k.startsWith(prefix)) {
				new_node.children[k.slice(prefix.length)] = node.children[k]!
				delete node.children[k]
			}
		})
		node = node.children[prefix] = new_node
		remaining = remaining.slice(prefix.length)
	}

	assert(node.is_terminal, `new entry should be terminal!`)

	return tree
}

function add_items(tree: Tree, ...items: string[]): Tree {
	items.filter(s => s.normalize('NFC').trim()).filter(s => !!s).forEach(s => {
		tree = add(tree, s)
	})
	return tree
}

function autocomplete(tree: Tree, s: string): string[] {
	let [ closest_node, remaining ] = lookup_closest(tree, s)
	// TODO possible shortcut if node == root
	const possibilities_from_closest_node =
		traverse(closest_node, s.slice(0, s.length - remaining.length))

	const autocompletes = Object.entries(possibilities_from_closest_node)
		.filter(([k, v]) => v.is_terminal)
		.filter(([k, v]) => k.startsWith(s))
		.map(([k, v]) => k)
		.sort()

	return autocompletes
}

/////////////////////////////////////////////////

describe('exercise', () => {
	let tree = create_radix_tree()
	tree = add_items(tree,
		'slow',
		'slowly',
		'tester',
		'team',
		'test',
	)

	function _autocomplete(s: string): string[] {
		return autocomplete(tree, s)
	}

	const FUT = _autocomplete
	function testꓽcase(...args: [ ...Parameters<typeof FUT>, ReturnType<typeof FUT> ]) {
		const resultⵧexpected = args.pop()
		const params: Parameters<typeof FUT> = args as any

		return it(`should work -- ${util.inspect(params)} => ${util.inspect(resultⵧexpected)}`, (t) => {
			const resultⵧactual = FUT(...params)
			assert.deepEqual(
				resultⵧactual,
				resultⵧexpected,
			)
		})
	}

	testꓽcase(`z`, [])
	testꓽcase(`s`, [ 'slow', 'slowly' ])
	testꓽcase(`sl`, [ 'slow', 'slowly' ])
	testꓽcase(`slow`, [ 'slow', 'slowly' ])
	testꓽcase(`slowl`, [ 'slowly' ])
	testꓽcase(`slowt`, [])
	testꓽcase(``, [
		'slow',
		'slowly',
		'team',
		'test',
		'tester',
	])


	/*it.skip('should be fast', async() => {
		// https://github.com/tinylibs/tinybench
		console.log('Benchmarking…')
		const bench = new Bench({ time: 200 });
		bench
			.add('v0', () => get_victor_v0([ ['x', 0, 0], ['x', 0, 1], ['x', -1, -1], ['x', -2, -2]]))
			.add('current', () => FUT([ ['x', 0, 0], ['x', 0, 1], ['x', -1, -1], ['x', -2, -2]]))

		await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
		await bench.run();
		console.tree(bench.tree());
	})*/
})
