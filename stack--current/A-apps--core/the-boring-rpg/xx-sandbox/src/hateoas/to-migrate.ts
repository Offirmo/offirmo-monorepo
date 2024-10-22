// TODO move into dedicated package

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/state-utils'
import {
	type Uri‿str,
	type URI‿x,
	type SchemeSpecificURIPart,
} from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'

/////////////////////////////////////////////////

function normalizeꓽuri‿SSP(url: Immutable<URI‿x>): SchemeSpecificURIPart {
	url ||= '/'

	if (typeof url === 'string') {
		const url‿obj = new URL(url, 'https://example.com')

		const result: SchemeSpecificURIPart = {
			path: url‿obj.pathname,

			query: url‿obj.search,

			...(url‿obj.hash && { fragment: url‿obj.hash }),
		}

		return result
	}

	return url
}
function normalizeꓽuri‿str(url: Immutable<URI‿x>): Uri‿str {
	const { path, query, fragment } = normalizeꓽuri‿SSP(url)

	let result = path

	if (query) {
		result += '?' + query
	}

	if (fragment) {
		result += '#' + fragment
	}

	return result
}
function getꓽCTA(action: Immutable<RichText.Action>): string {
	switch (action.type) {
		case 'action': {
			if (action.cta)
				return '⚡️' + action.cta

			throw new Error('Missing CTA for action!')
		}
		case 'hyperlink': {
			if (action.link.cta)
				return '⇨ ' + action.link.cta

			throw new Error('Missing CTA for hyperlink!')
		}
		default:
			throw new Error(`NIMP action type "${(action as any)?.type}"!`)
	}
}

const DEFAULT_ROOT_URI: Uri‿str = normalizeꓽuri‿str('')

/////////////////////////////////////////////////

export {
	normalizeꓽuri‿SSP,
	normalizeꓽuri‿str,
	getꓽCTA,
	DEFAULT_ROOT_URI,
}
