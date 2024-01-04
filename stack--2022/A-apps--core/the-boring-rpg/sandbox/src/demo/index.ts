import * as State from '@tbrpg/state'
import * as RRT from '@tbrpg/ui--rich-text'
import * as RichText from '@offirmo-private/rich-text-format'
import to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import '../services/misc.js'

import { renderꓽstateⵧprettified_text } from '../view/offirmo-state/generic--to-text.js'
import { renderꓽstateⵧrich_text } from '../view/offirmo-state/generic--to-rich-text.js'

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


//console.log('/////////////////////////////////////////////////')
//console.log(state)

//console.log('/////////////////////////////////////////////////')
//console.log(prettifyꓽjson(state))

//console.log('/////////////////////////////////////////////////')
//console.log(renderꓽstateⵧprettified_text(state))

console.log('/////////////////////////////////////////////////')
const $doc = renderꓽstateⵧrich_text(state, {
})
console.log(to_terminal($doc))

console.log('/////////////////////////////////////////////////')
console.log(to_terminal(State.getꓽrecap(state.u_state)))

console.log('/////////////////////////////////////////////////')
if (State.is_inventory_full(state.u_state)) {
	console.warn('Inventory is full!')
}
;((pef) => {
	if (!pef)
		return
	console.log(to_terminal(pef.$doc))
	state = State.acknowledge_engagement_msg_seen(state, pef.uid)
})(State.getꓽoldest_pending_flow_engagement(state.u_state))
;((penf) => {
	if (!penf)
		return
	console.log(to_terminal(penf.$doc))
	state = State.acknowledge_engagement_msg_seen(state, penf.uid)
})(State.getꓽoldest_pending_non_flow_engagement(state.u_state))
if(State.getꓽavailable_energy‿float(state.t_state) >= 1) {
	console.log('You can play now!')
}
// TODO achievements

console.log('/////////////////////////////////////////////////')
console.log('Actions:', RichText.renderⵧto_actions($doc))
