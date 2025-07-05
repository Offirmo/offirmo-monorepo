import type { Immutable } from '@offirmo-private/ts-types'

import type { State } from './types.ts'
import type {PersonId, Person, OrgId} from "../types.ts";
import assert from "tiny-invariant";

/////////////////////////////////////////////////

function create(): Immutable<State> {
	return {
		orgs: {},
		persons: {},
	}
}

function _ensure_org(state: Immutable<State>, org_id: OrgId | undefined): Immutable<State> {
	if (!org_id) return state

	assert(org_id.startsWith('@'), 'org_id must start with @')

	if (state.orgs[org_id]) return state

	return {
		...state,
		orgs: {
			...state.orgs,
			[org_id]: {
				id: org_id,
			},
		},
	}
}

function ensure_person_and_org(state: Immutable<State>, person_id: PersonId): Immutable<State> {
	assert(person_id.startsWith('@'), 'person_id must start with @')
	const org_id = person_id.includes('/')
		? person_id.split('/').at(0)
		: undefined

	if (state.persons[person_id]) return state

	state = _ensure_org(state, org_id)

	const person: Person = {
		id: person_id,
		...(org_id && { org_id }),
		status: 'alive', // so far
		known_nationalities: [],
		notes: [],
	}

	return {
		...state,
		persons: {
			...state.persons,
			[person_id]: person,
		},
	}
}

function claim_person_status(state: Immutable<State>, person_id: PersonId, status: Person['status']): Immutable<State> {
	assert(state.persons[person_id], `person_id ${person_id} should exist`)

	if (state.persons[person_id].status === status) return state

	return {
		...state,
		persons: {
			...state.persons,
			[person_id]: {
				...state.persons[person_id],
				status,
			}
		},
	}
}

/////////////////////////////////////////////////

export {
	create,
	ensure_person_and_org,
	claim_person_status,
}
