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

// undefined payload allowed since we can insert multiple folders for convenience
interface FoldersFilesTree<FilePayload, FolderPayload, Payload = FilePayload | FolderPayload | undefined> extends WithPayload<Payload> {
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

function getꓽnode<FilePayload, FolderPayload>(tree: FoldersFilesTree<FilePayload, FolderPayload>, path: RelativePath): FoldersFilesTree<FilePayload, FolderPayload> {
	path = normalizeꓽpath(path)
	const { options } = tree.root
	const segments = path.split(options.SEP)
	let result = tree
	let temp_path: string[] = []
	segments.forEach(segment => {
		if (result.childrenⵧfolders[segment]) {
			result = result.childrenⵧfolders[segment]!
		}
		else if (result.childrenⵧfiles[segment]) {
			result = result.childrenⵧfiles[segment]!
		}
		else {
			throw new Error(`getꓽnode() could not find "${segment}" in "${temp_path.join(options.SEP)}"!`)
		}
		temp_path.push(segment)
	})
	return result
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

function create<FilePayload = {}, FolderPayload = FilePayload>(options: Options = { SEP: '/'}): FoldersFilesTreeRoot<FilePayload, FolderPayload> {
	const underlying_FFT = _createꓽnode<FilePayload, FolderPayload>(null as any, null, undefined)
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
	const { options } = tree.root
	const segments = path.split(options.SEP)
	assert(segments.length > 0, `insertꓽfile() should provide at least a basename!`)
	const basename = segments.pop()!
	const folders = segments
	const parent: FoldersFilesTree<FilePayload, FolderPayload> = (() => {
		if (folders.length === 0) {
			return tree
		}
		else {
			const folder_path = upsertꓽfolder<FilePayload, FolderPayload>(tree, folders.join(options.SEP))
			return getꓽnode<FilePayload, FolderPayload>(tree, folder_path)
		}
	})()
	assert(!parent.childrenⵧfolders[basename], `insertꓽfile() should not overwrite an existing folder!`)
	assert(!parent.childrenⵧfiles[basename], `insertꓽfile() should not overwrite an existing file!`)

	const file_node = _createꓽnode<FilePayload, FolderPayload>(tree.root, parent, undefined)
	parent.childrenⵧfiles[basename] = file_node

	return path
}

function upsertꓽfolder<FilePayload, FolderPayload>(tree: FoldersFilesTree<FilePayload, FolderPayload>, path: RelativePath): RelativePath {
	path = normalizeꓽpath(path, 'folder')
	const { options } = tree.root
	const segments = path.split(options.SEP)
	assert(segments.length > 0, `upsertꓽfolder() should provide at least 1 folder!`)

	let parent = tree
	segments.forEach(basename => {
		assert(!parent.childrenⵧfiles[basename], `upsertꓽfolder() should not overwrite an existing file!`)
		if (!parent.childrenⵧfolders[basename]) {
			const folder_node = _createꓽnode<FilePayload, FolderPayload>(tree.root, parent, undefined)
			parent.childrenⵧfolders[basename] = folder_node
		}
		parent = parent.childrenⵧfolders[basename]!
	})

	return path
}

/*
function getꓽnode_infos<FilePayload, FolderPayload>(node: FoldersFilesTree<FilePayload, FolderPayload>): {
	path: RelativePath,
	segment: Basename,
	type: 'file' | 'folder',
	node: FoldersFilesTree<FilePayload, FolderPayload>,
} {
	const root = node.root
	const { options } = root

	const segments = path.split(options.SEP)
	assert(segments.length > 0, `upsertꓽfolder() should provide at least 1 folder!`)
}

function getꓽpath<FilePayload, FolderPayload>(node: FoldersFilesTree<FilePayload, FolderPayload>): RelativePath {
	path = normalizeꓽpath(path)
	const { options } = tree.root
	const segments = path.split(options.SEP)
	let result = tree
	let temp_path: string[] = []
	segments.forEach(segment => {
		if (result.childrenⵧfolders[segment]) {
			result = result.childrenⵧfolders[segment]!
		}
		else if (result.childrenⵧfiles[segment]) {
			result = result.childrenⵧfiles[segment]!
		}
		else {
			throw new Error(`getꓽnode() could not find "${segment}" in "${temp_path.join(options.SEP)}"!`)
		}
		temp_path.push(segment)
	})
	return result
}*/

/////////////////////////////////////////////////

describe(`${LIB} -- example -- file system`, function() {


	it.only('should work', () => {
		const { graph, ...rest } = createꓽgraphⵧfilesystem<FoldersFilesTreeRoot>(
			function _create() {
				return create()
			},
			insertꓽfile,
			upsertꓽfolder,
		)
		console.log(graph)
		console.log(rest)

		class CTreeForRL<FilePayload, FolderPayload> implements TreeForRL {
			underlying_node: FoldersFilesTree<FilePayload, FolderPayload>
			segment: string
			type: 'folder' | 'file'

			constructor(underlying_node: FoldersFilesTree<FilePayload, FolderPayload>, segment: string, type: 'folder' | 'file') {
				this.underlying_node = underlying_node
				this.segment = segment
				this.type = type
			}

			isꓽroot() {
				return this.underlying_node.parent === null
			}

			getꓽrepresentationⵧlines(depth: number = 0) {
				const is_empty = Object.keys(this.underlying_node.childrenⵧfolders).length === 0 && Object.keys(this.underlying_node.childrenⵧfiles).length === 0
				const is_root = this.isꓽroot()

				if (is_root && is_empty) {
					return [ '[empty tree' ]
				}

				return [
					`${this.type === 'folder' ? '📁' : '📄'} ${this.segment || '<root>'}`
				]
			}

			getꓽchildren() {
				return [
					...Object.keys(this.underlying_node.childrenⵧfolders).sort().map(segment => new CTreeForRL(this.underlying_node.childrenⵧfolders[segment]!, segment, 'folder')),
					...Object.keys(this.underlying_node.childrenⵧfiles).sort().map(segment => new CTreeForRL(this.underlying_node.childrenⵧfiles[segment]!, segment, 'file')),
				]
			}
		}

		getꓽrepresentationⵧlines(new CTreeForRL(graph, '', 'folder')).forEach(line => {
			console.log(line)
		})
	})
})
