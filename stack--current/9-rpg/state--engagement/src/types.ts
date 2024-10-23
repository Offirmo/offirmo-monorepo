import { Enum } from 'typescript-string-enums'

import { BaseUState } from '@offirmo-private/state-utils'

//////////////////////////////////////////////////////////////////////

// template for re-use
// ex. we can have several "achievement completed" with different achievements
interface EngagementTemplate<TextFormat> {
	content: TextFormat

	// semantic infos
	is_in_user_flow: boolean
	success?: boolean
	level?: // https://docs.google.com/spreadsheets/d/1Bc32plQTswNdCqXS99deB0n7Te7FfD7uepGAOOlPbvY/
		| 'fatal' // irrecoverable error, the app will close
		| 'alert' // action must be taken immediately
		| 'error'
		| 'warning'
		| 'notice'
		| 'log'
		| 'debug'

	// implementation details
	auto_dismiss_delay_ms?: number, // falsy = never TODO clarify

	// hints for optional enhancements
	// TODO
}

type PendingEngagementUId = number // unique id for this engagement, needed to acknowledge it was shown to the user

interface PendingEngagement<TextFormat> {
	uid: PendingEngagementUId

	template: EngagementTemplate<TextFormat>
	params: { [key: string]: any }
}

/////////////////////

interface State<TextFormat> extends BaseUState {
	// first in, first out
	// newest are appended
	queue: Array<PendingEngagement<TextFormat>>
}

/////////////////////

export {
	//type EngagementType,
	type EngagementTemplate,

	type PendingEngagementUId,
	type PendingEngagement,

	type State,
}

//////////////////////////////////////////////////////////////////////
