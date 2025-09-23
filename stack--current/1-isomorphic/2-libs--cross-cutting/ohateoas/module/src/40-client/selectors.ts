import type { Immutable, JSONPrimitiveType } from '@offirmo-private/ts-types'
import { getꓽUTC_timestamp‿ms } from '@offirmo-private/timestamps'

import {
	type OHAHyperActionBlueprint, type OHAHyperAction,
	type OHAFeedback,
} from '@offirmo-private/ohateoas'

/////////////////////////////////////////////////

function deriveꓽaction(action_blueprint: Immutable<OHAHyperActionBlueprint>, partial_payload: Record<string, JSONPrimitiveType> = {}): {
	action: OHAHyperAction,
	feedback: OHAFeedback,
} {
	const { type, input = {}, feedback: _feedback = {} } = action_blueprint

	const final_payload = new Map<string, JSONPrimitiveType>()
	Object.entries(input).forEach(([k, spec]) => {
		if (Object.hasOwn(partial_payload, k)) {
			final_payload.set(k, partial_payload[k])
			return
		}

		switch (spec.type) {
			case 'env--os':
				final_payload.set(k, 'macOs')
				break
			case 'env--arch':
				final_payload.set(k, 'arm')
				break
			case 'number--integer--timestamp--utc--ms':
				final_payload.set(k, getꓽUTC_timestamp‿ms()) // or should be standard?
				break
			// TODO llid?
			default:
				throw new Error(`Resolving action: unknown input "${k}" of type "${spec.type}"!`)
		}
	})

	const action: OHAHyperAction = {
		type,
		...(final_payload.size > 0 && { payload: Object.fromEntries(final_payload) })
	}

	const feedback: OHAFeedback = {
		tracking: 'foreground', // default
		..._feedback,
	}

	return {
		action,
		feedback,
	}
}

/////////////////////////////////////////////////

export {
	deriveꓽaction,
}
