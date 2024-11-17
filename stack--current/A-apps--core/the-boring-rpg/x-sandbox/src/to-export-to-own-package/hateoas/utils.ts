import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { getꓽmutable_copy } from '@offirmo-private/state-utils'
import {
	type NodeLike,
	type Node,
	type CheckedNode,
	createⵧfrom_content,
} from '@offirmo-private/rich-text-format'
import {
	type PendingEngagement,
	type PendingEngagementUId,
} from '@oh-my-rpg/state--engagement'

import { type HATEOASPendingEngagement } from './types.js'

/////////////////////////////////////////////////

const EXPECTED_FIELDS = new Set(['$sub', '$hints'])
function assertꓽparams__shape(params: PendingEngagement<NodeLike>['params']): Pick<CheckedNode, '$sub' | '$hints'> {
	const result: Pick<CheckedNode, '$sub' | '$hints'> = {
		$sub: {},
		$hints: {},
	}

	const keys = Object.keys(params)
	keys.forEach(k => {
		assert(EXPECTED_FIELDS.has(k), `a HATEOAS RichText PendingEngagement params should not contain extraneous fields! ("${k}")`)
	})

	result.$sub = {
		...params?.['$sub'],
	}
	result.$hints = {
		...params?.['$hints'],
	}

	return result
}

function resolveꓽrich_text_pending_engagement<Action>(
	pe: Immutable<PendingEngagement<NodeLike>>,
	uid_to_ack: (uid: PendingEngagementUId) => Immutable<Action>,
): Immutable<HATEOASPendingEngagement<Node, Action>> {
	const template__contentⵧmutable = getꓽmutable_copy(pe.template.content)

	const builder = createⵧfrom_content(template__contentⵧmutable)
	const extras = assertꓽparams__shape(pe.params)
	builder.pushRawNodes(extras.$sub)
	builder.addHints(extras.$hints)

	/*console.warn(`XXX`, {
		raw_params: pe.params,
		extras,
		content: builder.done(),
	})*/

	return {
		content: builder.done(),
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
