import assert from 'tiny-invariant'
import { Enum } from 'typescript-string-enums'
import type { Immutable } from '@offirmo-private/ts-types'

import {
	type BookPartReference,
	NODE_REFERENCEⵧSEPARATOR,
	NODE_REFERENCEꘌROOT,
} from '../model--book/index.ts'

import {
	type BookExperience,
	AccessLevel,
	ComprehensionLevel,
	type NodeExperience,
} from './types.ts'

/////////////////////////////////////////////////

function _getꓽnode__experienceⵧexact(state: Immutable<BookExperience>, path: Immutable<BookPartReference>): Immutable<NodeExperience> | undefined {
	return state.comprehension_level‿by_path?.[path]
}

function _getꓽnode__experienceⵧinherited(state: Immutable<BookExperience>, path: Immutable<BookPartReference>): Immutable<NodeExperience> | undefined {
	const pathⵧsplitted = path.split(NODE_REFERENCEⵧSEPARATOR) // reminder: will always have at least one element, maybe empty

	while (pathⵧsplitted.length) {
		const path = pathⵧsplitted.join(NODE_REFERENCEⵧSEPARATOR) ?? NODE_REFERENCEꘌROOT
		const raw = _getꓽnode__experienceⵧexact(state, path)
		if (raw)
			return raw
		pathⵧsplitted.pop()
	}

	return undefined
}

function getꓽaccess_levelⵧinherited(state: Immutable<BookExperience>, path: Immutable<BookPartReference>): AccessLevel | undefined {
	const experience = _getꓽnode__experienceⵧinherited(state, path)

	return experience?.access_level
}

function getꓽcomprehension_levelⵧinherited(state: Immutable<BookExperience>, path: Immutable<BookPartReference>): ComprehensionLevel | undefined {
	const access_level = getꓽaccess_levelⵧinherited(state, path)
	if (access_level === 'unaware')
		return undefined

	const experience = _getꓽnode__experienceⵧinherited(state, path)

	return experience?.comprehension_level
}

function isꓽawareⵧinherited(state: Immutable<BookExperience>, path: Immutable<BookPartReference>, fallback: AccessLevel): boolean {
	const access_level = getꓽaccess_levelⵧinherited(state, path) ?? fallback
	return access_level !== AccessLevel.unaware
}

function isꓽstarredⵧexact(state: Immutable<BookExperience>, path: Immutable<BookPartReference>): boolean {
	const exp = _getꓽnode__experienceⵧexact(state, path)
	return exp?.starred === true
}

function getꓽstarred_nodes_count(state: Immutable<BookExperience>): number {
	const root_adjust = isꓽstarredⵧexact(state, NODE_REFERENCEꘌROOT) ? -1 : 0
	return Object.values(state.comprehension_level‿by_path || {})
		.filter(node_exp => node_exp.starred)
		.length + root_adjust
}

/////////////////////////////////////////////////

export {
	NODE_REFERENCEꘌROOT, // for convenience

	_getꓽnode__experienceⵧexact,
	_getꓽnode__experienceⵧinherited,

	getꓽaccess_levelⵧinherited,
	getꓽcomprehension_levelⵧinherited,

	isꓽawareⵧinherited,

	isꓽstarredⵧexact,
	getꓽstarred_nodes_count,
}
