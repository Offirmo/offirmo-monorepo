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

export type ProgrammingLanguage =
	| 'css'
	| 'html'
	| 'js'
	| 'json'
	| 'jsx' // also covers tsx
	| 'md'
	| 'ts'

export type QualityStatus = // EXPERIMENTAL rating of modules TODO clarify
	| 'spike'
	| 'sandbox' // self-contained playground for testing stuff
	| 'tech-demo' // not YET in prod
	| 'unstable' // ex. a rewrite or refactor in progress, most likely behind a flag
	| 'stable'

/////////////////////////////////////////////////

export type DependencyFQName = string // ex. @offirmo/cli

export type DependencyType = 'normal' | 'dev' | 'peer' | 'optional' | 'vendored' // special, TODO

export interface Dependency {
	label: DependencyFQName
	type: DependencyType
}

export interface DependencyDetails {
	type?: DependencyType
	v?: SemVerⳇRange
}

/////////////////////////////////////////////////
