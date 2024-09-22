import { Immutable } from '@offirmo-private/state-utils'
import { type Hyperlink } from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'

import to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import * as State from '@tbrpg/state'
import * as RRT from '@tbrpg/ui--rich-text'

import { prettifyꓽjson } from '../services/misc.js'

/////////////////////////////////////////////////

let state = State.create()
// TODO reseed
state = State.on_start_session(state, true)
state = State.update_to_now(state)

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

console.log('/////////////////////////////////////////////////')
let current_uri: Hyperlink['href'] = ''
const $doc = HATEOASᐧGET(state, current_uri)
console.log(prettifyꓽjson($doc))
//console.log(to_terminal($doc))
