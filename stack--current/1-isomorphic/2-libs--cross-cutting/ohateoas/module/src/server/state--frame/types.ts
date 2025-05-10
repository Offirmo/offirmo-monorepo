import type { Immutable } from '@offirmo-private/ts-types'
import type { Url‿str } from '@offirmo-private/ts-types-web'
import type { OHAHyperMedia } from '../../types/index.ts'

/////////////////////////////////////////////////

interface State {
	//session_start_tms: number
	//last_user_activity_tms: number

	// note: all urls should always be normalized, should always be relative
	urlⵧhome: Url‿str // latest known recommended home

	urlⵧload: Url‿str // url we're loading or have loaded with no pending load
	reload_counter: number // for reloads

	$representation: OHAHyperMedia | undefined
	urlⵧself: Url‿str | undefined // "self" advertised by the $representation. can be != load if the rsrc returns a different "self"

	status: string

	// TODO one day
	//url_history: []
	//engagements: {}
}

/////////////////////////////////////////////////

export {
	type State,
}
