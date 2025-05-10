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

import { createꓽserver } from '../__fixtures/example--check-for-update/index.ts'
//import { createꓽserver } from '../~~sandbox/example--tbrpg/server/index.ts'
//import { createꓽserver } from '../~~sandbox/example--tbrpg/server/index.ts'

import { OHALinkRelation } from '../types/types.ts'
import {
	type OHAHyperActionBlueprint, type OHAHyperAction,
	type OHAFeedback,
	deriveꓽaction,
} from '@offirmo-private/ohateoas'

/////////////////////////////////////////////////

const SERVER = createꓽserver()

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
		if (links[LINK__RELꘌCONTINUE_TO]) {
			const { href } = links[LINK__RELꘌCONTINUE_TO]
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
			const { action, feedback } = deriveꓽaction(action_blueprint)
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
