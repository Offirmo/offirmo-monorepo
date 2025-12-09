import {
	normalizeꓽuri‿str,
	getꓽscheme_specific_part,
	type SchemeSpecificURIPart,
} from '@offirmo-private/ts-types-web'
import chalk from 'chalk'
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
import { getꓽrandom, getꓽengine } from '@offirmo/random'
import type { Builder } from '@offirmo-private/rich-text-format'

//const gen = getꓽrandom.picker.of(ARMOR_BASES)
//const gen getꓽrandom.generator_of.integer.in_interval(BASE_STRENGTH_INTERVAL_BY_QUALITY[quality]!)

const state = {
	rng: getꓽengine.for_unit_tests(),
}

/////////////////////////////////////////////////

const URIꘌROOT = normalizeꓽuri‿str('')

function createꓽserver(): OHAServer {
	const ↆget: OHAServer['ↆget'] = async (url = URIꘌROOT) => {
		////////////
		const { path, query, fragment } = getꓽscheme_specific_part(url)
		const now = new Date()

		////////////
		// prepare aggregation
		const aggreg: Temp = {
			path_segments: path.split('/').filter(s => s.length > 0),
			query: new URLSearchParams(query),
			fragment: fragment || '',
			$builder: RichText.fragmentⵧblock(),
			links: {},
			actions: {},
			engagements: [],
		}
		aggreg.links[OHALinkRelation.self] = normalizeꓽuri‿str(path) // intentionally strip query & path until considered relevant
		aggreg.links[OHALinkRelation.home] = URIꘌROOT // could be DEFAULT_ROOT_URI or sth else, ex. /user/:xyz/savegame/:xyz/

		////////////

		const header = RichText.listⵧunordered()
			.pushKeyValue(
				'time',
				(() => {
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
						}[now.getHours()], // TODO 1D timezones / day length / sun position
					).done()

					return RichText.fragmentⵧinline()
						.pushNodes({ time: $time_local_24h })
						.pushText(' — ')
						.pushNodes({ time__descr: $time_local_descr })
						.done()
				})(),
			)
			.pushKeyValue(
				'location',
				'⎨⎨location⎬⎬', // To be replaced
			)
			.done()
		aggreg.$builder.pushNodes({ header })

		let segment_0 = aggreg.path_segments.shift() || 'home'
		switch (segment_0) {
			case 'home':
				do_home(aggreg)
				break
			default:
				throw new Error('Not found!')
		}

		/*
			;(() => {
				const $result = RichText.fragmentⵧinline()

				switch (segment_0) {
					case 'home':
						$result.pushEmoji('🏠')
						$result.pushText('Home')
						break
					case 'ice-cream-shop':
						$result.pushEmoji('🍦')
						$result.pushText('Ice-cream shop')
						break
					default:
						throw new Error()
				}

				return $result.done()
			})(),
		)*/

		/*actions['adventure'] = {
			type: 'adventure',

			hints: {
				cta: 'Tiny adventure',
				change_type: 'update',
			},

			feedback: {
				tracking: 'foreground',
				story: 'Going on an adventure…',
			} as OHAFeedback,
		} as OHAHyperActionBlueprint */

		////////////
		// wrap together
		aggreg.$builder.addHints<OHARichTextHints>({
			links: aggreg.links,
			actions: aggreg.actions,
			engagements: aggreg.engagements,
		})

		return aggreg.$builder.done()
	}

	const dispatch: OHAServer['dispatch'] = async action => {
		console.log(`Server: asked to dispatch action…`, action)

		switch (action.type) {
			case 'drink-hot-beverage':
			case 'take-a-nap':
				return undefined // no follow-up story needed

			case 'adventure': {
				const FLAVOURS = [
					{ name: 'strawberry', color‿hex: '#FF0000' },

					{ name: 'pistacchio', color‿hex: '#00FF00' },
					{ name: 'vanilla', color‿hex: '#FFFFFF' },
				]
				const flavours_picker = getꓽrandom.picker.of(FLAVOURS)

				// TODO travel
				// TODO consecutively unique
				const scoops = []

				const scoops_count = getꓽrandom.generator_of.integer.between(1, 4)(state.rng)
				for (let i = 0; i < scoops_count; i++) {
					const flavour = flavours_picker(state.rng)
					scoops.push(chalk.hex(flavour.color‿hex).bold('●') + ' ' + flavour.name)
				}

				return [
					`You get a ${scoops_count} scoop${scoops_count > 1 ? 's' : ''} ice-cream cone:`,
					...scoops,
					'▼',
				].join('\n') as OHAStory
			}
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

type Temp = {
	path_segments: Array<string>
	query: URLSearchParams
	fragment: string
	$builder: Builder
	links: NonNullable<OHARichTextHints['links']>
	actions: NonNullable<OHARichTextHints['actions']>
	engagements: NonNullable<OHARichTextHints['engagements']>
}
function do_home(aggreg: Temp): void {
	const location = RichText.fragmentⵧinline().pushEmoji('🏠').pushText('Home').done()
	aggreg.$builder.pushRawNodes({ location })

	aggreg.$builder.pushNodes({
		surroundings: RichText.listⵧunordered([
			RichText.fragmentⵧinline()
				.pushEmoji('☕')
				.pushText(' A hot beverage is waiting for you')
				.done(),
		]).done(),
	})

	aggreg.actions['drink-hot-beverage'] = {
		type: 'drink-hot-beverage',

		hints: {
			cta: 'Drink a hot beverage ☕',
			change_type: 'update',
		},

		feedback: {
			tracking: 'foreground',
			story: 'Aaahhh… You slowly sip your hot beverage, feeling warm and cozy inside.',
		} as OHAFeedback,
	} as OHAHyperActionBlueprint

	aggreg.actions['take-a-nap'] = {
		type: 'take-a-nap',

		hints: {
			cta: 'Take a nap 💤',
			change_type: 'update',
		},

		feedback: {
			tracking: 'foreground',
			story: 'You take a refreshing nap. You feel rested and rejuvenated!',
		} as OHAFeedback,
	} as OHAHyperActionBlueprint

	aggreg.links['ice-cream-shop'] = normalizeꓽuri‿str('/ice-cream-shop?action=eat')
}

/////////////////////////////////////////////////

export { createꓽserver }
