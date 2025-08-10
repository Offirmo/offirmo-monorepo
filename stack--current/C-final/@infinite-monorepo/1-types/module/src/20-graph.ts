

/////////////////////////////////////////////////

// TODO one day file? for ex. labelled "dev" ?

/////////////////////////////////////////////////

// in the sense of a ~npm package with a package.json
export interface Package {
	namespace?: string
	name: string // NOT including the namespace
	// fqname?
}

/////////////////////////////////////////////////

// subset of a workspace
// usually ~ a line in the workspace definition
export interface SubWorkspace {

}

/////////////////////////////////////////////////

// group of packages linked together by a monorepo tool
export interface Workspace {

}

/////////////////////////////////////////////////

// Source control repo
// may contain several workspaces
export interface Repository {

}

/////////////////////////////////////////////////

// group of repositories
export interface MultiRepository {

}

/////////////////////////////////////////////////
