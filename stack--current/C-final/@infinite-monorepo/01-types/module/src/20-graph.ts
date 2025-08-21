import type { AbsoluteDirPath, RelativeFilePath, RelativeDirPath } from '@offirmo-private/ts-types'
import type { InfiniteMonorepoSpec } from './50-spec.ts'

/////////////////////////////////////////////////

export const NODE_TYPEⵧWORKSPACE = 'workspace' as const
export const NODE_TYPEⵧPACKAGE = 'package' as const

/////////////////////////////////////////////////
// inspired by https://www.jetbrains.com/help/idea/absolute-path-variables.html

export const PATHVARⵧROOTⵧWORKSPACE = `$${NODE_TYPEⵧWORKSPACE.toUpperCase()}_ROOT$` as const
export type WorkspaceRelativePath = `${typeof PATHVARⵧROOTⵧWORKSPACE}/${string}`

export const PATHVARⵧROOTⵧPACKAGE = `$${NODE_TYPEⵧPACKAGE.toUpperCase()}_ROOT$` as const
export type PackageRelativePath = `${typeof PATHVARⵧROOTⵧPACKAGE}/${string}`

export type MultiRepoRelativePath = WorkspaceRelativePath | PackageRelativePath

export type MultiRepoRelativeFilePath = MultiRepoRelativePath
export type MultiRepoRelativeDirPath = MultiRepoRelativePath

/////////////////////////////////////////////////

export interface NodeBase {
	path‿abs: AbsoluteDirPath
	path‿ar: MultiRepoRelativePath

	// any node can override stuff from the root spec
	// intelligently cascaded from parents
	spec?: Partial<InfiniteMonorepoSpec>
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

export interface NodeⳇPackage extends Package {
	type: typeof NODE_TYPEⵧPACKAGE
	parent: NodeⳇWorkspace // so far
}
export interface NodeⳇWorkspace extends Workspace {
	type: typeof NODE_TYPEⵧWORKSPACE
	parent: unknown // so far
}
export type Node = NodeⳇPackage | NodeⳇWorkspace
