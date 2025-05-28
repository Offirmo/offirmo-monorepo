import assert from 'tiny-invariant'
import type { Immutable, IETFLanguageType, Charset } from '@offirmo-private/ts-types'
import {
	normalizeꓽIETFLanguageType,
	normalizeꓽtextⵧsentence,
} from '@offirmo-private/normalize-string'

import type { WithLang, WithCharset, WithTitle } from './types.ts'

/////////////////////////////////////////////////

function getꓽlang(spec: undefined | Immutable<WithLang>): IETFLanguageType {
	return normalizeꓽIETFLanguageType(spec?.lang ?? '')
}

const CHARSETⵧDEFAULT: Charset = 'utf-8'
function getꓽcharset(spec: undefined | Immutable<WithCharset>): Charset {
	return CHARSETⵧDEFAULT
}

function getꓽtitle(spec: undefined | Immutable<WithTitle>): string | undefined {
	if (!spec) return undefined

	const candidate = normalizeꓽtextⵧsentence(spec.title ?? '')
	return candidate ? candidate : undefined
}

/////////////////////////////////////////////////

export {
	getꓽlang,
	getꓽcharset,
	getꓽtitle,
}
