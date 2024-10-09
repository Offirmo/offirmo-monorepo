import { Immutable } from '@offirmo-private/state-utils'
import { type Hyperlink } from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'

import * as State from '@tbrpg/state'

import { prettifyꓽjson } from '../services/misc.js'

import { ChatPrimitivesConsole } from '@offirmo-private/view--chat/primitives-console-basic'
import {
	create,
	StepType,
	type Step,
	type StepIterator,
	type StepIteratorTNext,
	type StepIteratorYieldResult,
	type StepIteratorReturnResult,
} from '@offirmo-private/view--chat'
import { create_action, type ActionPlay } from '@tbrpg/interfaces'

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

function HATEOASᐧGET(state: Immutable<State.State>, url: Hyperlink['href'] = ''): RichText.Document {
	console.log(`↘ HATEOASᐧGET("${url}")`)

	// TODO URL normalization (one day)

	let $builder = RichText.fragmentⵧblock()

		/*.pushNode(RichText.heading().pushText('Identity:').done(), {id: 'header'})
		.pushNode(
			RichText.listⵧunordered()
				.pushKeyValue('name', $doc_name)
				.pushKeyValue('class', $doc_class)
				.done()
		)
		.done()*/

	switch (url) {
		case '': { // home
			$builder = $builder.pushHeading('Currently adventuring…')

			// NO recap of last adventure, it's a different route?
			// TODO clarify

			if (State.is_inventory_full(state.u_state)) {
				$builder = $builder.pushNode(
					RichText.strong().pushText('Your inventory is full!').done(),
				)
			}

			if(State.getꓽavailable_energy‿float(state.t_state) >= 1) {
				$builder = $builder.pushBlockFragment('You can play now!')
			}
			else {
				$builder = $builder.pushBlockFragment('You can play again in ' + State.getꓽhuman_time_to_next_energy(state))
			}

			// actions!
			// 1. we're home so links to other "modes/mechanics"
			const modeⵧequipment: Hyperlink = {
				href: '/equipment',
				cta: 'Manage equipment',
			}
			$builder = $builder.addHints({

			})
			// 2. links related to the current mode
			const actionⵧplay = create_action<ActionPlay>()

			break
		}

		case '/adventure': // ??
		default:
			throw new Error(`Unknown resource locator "${url}"!`)
	}

	return $builder.done()
}

/////////////////////////////////////////////////

type ContentType = string | RichText.Document

class GameChat implements StepIterator<ContentType> {
	game: Game = new Game()
	status: 'starting' | 'normal' = 'starting'
	is_done: boolean = false
	current_route = ''
	non_interactive_steps_count = 0

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

		const step: Step<ContentType> = {
			type: StepType.simple_message,
			msg: hypermedia,
		}

		// TODO extract actions!

		/*
		if (State.is_inventory_full(state.u_state)) {
			console.warn('[special message] Inventory is full!')
		}
		if(State.getꓽavailable_energy‿float(state.t_state) >= 1) {
			console.log('[special message] You can play now!')
		}



		console.log('/////////////////////////////////////////////////')
		console.log('Actions:', RichText.renderⵧto_actions($doc))
*/


		/*
		let current_uri: Hyperlink['href'] = ''
		const $doc = HATEOASᐧGET(state, current_uri)
		console.log(prettifyꓽjson($doc))
		//console.log(to_terminal($doc))
		*/

		return step
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
