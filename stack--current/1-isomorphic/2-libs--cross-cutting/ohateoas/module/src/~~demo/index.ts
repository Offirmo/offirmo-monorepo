import type { Immutable, JSONPrimitiveType } from '@offirmo-private/ts-types'
import { normalizeꓽuri‿str, type Uri‿str } from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'
import { prettifyꓽjson } from '@offirmo-private/prettify-any'
import {
	normalize,
	normalize_unicode,
	capitalize,
	to_lower_case,
	trim,
	coerce_blanks_to_single_spaces,
	coerce_delimiters_to_space,
	normalizeꓽurl,
	normalizeꓽurlⵧhttpₓ,
} from '@offirmo-private/normalize-string'

import { createꓽserver } from '../~~sandbox/example--check-for-update/server/index.ts'
//import { createꓽserver } from '../~~sandbox/example--tbrpg/server/index.ts'
//import { createꓽserver } from '../~~sandbox/example--tbrpg/server/index.ts'

import { LINK__REL__CONTINUE_TO } from '../types/consts.ts'
import type {
	OHAHyper,
	OHARichTextHints,
	OHAHyperMedia,
	OHAHyperActionBlueprint,
	OHAHyperAction, OHAHyperLink, OHALinkRelation, OHAFeedback,
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
		capitalize,
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

const SERVER = createꓽserver()



function convert_to_action(action_blueprint: OHAHyperActionBlueprint): {
	action: OHAHyperAction,
	feedback: OHAFeedback,
} {
	const { key, input = {}, feedback: _feedback = {} } = action_blueprint

	const payload = new Map<string, JSONPrimitiveType>()
	Object.keys(input).forEach(k => {
		const spec = input[k]
		switch (spec.type) {
			case 'env--os':
				payload.set(k, 'macOs')
				break
			case 'env--arch':
				payload.set(k, 'arm')
				break
			default:
				throw new Error(`Not implemented!`)
		}
	})

	const action: OHAHyperAction = {
		key,
		...(payload.size > 0 && { payload: Object.fromEntries(payload) })
	}

	const feedback: OHAFeedback = {
		tracking: 'foreground',
		..._feedback,
	}

	return {
		action,
		feedback,
	}
}

/////////////////////////////////////////////////

async function main() {
	let previous_url: Uri‿str | undefined = undefined
	let url: Uri‿str = '/'
	let pending_stuff = false
	loop: do {
		url = normalizeꓽuri‿str(url)
		console.log(`
┏━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╍╍╍
┃ 🏠 ⬅️ │ ${url}
┣━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╍╍╍`)
		pending_stuff = false
		const $doc = await SERVER.ↆget(url)
		previous_url = url

		const view = RichText.renderⵧto_text($doc, { style: 'markdown' })
		console.log(view)

		const links = getꓽlinks($doc)
		if (links[LINK__REL__CONTINUE_TO]) {
			const { href } = links[LINK__REL__CONTINUE_TO]
			url = href
			pending_stuff = true
			continue loop
		}

		const action_blueprints = getꓽaction_blueprints($doc)
		console.log('Actions:')
		for (const key in action_blueprints) {
			const action_blueprint = action_blueprints[key]
			console.log(`- ${getꓽcta(action_blueprint)} ` + prettifyꓽjson(action_blueprints[key], {outline: true}))
		}

		console.log('Links:')
		for (const rel in links) {
			const link = links[rel]
			console.log(`- ${getꓽcta(link)}: ${getꓽlink‿str(link)}`);
		}
		//console.log('- back')
		//console.log('- reload')
		//console.log('- home')

		const action_blueprint = action_blueprints[Object.keys(action_blueprints)[0]]
		if (action_blueprint) {
			const { action, feedback } = convert_to_action(action_blueprint)
			console.log('Dispatching action:', action)
			console.log('Feedback:', feedback)
			await SERVER.dispatch(action)
			if (feedback.continueᝍto)
				url = feedback.continueᝍto
			pending_stuff = true
		}

	} while (pending_stuff)
}
main()
	.catch((err) => {
		console.error('\nXXX Error XXX')
		console.error(err)
	})
	.finally(() => {
	console.log('Exiting. Bye!')
	})
