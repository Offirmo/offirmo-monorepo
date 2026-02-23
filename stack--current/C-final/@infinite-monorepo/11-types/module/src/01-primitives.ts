import type { SemVerⳇExact, SemVerⳇRange } from '@monorepo-private/ts--types'

/////////////////////////////////////////////////
// primitives

export interface VersionSpecification {
	versionsⵧacceptable:
		| SemVerⳇRange
	//| 'auto' // pick the most sensible
	//| 'latest'
	//| 'LTS' // TODO review
	//| 'current'
	// default (built-in) aliases: node, stable, unstable, iojs, system

	// recommended, ex.
	// - bc. pre-installed in CI
	versionⵧrecommended?: SemVerⳇExact
}

/////////////////////////////////////////////////

export type ProgLang =
	| 'css'
	| 'html'
	| 'js'
	| 'json'
	| 'jsx' // also covers tsx
	| 'md'
	| 'ts'

/////////////////////////////////////////////////

export type DependencyFQName = string // ex. @offirmo/cli

export type DependencyType = 'normal' | 'dev' | 'peer' | 'optional' | 'vendored' // special, TODO

export interface Dependency {
	label: DependencyFQName
	type: DependencyType
}

export interface DependencyDetails {
	type?: DependencyType
	v?: Semver
}

/////////////////////////////////////////////////
