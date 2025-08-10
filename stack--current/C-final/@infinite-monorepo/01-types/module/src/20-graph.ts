import type { AbsoluteDirPath } from '@offirmo-private/ts-types'


/////////////////////////////////////////////////


export interface NodeBase {
	path: AbsoluteDirPath
}

/////////////////////////////////////////////////

// TODO one day file? for ex. labelled "dev" ?

/////////////////////////////////////////////////

// in the sense of a ~npm package with a package.json
export interface Package extends NodeBase {
	namespace?: string
	name: string // NOT including the namespace
	// fqname?
}

/////////////////////////////////////////////////

// subset of a workspace
// usually ~ a line in the workspace definition
export interface WorkspaceLine extends NodeBase {

}

/////////////////////////////////////////////////

// group of packages linked together by a monorepo tool
export interface Workspace extends NodeBase {

}

/////////////////////////////////////////////////

// Source control repo
// may contain several workspaces
export interface Repository extends NodeBase {

}

/////////////////////////////////////////////////

// group of repositories
export interface ArchRepository extends NodeBase {

}

/////////////////////////////////////////////////

export interface NodeⳇPackage   extends Package { type: 'package'}
export interface NodeⳇWorkspace extends Workspace { type: 'workspace'}
export type Node =
	| NodeⳇPackage
	| NodeⳇWorkspace
