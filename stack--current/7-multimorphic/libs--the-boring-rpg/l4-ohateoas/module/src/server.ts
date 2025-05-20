import type { SemVer } from '@offirmo-private/ts-types'
import {normalizeꓽuri‿str, getꓽscheme_specific_part, ReducerAction} from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'
import {
	DEFAULT_ROOT_URI,
	type OHARichTextHints,
	type OHAServer,
	type OHAStory,
	type OHAHyperActionBlueprint,
	type OHAFeedback, OHALinkRelation, type OHAHyperLink, type OHAPendingEngagement,
} from '@offirmo-private/ohateoas'
import { createꓽall_store_fns } from '@tbrpg/interfaces'
import * as UIRT from '@tbrpg/ui--rich-text'

/////////////////////////////////////////////////


/////////////////////////////////////////////////

const DEBUG = false

/////////////////////////////////////////////////

const URIꘌROOT = normalizeꓽuri‿str('/session/adventures/')

const URIꘌEQUIPMENT: OHAHyperLink = {
	href: '/session/equipment/',
	target: 'character_sheet/equipment',
	rel: [],
	hints: {
		cta: 'Manage equipment & inventory…',
	}
}

interface PromptFragment {
	type?: 'system' | 'user'
	text: string
}

function createꓽserver(): OHAServer {
	// In this demo, the state is LOCAL
	const all_store_fns = createꓽall_store_fns()


	const ↆget: OHAServer['ↆget'] = async (url = DEFAULT_ROOT_URI) => {
		DEBUG && console.group(`↘ OHA ↆget("${url}")`)

		////////////
		const { path, query, fragment } = getꓽscheme_specific_part(url)
		DEBUG && console.log('URL after normalization:', { path, query, fragment })

		////////////
		// prepare aggregation
		let $builder = RichText.fragmentⵧblock() // "block" bc maps to a ~frame/sub-browser

		const links: OHARichTextHints['links'] = {
			[OHALinkRelation.self]: normalizeꓽuri‿str(path), // intentionally strip query & path until considered relevant
			[OHALinkRelation.home]: URIꘌROOT, // could be DEFAULT_ROOT_URI or sth else, ex. /user/:xyz/savegame/:xyz/
		}

		const actions: OHARichTextHints['actions'] = {
		}

		const engagements: OHARichTextHints['engagements'] = []

		const prompt: Array<PromptFragment> = []
		prompt.push({ text: `
You're playing a video game "The Boring RPG",
a fantasy RPG where you play as a hero and try to maximise your power and explore all the game features.` })

		////////////

		const state = all_store_fns.getSnapshot()

		const $recap = UIRT.getꓽrecap(state.u_state)
		prompt.push({text: RichText.renderⵧto_text($recap)})

		// XXX should come from the state
		engagements.push({
			flow: 'out',
			sequence: 'session',
			attention_needed: 'notice',
			//auto_dismiss_delay_ms: 'normal',
			story: 'Welcome to my game! This is a hobby game, no guarantee.',

			uid: -1
		} as OHAPendingEngagement)

		// TODO 1D recursive routing
		switch (path) {
			case DEFAULT_ROOT_URI: { // root, expected to redirect
				// imagining a login screen, then continue on login

				$builder = $builder
					.pushText('Welcome to The Boring RPG!')
					//.pushLineBreak() TODO should be auto sep

				links[OHALinkRelation.continueᝍto] = '/session/'

				break
			}

			case normalizeꓽuri‿str('/session/'): { // for recap
				// imagining a character/savegame selection, then continue to game
				// TODO review should be engagement instead?
				$builder = $builder
					.pushNode($recap, { id: 'recap'})
				//.pushLineBreak() TODO should be auto sep

				links[OHALinkRelation.continueᝍto] = '/session/adventures/'

				break
			}

			case normalizeꓽuri‿str('/session/adventures/'): {
				$builder = $builder.pushBlockFragment('What do you want to do?')

				// NO recap of last adventure, it's a different route from when we play!

				/*
				if (AppState.is_inventory_full(state.u_state)) {
					$builder = $builder.pushNode(
						RichText.strong().pushText('Your inventory is full!').done(),
					)
					// TODO add action to sell worst items
					// TODO is it a blocker for playing?
				}*/

				//$builder = $builder.pushBlockFragment('You can play now!')
				/*
				if(AppState.getꓽavailable_energy‿float(state.t_state) >= 1) {
					$builder = $builder.pushBlockFragment('You can play now!')
				}
				else {
					$builder = $builder.pushBlockFragment('You can play again in ' + AppState.getꓽhuman_time_to_next_energy(state))
				}*/

				actions['play'] = {
					type: 'play',

					hints: {
						change: 'reduce',
						cta: 'Play!',
						keyboard_shortcut: 'P',
					},

					feedback: {
						tracking: 'foreground', // (default) full "waiting/loading" UI, no other action can be sent until this one is resolved

						story: {
							message: 'Exploring…',
							hints: {
								durationⵧmin‿ms: 1000, // if present, never resolve the action faster than this (illusion of labor) Do not abuse! (default to some value depending on the verb)
							},
						}
					} as OHAHyperActionBlueprint['feedback'],
				} as OHAHyperActionBlueprint

				links['equipment'] = URIꘌEQUIPMENT

				break
			}

			case '/session/adventures/last': {
				throw new Error(`Not implemented!`)

				links[OHALinkRelation.continueᝍto] = '/session/adventures/'

				break
			}

			default:
				throw new Error(`404 on "${path}"!`)
		}

		////////////
		// wrap together
		$builder.addHints<OHARichTextHints>({
			links,
			actions,
			engagements,
		})

		DEBUG && console.groupEnd()

		return $builder.done()
	}

	const dispatch: OHAServer['dispatch'] = async (action: ReducerAction) => {
		console.log(`Server: asked to dispatch action…`, action)

		all_store_fns.dispatch(action)
	}

	return {
		ↆget,
		dispatch,
	}
}

/////////////////////////////////////////////////

export {
	createꓽserver,
}
