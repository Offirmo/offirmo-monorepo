import chalk from 'chalk'

import { injectꓽlibꓽchalk, prettifyꓽjson } from '@offirmo-private/prettify-any'
import * as RichText from '@offirmo-private/rich-text-format'
import to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import * as State from '@tbrpg/state'
import * as RRT from '@tbrpg/ui--rich-text'

import '../services/misc.js'

import { renderꓽstateⵧprettified_text } from '../view/offirmo-state/generic--to-text.js'
import { renderꓽstateⵧrich_text } from '../view/offirmo-state/generic--to-rich-text.js'

/////////////////////////////////////////////////

injectꓽlibꓽchalk(chalk)

/////////////////////////////////////////////////

let state = State.create()
// TODO reseed
state = State.on_start_session(state, true)
state = State.update_to_now(state)
state = State.play(state)

//function equip_item(previous_state: Immutable<State>, uuid: UUID, now_ms: TimestampUTCMs = getꓽUTC_timestamp‿ms())
//function sell_item(previous_state: Immutable<State>, uuid: UUID, now_ms: TimestampUTCMs = getꓽUTC_timestamp‿ms())
//function rename_avatar(previous_state: Immutable<State>, new_name: string, now_ms: TimestampUTCMs = getꓽUTC_timestamp‿ms())
//function change_avatar_class(previous_state: Immutable<State>, new_class: CharacterClass, now_ms: TimestampUTCMs = getꓽUTC_timestamp‿ms())


/*
console.log('/////////////////////////////////////////////////')
console.log(state)
*/

/*
console.log('/////////////////////////////////////////////////')
console.log(prettifyꓽjson(state))
*/

/*
console.log('/////////////////////////////////////////////////')
console.log(renderꓽstateⵧprettified_text(state))
*/

/*
console.log('/////////////////////////////////////////////////')
const $doc = renderꓽstateⵧrich_text(state, {})
console.log(to_terminal($doc))
*/

console.log('/////////////////////////////////////////////////')
// always first
const $doc = State.getꓽrecap(state.u_state)
console.log(to_terminal($doc))

console.log('/////////////////////////////////////////////////')
// achievements

while (State.getꓽoldest_pending_engagementⵧflow(state.u_state)) {
	const pef = State.getꓽoldest_pending_engagementⵧflow(state.u_state)!
	console.log('[PEF]', to_terminal(pef.$doc))
	state = State.acknowledge_engagement_msg_seen(state, pef.uid)
}

while (State.getꓽoldest_pending_engagementⵧnon_flow(state.u_state)) {
	const penf = State.getꓽoldest_pending_engagementⵧnon_flow(state.u_state)!
	console.log('[PENF]', to_terminal(penf.$doc))
	state = State.acknowledge_engagement_msg_seen(state, penf.uid)
}

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
