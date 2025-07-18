import { Enum } from 'typescript-string-enums'
import { type Immutable} from '@offirmo-private/ts-types'

import { CharacterClass } from '@tbrpg/state--character'
import { type TimestampUTCMs } from '@offirmo-private/timestamps'

import type { State, UState } from '../types.ts'
import { getꓽavailable_energy‿float } from './energy.ts'
import { _update_to_now } from '../reducers/internal.ts'

/////////////////////////////////////////////////

function getꓽavailable_classes(u_state: Immutable<UState>): CharacterClass[] {
	return Enum.keys(CharacterClass)
		.filter(klass => klass !== CharacterClass.novice)
}

function will_next_play_be_good_at(state: Immutable<State>, now_ms: TimestampUTCMs): boolean {
	state = _update_to_now(state, now_ms)

	const { t_state } = state

	const available_energy = getꓽavailable_energy‿float(t_state)
	const is_good_play = available_energy >= 1.

	return is_good_play
}

/////////////////////////////////////////////////

export {
	getꓽavailable_classes,
	will_next_play_be_good_at,
}

/////////////////////
