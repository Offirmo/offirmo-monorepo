import type { AbsoluteDirPath, RelativeFilePath, RelativeDirPath } from '@offirmo-private/ts-types'
import type { InfiniteMonorepoSpec } from './50-spec.ts'

/////////////////////////////////////////////////

export const NODE_TYPEⵧREPO = 'repository' as const
export const NODE_TYPEⵧWORKSPACE = 'workspace' as const
export const NODE_TYPEⵧPACKAGE = 'package' as const

/////////////////////////////////////////////////
// inspired by https://www.jetbrains.com/help/idea/absolute-path-variables.html

export const PATHVARⵧROOTⵧREPO = `$REPO_ROOT$` as const
export type RepoRelativePath = `${typeof PATHVARⵧROOTⵧREPO}/${string}`

export const PATHVARⵧROOTⵧWORKSPACE = `$${NODE_TYPEⵧWORKSPACE.toUpperCase()}_ROOT$` as const
export type WorkspaceRelativePath = `${typeof PATHVARⵧROOTⵧWORKSPACE}/${string}`

export const PATHVARⵧROOTⵧPACKAGE = `$${NODE_TYPEⵧPACKAGE.toUpperCase()}_ROOT$` as const
export type PackageRelativePath = `${typeof PATHVARⵧROOTⵧPACKAGE}/${string}`

// any node
export const PATHVARⵧROOTⵧNODE = `$NODE_ROOT$` as const
export type NodeRelativePath = `${typeof PATHVARⵧROOTⵧNODE}/${string}`

export type MultiRepoRelativePath =
	| RepoRelativePath
	| WorkspaceRelativePath
	| PackageRelativePath
	| NodeRelativePath

export type MultiRepoRelativeFilePath = MultiRepoRelativePath
export type MultiRepoRelativeDirPath = MultiRepoRelativePath

/////////////////////////////////////////////////

// id ~path with a minor conflict hack
export type NodeId = string

export interface NodeBase {
	path‿abs: AbsoluteDirPath
	path‿ar: MultiRepoRelativePath

	// any node can override stuff from the root spec
	// intelligently cascaded from parents
	spec?: Partial<InfiniteMonorepoSpec>

	parent_id: NodeId | null

	// anchor for plugins to put their stuff. Will not be mutated.
	plugin_area: {}
}

/////////////////////////////////////////////////

// TODO one day file? for ex. labelled "dev" ?

/////////////////////////////////////////////////

// in the sense of a ~npm package with a package.json
export interface Package extends NodeBase {
	path‿ar: PackageRelativePath

	name: string // NOT including the namespace
}

/////////////////////////////////////////////////

// subset of a workspace
// usually ~ a line in the workspace definition
export interface WorkspaceLine extends NodeBase {
	path‿ar: WorkspaceRelativePath
}

/////////////////////////////////////////////////

// group of packages linked together by a monorepo tool
export interface Workspace extends NodeBase {
	path‿ar: WorkspaceRelativePath
}

/////////////////////////////////////////////////

// Source control repo
// may contain several workspaces
export interface Repository extends NodeBase {}

/////////////////////////////////////////////////

// group of repositories
export interface ArchRepository extends NodeBase {}

/////////////////////////////////////////////////

export interface NodeⳇRepo extends Workspace {
	type: typeof NODE_TYPEⵧREPO
	parent_id: null // so far until multi-repo / arch-repo
}
// XXX note that a workspace could be directly at the root of the repo = same path
export interface NodeⳇWorkspace extends Workspace {
	type: typeof NODE_TYPEⵧWORKSPACE
}
export interface NodeⳇPackage extends Package {
	type: typeof NODE_TYPEⵧPACKAGE
}

export type Node = NodeⳇRepo | NodeⳇWorkspace | NodeⳇPackage
