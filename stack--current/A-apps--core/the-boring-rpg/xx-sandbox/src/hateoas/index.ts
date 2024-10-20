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

// TODO move into dedicated package
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
function getꓽCTA(action: RichText.Action): string {
	switch (action.type) {
		case 'action': {
			if (action.cta)
				return '⚡️' + action.cta

			throw new Error('Missing CTA for action!')
		}
		case 'hyperlink': {
			if (action.link.cta)
				return '⇨ ' + action.link.cta

			throw new Error('Missing CTA for hyperlink!')
		}
		default:
			throw new Error(`NIMP action type "${(action as any)?.type}"!`)
	}
}

const DEFAULT_ROOT_URI = normalizeꓽuri‿str('')

// TODO define the routes in some sort of structure, not strings

// https://htmx.org/essays/hateoas/
// https://restfulapi.net/hateoas/
interface HATEOASServer<
	HypermediaType, // an advanced Hypermedia format able to contain links and actions
	Action,
> {
	// inspired by GET, POST, PUT, DELETE https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
	// also QUERY https://www.ietf.org/archive/id/draft-ietf-httpbis-safe-method-w-body-05.html

	// the base one, return a hypermedia representation with hyperlinks/actions
	get(url: Hyperlink['href']): Promise<HypermediaType>

	// dispatch an action
	// url TBD
	// doesn't return (so far) bc the response can be lost and we may want strict feedback to actions
	// ex. a game where an action triggers an important cutscene, we could return the important cutscene but how would we ensure it has been seen/processed by the player?
	// ex. crash or lost connexion and the player lose a very important story development.
	// thus we'd rather use "engagement", see next method.
	// TODO REVIEW we may want to return trivial, "can-be-lost" feedback, for ex. "ticket created" or "action acknowledged"
	dispatch(action: Action, url?: Hyperlink['href']): Promise<void>

	// important to separate resource representation from actions feedback
	get_pending_engagement(): [HypermediaType, Action] | null
}

class AppHateoasServer implements HATEOASServer<RichText.Document, Action> {
	app_sugar: Game = new Game()

	async get(url: Hyperlink['href'] = DEFAULT_ROOT_URI): Promise<RichText.Document> {
		console.log(`↘ HATEOASᐧGET("${url}")`)
		const state = this.app_sugar.getꓽstateⵧlast_known()

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
			href: DEFAULT_ROOT_URI,
			rel: ['home'],
			cta: 'Home',
		}
		links['rootⵧhome'] = home

		const modeⵧequipment: Hyperlink = {
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
					payload: actionⵧplay,
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

		console.log(`↗ HATEOASᐧGET("${url}") returning ☑️`)
		return $builder.done()
	}

	async dispatch(action: Action, url: Hyperlink['href'] = DEFAULT_ROOT_URI): Promise<void> {
		return this.app_sugar.dispatch(action)
	}

	get_pending_engagement(): [RichText.Document, Action] | null {
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

type ContentType = string | RichText.Document

class HypermediaBrowserWithChatInterface<ActionType> implements StepIterator<ContentType> {
	// hypermedia
	server: HATEOASServer<ContentType, ActionType>
	current_route: Uri‿str = DEFAULT_ROOT_URI
	// TODO one day history: back, home etc.

	// chat interface
	pending_steps: Array<Step<ContentType>> = [] // convenience to allow gen_next_step() to yield several steps at once. FIFO (unshift/pop)
	steps_count = 0 // safety

	// misc
	status: 'starting' | 'normal' | 'done' = 'starting'

	constructor(server: HATEOASServer<ContentType, ActionType>) {
		this.server = server
	}

	navigate_to(uri: URI‿x) {
		console.log(`[⇨ Navigating to: "${uri}"…]`)
		this.current_route = normalizeꓽuri‿str(uri)
	}

	next(p: StepIteratorTNext<ContentType>) {
		this.steps_count++
		if (this.steps_count >= 10) {
			console.error('SCHEDULING EXIT because too many steps!')
			this.status = 'done'
		}

		const result = (this.status === 'done')
			? {
				value: undefined,
				done: true,
			} satisfies StepIteratorReturnResult<ContentType>
			: {
				value: this.gen_next_step(p),
				done: false,
			} satisfies StepIteratorYieldResult<ContentType>

		//console.log(`[next() now yielding...]`, result)
		return result
	}

	async gen_next_step({ last_step, last_answer }: StepIteratorTNext<ContentType>): Promise<Step<ContentType>> {
		//console.log(`[gen_next_step()...] async start...`)

		// REMINDER: ideally we want everything in the HATEOAS
		// this should not contain app-specific behaviour

		if (this.pending_steps.length) {
			//console.log(`[gen_next_step()] steps pending=`, this.pending_steps.length)
			const step = this.pending_steps.pop()!
			/*console.log(`[gen_next_step()] ...yielding from pending:`,
				//prettifyꓽjson(step)
			)*/
			return step
		}


		const navigate_to = this.navigate_to.bind(this)
		const dispatch = this.server.dispatch.bind(this.server)

		if (this.status === 'starting') {
			// skip the PEF & PENF messages
			// to give a chance for some content
			// (hopefully introducing the app)
			// to be displayed first
			this.status = 'normal'
		}
		else {
			const pe = this.server.get_pending_engagement()
			if (pe) {
				const [$doc, actionⵧack] = pe
				// TODO improve depending on the format!
				const step: Step<ContentType> = {
					type: StepType.simple_message,
					msg: $doc,
					callback: () => {
						dispatch(actionⵧack)
					}
				}
				//console.log(`[gen_next_step()] ...yielding from PEF`)
				return step
			}
		}

		const hypermedia = await this.server.get(this.current_route)

		const actions = RichText.renderⵧto_actions(hypermedia)
		assert(actions.length > 0, `There should be actions in the latest hypermedia!`)

		const actionsⵧreducers = actions.filter(a => a.type === 'action')
		const actionsⵧlinks = actions
			.filter(a => a && a.type === 'hyperlink')
			.filter((ha: RichText.HyperlinkAction)=> {
				return !ha.link.rel.includes('self')
					&& normalizeꓽuri‿SSP(ha.link.href).path !== this.current_route
			})
		//console.log('actionsⵧreducers=', actionsⵧreducers.length)
		//console.log('actionsⵧlinks=', actionsⵧlinks.length)
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
					cta: getꓽCTA(v),
					value: v,
				} ])),
			callback(value) {
				//console.log('Callback!', prettifyꓽjson(value))

				switch (value.type) {
					case 'action': {
						dispatch(value.payload)
						if (value.href)
							navigate_to(value.href)
						break
					}
					case 'hyperlink': {
						navigate_to(value.link.href)
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
		/*console.log(`[gen_next_step()] ...yielding from hypermedia content:`,
			//prettifyꓽjson(step_content)
		)*/
		return step_content
	}

	//return?(value?: TReturn): IteratorResult<T, TReturn>;

	//throw?(e?: any): IteratorResult<T, TReturn>;
}

/////////////////////////////////////////////////

const chat = create({
	DEBUG: false,
	gen_next_step: new HypermediaBrowserWithChatInterface(new AppHateoasServer()),
	primitives: new ChatPrimitivesConsole(),
})

console.log('/////////////////////////////////////////////////')
await chat.start()

/////////////////////////////////////////////////
