import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/state-utils'
import { type Hyperlink, type URI‿x, type SchemeSpecificURIPart } from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'

import * as State from '@tbrpg/state'

import { prettifyꓽjson } from '../services/misc.js'

import { ChatPrimitivesConsole } from '@offirmo-private/view--chat/primitives-console-basic'
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
import { type Action, create_action, ActionType, type ActionPlay } from '@tbrpg/interfaces'

/////////////////////////////////////////////////
// TODO async to pretend we're talking to a server (even if it's a worker)

class Game {
	state: Immutable<State.State>

	constructor() {
		this.state = State.create()
		// TODO reseed
	}

	on_start_session() {
		this.state = State.on_start_session(this.state, true)
	}

	getꓽstate(): Immutable<State.State> {
		return this.state
	}
}

/////////////////////////////////////////////////

function normalizeꓽurl(url: URI‿x): SchemeSpecificURIPart {
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

// https://htmx.org/essays/hateoas/
// https://restfulapi.net/hateoas/
function HATEOASᐧGET(state: Immutable<State.State>, url: Hyperlink['href'] = '/'): RichText.Document {
	console.log(`↘ HATEOASᐧGET("${url}")`)

	const { path, query, fragment } = normalizeꓽurl(url)

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
		case '/': { // home
			self.cta = 'Explore'

			$builder = $builder.pushHeading('Currently adventuring…')

			// NO recap of last adventure, it's a different route?
			// TODO clarify

			if (State.is_inventory_full(state.u_state)) {
				$builder = $builder.pushNode(
					RichText.strong().pushText('Your inventory is full!').done(),
				)
				// TODO add action to sell items?
			}

			if(State.getꓽavailable_energy‿float(state.t_state) >= 1) {
				$builder = $builder.pushBlockFragment('You can play now!')
			}
			else {
				$builder = $builder.pushBlockFragment('You can play again in ' + State.getꓽhuman_time_to_next_energy(state))
			}

			// actions related to the current mode
			// but not root (already declared)
			const actionⵧplay = create_action<ActionPlay>({
				type: ActionType.play,
				expected_revisions: {},
			})
			actions.push({
				cta: 'Play!',
				data: actionⵧplay
			})

			break
		}

		default:
			throw new Error(`Unknown resource locator "${path}"!`)
	}

	$builder = $builder.addHints({
		links,
		actions,
	})

	return $builder.done()
}

/////////////////////////////////////////////////

type ContentType = string | RichText.Document

class GameChat implements StepIterator<ContentType> {
	game: Game = new Game()
	status: 'starting' | 'normal' = 'starting'
	is_done: boolean = false
	current_route = normalizeꓽurl('/').path
	non_interactive_steps_count = 0
	pending_actions: Array<Step<ContentType>> = [] // convenience to allow gen_next_step() to yield several steps at once. FIFO.

	constructor() {
		this.game.on_start_session()
	}

	next(p: StepIteratorTNext<ContentType>) {
		if (this.is_done) {
			return {
				value: undefined,
				done: true,
			} satisfies StepIteratorReturnResult<ContentType>
		}

		const value = this.gen_next_step(p)
		this.non_interactive_steps_count++
		if (this.non_interactive_steps_count >= 5) {
			console.error('SCHEDULING EXIT because too many non-interactive steps!')
			this.is_done = true
		}

		return {
			value,
			done: false,
		} satisfies StepIteratorYieldResult<ContentType>
	}

	gen_next_step({ last_step, last_answer }: StepIteratorTNext<ContentType>): Step<ContentType> {
		if (this.pending_actions.length) {
			return this.pending_actions.pop()!
		}

		const state = this.game.getꓽstate()

		if (this.status === 'starting') {
			this.status = 'normal'
			// skip the "between actions" messages
			const $doc = State.getꓽrecap(state.u_state) // TODO clarify recap/mode
			const step: Step<ContentType> = {
				type: StepType.simple_message,
				msg: $doc,
			}
			return step
		}

		const pef = State.getꓽoldest_pending_engagementⵧflow(state.u_state)
		if (pef) {
			//console.log('[PEF]', to_terminal(pef.$doc))
			const step: Step<ContentType> = {
				type: StepType.simple_message,
				msg: pef.$doc,
				callback: () => {
					this.game.state = State.acknowledge_engagement_msg_seen(this.game.state, pef.uid)
				}
			}
			return step
		}

		const penf = State.getꓽoldest_pending_engagementⵧnon_flow(state.u_state)
		if (penf) {
				//console.log('[PENF]', to_terminal(penf.$doc))
				const step: Step<ContentType> = {
					type: StepType.simple_message,
					msg: penf.$doc,
					callback: () => {
						this.game.state = State.acknowledge_engagement_msg_seen(this.game.state, penf.uid)
					}
				}
				return step
			}

		const hypermedia = HATEOASᐧGET(state, this.current_route)

		const step_content: Step<ContentType> = {
			type: StepType.simple_message,
			msg: hypermedia,
		}
		this.pending_actions.push(step_content)

		const actions = RichText.renderⵧto_actions(hypermedia)
		assert(actions.length > 0, `There should be actions in the latest hypermedia!`)

		const actionsⵧreducers = actions.filter(a => a.type === 'action')
		const actionsⵧlinks = actions
			.filter(a => a && a.type === 'hyperlink')
			.filter((ha: RichText.HyperlinkAction)=> {
				return !ha.data.rel.includes('self')
					&& normalizeꓽurl(ha.data.href).path !== this.current_route
			})
		console.log(actionsⵧreducers)
		console.log(actionsⵧlinks)
		assert((actionsⵧreducers.length + actionsⵧlinks.length) > 0, `We should have actions for continuing!`)

		const step_input: SelectStep<ContentType, RichText.Action> = {
			type: StepType.select,
			prompt: 'What do you want to do?',
			options: Object.fromEntries([
				...actionsⵧreducers,
				...actionsⵧlinks,
			].map((v, i) => [
				String(i).padStart(2, '0'),
				{
					cta: (v as any).cta || v.data.cta, // TODO dedicated function to extract CTA
					value: v,
				} ])),
			callback(value) {
				console.log('Callback!', args)
				if (value.type === 'action') {

				}

				throw new Error(`NIMP!`)
			},
			/*msg_as_user: (action: RichText.Action) => confirm ? `Yes, I confirm.` : `No, I cancel.`,
			msg_acknowledge: (action: RichText.Action) => confirm ? `Ok, let's proceed ✔` : `Let's cancel that ✖`,
			...parts,
			*/
		}
		this.pending_actions.push(step_input)

		/*
		let current_uri: Hyperlink['href'] = ''
		const $doc = HATEOASᐧGET(state, current_uri)
		console.log(prettifyꓽjson($doc))
		//console.log(to_terminal($doc))
		*/

		return this.pending_actions.pop()!
	}

	//return?(value?: TReturn): IteratorResult<T, TReturn>;

	//throw?(e?: any): IteratorResult<T, TReturn>;
}

/////////////////////////////////////////////////

const chat = create({
	DEBUG: false,
	gen_next_step: new GameChat(),
	primitives: new ChatPrimitivesConsole(),
})

console.log('/////////////////////////////////////////////////')
await chat.start()

/////////////////////////////////////////////////
