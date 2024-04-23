import { expect } from 'chai'
import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { LIB } from '../consts.js'
import { WithOptions, WithPayload } from '../../../10common/types'
import { RelativePath } from '../../../__fixtures/graph--filesystem'

/////////////////////////////////////////////////

interface Options {
	SEP: '/',
}

interface FoldersFilesTree<FilePayload, FolderPayload> extends WithPayload<FolderPayload | FilePayload> {
	// there are plenty of ways to store a graph
	// we decide to recursively link FoldersFilesTree
	// - to make debugging easier
	// - to make recursion easier
	// - to make dir moves easier

	// no need for UID since the path is the UID

	root: FoldersFilesTreeRoot<FilePayload, FolderPayload> // to share options
	parent: FoldersFilesTree<FilePayload, FolderPayload> | null // to be able to regen the full path (null if root)

	childrenⵧfolders: {
		[basename: string]: FoldersFilesTree<FilePayload, FolderPayload>
	}

	childrenⵧfiles: {
		[basename: string]: FoldersFilesTree<FilePayload, FolderPayload>
	}
}

interface FoldersFilesTreeRoot<FilePayload = {}, FolderPayload = FilePayload> extends FoldersFilesTree<FilePayload, FolderPayload>, WithOptions<Options> {
	options: Options
	parent: null
}

function _createꓽnode<FilePayload, FolderPayload>(
	root: FoldersFilesTreeRoot<FilePayload, FolderPayload>,
	parent: FoldersFilesTree<FilePayload, FolderPayload>['parent'],
	payload: FoldersFilesTree<FilePayload, FolderPayload>['payload'],
): FoldersFilesTree<FilePayload, FolderPayload> {
	return {
		root,
		parent,
		payload,
		childrenⵧfolders: {},
		childrenⵧfiles: {},
	}
}

function create<FilePayload = {}, FolderPayload = FilePayload>(root_payload: FolderPayload, options: Options = { SEP: '/'}): FoldersFilesTreeRoot<FilePayload, FolderPayload> {
	const underlying_FFT = _createꓽnode<FilePayload, FolderPayload>(null as any, null, root_payload)
	const result: FoldersFilesTreeRoot<FilePayload, FolderPayload> = {
		...underlying_FFT,
		parent: null,
		options,
	}
	result.root = result
	return result
}

function insertꓽnode<FilePayload, FolderPayload>(tree: FoldersFilesTree<FilePayload, FolderPayload>, path: RelativePath): RelativePath {
	path =

	const node = _createꓽnode(
tree.root,
		tree,
		undefined,
	)

	let { uid } = node
	if (node.payload.type === 'material') {
		uid = `material#${tree.generator_ofꓽUId}`
		tree.generator_ofꓽUId++
	}

	// in-place mod, never mind...
	tree.root = tree.root ?? node
	tree.nodesⵧby_uid = {
		...tree.nodesⵧby_uid,
		[uid]: node,
	}

	return node
}

function insertꓽlink(tree: FoldersFilesTree, node_to: CraftNode, node_from: CraftNode): FoldersFilesTree {
	node_from.children.push(node_to)

	if (tree.root === node_to) {
		tree.root = node_from
	}

	return tree
}

function getꓽroot(tree: Immutable<FoldersFilesTree>): Immutable<CraftNode> | undefined {
	return tree.root
}

/////////////////////////////////////////////////

type StringTree = Array<string | StringTree>

function getꓽrepresentationⵧlinesⵧpayload(rsrc: Rsrc, depth = 0): string[] {
	const result = []

	const { type, descr,  quantity } = rsrc

	if (depth === 0) {
		result.push(`〖${descr}〗`)
	}

	switch (type) {
		case 'material':
			result.push(`⊙ ${type}: ${descr} (${quantity.value}${quantity.unit ?? 'x'})`)
			break

		case 'tool':
			result.push(`⚒ ${descr}`)
			break

		case 'intermediateᝍstep': {
			if (rsrc.process) {
				result.push(`⊕ ${rsrc.process} => ⟢${descr}⟣`)
			}
			else {
				result.push(`⊕ ${descr}`)
			}
			break
		}

		default:
			throw new Error(`unknown type "${type}"!`)
	}

	return result
}

function _getꓽrepresentationⵧlines(node: Immutable<CraftNode>, prefix: string = '', depth = 0): string[] {
	const result = getꓽrepresentationⵧlinesⵧpayload(node.payload, depth).map(l => prefix + l)

	const { children } = node
	children.forEach((child, index) => {
		const r = _getꓽrepresentationⵧlines(child, '', depth + 1)
		const is_last_child = index === children.length - 1
		result.push(...r.map((l, i) => {
			const is_first_line = i === 0
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

function getꓽrepresentationⵧlines(tree: Immutable<FoldersFilesTree>): string[] {
	if (!tree.root) {
		return [ '[empty tree' ]
	}

	// TODO check orphans?
	// TODO check cycles?

	return _getꓽrepresentationⵧlines(tree.root)
}

/////////////////////////////////////////////////

function aggregate_materials(tree: Immutable<FoldersFilesTree>): Rsrc[] {
	const materials = Object.values(tree.nodesⵧby_uid).map(node => node.payload).reduce((acc, rsrc) => {
		if (rsrc.type === 'material') {
			if (!acc[rsrc.descr]) {
				acc[rsrc.descr] = rsrc
			}
			else {
				// add up
				throw new Error(`NIMP!`)
			}
		}

		return acc
	}, {} as { [descr: string]: Immutable<Rsrc> })

	return Object.values(materials)
}


/////////////////////////////////////////////////

describe(`${LIB} -- example -- craft (mochi cake)`, function() {

	it('should work', () => {
		const { graph, rsrc } = createꓽgraphⵧmochi_cake<FoldersFilesTree, CraftNode>(create, insertꓽnode, insertꓽlink)
		console.log(graph)
		//console.log(rsrc)
		getꓽrepresentationⵧlines(graph).forEach(line => {
			console.log(line)
		})

		console.log(aggregate_materials(graph))
	})
})
