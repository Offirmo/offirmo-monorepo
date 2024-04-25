/* PROMPT
 */

import assert from 'tiny-invariant'
import { RelativePath } from '@offirmo-private/ts-types'
import { normalizeꓽpath } from '@offirmo-private/normalize-string'

import { FileSystemNode, FileSystemRoot, FileSystemOptions } from './types.js'
import { getꓽnodeⵧby_path } from './selectors.js'

/////////////////////////////////////////////////

function _createꓽnode<FilePayload, FolderPayload>(
	root: FileSystemNode<FilePayload, FolderPayload>['root'],
	parent: FileSystemNode<FilePayload, FolderPayload>['parent'],
	payload: FileSystemNode<FilePayload, FolderPayload>['payload'],
): FileSystemNode<FilePayload, FolderPayload> {
	return {
		root,
		parent,
		payload,
		childrenⵧfolders: {},
		childrenⵧfiles: {},
	}
}

function createꓽfilesystem<FilePayload = {}, FolderPayload = FilePayload>(options: FileSystemOptions = { SEP: '/'}): FileSystemNode<FilePayload, FolderPayload> {
	const underlying_FFT = _createꓽnode<FilePayload, FolderPayload>(null as any, null, undefined)
	const result: FileSystemRoot<FilePayload, FolderPayload> = {
		...underlying_FFT,
		parent: null,
		options,
	}
	result.root = result
	return result
}

function insertꓽfile<FilePayload, FolderPayload>(tree: FileSystemNode<FilePayload, FolderPayload>, path: RelativePath, payload?: FilePayload | undefined): RelativePath {
	path = normalizeꓽpath(path, 'file')
	const { options } = tree.root
	const segments = path.split(options.SEP)
	assert(segments.length > 0, `insertꓽfile() should provide at least a basename!`)
	const basename = segments.pop()!
	const folders = segments
	const parent: FileSystemNode<FilePayload, FolderPayload> = (() => {
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

	const file_node = _createꓽnode<FilePayload, FolderPayload>(tree.root, parent, payload)
	parent.childrenⵧfiles[basename] = file_node

	return path
}

function upsertꓽfolder<FilePayload, FolderPayload>(tree: FileSystemNode<FilePayload, FolderPayload>, path: RelativePath): RelativePath {
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
	createꓽfilesystem,
	insertꓽfile,
	upsertꓽfolder,
}
