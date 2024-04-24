/* PROMPT
 */

import assert from 'tiny-invariant'
import { Immutable, RelativePath } from '@offirmo-private/ts-types'
import { normalizeꓽpath } from '@offirmo-private/normalize-string'

import { TreeForRL, getꓽrepresentationⵧlinesⵧgeneric } from '../selectors--representation--lines.js'
import { FoldersFilesTree } from './types.js'

/////////////////////////////////////////////////

function getꓽparent__path<FilePayload, FolderPayload>(tree: FoldersFilesTree<FilePayload, FolderPayload>): RelativePath {
	let segments: string[] = []
	const { options } = tree.root

	throw new Error(`getꓽparent__path() not implemented yet!`)
}

function getꓽnodeⵧby_path<FilePayload, FolderPayload>(tree: FoldersFilesTree<FilePayload, FolderPayload>, path: RelativePath): FoldersFilesTree<FilePayload, FolderPayload> {
	path = normalizeꓽpath(path)
	const { options } = tree.root
	const segments = path.split(options.SEP)

	let temp_path: string[] = []
	return segments.reduce((acc, segment) => {
		if (acc.childrenⵧfolders[segment]) {
			return acc.childrenⵧfolders[segment]!
		}

		if (acc.childrenⵧfiles[segment]) {
			return acc.childrenⵧfiles[segment]!
		}

		throw new Error(`getꓽnode() could not find "${segment}" in "${getꓽparent__path(acc)}"!`)
	}, tree)
}
/////////////////////////////////////////////////

class CTreeForRL<FilePayload, FolderPayload> implements TreeForRL {
	underlying_node: Immutable<FoldersFilesTree<FilePayload, FolderPayload>>
	segment: string
	type: 'folder' | 'file'

	constructor(underlying_node: Immutable<FoldersFilesTree<FilePayload, FolderPayload>>, segment: string, type: 'folder' | 'file') {
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
		return [
			...Object.keys(this.underlying_node.childrenⵧfolders).sort().map(segment => new CTreeForRL(this.underlying_node.childrenⵧfolders[segment]!, segment, 'folder')),
			...Object.keys(this.underlying_node.childrenⵧfiles).sort().map(segment => new CTreeForRL(this.underlying_node.childrenⵧfiles[segment]!, segment, 'file')),
		]
	}
}

function getꓽrepresentationⵧlines<FilePayload, FolderPayload>(tree: Immutable<FoldersFilesTree<FilePayload, FolderPayload>>, getꓽpayload__representationⵧlines: (p: Immutable<FilePayload | FolderPayload | undefined>) => string[] = () => []): string[] {
	return getꓽrepresentationⵧlinesⵧgeneric(new CTreeForRL(tree, '', 'folder'))
}

/////////////////////////////////////////////////

export {
	getꓽnodeⵧby_path,
	getꓽrepresentationⵧlines,
}
