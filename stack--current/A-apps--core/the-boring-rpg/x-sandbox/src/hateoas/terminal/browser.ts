import assert from 'tiny-invariant'

import { getꓽcompareFnⵧby_string_key } from '@offirmo-private/ts-utils'
import { Immutable } from '@offirmo-private/state-utils'
import {
	type Uri‿str,
	type Hyperlink,
	type Hyperlink‿x,
	promote_toꓽhyperlink,
	normalizeꓽuri‿str,
	promote_toꓽscheme_specific_part,
} from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'
import { PendingEngagementUId } from '@oh-my-rpg/state--engagement'

import { prettifyꓽjson } from '../../services/misc.js'

import {
	StepType,
	type Step,
	type SelectStep,
	type StepIterator,
	type TaskProgressStep,
	type StepIteratorTNext,
	type StepIteratorYieldResult,
	type StepIteratorReturnResult,
} from '@offirmo-private/view--chat'

import {
	HATEOASPendingEngagement, type HATEOASServer} from '../../to-export-to-own-package/hateoas/types.js'
import {
	DEFAULT_ROOT_URI,
	getꓽCTA,
} from '../to-migrate.js'

/////////////////////////////////////////////////

const DEBUG = false

/////////////////////////////////////////////////

type ContentType = RichText.NodeLike

type StepClientTemp = {
	uid: PendingEngagementUId
}

class HypermediaBrowserWithChatInterface<ActionType> implements StepIterator<ContentType> {
	// hypermedia
	server: HATEOASServer<ContentType, ActionType>
	current_route: Uri‿str = DEFAULT_ROOT_URI
	history: Array<Uri‿str> = []

	// TODO one day back, home etc.

	// chat interface
	pending_steps: Array<Step<ContentType>> = [] // convenience to allow gen_next_step() to yield several steps at once. FIFO (unshift/pop)
	stepsᐧcount_for_avoiding_infinite_loops = 0

	// misc
	status: 'starting' | 'nominal' | 'stopping' = 'starting'
	pending_async: Array<Promise<void>> = []

	constructor(server: HATEOASServer<ContentType, ActionType>) {
		this.server = server
	}

	/////////////////////////////////////////////////

	navigate_to(link: Hyperlink‿x) {
		const hyperlink = promote_toꓽhyperlink(link)
		const uri‿str = normalizeꓽuri‿str(hyperlink.href)

		console.log(`\n【⇨ Navigating to: "${uri‿str}"…${hyperlink.rel.length ? (' (rel = ' + hyperlink.rel + ')') : ''}】`)
		console.log('------------------------------------------------------')

		if (uri‿str !== this.current_route) {
			this.history.unshift(this.current_route)
			this.current_route = uri‿str
		}
	}

	is_engagement_queued_in_pending_steps(pe: Immutable<HATEOASPendingEngagement<ContentType, ActionType>>): boolean {
		return this.pending_steps.some(step => {
			const client_infos: StepClientTemp | undefined = step._client_temp as any // TODO type validation
			if (!client_infos)
				return false

			return client_infos.uid === pe.uid
		})
	}

	dispatch(action: Immutable<ActionType>, url?: Hyperlink['href']): Promise<void> {
		const pending = this.server.dispatch(action, url)
		return this.register_pending_async(pending)
	}

	get_chat_step_from_engagement(pe: Immutable<HATEOASPendingEngagement<ContentType, ActionType>>): Step<ContentType> {
		const { content: $doc, ack_action: actionⵧack, uid } = pe


		const _client_temp: StepClientTemp = {
			uid,
		}

		const BOUND_dispatch = this.dispatch.bind(this)

		// TODO improve depending on the format!
		const step: Step<ContentType> = {
			type: StepType.simple_message,
			msg: $doc as any, // cast away the immutability. TODO one day improve
			callback: () => actionⵧack && BOUND_dispatch(actionⵧack),
			_client_temp,
		}

		return step
	}

	async register_pending_async(pending: Promise<void>): Promise<void> {
		this.pending_async.push(pending)

		return pending
			.finally(() => {
				this.pending_async = this.pending_async.filter(p => p !== pending)
			})
	}

	/////////////////////////////////////////////////
	// iterator (chat interface)
	next(p: StepIteratorTNext<ContentType>) {
		//console.log(`[next step?]`)
		this.stepsᐧcount_for_avoiding_infinite_loops++
		if (this.stepsᐧcount_for_avoiding_infinite_loops >= 10) {
			console.error('SCHEDULING EXIT because too many steps!')
			this.status = 'stopping'
		}

		const result = (this.status === 'stopping' && this.pending_steps.length === 0)
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

		// REMINDER: ideally we want everything in the HATEO**AS**
		// This is a BROWSER which should contain
		// as few app-specific behaviour as possible
		const routeⵧprevious = this.history[0] || DEFAULT_ROOT_URI
		const routeⵧcurrent = this.current_route
		const pathⵧprevious = promote_toꓽscheme_specific_part(routeⵧprevious).path
		const pathⵧcurrent = promote_toꓽscheme_specific_part(routeⵧcurrent).path

		const isꓽintro = (() => {
			// are we coming from a parent route?

			if (this.history.length === 0)
				return true // obviously

			return pathⵧcurrent.startsWith(pathⵧprevious)
		})()

		// TODO clarify the concept = transition between what??
		const isꓽtransition = (() => {
			if (this.history.length === 0)
				return false // obviously

			if (isꓽintro)
				return false // obviously

			if (pathⵧcurrent === pathⵧprevious) {
				// the difference must be in query or fragment
				return false
			}

			// TODO clarify what a transition is!
			// ex. should it depend on the path?
			// are we coming from a sibling route?
			return true
		})()

		assert(!(isꓽintro && isꓽtransition), `should never be both intro and transition!`)

		// inspect pending engagements
		const pending_engagements = this.server.get_pending_engagements(this.current_route)
		const pending_engagementsⵧunprocessed = pending_engagements
			.filter(pe =>
				!this.is_engagement_queued_in_pending_steps(pe))

		// critical ones
		const pending_engagements__flowⵧmain = pending_engagementsⵧunprocessed.filter(pe => pe.flow === 'main')
		if (pending_engagements__flowⵧmain.length) {
			// those engagement are the MOST important, immediately queue them

			// HOWEVER if flow=main
			// there are subtleties on "sequence"

			// TODO should we skip transition until actual browsing?
			const relevant_engagements = pending_engagements__flowⵧmain
				.filter(e => {
					switch (e.sequence) {
						case 'intro':
							return isꓽintro
						case 'transition':
							return isꓽtransition
						case 'pre':
							return true
						default:
							return true
					}
				})
				.toSorted(
					getꓽcompareFnⵧby_string_key(e => e.sequence || '*', ['intro', 'transition', 'pre', '*'])
				)

			this.pending_steps.unshift(
				...relevant_engagements
					.map(this.get_chat_step_from_engagement, this)
			)
		}

		// less critical ones
		const pending_engagements__flowⵧnon_main =
			pending_engagementsⵧunprocessed.filter(pe => pe.flow !== 'main')
		this.pending_steps.unshift(
			...pending_engagements__flowⵧnon_main
				.toSorted(
					getꓽcompareFnⵧby_string_key('flow', ['side', 'not'])
				)
				.map(this.get_chat_step_from_engagement, this)
		)

		if (this.pending_steps.length) {
			//console.log(`[gen_next_step()] steps pending=`, this.pending_steps.length)
			const step = this.pending_steps.pop()!
			/*console.log(`[gen_next_step()] ...yielding from pending:`,
				//prettifyꓽjson(step)
			)*/
			return step
		}

		// ok we have no more pending steps to display
		// we need to get new data
		// BUT first let's wait for pending running stuff (that may affect the data)
		// TODO optimistic updates? OR it's the server responsibility?

		// TODO review, we should be able to transition and pre-load steps while waiting
		if (this.pending_async.length) {
			// TODO loader?? transition?
			return {
				type: StepType.progress,
				promises: this.pending_async
			} as TaskProgressStep<ContentType>
		}

		const BOUND_navigate_to = this.navigate_to.bind(this)
		const BOUND_dispatch = this.dispatch.bind(this)
		const reset_infinite_loop_prevention = () => {
			this.stepsᐧcount_for_avoiding_infinite_loops = 0
		}

		console.log(`【Browsing: "${this.current_route}"】`)

		// TODO loader and transitions here?
		const hypermedia = await this.server.get(this.current_route)

		const actions = RichText.renderⵧto_actions(hypermedia)
		const actionsⵧreducers = actions.filter(a => a.type === 'action')
		const actionsⵧlinks = actions
			.filter(a => a && a.type === 'hyperlink')
			.filter((ha: RichText.HyperlinkAction)=> {
				return !ha.link.rel.includes('self')
					&& promote_toꓽscheme_specific_part(ha.link.href).path !== this.current_route
			})
		const continue_links = actionsⵧlinks.filter(a => a.link.rel.includes('continue-to'))
		assert(continue_links.length <= 1, 'Should only have 0 or 1 continue-to links.')
		const actionⵧlinkⵧcontinue = continue_links[0]
		const actionsⵧbrowser: Array<RichText.HyperlinkAction> = [
			// TODO one day "back" (history)
			// TODO one day "home" (/)
		]

		if((actionsⵧreducers.length + actionsⵧlinks.length) === 0) {
			this.status = 'stopping'
			const step: Step<ContentType> = {
				type: StepType.simple_message,
				msg: '[🖼️ No more actions available. Goodbye!]',
			}
			this.pending_steps.unshift(step)
		}
		else if (!actionⵧlinkⵧcontinue) {
			const step_input: SelectStep<ContentType, RichText.Action> = {
				type: StepType.select,
				prompt: 'What do you want to do?',
				options: Object.fromEntries([
					...actionsⵧreducers,
					...actionsⵧlinks,
					...actionsⵧbrowser,
				].map((v, i) => [
					String(i).padStart(2, '0'),
					{
						cta: getꓽCTA(v),
						value: v,
					} ])),
				callback(value) {
					//console.log('Callback!', prettifyꓽjson(value))
					reset_infinite_loop_prevention()

					switch (value.type) {
						case 'action': {
							BOUND_dispatch(value.payload)
							if (value.href)
								BOUND_navigate_to(value.href)
							break
						}
						case 'hyperlink': {
							BOUND_navigate_to(value.link)
							break
						}
						default:
							throw new Error(`NIMP action type "${(value as any)?.type}"!`)
					}
				},
				msg_as_user: (action: RichText.Action) => `I select: ${getꓽCTA(action)}`,
				//msg_acknowledge: (action: RichText.Action) => `You selected: ${getꓽCTA(action)}`,
			}
			this.pending_steps.unshift(step_input)
		}

		const step_content: Step<ContentType> = {
			type: StepType.simple_message,
			msg: hypermedia,
			callback: () => {
				if (actionⵧlinkⵧcontinue) {
					BOUND_navigate_to(actionⵧlinkⵧcontinue.link)
				}
			},
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

export {
	HypermediaBrowserWithChatInterface,
}
