import assert from 'tiny-invariant'
import { Immutable, IETFLanguageType, Charset } from '@offirmo-private/ts-types'
import {
	normalizeꓽIETFLanguageType,
	normalizeꓽtextⵧsentence,
} from '@offirmo-private/normalize-string'

import type { WithLang, WithCharset, WithTitle } from './types.js'

/////////////////////////////////////////////////

function getꓽlang(spec: Immutable<WithLang>): IETFLanguageType {
	return normalizeꓽIETFLanguageType(spec.lang ?? '')
}

const CHARSETⵧDEFAULT: Charset = 'utf-8'
function getꓽcharset(spec: Immutable<WithCharset>): Charset {
	return CHARSETⵧDEFAULT
}

function getꓽtitle(spec: Immutable<WithTitle>): string | undefined {
	const candidate = normalizeꓽtextⵧsentence(spec.title ?? '')
	return candidate ? candidate : undefined
}

/////////////////////////////////////////////////

export {
	getꓽlang,
	getꓽcharset,
	getꓽtitle,
}
