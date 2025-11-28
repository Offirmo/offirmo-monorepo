import { normalizeꓽuri‿str, getꓽscheme_specific_part } from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'
import {
	type OHARichTextHints,
	type OHAServer,
	type OHAStory,
	type OHAHyperActionBlueprint,
	type OHAFeedback,
	OHALinkRelation,
	type OHAHyperMedia,
} from '@offirmo-private/ohateoas'
import type { Story } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

const state = {}

/////////////////////////////////////////////////

const URIꘌROOT = normalizeꓽuri‿str('')

function createꓽserver(): OHAServer {
	const ↆget: OHAServer['ↆget'] = async (url = URIꘌROOT) => {
		////////////
		const { path, query, fragment } = getꓽscheme_specific_part(url)
		const now = new Date()

		////////////
		// prepare aggregation
		let $builder = RichText.fragmentⵧblock() // "block" bc maps to a ~frame/sub-browser

		const links: OHARichTextHints['links'] = {
			[OHALinkRelation.self]: normalizeꓽuri‿str(path), // intentionally strip query & path until considered relevant
			[OHALinkRelation.home]: URIꘌROOT, // could be DEFAULT_ROOT_URI or sth else, ex. /user/:xyz/savegame/:xyz/
		}

		const actions: OHARichTextHints['actions'] = {}

		const engagements: OHARichTextHints['engagements'] = []

		////////////

		// TODO recursive routing
		const $time_local_24h = RichText.fragmentⵧinline(now.toLocaleTimeString('fr')).done()
		const $time_local_descr = RichText.fragmentⵧinline(
			{
				0: 'midnight',
				1: 'deep night',
				2: 'late night',
				3: 'night waning',
				4: 'pre-dawn',
				5: 'early dawn',
				6: 'dawn',
				7: 'early morning',
				8: 'morning',
				9: 'morning',
				10: 'late morning',
				11: 'late morning',
				12: 'noon',
				13: 'early afternoon',
				14: 'afternoon',
				15: 'mid-afternoon',
				16: 'late afternoon',
				17: 'early evening',
				18: 'dusk',
				19: 'early nightfall',
				20: 'night',
				21: 'night',
				22: 'late night',
				23: 'late night',
			}[now.getHours()], // TODO 1D timzones / day length / sun position
		).done()

		$builder.pushNode2({ time: $time_local_24h })
		$builder.pushText(' — ')
		$builder.pushNode2({ time_desc: $time_local_descr })

		const root = RichText.listⵧunordered()
		root.pushNode2({ location: RichText.fragmentⵧinline('location: 🏠 Home').done() })

		$builder.pushNode(root.done())

		actions['adventure--random'] = {
			type: 'adventure--random',
			hints: {
				change_type: 'update',
			},

			feedback: {
				tracking: 'foreground',
				story: 'Going on an adventure…',
			} as OHAFeedback,
		} as OHAHyperActionBlueprint

		////////////
		// wrap together
		$builder.addHints<OHARichTextHints>({
			links,
			actions,
			engagements,
		})

		return $builder.done()
	}

	const dispatch: OHAServer['dispatch'] = async action => {
		console.log(`Server: asked to dispatch action…`, action)

		switch (action.type) {
			case 'adventure--random':
				return 'TODO' as Story<OHAHyperMedia>
			default:
				throw new Error(`Unknown action type "${action.type}"!`)
		}
	}

	return {
		ↆget,
		dispatch,
	}
}

/////////////////////////////////////////////////

export { createꓽserver }
