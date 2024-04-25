/* PROMPT
 */

import assert from 'tiny-invariant'
import { Basename, RelativePath } from '@offirmo-private/ts-types'

import { WithOptions, WithPayload } from '../../../10common/types'

/////////////////////////////////////////////////


interface FileSystemOptions {
	SEP: '/',
}

// undefined payload allowed since we can insert multiple folders for convenience
interface FileSystemNode<FilePayload, FolderPayload, Payload = FilePayload | FolderPayload | undefined> extends WithPayload<Payload> {
	// there are plenty of ways to store a graph
	// we decide to recursively link FoldersFilesTree
	// - to make debugging easier
	// - to make recursion easier
	// - to make dir moves easier

	// no need for UID since the path is the UID

	root: FileSystemRoot<FilePayload, FolderPayload> // to share options
	parent: FileSystemNode<FilePayload, FolderPayload> | null // to be able to regen the full path (null if root)

	childrenⵧfolders: {
		[basename: string]: FileSystemNode<FilePayload, FolderPayload>
	}

	childrenⵧfiles: {
		[basename: string]: FileSystemNode<FilePayload, FolderPayload>
	}
}

interface FileSystemRoot<FilePayload, FolderPayload> extends FileSystemNode<FilePayload, FolderPayload>, WithOptions<FileSystemOptions> {
	options: FileSystemOptions
	parent: null
}

// convenience aggregate type
// TODO clarify
interface Aggregated<FilePayload, FolderPayload> {
	basename: Basename
	type: 'file' | 'folder'
	pathⵧfrom_root: RelativePath // inc. basename

	node: FileSystemNode<FilePayload, FolderPayload>
}

/////////////////////////////////////////////////

export {
	type FileSystemOptions,
	type FileSystemNode,
	type FileSystemRoot,

	type Aggregated,
}
