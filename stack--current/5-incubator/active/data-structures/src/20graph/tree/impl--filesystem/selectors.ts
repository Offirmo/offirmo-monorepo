/* PROMPT
 */

import assert from 'tiny-invariant'
import { Immutable, RelativePath } from '@offirmo-private/ts-types'
import { normalizeꓽpath } from '@offirmo-private/normalize-string'

import { TreeForRL, getꓽrepresentationⵧlinesⵧgeneric } from '../selectors--representation--lines.js'
import {
	FileSystemNode,
	FileSystemNodeⳇFolder, isꓽFileSystemNodeⳇFolder,
	FileSystemNodeⳇFile, isꓽFileSystemNodeⳇFile,
} from './types.js'

/////////////////////////////////////////////////

function getꓽparent__path<FilePayload, FolderPayload>(node: FileSystemNode<FilePayload, FolderPayload>): RelativePath {
	let segments: string[] = []

	const { options } = node.root

	return "TODO getꓽparent__path()"
}

function getꓽnodeⵧby_path<FilePayload, FolderPayload>(tree: FileSystemNode<FilePayload, FolderPayload>, path: RelativePath): FileSystemNode<FilePayload, FolderPayload>
function getꓽnodeⵧby_path<FilePayload, FolderPayload>(tree: Immutable<FileSystemNode<FilePayload, FolderPayload>>, path: RelativePath): Immutable<FileSystemNode<FilePayload, FolderPayload>>
function getꓽnodeⵧby_path<FilePayload, FolderPayload>(tree: FileSystemNode<FilePayload, FolderPayload>, path: RelativePath): FileSystemNode<FilePayload, FolderPayload> {
	path = normalizeꓽpath(path)
	const { options } = tree.root
	const segments = path.split(options.SEP)

	return segments.reduce((acc, segment) => {
		if (isꓽFileSystemNodeⳇFolder(acc)) {
			if (acc.childrenⵧfolders[segment]) {
				return acc.childrenⵧfolders[segment]!
			}

			if (acc.childrenⵧfiles[segment]) {
				return acc.childrenⵧfiles[segment]!
			}
		}

		throw new Error(`getꓽnode() could not find "${segment}" in "${getꓽparent__path(acc)}"!`)
	}, tree)
}

function getꓽnodeⵧby_pathⵧensure_folder<FilePayload, FolderPayload>(tree: FileSystemNode<FilePayload, FolderPayload>, path: RelativePath): FileSystemNodeⳇFolder<FilePayload, FolderPayload>
function getꓽnodeⵧby_pathⵧensure_folder<FilePayload, FolderPayload>(tree: Immutable<FileSystemNode<FilePayload, FolderPayload>>, path: RelativePath): Immutable<FileSystemNodeⳇFolder<FilePayload, FolderPayload>>
function getꓽnodeⵧby_pathⵧensure_folder<FilePayload, FolderPayload>(tree: FileSystemNode<FilePayload, FolderPayload>, path: RelativePath): FileSystemNodeⳇFolder<FilePayload, FolderPayload> {
	const node = getꓽnodeⵧby_path(tree, path)
	assert(isꓽFileSystemNodeⳇFolder(node), `expected a folder node!`)
	return node
}

function getꓽnodeⵧby_pathⵧensure_file<FilePayload, FolderPayload>(tree: FileSystemNode<FilePayload, FolderPayload>, path: RelativePath): FileSystemNodeⳇFile<FilePayload, FolderPayload>
function getꓽnodeⵧby_pathⵧensure_file<FilePayload, FolderPayload>(tree: Immutable<FileSystemNode<FilePayload, FolderPayload>>, path: RelativePath): Immutable<FileSystemNodeⳇFile<FilePayload, FolderPayload>>
function getꓽnodeⵧby_pathⵧensure_file<FilePayload, FolderPayload>(tree: FileSystemNode<FilePayload, FolderPayload>, path: RelativePath): FileSystemNodeⳇFile<FilePayload, FolderPayload> {
	const node = getꓽnodeⵧby_path(tree, path)
	assert(isꓽFileSystemNodeⳇFile(node), `expected a file node!`)
	return node
}

/////////////////////////////////////////////////

class CTreeForRL<FilePayload, FolderPayload> implements TreeForRL {
	underlying_node: FileSystemNode<FilePayload, FolderPayload>
	segment: string
	type: 'folder' | 'file'

	constructor(underlying_node: FileSystemNode<FilePayload, FolderPayload>, segment: string, type: 'folder' | 'file') {
		this.underlying_node = underlying_node
		this.segment = segment
		this.type = type
	}

	isꓽroot() {
		return this.underlying_node.parent === null
	}

	getꓽrepresentationⵧlines(depth: number = 0) {
		return [
			`${this.type === 'folder' ? '📁' : '📄'} ${this.segment || '<root>'}`
		]
	}

	getꓽchildren() {
		if (isꓽFileSystemNodeⳇFolder(this.underlying_node)) {
			const folder = this.underlying_node as FileSystemNodeⳇFolder<FilePayload, FolderPayload>
			return [
				...Object.keys(folder.childrenⵧfolders).sort().map(segment => new CTreeForRL(folder.childrenⵧfolders[segment]!, segment, 'folder')),
				...Object.keys(folder.childrenⵧfiles).sort().map(segment => new CTreeForRL(folder.childrenⵧfiles[segment]!, segment, 'file')),
			]
		}

		return []
	}
}

function getꓽrepresentationⵧlines<FilePayload, FolderPayload>(tree: Immutable<FileSystemNode<FilePayload, FolderPayload>>, getꓽpayload__representationⵧlines: (p: Immutable<FilePayload | FolderPayload | undefined>) => string[] = () => []): string[] {
	return getꓽrepresentationⵧlinesⵧgeneric(new CTreeForRL(tree, '', 'folder'))
}

/////////////////////////////////////////////////

export {
	getꓽnodeⵧby_path, getꓽnodeⵧby_pathⵧensure_folder, getꓽnodeⵧby_pathⵧensure_file,

	getꓽrepresentationⵧlines,
}
