/* PROMPT
 */

import assert from 'tiny-invariant'
import { Basename, RelativePath } from '@offirmo-private/ts-types'

import { WithOptions, WithPayload } from '../../../10common/types'

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

interface FoldersFilesTreeRoot<FilePayload, FolderPayload> extends FoldersFilesTree<FilePayload, FolderPayload>, WithOptions<Options> {
	options: Options
	parent: null
}

// convenience aggregate type
interface Aggregated<FilePayload, FolderPayload> {
	basename: Basename
	type: 'file' | 'folder'
	pathⵧfrom_root: RelativePath // inc. basename

	node: FoldersFilesTree<FilePayload, FolderPayload>
}

/////////////////////////////////////////////////

export {
	type Options,
	type FoldersFilesTree,
	type FoldersFilesTreeRoot,

	type Aggregated,
}
