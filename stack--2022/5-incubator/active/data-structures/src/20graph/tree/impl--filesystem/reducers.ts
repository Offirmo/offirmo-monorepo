/* PROMPT
 */

import assert from 'tiny-invariant'
import { RelativePath } from '@offirmo-private/ts-types'
import { normalizeꓽpath } from '@offirmo-private/normalize-string'

import { FoldersFilesTree, FoldersFilesTreeRoot, Options } from './types.js'
import { getꓽnodeⵧby_path } from './selectors.js'

/////////////////////////////////////////////////

function _createꓽnode<FilePayload, FolderPayload>(
	root: FoldersFilesTree<FilePayload, FolderPayload>['root'],
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

function create<FilePayload = {}, FolderPayload = FilePayload>(options: Options = { SEP: '/'}): FoldersFilesTree<FilePayload, FolderPayload> {
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
			return getꓽnodeⵧby_path<FilePayload, FolderPayload>(tree, folder_path)
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

/////////////////////////////////////////////////

export {
	create,
	insertꓽfile,
	upsertꓽfolder,
}
