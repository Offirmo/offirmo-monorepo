import { Enum } from 'typescript-string-enums'
import { type Immutable } from '@offirmo-private/ts-types'

import { UUID } from '@offirmo-private/uuid'
import { TimestampUTCMs, getꓽUTC_timestamp‿ms } from '@offirmo-private/timestamps'
import * as State from '@tbrpg/state'
import { CharacterClass } from '@tbrpg/state--character'

import { type Action, ActionType } from '../actions/index.js'


// systematically async to pretend we're talking to a "server" or any other async store
// TODO enforce immu?
export class Game {
	state: Immutable<State.State>

	constructor() {
		this.state = State.create()
	}

	async getꓽstate(): Promise<Immutable<State.State>> {
		return this.state
	}

	// individual reducers
	async on_start_session(params?: State.StartSessionParams) {
		this.state = State.on_start_session(this.state, params)
	}


	// generic reducer
	async dispatch(action: Immutable<Action>) {

		if (Object.values(action.expected_revisions ?? {}).length) {
			throw new Error(`NIMP!`)
		}

		switch (action.type) {
			case ActionType.play:
				this.state = State.play(this.state, action)
				break

			default:
				throw new Error(`NIMP!`)
		}
	}
}
