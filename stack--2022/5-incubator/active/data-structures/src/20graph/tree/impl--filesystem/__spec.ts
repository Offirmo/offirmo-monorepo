import { expect } from 'chai'
import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { normalizeꓽpath } from '@offirmo-private/normalize-string'

import { LIB } from '../consts.js'
import { WithOptions, WithPayload } from '../../../10common/types.js'
import { RelativePath, createꓽgraphⵧfilesystem } from '../../../__fixtures/graph--filesystem.js'
import { TreeForRL, getꓽrepresentationⵧlines } from '../selectors--representation--lines.js'

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

function insertꓽfile<FilePayload, FolderPayload>(tree: FoldersFilesTree<FilePayload, FolderPayload>, path: RelativePath): RelativePath {
	path = normalizeꓽpath(path, 'file')

	throw new Error('TODO')
}

function upsertꓽfolder<FilePayload, FolderPayload>(tree: FoldersFilesTree<FilePayload, FolderPayload>, path: RelativePath): RelativePath {
	path = normalizeꓽpath(path, 'folder')

	throw new Error('TODO')
}

/////////////////////////////////////////////////

describe(`${LIB} -- example -- file system`, function() {


	it.only('should work', () => {
		const { graph, ...rest } = createꓽgraphⵧfilesystem<FoldersFilesTreeRoot>(
			function _create() {
				return create({})
			},
			insertꓽfile,
			upsertꓽfolder,
		)
		console.log(graph)
		console.log(rest)

		const tree_for_rl: TreeForRL = {
			isꓽroot() {
				return true
			},
			getꓽrepresentationⵧlines(depth: number) {
				return [ 'root' ]
			},
			getꓽchildren() {
				return []
			}
		}
		getꓽrepresentationⵧlines(tree_for_rl).forEach(line => {
			console.log(line)
		})
	})
})
