import assert from 'tiny-invariant'

import { Immutable } from '@offirmo-private/state-utils'
import {
	type Uri‿str,
	type Hyperlink‿x,
	promote_toꓽhyperlink,
	normalizeꓽuri‿str,
	promote_toꓽscheme_specific_part,
} from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'

import { prettifyꓽjson } from '../../services/misc.js'

import {
	StepType,
	type Step,
	type SelectStep,
	type StepIterator,
	type StepIteratorTNext,
	type StepIteratorYieldResult,
	type StepIteratorReturnResult,
} from '@offirmo-private/view--chat'

import { type HATEOASServer } from '../../to-export-to-own-package/hateoas/types.js'
import {
	DEFAULT_ROOT_URI,
	getꓽCTA,
} from '../to-migrate.js'

/////////////////////////////////////////////////

const DEBUG = false

/////////////////////////////////////////////////

type ContentType = RichText.NodeLike

class HypermediaBrowserWithChatInterface<ActionType> implements StepIterator<ContentType> {
	// hypermedia
	server: HATEOASServer<ContentType, ActionType>
	current_route: Uri‿str = DEFAULT_ROOT_URI
	// TODO one day history: back, home etc.

	// chat interface
	pending_steps: Array<Step<ContentType>> = [] // convenience to allow gen_next_step() to yield several steps at once. FIFO (unshift/pop)
	stepsᐧcount_for_avoiding_infinite_loops = 0

	// misc
	status: 'starting' | 'nominal' | 'stopping' = 'starting'
	pending_async: Array<Promise<void>> = []

	constructor(server: HATEOASServer<ContentType, ActionType>) {
		this.server = server
	}

	navigate_to(link: Hyperlink‿x) {
		const hyperlink = promote_toꓽhyperlink(link)
		const uri‿str = normalizeꓽuri‿str(hyperlink.href)

		console.log(`\n[⇨ Navigating to: "${uri‿str}"…${hyperlink.rel.length ? (' (rel = ' + hyperlink.rel + ')') : ''}]`)
		console.log('------------------------------------------------------')
		this.current_route = uri‿str
	}

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

		// REMINDER: ideally we want everything in the HATEOAS
		// This is a BROWSER which should not contain app-specific behaviour

		if (this.pending_steps.length) {
			//console.log(`[gen_next_step()] steps pending=`, this.pending_steps.length)
			const step = this.pending_steps.pop()!
			/*console.log(`[gen_next_step()] ...yielding from pending:`,
				//prettifyꓽjson(step)
			)*/
			return step
		}

		// TODO review, we should be able to transition and pre-load steps while waiting
		if (this.pending_async.length) {
			//console.log(`[awaiting pending...]`)
			await Promise.all(this.pending_async)
			this.pending_async = []
		}

		const navigate_to = this.navigate_to.bind(this)
		const dispatch: HATEOASServer<ContentType, ActionType>['dispatch'] = (action, url) => {
			const pending = this.server.dispatch(action, url)
			this.pending_async.push(pending)
			return pending
		}
		const reset_infinite_loop_prevention = () => {
			this.stepsᐧcount_for_avoiding_infinite_loops = 0
		}

		// XXX TO REWRITE
		switch(this.status) {
			case 'starting': {
				// skip the engagement messages
				// to give a chance for some content
				// (hopefully introducing the app)
				// to be displayed first
				this.status = 'nominal'
				break
			}
			case 'nominal': {
				const pes = this.server.get_pending_engagements(this.current_route)
				this.pending_steps.unshift(...pes.map(pe => {
					const { content: $doc, ack_action: actionⵧack } = pe
					// TODO improve depending on the format!
					const step: Step<ContentType> = {
						type: StepType.simple_message,
						msg: $doc as any, // cast away the immutability. TODO one day improve
						callback: () => actionⵧack && dispatch(actionⵧack),
					}
					return step
				}))
				if (this.pending_steps.length) {
					//console.log(`[gen_next_step()] ...yielding from enqueued post-PE`)
					return this.pending_steps.pop()!
				}
				break
			}
			default:
				throw new Error(`gen_next_step called in invalid status "${this.status}"!`)
		}

		console.log(`[Browsing: "${this.current_route}"]`)

		// TODO loader and transitions
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
							dispatch(value.payload)
							if (value.href)
								navigate_to(value.href)
							break
						}
						case 'hyperlink': {
							navigate_to(value.link)
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
					navigate_to(actionⵧlinkⵧcontinue.link)
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
