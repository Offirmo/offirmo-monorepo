import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import {
	type NodeLike,
	type Node,
	type BaseHints,
	promoteꓽto_nodeⵧimmutable,
} from '@offirmo-private/rich-text-format'
import {
	type PendingEngagement,
	type PendingEngagementUId,
} from '@oh-my-rpg/state--engagement'

import { type HATEOASPendingEngagement } from './types.js'

/////////////////////////////////////////////////

function resolveꓽrich_text_pending_engagement<Action, Hints = BaseHints>(
	pe: Immutable<PendingEngagement<NodeLike>>,
	uid_to_ack: (uid: PendingEngagementUId) => Immutable<Action>,
): Immutable<HATEOASPendingEngagement<Node<Hints>, Action>> {
	const $doc = promoteꓽto_nodeⵧimmutable<Hints>(pe.template.content)

	return {
		content: $doc,
		flow: pe.template.flow,
		role: pe.template.role,
		...(pe.template.success !== undefined && { success: pe.template.success }),
		...(pe.template.attention_needed !== undefined && { attention_needed: pe.template.attention_needed }),
		...(pe.template.enhancements !== undefined && { ...pe.template.enhancements }),

		ack_action: uid_to_ack(pe.uid),
		uid: pe.uid,
	}
}


/////////////////////////////////////////////////

export {
	resolveꓽrich_text_pending_engagement,
}
