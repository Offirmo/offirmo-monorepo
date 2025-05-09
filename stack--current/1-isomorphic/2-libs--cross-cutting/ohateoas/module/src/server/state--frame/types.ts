import type { Immutable } from '@offirmo-private/ts-types'
import type { Url‿str } from '@offirmo-private/ts-types-web'
import type { OHAHyperMedia } from '../../types/index.ts'

/////////////////////////////////////////////////

interface State {
	//session_start_tms: number
	//last_user_activity_tms: number

	// note: should always be normalized, should always be relative
	urlⵧload: Url‿str
	urlⵧself: Url‿str // can be != load if the rsrc returns a different "self"
	reload_counter: number // for reloads

	$representation: OHAHyperMedia | undefined

	// TODO one day
	//url_history: []

	//engagements: {}
}

/////////////////////////////////////////////////

export {
	type State,
}
