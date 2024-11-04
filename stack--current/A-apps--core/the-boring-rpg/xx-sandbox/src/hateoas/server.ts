// https://htmx.org/essays/hateoas/
// https://restfulapi.net/hateoas/

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/state-utils'
import { type Hyperlink, type Uri‿str, type URI‿x, type SchemeSpecificURIPart } from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'

import { type HypermediaContentType } from '@tbrpg/definitions'
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
	type HATEOASPendingEngagement,
	type HATEOASServer,
} from '../to-export-to-own-package/hateoas/types.js'
import {
	DEFAULT_ROOT_URI,
	normalizeꓽuri‿SSP,
	normalizeꓽuri‿str,
} from './to-migrate.js'

/////////////////////////////////////////////////

// TODO define the routes in some sort of structure, not strings

const DEBUG = false


class AppHateoasServer implements HATEOASServer<HypermediaContentType, Action> {
	app_sugar: Game = new Game()
	pending_async: Array<Promise<void>> = []

	async get(url: Immutable<Hyperlink['href']> = DEFAULT_ROOT_URI): Promise<HypermediaContentType> {
		DEBUG && console.group(`↘ HATEOASᐧget("${url}")`)

		////////////
		const { path, query, fragment } = normalizeꓽuri‿SSP(url)
		DEBUG && console.log('after normalization:', { path, query, fragment })

		////////////
		let $builder = RichText.fragmentⵧblock()
		// for being pedantic HATEOAS :)
		const hyperlinkꘌself: Hyperlink = {
			href: normalizeꓽuri‿str(url),
			rel: ['self'],
			cta: '…', // can be re-defined later
		}
		// const hyperlinkꘌhome: Hyperlink NO! Should be a feature of the browser!
		const links: { [key: string]: Hyperlink } = {
			self: hyperlinkꘌself,
		}
		const actions: Array<RichText.EmbeddedReducerAction> = []

		////////////
		if (this.pending_async.length) {
			//console.log(`awaiting pending...`)
			await Promise.all(this.pending_async)
			this.pending_async = []
		}
		const state = this.app_sugar.getꓽstateⵧlast_known()

		// ROOT links (always available)
		const modeⵧexplore: Hyperlink = {
			href: '/session/adventures/',
			rel: [],
			cta: 'Explore & adventure…',
		}
		links['rootⵧexplore'] = modeⵧexplore

		const modeⵧequipment: Hyperlink = {
			href: '/session/equipment/',
			rel: [],
			cta: 'Manage equipment & inventory…',
		}
		links['rootⵧequipment'] = modeⵧequipment

		const modeⵧcharacter_sheet: Hyperlink = {
			href: 'session/character/',
			rel: [],
			cta: 'Manage character & attributes…',
		}
		links['rootⵧcharacter_sheet'] = modeⵧcharacter_sheet

		const modeⵧachievements: Hyperlink = {
			href: 'session/achievements/',
			rel: [],
			cta: 'Review achievements…',
		}
		links['rootⵧachievements'] = modeⵧachievements
		// TODO social & shopping

		// TODO "back" -> NO!! it's the responsibility of the browser

		// TODO recursive routing!
		switch (path) {
			case '/': { // root, expected to redirect
				$builder = $builder.pushText('Welcome to…')

				$builder = $builder.pushNode(AppRichText.render_game_info({
					'client': 'HATEOAS/terminal',
				}))

				const hyperlinkꘌcontinue_to: Hyperlink = {
					href: '/session',
					rel: ['continue-to'],
				}
				links['continue-to'] = hyperlinkꘌcontinue_to

				break
			}

			case '/session': { // for recap
				$builder = $builder.pushNode(AppRichText.getꓽrecap(state.u_state))

				const hyperlinkꘌcontinue_to: Hyperlink = {
					href: '/session/adventures/',
					rel: ['continue-to'],
				}
				links['continue-to'] = hyperlinkꘌcontinue_to

				break
			}

			case '/session/adventures/': {
				hyperlinkꘌself.cta = 'Explore'

				$builder = $builder.pushHeading('Currently adventuring…')

				// NO recap of last adventure, it's a different route from when we play!

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
					href: '/session/adventures/last',
				})

				break
			}

			case '/session/adventures/last': {
				if (!state.u_state.last_adventure) {
					$builder = $builder.pushBlockFragment('You have yet to adventure! Select "play"!')
				}
				else {
					//$builder = $builder.pushHeading('Encounter!!') NO, assuming some steps
					$builder = $builder.pushNode(
						AppRichText.renderꓽresolved_adventure(state.u_state.last_adventure)
					)

					// TODO offer to equip better item?
				}

				const hyperlinkꘌcontinue_to: Hyperlink = {
					href: '/session/adventures/',
					rel: ['continue-to'],
				}
				links['continue-to'] = hyperlinkꘌcontinue_to
				break
			}

			case '/session/equipment/': {
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
			}

			default:
				throw new Error(`404 on "${path}"!`)
		}

		////////////
		$builder = $builder.addHints({
			links,
			actions, // are those technically links?
		})

		DEBUG && console.log(`↗ HATEOASᐧget("${url}") returning ☑️`)
		DEBUG && console.groupEnd()

		return $builder.done()
	}

	async dispatch(action: Action, url: Immutable<Hyperlink['href']> = DEFAULT_ROOT_URI): Promise<void> {
		DEBUG && console.log(`↘ HATEOASᐧdispatch("${url}", ${action.type})...`)
		const pending = this.app_sugar.dispatch(action)
		this.pending_async.push(pending)
		return pending
	}

	get_next_pending_engagement(url: Immutable<Hyperlink['href']> = DEFAULT_ROOT_URI): HATEOASEngagement<HypermediaType> | null {
		if (url === DEFAULT_ROOT_URI || url === '/session') {
			// not yet!
			return null
		}

		const state = this.app_sugar.getꓽstateⵧlast_known()

		// very important to return flow first
		// ex. when playing a game, there is a small cutscene simulating the action, yet we can already see the notifications from the result :facepalm:
		const pef = AppState.getꓽoldest_pending_engagementⵧflow(state.u_state)
		if (pef) {
			DEBUG && console.log(`↘ HATEOASᐧget_next_pending_engagement("${url}")...`)
			//console.log('[PEF]', to_terminal(pef.$doc))
			const ack_action = create_action<ActionAcknowledgeEngagementMsgSeen>({
				type: ActionType.acknowledge_engagement_msg_seen,
				expected_revisions: {},
				uid: pef.uid,
			})
			return {
				type: 'flow',
				$doc: pef.$doc,
				ack_action,
				uid: pef.uid,
			}
		}

		const penf = AppState.getꓽoldest_pending_engagementⵧnon_flow(state.u_state)
		if (penf) {
			DEBUG && console.log(`↘ HATEOASᐧget_next_pending_engagement("${url}")...`)
			//console.log('[PENF]', to_terminal(penf.$doc))
			const ack_action = create_action<ActionAcknowledgeEngagementMsgSeen>({
				type: ActionType.acknowledge_engagement_msg_seen,
				expected_revisions: {},
				uid: penf.uid,
			})
			return {
				type: 'non-flow',
				$doc: penf.$doc,
				ack_action,
				uid: penf.uid,
			}
		}

		return null
	}
}

/////////////////////////////////////////////////

export {
	type HATEOASServer,
	AppHateoasServer,
}
