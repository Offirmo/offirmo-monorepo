import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/state-utils'
import { type Hyperlink, type Uri‿str, type URI‿x, type SchemeSpecificURIPart } from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'

import * as AppState from '@tbrpg/state'
import * as AppRichText from '@tbrpg/ui--rich-text'
import { Game, create_action, ActionType, type ActionPlay } from '@tbrpg/interfaces'

import { prettifyꓽjson } from '../services/misc.js'

import { ChatPrimitivesConsole } from '@offirmo-private/view--chat/primitives--terminal--vanilla'
import {
	create,
	StepType,
	type Step,
	type SelectStep,
	type StepIterator,
	type StepIteratorTNext,
	type StepIteratorYieldResult,
	type StepIteratorReturnResult,
} from '@offirmo-private/view--chat'

/////////////////////////////////////////////////

// TODO move into package
function normalizeꓽuri‿SSP(url: URI‿x): SchemeSpecificURIPart {
	url ||= '/'

	if (typeof url === 'string') {
		const url‿obj = new URL(url, 'https://example.com')

		const result: SchemeSpecificURIPart = {
			path: url‿obj.pathname,

			query: url‿obj.search,

			...(url‿obj.hash && { fragment: url‿obj.hash }),
		}

		return result
	}

	return url
}
function normalizeꓽuri‿str(url: URI‿x): Uri‿str {
	const { path, query, fragment } = normalizeꓽuri‿SSP(url)

	let result = path

	if (query) {
		result += '?' + query
	}

	if (fragment) {
		result += '#' + fragment
	}

	return result
}

// TODO define the routes in some sort of structure, not strings

// https://htmx.org/essays/hateoas/
// https://restfulapi.net/hateoas/
function HATEOASᐧGET(state: Immutable<AppState.State>, url: Hyperlink['href'] = '/'): RichText.Document {
	console.log(`↘ HATEOASᐧGET("${url}")`)

	const { path, query, fragment } = normalizeꓽuri‿SSP(url)

	let $builder = RichText.fragmentⵧblock()
	const links: { [key: string]: Hyperlink } = {}
	const actions: Array<RichText.EmbeddedReducerAction> = []

	// for being pedantic HATEOAS :)
	const self: Hyperlink = {
		href: url, // TODO after normalize? only path?
		rel: ['self'],
		cta: '…', // TODO later
	}
	links['self'] = self

	// ROOT links (always available)
	const home: Hyperlink = {
		href: '/',
		rel: ['home', 'tabsⵧrootⵧ01'],
		cta: 'Home',
	}
	links['rootⵧhome'] = home
	const modeⵧequipment: Hyperlink = {
		href: '/equipment/',
		rel: ['tabsⵧrootⵧ02'],
		cta: 'Manage equipment & inventory…',
	}
	links['rootⵧequipment'] = modeⵧequipment
	const modeⵧcharacter_sheet: Hyperlink = {
		href: '/character/',
		rel: ['tabsⵧrootⵧ03'],
		cta: 'Manage character & attributes…',
	}
	links['rootⵧcharacter_sheet'] = modeⵧcharacter_sheet
	const modeⵧachievements: Hyperlink = {
		href: '/achievements/',
		rel: ['tabsⵧrootⵧ04'],
		cta: 'Review achievements…',
	}
	links['rootⵧachievements'] = modeⵧachievements
	// TODO social & shopping

	// TODO recursive routing!
	// TODO "back"


	/* TODO re-evaluate
	if (State.is_inventory_full(state.u_state)) {
		console.warn('[special message] Inventory is full!')
	}
	if(State.getꓽavailable_energy‿float(state.t_state) >= 1) {
		console.log('[special message] You can play now!')
	}
	*/

	switch (path) {
		// @ts-expect-error
		case '/last-adventure': {
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
			self.cta = 'Explore'

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
				data: actionⵧplay,
				href: '/last-adventure',
			})

			break
		}

		case '/equipment/': {
			self.cta = modeⵧequipment.cta!

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
			throw new Error(`Unknown resource path "${path}"!`)
	}

	$builder = $builder.addHints({
		links,
		actions,
	})

	console.log(`↘ HATEOASᐧGET("${url}") returning ☑️`)
	return $builder.done()
}

/////////////////////////////////////////////////

type ContentType = string | RichText.Document

class ChatInterfaceForHypermediaApp implements StepIterator<ContentType> {
	// hypermedia
	game: Game = new Game()
	current_route: Uri‿str = normalizeꓽuri‿str('/')

	// chat interface
	is_done: boolean = false
	steps_count = 0
	pending_steps: Array<Step<ContentType>> = [] // convenience to allow gen_next_step() to yield several steps at once. FIFO.

	// misc
	status: 'starting' | 'normal' = 'starting'

	constructor() {
		this.game.on_start_session()
	}

	navigate_to(uri: URI‿x) {
		console.log(`Navigating to: "${uri}"...`)
		this.current_route = normalizeꓽuri‿str(uri)
	}

	next(p: StepIteratorTNext<ContentType>) {
		this.steps_count++
		if (this.steps_count >= 10) {
			console.error('SCHEDULING EXIT because too many steps!')
			this.is_done = true
		}

		const result = this.is_done
			? {
				value: undefined,
				done: true,
			} satisfies StepIteratorReturnResult<ContentType>
			: {
				value: this.gen_next_step(p),
				done: false,
			} satisfies StepIteratorYieldResult<ContentType>

		console.log(`[next() now yielding...]`, result)
		return result
	}

	async gen_next_step({ last_step, last_answer }: StepIteratorTNext<ContentType>): Promise<Step<ContentType>> {
		console.log(`[GameChat.gen_next_step()...] async start...`)
		if (this.pending_steps.length) {
			console.log(`[GameChat.gen_next_step()] steps pending=`, this.pending_steps.length)
			const step = this.pending_steps.pop()!
			console.log(`[GameChat.gen_next_step()] ...yielding from pending:`,
				//prettifyꓽjson(step)
			)
			return step
		}

		const state = await this.game.getꓽstate()

		if (this.status === 'starting') {
			this.status = 'normal'
			// skip the "between actions" messages
			const $doc = AppState.getꓽrecap(state.u_state) // TODO clarify recap/mode
			const step: Step<ContentType> = {
				type: StepType.simple_message,
				msg: $doc,
			}
			console.log(`[GameChat.gen_next_step()] ...yielding from recap`)
			return step
		}

		const pef = AppState.getꓽoldest_pending_engagementⵧflow(state.u_state)
		if (pef) {
			//console.log('[PEF]', to_terminal(pef.$doc))
			const step: Step<ContentType> = {
				type: StepType.simple_message,
				msg: pef.$doc,
				callback: () => {
					this.game.state = AppState.acknowledge_engagement_msg_seen(this.game.state, pef.uid)
				}
			}
			console.log(`[GameChat.gen_next_step()] ...yielding from PEF`)
			return step
		}

		const penf = AppState.getꓽoldest_pending_engagementⵧnon_flow(state.u_state)
		if (penf) {
			//console.log('[PENF]', to_terminal(penf.$doc))
			const step: Step<ContentType> = {
					type: StepType.simple_message,
					msg: penf.$doc,
					callback: () => {
						this.game.state = AppState.acknowledge_engagement_msg_seen(this.game.state, penf.uid)
					}
				}
			console.log(`[GameChat.gen_next_step()] ...yielding from PENF`)
			return step
		}

		const hypermedia = HATEOASᐧGET(state, this.current_route)

		const actions = RichText.renderⵧto_actions(hypermedia)
		assert(actions.length > 0, `There should be actions in the latest hypermedia!`)

		const actionsⵧreducers = actions.filter(a => a.type === 'action')
		const actionsⵧlinks = actions
			.filter(a => a && a.type === 'hyperlink')
			.filter((ha: RichText.HyperlinkAction)=> {
				return !ha.data.rel.includes('self')
					&& normalizeꓽuri‿SSP(ha.data.href).path !== this.current_route
			})
		console.log('actionsⵧreducers=', actionsⵧreducers.length)
		console.log('actionsⵧlinks=', actionsⵧlinks.length)
		assert((actionsⵧreducers.length + actionsⵧlinks.length) > 0, `We should have actions for continuing!`)

		const navigate_to = this.navigate_to.bind(this)
		const dispatch = this.game.dispatch.bind(this.game)

		const step_input: SelectStep<ContentType, RichText.Action> = {
			type: StepType.select,
			prompt: 'What do you want to do?',
			options: Object.fromEntries([
				...actionsⵧreducers,
				...actionsⵧlinks,
			].map((v, i) => [
				String(i).padStart(2, '0'),
				{
					cta: (v as any).cta || v.data.cta, // TODO dedicated function to extract CTA + add hint at action vs. link
					value: v,
				} ])),
			callback(value) {
				console.log('Callback!', prettifyꓽjson(value))

				switch (value.type) {
					case 'action': {
						dispatch(value.data)
						if (value.href)
							navigate_to(value.href)
						break
					}
					case 'hyperlink': {
						navigate_to(value.data.href)
						break
					}
					default:
						throw new Error(`NIMP action type "${(value as any)?.type}"!`)
				}
			},
			/*msg_as_user: (action: RichText.Action) => confirm ? `Yes, I confirm.` : `No, I cancel.`,
			msg_acknowledge: (action: RichText.Action) => confirm ? `Ok, let's proceed ✔` : `Let's cancel that ✖`,
			...parts,
			*/
		}
		this.pending_steps.unshift(step_input)

		const step_content: Step<ContentType> = {
			type: StepType.simple_message,
			msg: hypermedia,
		}
		console.log(`[GameChat.gen_next_step()] ...yielding from hypermedia content:`,
			//prettifyꓽjson(step_content)
		)
		return step_content
	}

	//return?(value?: TReturn): IteratorResult<T, TReturn>;

	//throw?(e?: any): IteratorResult<T, TReturn>;
}

/////////////////////////////////////////////////

const chat = create({
	DEBUG: false,
	gen_next_step: new ChatInterfaceForHypermediaApp(),
	primitives: new ChatPrimitivesConsole(),
})

console.log('/////////////////////////////////////////////////')
await chat.start()

/////////////////////////////////////////////////
