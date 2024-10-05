import { Immutable } from '@offirmo-private/state-utils'
import { type Hyperlink } from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'

import * as State from '@tbrpg/state'
import * as RRT from '@tbrpg/ui--rich-text'

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
import to_terminal from '@offirmo-private/rich-text-format--to-terminal'

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

function HATEOASᐧGET(state: Immutable<State.State>, link: Hyperlink['href'] = ''): RichText.Document {
	console.log(`HATEOASᐧGET("${link}")`)

//	const $doc = State.getꓽrecap(state.u_state) // TODO clarify recap/mode


	switch (link) {
		case '':
			return State.getꓽrecap(state.u_state)
		default:
			throw new Error(`Unknown resource "${link}"!`)
	}
}

/////////////////////////////////////////////////

type ContentType = string | RichText.Document

class GameChat implements StepIterator<ContentType> {
	game: Game = new Game()
	is_done: boolean = false
	hypermedia: any = undefined

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

		return {
			value: this.gen_next_step(p),
			done: false,
		} satisfies StepIteratorYieldResult<ContentType>
	}

	gen_next_step({ last_step, last_answer }: StepIteratorTNext<ContentType>): Step<ContentType> {
		const state = this.game.getꓽstate()

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
		this.is_done = true

		/*
		console.log('/////////////////////////////////////////////////')
		// TODO should be part of recap?
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


		const hypermedia = HATEOASᐧGET(state)

		const step: Step<ContentType> = {
			type: StepType.simple_message,
			msg: hypermedia,
		}

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
