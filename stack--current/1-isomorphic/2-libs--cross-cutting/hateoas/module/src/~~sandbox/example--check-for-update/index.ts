import type { Immutable, JSONPrimitiveType } from '@offirmo-private/ts-types'
import type { Hyper } from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'

import { createꓽserver } from './server/index.ts'

import type {

	OHAHyperMedia,
	OHAHyperActionBlueprint,
	OHAHyperAction,
	HATEOASServer,
	OHAPendingEngagement,
	OHAHyperLink,
} from '../../types/types.ts'

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
	const data = await SERVER.ↆget(url)
	const $doc = data

	const view = RichText.renderⵧto_text($doc, { style: 'markdown' })
	console.log(view)

	const pending_engagements = [] // TODO pick from response

	const actions = RichText.renderⵧto_actions($doc)
	console.log('Actions:')
	actions.forEach((action) => {
		const { $node, ...rest } = action
		console.log(' - ', rest)
	})
	console.log('- back')
	console.log('- reload')
	console.log('- home')

	const action = convert_to_action(actions[0].action)
	const x = await SERVER.dispatch(action)
}
main()
	.catch((err) => {
		console.error('\nXXX Error XXX')
		console.error(err)
	})
	.finally(() => {
	console.log('Exiting. Bye!')
	})
