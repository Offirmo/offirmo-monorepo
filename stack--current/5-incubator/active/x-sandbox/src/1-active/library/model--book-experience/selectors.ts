import assert from 'tiny-invariant'
import { Enum } from 'typescript-string-enums'
import type { Immutable } from '@offirmo-private/ts-types'

import type { BookPartReference } from '../model--book/index.ts'
import { REFERENCEⵧSEPARATOR, REFERENCEⵧROOT } from '../model--book/index.ts'

import type { BookExperience } from './types.js'
import { AccessLevel, ComprehensionLevel } from './types.js'

/////////////////////////////////////////////////

function _getꓽaccess_or_comprehension_level(state: Immutable<BookExperience>, path: Immutable<BookPartReference> = REFERENCEⵧROOT): AccessLevel | ComprehensionLevel | undefined {
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

function getꓽaccess_level(state: Immutable<BookExperience>, path: Immutable<BookPartReference> = '.'): AccessLevel | undefined {
	const raw = _getꓽaccess_or_comprehension_level(state, path)

	if (Enum.isType(AccessLevel, raw))
		return raw

	return undefined
}

function isꓽaware(state: Immutable<BookExperience>): boolean {
	const raw = getꓽaccess_level(state)
	return !!raw && raw !== AccessLevel.unaware
}

/////////////////////////////////////////////////

export {
	getꓽaccess_level,
	isꓽaware,
}
