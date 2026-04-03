import type { DirPathⳇAbsolute, FilePathⳇRelative, DirPathⳇRelative } from '@monorepo-private/ts--types'
import type { InfiniteMonorepoSpec } from '@infinite-monorepo/spec'
import type { PureModuleDetails } from '@infinite-monorepo/package-details'

/////////////////////////////////////////////////

// prettier-ignore
export const NODE_TYPEⵧREPO             = 'repository' as const // ~git repo
// TODO review polyrepo
// TODO review multirepo
export const NODE_TYPEⵧMONOREPO         = 'monorepo' as const // monorepo (may have several per repo) https://monorepo.tools/
export const NODE_TYPEⵧWORKSPACES__LINE = 'workspaces__line' as const // a subfolder containing packages. name from = a line in the "workspace" config of the monorepo
export const NODE_TYPEⵧPACKAGE          = 'package' as const // also named "workspace" in yarn, but unclear

/////////////////////////////////////////////////
// inspired by https://www.jetbrains.com/help/idea/absolute-path-variables.html

// TODO 1D also create user-level config files?

export const PATHVARⵧROOTⵧREPO = `$REPO_ROOT$` as const
export type RepoPathⳇRelative = `${typeof PATHVARⵧROOTⵧREPO}/${string}`

export const PATHVARⵧROOTⵧMONOREPO = `$${NODE_TYPEⵧMONOREPO.toUpperCase()}_ROOT$` as const
export type MonorepoPathⳇRelative = `${typeof PATHVARⵧROOTⵧMONOREPO}/${string}`

export const PATHVARⵧROOTⵧWORKSPACE__LINE =
	`$${NODE_TYPEⵧWORKSPACES__LINE.toUpperCase()}_ROOT$` as const
export type WorkspaceLinePathⳇRelative = `${typeof PATHVARⵧROOTⵧWORKSPACE__LINE}/${string}`

export const PATHVARⵧROOTⵧPACKAGE = `$${NODE_TYPEⵧPACKAGE.toUpperCase()}_ROOT$` as const
export type PackagePathⳇRelative = `${typeof PATHVARⵧROOTⵧPACKAGE}/${string}`

// any node
export const PATHVARⵧROOTⵧNODE = `$NODE_ROOT$` as const
export type NodePathⳇRelative = `${typeof PATHVARⵧROOTⵧNODE}/${string}`

export type MultiRepoPathⳇRelative =
	| RepoPathⳇRelative
	| MonorepoPathⳇRelative
	| WorkspaceLinePathⳇRelative
	| PackagePathⳇRelative
	| NodePathⳇRelative

export type MultiRepoFilePathⳇRelative = MultiRepoPathⳇRelative
export type MultiRepoDirPathⳇRelative = MultiRepoPathⳇRelative

/////////////////////////////////////////////////

// id = path so far
export type NodeId = string

export interface NodeBase {
	path‿abs: DirPathⳇAbsolute
	path‿ar: MultiRepoPathⳇRelative

	// Any node can override stuff from the root spec
	// Will be intelligently cascaded from parents (prototypically)
	// Optional bc we have several graphs and only the "semantic" one is expected to have a spec (TODO review)
	spec?: Partial<InfiniteMonorepoSpec>

	parent_id: NodeId | null

	// anchor for plugins to put their stuff. Will not be mutated.
	plugin_area: {}
}

/////////////////////////////////////////////////

// TODO one day file-level node? for ex. to label it "dev/prod/test" ?

/////////////////////////////////////////////////

// in the sense of a ~npm package with a package.json
export interface Package extends NodeBase {
	path‿ar: MonorepoPathⳇRelative | WorkspaceLinePathⳇRelative

	details: PureModuleDetails

	name: string // NOT including the namespace
}

/////////////////////////////////////////////////

// subset of a workspace
// usually ~ a line in the workspace definition
export interface WorkspaceLine extends NodeBase {
	path‿ar: MonorepoPathⳇRelative
}

/////////////////////////////////////////////////

// group of packages linked together by a monorepo tool
export interface Workspace extends NodeBase {
	path‿ar: MonorepoPathⳇRelative
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
	type: typeof NODE_TYPEⵧMONOREPO
}
export interface NodeⳇWorkspaceLine extends WorkspaceLine {
	type: typeof NODE_TYPEⵧWORKSPACES__LINE
}
export interface NodeⳇPackage extends Package {
	type: typeof NODE_TYPEⵧPACKAGE
}

export type Node = NodeⳇRepo | NodeⳇWorkspace | NodeⳇWorkspaceLine | NodeⳇPackage
