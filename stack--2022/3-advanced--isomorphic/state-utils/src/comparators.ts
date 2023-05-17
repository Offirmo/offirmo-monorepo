import assert from 'tiny-invariant'
import { Enum } from 'typescript-string-enums'
import memoize_one from 'memoize-one'
import jsondiffpatch from 'jsondiffpatch'

import { Immutable, JSONObject } from '@offirmo-private/ts-types'

import {
	is_RootState,
} from './type-guards.js'
import {
	get_schema_version_loose,
	get_revision_loose,
	get_last_user_activity_timestamp_loose,
	get_timestamp_loose,
} from './selectors.js'

////////////////////////////////////

// tslint:disable-next-line: variable-name
export const SemanticDifference = Enum(
	'none', // fully equal
	'time', // t-state difference but semantically equal
	'minor', // different revisions and/or last meaningful activity (could also be a fork)
	'major', // different schema version (could also be a fork, so we may still want to keep and migrate the older schema version)
)
export type SemanticDifference = Enum<typeof SemanticDifference> // eslint-disable-line no-redeclare


export function s_max(a: SemanticDifference, b: SemanticDifference): SemanticDifference {
	if (a === SemanticDifference.major || b === SemanticDifference.major)
		return SemanticDifference.major

	if (a === SemanticDifference.minor || b === SemanticDifference.minor)
		return SemanticDifference.minor

	if (a === SemanticDifference.time || b === SemanticDifference.time)
		return SemanticDifference.time

	return SemanticDifference.none
}

// used only in tests AFAIK
// @ts-expect-error memoize_one import issue TODO fix
const _get_advanced_json_differ = memoize_one(() => {
	const advanced_json_differ = jsondiffpatch.create({
		// method used to match objects when diffing arrays
		// by default === operator is used
		objectHash: (obj: any) => JSON.stringify(obj), // TODO use stable stringify?
	})

	return advanced_json_differ
})
export function get_json_difference(a: Immutable<any>, b: Immutable<any>): JSONObject {
	return _get_advanced_json_differ().diff(a, b)
}


// TODO improve unclear semantics
// different schema version: we may want to compare investment instead of pure schema version
// same schema + revision: could still be a fork, take the most recent?
export function UNCLEAR_get_difference__full(a: any, b?: any): { type: SemanticDifference, direction: number } {
	//console.log('compare()', { a, b })

	// quick
	if (a === b)
		return {
			type: SemanticDifference.none,
			direction: 0,
		}

	const exists__a = !!a
	const exists__b = !!b
	if (exists__a !== exists__b)
		return {
			type: SemanticDifference.minor, // by convention, exists vs. non-exists (= state creation) is minor
			direction: (exists__a ? 1 : 0) - (exists__b ? 1 : 0)
		}

	const schema_version__a = get_schema_version_loose(a)
	const schema_version__b = get_schema_version_loose(b)
	if (schema_version__a !== schema_version__b)
		return {
			type: SemanticDifference.major,
			direction: schema_version__a - schema_version__b
		}

	// special case: the schema evolved to have a "root state" shape = major
	// the one having a root state is considered more evolved
	const is_root__a = is_RootState(a)
	const is_root__b = is_RootState(b)
	if (is_root__a !== is_root__b)
		return {
			type: SemanticDifference.major,
			direction: (is_root__a ? 1 : 0) - (is_root__b ? 1 : 0)
		}

	// we now know that both or neither are root states ✔

	// safety check
	if (is_root__a && a.ⵙapp_id && b.ⵙapp_id) {
		assert(a.ⵙapp_id === b.ⵙapp_id, `UNCLEAR_get_difference() states should be in the same universe!`)
	}

	const revision__a = get_revision_loose(a)
	const revision__b = get_revision_loose(b)
	if (revision__a !== revision__b)
		return {
			type: SemanticDifference.minor,
			direction: revision__a - revision__b,
		}

	const activity_tms__a = get_last_user_activity_timestamp_loose(a)
	const activity_tms__b = get_last_user_activity_timestamp_loose(b)
	if (activity_tms__a !== activity_tms__b)
		return {
			type: SemanticDifference.minor, // must be a fork since same revision
			direction: activity_tms__a - activity_tms__b,
		}

	// last resort if state is/has a T_state
	const t_tms__a = get_timestamp_loose(a)
	const t_tms__b = get_timestamp_loose(b)
	if (t_tms__a !== t_tms__b)
		return {
			type: SemanticDifference.time,
			direction: t_tms__a - t_tms__b,
		}

	if ([
		schema_version__a,
		revision__a,
		activity_tms__a,
		t_tms__a
	].join(',') === '0,0,0,0') {
		// everything being equal and 0
		// means neither compared stuff are semantic states
		return {
			type: SemanticDifference.minor, // by convention = minor change on an implied "schema version = 0"
			direction: t_tms__a - t_tms__b,
		}
	}

	return {
		type: SemanticDifference.none,
		direction: 0,
	}
}

// UNCLEAR see comments above
export function UNCLEAR_get_difference(a: any, b?: any): SemanticDifference {
	return UNCLEAR_get_difference__full(a, b).type
}
export function UNCLEAR_compare(a: any, b: any): number {
	return UNCLEAR_get_difference__full(a, b).direction
}
