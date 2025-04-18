import type { Immutable } from '@offirmo-private/ts-types'
import type { HumanReadableTimestampUTCMinutes } from '@offirmo-private/timestamps'
import type { BaseUState } from '@offirmo-private/state-utils'

/////////////////////////////////////////////////

interface CodeSpec<T> {
	code: string // also serves as unique key
	redeem_limit: number | null // null = no limit or non-count limit (see is_redeemable)
	is_redeemable: (infos: Immutable<T>, state: Immutable<State>) => boolean
	redemption_success_message?: string
}

interface CodeRedemption {
	// TODO rename to redemption?
	redeem_count: number
	last_redeem_date_minutes: HumanReadableTimestampUTCMinutes
}

/////////////////////

interface State extends BaseUState {
	redeemed_codes: { [key: string]: CodeRedemption }
}

/////////////////////////////////////////////////

export {
	type CodeSpec,
	type CodeRedemption,

	type State,
}
