// https://htmx.org/essays/hateoas/
// https://restfulapi.net/hateoas/

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/state-utils'
import { type Hyperlink, type Uri‿str, type URI‿x, type SchemeSpecificURIPart } from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'

import * as AppState from '@tbrpg/state'
import * as AppRichText from '@tbrpg/ui--rich-text'
import {
	Game,
	type Action,
	create_action,
	ActionType,
	type ActionPlay,
	type ActionAcknowledgeEngagementMsgSeen,
} from '@tbrpg/interfaces'

import { prettifyꓽjson } from '../services/misc.js'

import {
	DEFAULT_ROOT_URI,
	normalizeꓽuri‿SSP,
	normalizeꓽuri‿str,
	type HATEOASServer,
} from './to-migrate.js'

/////////////////////////////////////////////////

// TODO define the routes in some sort of structure, not strings


class AppHateoasServer implements HATEOASServer<RichText.Document, Action> {
	app_sugar: Game = new Game()

	async get(url: Immutable<Hyperlink['href']> = DEFAULT_ROOT_URI): Promise<RichText.Document> {
		console.group(`↘ HATEOASᐧGET("${url}")`)

		////////////
		const { path, query, fragment } = normalizeꓽuri‿SSP(url)
		console.log('after normalization:', { path, query, fragment })

		////////////
		let $builder = RichText.fragmentⵧblock()
		// for being pedantic HATEOAS :)
		const hyperlinkꘌself: Hyperlink = {
			href: normalizeꓽuri‿str(url),
			rel: ['self'],
			cta: '…', // can be re-defined later
		}
		const hyperlinkꘌhome: Hyperlink = {
			href: DEFAULT_ROOT_URI,
			rel: ['home'],
			cta: 'Home',
		}
		const links: { [key: string]: Hyperlink } = {
			self: hyperlinkꘌself,
			rootⵧhome: hyperlinkꘌhome,
		}
		const actions: Array<RichText.EmbeddedReducerAction> = []

		////////////
		const state = this.app_sugar.getꓽstateⵧlast_known()

		// ROOT links (always available)
		/*const modeⵧequipment: Hyperlink = {
			href: '/equipment/',
			rel: [],
			cta: 'Manage equipment & inventory…',
		}
		links['rootⵧequipment'] = modeⵧequipment

		const modeⵧcharacter_sheet: Hyperlink = {
			href: '/character/',
			rel: [],
			cta: 'Manage character & attributes…',
		}
		links['rootⵧcharacter_sheet'] = modeⵧcharacter_sheet

		const modeⵧachievements: Hyperlink = {
			href: '/achievements/',
			rel: [],
			cta: 'Review achievements…',
		}
		links['rootⵧachievements'] = modeⵧachievements
*/
		// TODO social & shopping

		// TODO recursive routing!

		// TODO "back" -> NO!! it's the responsibility of the browser

		/* TODO re-evaluate
		if (State.is_inventory_full(state.u_state)) {
			console.warn('[special message] Inventory is full!')
		}
		if(State.getꓽavailable_energy‿float(state.t_state) >= 1) {
			console.log('[special message] You can play now!')
		}
		*/

		switch (path) {
			case '/': { // root
				$builder = $builder.pushText('Welcome to…')

				$builder = $builder.pushNode(AppRichText.render_game_info({
					'client': 'HATEOAS/terminal',
				}))
				break
			}

			/*
			case '/adventures/': {
				hyperlinkꘌself.cta = 'Explore'

				$builder = $builder.pushHeading('Currently adventuring…')

				// NO recap of last adventure, it's a different route from when we play

				if (AppState.is_inventory_full(state.u_state)) {
					$builder = $builder.pushNode(
						RichText.strong().pushText('Your inventory is full!').done(),
					)
					// TODO add action to sell worst items
					// TODO is it a blocker for playing?
				}

				if(AppState.getꓽavailable_energy‿float(state.t_state) >= 1) {
					$builder = $builder.pushBlockFragment('You can play now!')
				}
				else {
					$builder = $builder.pushBlockFragment('You can play again in ' + AppState.getꓽhuman_time_to_next_energy(state))
				}

				// actions related to the current mode
				// but not root (already declared)
				const actionⵧplay = create_action<ActionPlay>({
					type: ActionType.play,
					expected_revisions: {},
				})
				actions.push({
					cta: 'Play!',
					payload: actionⵧplay,
					href: '/last-adventure',
				})

				break
			}

			/* TODO
			// skip the "between actions" messages
			const $doc = AppState.getꓽrecap(state.u_state) // TODO clarify recap/mode
			const step: Step<ContentType> = {
				type: StepType.simple_message,
				msg: $doc,
			}
			console.log(`[gen_next_step()] ...yielding from recap XXX`)
			return step
			 */

			/*case '/last': {
				if (!state.u_state.last_adventure) {
					$builder = $builder.pushBlockFragment('You have yet to adventure! Select "play"!')
				}
				else {
					//$builder = $builder.pushHeading('Encounter!!') NO, assuming some steps
					$builder = $builder.pushNode(
						AppRichText.renderꓽresolved_adventure(state.u_state.last_adventure)
					)

					// TODO offer to equip better item
				}

				// INTENTIONAL fallthrough to /
				// (TODO code it better)
			}

			case '/': { // home
				hyperlinkꘌself.cta = 'Explore'

				$builder = $builder.pushHeading('Currently adventuring…')

				// NO recap of last adventure, it's a different route from when we play

				if (AppState.is_inventory_full(state.u_state)) {
					$builder = $builder.pushNode(
						RichText.strong().pushText('Your inventory is full!').done(),
					)
					// TODO add action to sell worst items
					// TODO is it a blocker for playing?
				}

				if(AppState.getꓽavailable_energy‿float(state.t_state) >= 1) {
					$builder = $builder.pushBlockFragment('You can play now!')
				}
				else {
					$builder = $builder.pushBlockFragment('You can play again in ' + AppState.getꓽhuman_time_to_next_energy(state))
				}

				// actions related to the current mode
				// but not root (already declared)
				const actionⵧplay = create_action<ActionPlay>({
					type: ActionType.play,
					expected_revisions: {},
				})
				actions.push({
					cta: 'Play!',
					payload: actionⵧplay,
					href: '/last-adventure',
				})

				break
			}

			case '/equipment/': {
				hyperlinkꘌself.cta = modeⵧequipment.cta!

				$builder = $builder.pushHeading('Currently managing equipment & inventory…')

				$builder = $builder.pushNode(AppRichText.render_full_inventory(
					state.u_state.inventory,
					state.u_state.wallet,
				))

				if (AppState.is_inventory_full(state.u_state)) {
					$builder = $builder.pushNode(
						RichText.strong().pushText('Your inventory is full!').done(),
					)
					// TODO add action to sell items?
				}

				// TODO actions

				break
			}*/


			default:
				throw new Error(`Unknown resource path "${path}"!`)
		}

		////////////
		$builder = $builder.addHints({
			links,
			actions, // are those technically links?
		})

		console.log(`↗ HATEOASᐧGET("${url}") returning ☑️`)
		console.groupEnd()

		return $builder.done()
	}

	async dispatch(action: Action, url: Immutable<Hyperlink['href']> = DEFAULT_ROOT_URI): Promise<void> {
		return this.app_sugar.dispatch(action)
	}

	get_pending_engagement(url: Immutable<Hyperlink['href']> = DEFAULT_ROOT_URI): [RichText.Document, Action] | null {
		const state = this.app_sugar.getꓽstateⵧlast_known()

		// very important to return flow first
		// ex. when playing a game, there is a small cutscene simulating the action, yet we can already see the notifications from the result :facepalm:
		const pef = AppState.getꓽoldest_pending_engagementⵧflow(state.u_state)
		if (pef) {
			//console.log('[PEF]', to_terminal(pef.$doc))
			const action_ack = create_action<ActionAcknowledgeEngagementMsgSeen>({
				type: ActionType.acknowledge_engagement_msg_seen,
				expected_revisions: {},
				uid: pef.uid,
			})
			return [ pef.$doc, action_ack ]
		}

		const penf = AppState.getꓽoldest_pending_engagementⵧnon_flow(state.u_state)
		if (penf) {
			//console.log('[PENF]', to_terminal(penf.$doc))
			const action_ack = create_action<ActionAcknowledgeEngagementMsgSeen>({
				type: ActionType.acknowledge_engagement_msg_seen,
				expected_revisions: {},
				uid: penf.uid,
			})
			return [ penf.$doc, action_ack ]
		}

		return null
	}
}

/////////////////////////////////////////////////

export {
	type HATEOASServer,
	AppHateoasServer,
}
