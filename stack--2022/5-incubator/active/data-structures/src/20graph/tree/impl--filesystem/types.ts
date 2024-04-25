/* PROMPT
 */

import assert from 'tiny-invariant'
import { Basename, RelativePath } from '@offirmo-private/ts-types'

import { WithOptions, WithPayload } from '../../../10common/types'

/////////////////////////////////////////////////
// There are plenty of ways to store a graph.
// We decide to recursively link File System Nodes
// - to make debugging easier
// - to make recursion easier
// - to make dir moves easier
// Also no need for UID since the path is the UID
// We could not differentiate file/folder, but
// - it strengthens the typing
// - it avoid having to differentiate File & Folder payloads

interface FileSystemOptions {
	SEP: '/',
}

interface FileSystemNodeⳇFile<FilePayload, FolderPayload> extends WithPayload<FilePayload> {
	root: FileSystemRoot<FilePayload, FolderPayload> // to share options
	parent: FileSystemNodeⳇFolder<FilePayload, FolderPayload> | null // to be able to regen the full path (null if root)
}

// undefined payload allowed since we can insert multiple folders at once for convenience
interface FileSystemNodeⳇFolder<FilePayload, FolderPayload> extends WithPayload<FolderPayload | undefined> {
	root: FileSystemRoot<FilePayload, FolderPayload> // to share options
	parent: FileSystemNodeⳇFolder<FilePayload, FolderPayload> | null // to be able to regen the full path (null if root)

	// separating the children by type is very convenient
	childrenⵧfolders: { [basename: string]: FileSystemNodeⳇFolder<FilePayload, FolderPayload> }
	childrenⵧfiles:   { [basename: string]: FileSystemNodeⳇFile<FilePayload, FolderPayload> }
}
function isꓽFileSystemNodeⳇFolder<FilePayload, FolderPayload>(x: any): x is FileSystemNodeⳇFolder<FilePayload, FolderPayload> {
	return x && x.childrenⵧfolders && x.childrenⵧfiles
}

type FileSystemNode<FilePayload, FolderPayload> = FileSystemNodeⳇFile<FilePayload, FolderPayload> | FileSystemNodeⳇFolder<FilePayload, FolderPayload>

interface FileSystemRoot<FilePayload, FolderPayload> extends FileSystemNodeⳇFolder<FilePayload, FolderPayload>, WithOptions<FileSystemOptions> {
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
	type FileSystemNodeⳇFile,
	type FileSystemNodeⳇFolder, isꓽFileSystemNodeⳇFolder,
	type FileSystemNode,
	type FileSystemRoot,

	type Aggregated,
}
