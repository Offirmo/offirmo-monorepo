import type { Immutable, JSONPrimitiveType } from '@offirmo-private/ts-types'
import type { Hyper } from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'

import { createꓽserver } from './server/index.ts'

import { LINK__REL__CONTINUE_TO } from '../../types/consts.ts'
import type {
	OHARichTextHints,
	OHAHyperMedia,
	OHAHyperActionBlueprint,
	OHAHyperAction, OHAHyperLink,
} from '../../types/types.ts'
import { promote_toꓽOHAHyperLink } from '../../types/selectors.ts'

/////////////////////////////////////////////////

function getꓽlinks(repr: Immutable<OHAHyperMedia>): Record<string, Immutable<OHAHyperLink>> {
	const { links = {} } = repr

	return Object.fromEntries(
		Object.entries(links)
			.map(([k, l]) => [ k, promote_toꓽOHAHyperLink(l) ])
	)
}

function getꓽaction_blueprints(repr: Immutable<OHAHyperMedia>): Record<string, Immutable<OHAHyperActionBlueprint>> {
	const { actions = {} } = repr
	return {
		...actions,
	}
}

/////////////////////////////////////////////////

const SERVER = createꓽserver()

function get_cta(hyper: Hyper): RichText.NodeLike {

}

function prepare_for_dispatch(action_candidate: OHAHyperActionBlueprint): {
	action: OHAHyperAction,
	feedback
} {
	const { type, input = {} } = action_candidate

	const payload = new Map<string, JSONPrimitiveType>()
	Object.keys(input).forEach(k => {
		throw new Error(`Not implemented!`)
	})

	return {
		type,
		...(payload.size > 0 && { payload: Object.fromEntries(payload) })
	}
}

/////////////////////////////////////////////////

async function main() {
	let url = '/'
	let pending_stuff = false
	loop: do {
		pending_stuff = false
		const $doc = await SERVER.ↆget(url)

		const view = RichText.renderⵧto_text($doc, { style: 'markdown' })
		console.log(view)

		const links = getꓽlinks($doc)
		console.log('Links:')
		for (const rel in links) {
			console.log(`- ${rel}: ${links[rel]}`);
		}
		if (links[LINK__REL__CONTINUE_TO]) {
			const { href } = links[LINK__REL__CONTINUE_TO]
			url = href
			pending_stuff = true
			continue loop
		}

		const action_blueprints = getꓽaction_blueprints($doc)
		console.log('Actions:')
		for (const key in action_blueprints) {
			console.log(`- ${key}: ${action_blueprints[key]}`);
		}
		console.log('- back')
		console.log('- reload')
		console.log('- home')

		//const action = convert_to_action(actions[0].action)
		//const x = await SERVER.dispatch(action)
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
