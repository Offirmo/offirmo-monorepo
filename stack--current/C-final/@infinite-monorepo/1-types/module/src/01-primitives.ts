import type { SemVerⳇExact, SemVerⳇRange } from '@offirmo-private/ts-types'

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
