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
import { createꓽserver } from '../__fixtures/example--02-hello-world-interactive/index.ts'
//import { createꓽserver } from '../__fixtures/example--check-for-update/index.ts'
//import { createꓽserver } from '../~~sandbox/example--tbrpg/server/index.ts'
//import { createꓽserver } from '../~~sandbox/example--tbrpg/server/index.ts'

import {
	deriveꓽaction,
	getꓽlinks, getꓽlink‿str,
	getꓽaction_blueprints,
	getꓽcta,
} from '@offirmo-private/ohateoas'

/////////////////////////////////////////////////

const SERVER = createꓽserver()

/////////////////////////////////////////////////

async function main() {
	let previous_url: Uri‿str | undefined = undefined
	let url: Uri‿str = '/'
	let pending_stuff = false
	let infine_loop_detection = 10
	loop: do {
		--infine_loop_detection
		if (infine_loop_detection < 0) {
			break loop
		}

		url = normalizeꓽuri‿str(url)
		console.log(`
┏━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╍╍╍
┃ 🏠 ⬅️ │ ${url}
┣━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╍╍╍`)
		pending_stuff = false
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
			console.log(`- ${getꓽcta(action_blueprint)} ` + prettifyꓽjson(action_blueprints[key], {outline: true}))
		}

		const links = getꓽlinks($doc)
		for (const rel in links) {
			const link = links[rel]
			console.log(`- ${getꓽcta(link)}: ${getꓽlink‿str(link)}`);
		}
		//console.log('- back')
		//console.log('- reload')
		//console.log('- home')

		/////////////////////////////////////////////////
		// act

		/* TODO review
		if (links[LINK__RELꘌCONTINUE_TO]) {
			const { href } = links[LINK__RELꘌCONTINUE_TO]
			url = href
			pending_stuff = true
			continue loop
		}
		 */

		if (Object.keys(action_blueprints).length > 0) {
			// TODO 1D selector to pick an action
			// pick one at random
			console.log('[Auto-selecting an action...]')
			const action_blueprint = action_blueprints[Object.keys(action_blueprints)[0]]
			const inputs_payload: any = {
			}
			// TODO auto fill any input
			if (action_blueprint.input?.username) {
				inputs_payload.username = 'John Smith'
			}

			const { action, feedback } = deriveꓽaction(action_blueprint, inputs_payload)
			console.log('Dispatching action:', action)
			console.log('Feedback:', feedback)
			await SERVER.dispatch(action)
			if (feedback.continueᝍto)
				url = feedback.continueᝍto
			pending_stuff = true
			continue loop
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
