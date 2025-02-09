import assert from 'tiny-invariant'
import { Enum } from 'typescript-string-enums'
import type { Immutable } from '@offirmo-private/ts-types'

import {
	type BookPartReference,
	REFERENCEⵧSEPARATOR,
	REFERENCEⵧROOT,
} from '../model--book/index.ts'

import {
	type BookExperience,
	AccessLevel,
	ComprehensionLevel,
	type NodeExperience,
} from './types.ts'

/////////////////////////////////////////////////

function _getꓽnode__experience(state: Immutable<BookExperience>, path: Immutable<BookPartReference> = REFERENCEⵧROOT): Immutable<NodeExperience> | undefined {
	const pathⵧsplitted = path.split(REFERENCEⵧSEPARATOR) // reminder: will always have at least one element, maybe empty

	while (pathⵧsplitted.length) {
		const path = pathⵧsplitted.join(REFERENCEⵧSEPARATOR) ?? REFERENCEⵧROOT
		const raw = state.comprehension_level‿by_path?.[path]
		if (raw)
			return raw
		pathⵧsplitted.pop()
	}

	return undefined
}

function getꓽaccess_level(state: Immutable<BookExperience>, path: Immutable<BookPartReference> = REFERENCEⵧROOT): AccessLevel | undefined {
	const experience = _getꓽnode__experience(state, path)

	return experience?.access_level
}

function getꓽcomprehension_level(state: Immutable<BookExperience>, path: Immutable<BookPartReference> = REFERENCEⵧROOT): ComprehensionLevel | undefined {
	const access_level = getꓽaccess_level(state, path)
	if (access_level === 'unaware')
		return undefined

	const experience = _getꓽnode__experience(state, path)

	return experience?.comprehension_level
}

function isꓽaware(state: Immutable<BookExperience>, fallback: AccessLevel): boolean {
	const access_level = getꓽaccess_level(state) ?? fallback
	return access_level !== AccessLevel.unaware
}

function isꓽroot_starred(state: Immutable<BookExperience>): boolean {
	const exp = _getꓽnode__experience(state)
	return exp?.starred === true
}

function getꓽstared_nodes_count(state: Immutable<BookExperience>): number {
	const root_adjust = isꓽroot_starred(state) ? -1 : 0
	return Object.values(state.comprehension_level‿by_path || {})
		.filter(node_exp => node_exp.starred)
		.length + root_adjust
}

/////////////////////////////////////////////////

export {
	getꓽaccess_level,
	getꓽcomprehension_level,
	isꓽroot_starred,
	getꓽstared_nodes_count,
	isꓽaware,
}
