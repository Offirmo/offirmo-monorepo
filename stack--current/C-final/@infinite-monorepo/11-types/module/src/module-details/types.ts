import type { SemVer, SoftwareLicense‿SPDX } from '@offirmo-private/ts-types'

import type { ProgLang, DependencyFQName, DependencyDetails } from '../01-primitives.ts'

import type { FileEntry } from '../file-entry/types.ts'

/////////////////////////////////////////////////

/* This type should have AS FEW ENTRIES as possible
 * reminder that we aim for a single source of truth
 * Anything that can be inferred from the code itself should be!
 */
interface PureModuleDetailsAllowedInManifest {
	name: string // NOT including the namespace
	namespace: string
	license?: SoftwareLicense‿SPDX
	description?: string
	version: SemVer
	isꓽpublished: boolean

	isꓽapp: boolean // app in the generic sense of "provide peer deps" vs "use peer deps"
	hasꓽside_effects: boolean // assuming most pkgs don't
	engines: Record<string, SemVer>

	status: // EXPERIMENTAL rating of modules TODO clarify
	| 'spike'
		| 'sandbox' // self-contained playground for testing stuff
		| 'tech-demo' // not YET in prod
		| 'unstable' // ex. a rewrite or refactor in progress, most likely behind a flag
		| 'stable'
}

//  all entries are optional, only to be used if an override is needed or if not inferrable
interface PureModuleManifest extends Partial<PureModuleDetailsAllowedInManifest> {
	_dontꓽpresent?: boolean // unsupported module, don't "present" it TODO remove once all the modules are compatible!
	_overrides?: {
		dependencies: Record<string, DependencyDetails | 'ignore'>
		files: {
			packageᐧjson?: { [path: string]: any }
			// TODO 1D tsconfig.json
		}
	}
}

// Details gathered by analyzing the package, with an objective to generate:
// - package.json
// - tsconfig.json
// - any other config
interface PureModuleDetails extends PureModuleDetailsAllowedInManifest {
	root‿abspath: string

	fqname: DependencyFQName // fully qualified

	author: string

	// entry points
	entrypointⵧmain: FileEntry // TODO review fuse with entries?
	entrypointⵧdemo?: FileEntry
	entrypointⵧsandbox?: FileEntry
	entrypointⵧstorypad?: FileEntry
	entrypointsⵧbuild: {
		// build scripts (if any)
		[label: string]: FileEntry
	}
	entrypointⵧexports: {
		// extra exports (if any)
		[label: string]: FileEntry
	}

	hasꓽtestsⵧunit: boolean
	hasꓽtestsⵧevals: boolean
	hasꓽstories: boolean
	//hasꓽtestsⵧsmoke: boolean // TODO 1D

	depsⵧnormal: Set<string>
	depsⵧdev: Set<string>
	depsⵧpeer: Set<string>
	depsⵧoptional: Set<string>
	depsⵧvendored: Set<string>

	// needed to build "scripts"
	languages: Set<ProgLang>

	// in case
	_manifest: PureModuleManifest
}

/////////////////////////////////////////////////

export { type PureModuleDetailsAllowedInManifest, type PureModuleManifest, type PureModuleDetails }
