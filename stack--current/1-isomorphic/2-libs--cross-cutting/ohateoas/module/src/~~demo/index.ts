import type { Immutable, JSONPrimitiveType } from '@offirmo-private/ts-types'
import { getꓽUTC_timestamp‿ms } from '@offirmo-private/timestamps'

import { normalizeꓽuri‿str, type Uri‿str } from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'
import { prettifyꓽjson } from '@offirmo-private/prettify-any'
import {
	normalize,
	normalize_unicode,
	capitalizeⵧfirst,
	to_lower_case,
	trim,
	coerce_blanks_to_single_spaces,
	coerce_delimiters_to_space,
} from '@offirmo-private/normalize-string'

//import { createꓽserver } from '../__fixtures/example--01-hello-world/index.ts'
//import { createꓽserver } from '../__fixtures/example--02-hello-world-interactive/index.ts'
import { createꓽserver } from '../__fixtures/example--10-check-for-updates/index.ts'
//import { createꓽserver } from '../~~sandbox/example--tbrpg/server/index.ts'
//import { createꓽserver } from '../~~sandbox/example--tbrpg/server/index.ts'

import {
	deriveꓽaction,
	getꓽlinks, getꓽlink‿str,
	getꓽaction_blueprints,
	getꓽcta, OHALinkRelation,
} from '@offirmo-private/ohateoas'
import assert from 'tiny-invariant'

/////////////////////////////////////////////////

const URI__ROOT = normalizeꓽuri‿str('')

const SERVER = createꓽserver()

/////////////////////////////////////////////////

async function main() {
	let previous_url: Uri‿str | undefined = undefined
	let url: Uri‿str = URI__ROOT
	let infine_loop_detection = 5
	loop: do {
		--infine_loop_detection
		if (infine_loop_detection < 0) {
			console.log(`[Auto-browse: too many decisions. exiting...]`)
			break loop
		}

		url = normalizeꓽuri‿str(url)
		console.log(`
┏━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╍╍╍
┃ 🏠 ⬅️ │ ${url}
┣━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╍╍╍`)
		const $doc = await SERVER.ↆget(url)
		if (previous_url !== url) {
			previous_url = url
		}

		/////////////////////////////////////////////////
		// display representation

		const view = RichText.renderⵧto_text($doc, { style: 'markdown' })
		console.log(view)

		const action_blueprints = getꓽaction_blueprints($doc)
		for (const key in action_blueprints) {
			const action_blueprint = action_blueprints[key]
			console.log(`- ${getꓽcta(action_blueprint)}`)
			//console.log(prettifyꓽjson(action_blueprints[key]))
		}

		const links = getꓽlinks($doc)
		for (const rel in links) {
			const link = links[rel]
			console.log(`- ${getꓽcta(link)}: ${getꓽlink‿str(link)}`);
		}
		//console.log('- back')
		//console.log('- reload')
		//console.log('- home')

		if (links[OHALinkRelation.continueᝍto]) {
			const { href } = links[OHALinkRelation.continueᝍto]
			assert(href !== url, `continue-to should be different!`)
			console.log(`[Continuing to "${OHALinkRelation.continueᝍto}"...]`)
			url = href
			continue loop
		}

		/////////////////////////////////////////////////
		// act

		if (Object.keys(action_blueprints).length > 0) {
			// TODO 1D selector to pick an action
			// pick one at random
			console.log(`[Auto-browse: selecting an action...]`)
			const action_blueprint = action_blueprints[Object.keys(action_blueprints)[0]]
			const inputs_payload: any = {
			}
			// TODO auto fill any input
			if (action_blueprint.input?.username) {
				inputs_payload.username = 'John Smith'
			}

			const { action, feedback } = deriveꓽaction(action_blueprint, inputs_payload)
			console.log('Dispatching action:', action)
			if (feedback.story) {
				//console.log('Feedback:', feedback)
				console.log(RichText.renderⵧto_text(feedback.story))
			}

			const action_story = await SERVER.dispatch(action)
			console.log(`[Dispatch of action "${action.type}" processed.]`)
			if (feedback.continueᝍto)
				url = feedback.continueᝍto
			if (action_story) {
				console.log(RichText.renderⵧto_text(action_story.message || action_story))
			}

			continue loop
		}

		// TODO pick a link

		// meanwhile
		// let's play around
		if (url !== URI__ROOT) {
			// let's try to go back home
			console.log(`[Auto-browse: navigating to root...]`)
			url = URI__ROOT
			continue loop
		}

		console.log(`[Auto-browse: I don't know what to do...]`)
		break loop
	} while (true)
}
main()
	.catch((err) => {
		console.error('\nXXX Error XXX')
		console.error(err)
	})
	.finally(() => {
		console.log(`[The OHA browser has exited.]`)
	})
