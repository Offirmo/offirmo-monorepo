import type { Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'
import {
	normalize,
	normalize_unicode,
	capitalizeⵧfirst,
	to_lower_case,
	trim,
	coerce_blanks_to_single_spaces,
	coerce_delimiters_to_space,
} from '@offirmo-private/normalize-string'


import { LINK__REL__CONTINUE_TO } from '../types/consts.ts'
import type {
	OHARichTextHints,
	OHAHyperMedia,
	OHAHyperActionBlueprint,
	OHAHyperLink, OHALinkRelation,
} from '../types/types.ts'
import { promote_toꓽOHAHyperLink } from '../types/selectors.ts'
import { isꓽOHAHyperLink } from '../types/guards.ts'

/////////////////////////////////////////////////

function getꓽcta(hyper: OHAHyperLink | OHAHyperActionBlueprint): RichText.NodeLike {
	const { hints = {} } = hyper

	let candidate = hints.cta
		? RichText.renderⵧto_text(hints.cta)
		: 'unknown'

	if (isꓽOHAHyperLink(hyper)) {
		const { rel = [] } = hyper
		const candidates = rel.filter(r => r !== LINK__REL__CONTINUE_TO)
		candidate = '➡️ ' + (candidates[0] || candidate)
	}
	else {
		candidate = hyper.key
		switch (hints.change) {
			case 'none':
				break
			case 'create':
				candidate = '🆕 ' + candidate
				break
			case 'delete':
				candidate = '❌ ' + candidate
				break
			case 'update':
				candidate = '❇️ ' + candidate
				break
			case 'upgrade':
				candidate = '✳️ ' + candidate
				break
			case 'permission':
				candidate = '🪪 ' + candidate
				break

			case 'reduce':
				// fallthrough
			default:
				candidate = '▶️ ' + candidate
				break
		}
	}

	return normalize(candidate,
		normalize_unicode,
		coerce_delimiters_to_space,
		coerce_blanks_to_single_spaces,
		trim,
		to_lower_case,
		capitalizeⵧfirst,
	)
}

function getꓽlink‿str(link: Immutable<OHAHyperLink>): string {
	const { href, rel = [], target = '_self', hints = {} } = link
	return `"${href}" [${rel.join(', ')}]  🎯${target}`
}

function getꓽhints(repr: Immutable<OHAHyperMedia>): Immutable<OHARichTextHints> {
	const { $hints = {} } = repr
	return $hints
}

function getꓽlinks(repr: Immutable<OHAHyperMedia>): Record<string, Immutable<OHAHyperLink>> {
	const { links = {} } = getꓽhints(repr)

	return Object.fromEntries(
		Object.entries(links)
			.sort((a, b) => a[0].localeCompare(b[0]))
			.map(([k, l]) => [ k, promote_toꓽOHAHyperLink(l, { rel: [ k as OHALinkRelation ]}) ])
	)
}

function getꓽaction_blueprints(repr: Immutable<OHAHyperMedia>): Immutable<Record<string, OHAHyperActionBlueprint>> {
	const { actions = {} } = getꓽhints(repr)
	return actions
}

/////////////////////////////////////////////////

export {
	getꓽcta,
	getꓽlink‿str,
	getꓽhints,
	getꓽlinks,
	getꓽaction_blueprints,
}
