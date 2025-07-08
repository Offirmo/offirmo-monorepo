import type { Immutable } from '@offirmo-private/ts-types'

import {
	// base
	ensure_string,

	coerce_toꓽascii,
	RECOMMENDED_UNICODE_NORMALIZATION,
	normalize_unicode,

	to_lower_case,
	to_upper_case,

	trim,

	coerce_blanks_to_single_spaces,
	remove_all_spaces,
	coerce_delimiters_to_space,
	convert_spaces_to_camel_case,
	convert_spaces_to_kebab_case,

	// content
	normalizeꓽtextⵧsentence,

	// email
	normalizeꓽemailⵧsafe,
	normalizeꓽemailⵧreasonable,
	normalizeꓽemailⵧfull,

	// fs
	coerce_toꓽsafe_basenameⵧstrictest,
	normalizeꓽpath,

	// handle
	coerce_toꓽnicknameⵧsafe,

	// misc
	coerce_toꓽtokens,
	coerce_toꓽredeemable_code,
	normalizeꓽIETFLanguageType,

	// url
	normalizeꓽurl,
	normalizeꓽurlⵧhttpₓ,

	// arrays
	normalizeꓽarrayⵧof_strings,
} from '@offirmo-private/normalize-string'

import type { State } from './types.ts'
import type { PersonId, Person, Org, OrgId, LooseDateAnnotated, Nationality } from '../types.ts'
import assert from "tiny-invariant";

/////////////////////////////////////////////////

function create(): Immutable<State> {
	return {
		orgs: {},
		persons: {},
		dates: {},
	}
}

function ensureꓽorg(state: Immutable<State>, org_id: OrgId): Immutable<State> {
	if (state.orgs[org_id]) return state

	assert(org_id.startsWith('@'), 'org_id must start with @!')
	assert(org_id.length > 1, 'org_id must not be empty!')
	assert(remove_all_spaces(normalize_unicode(org_id.toLowerCase())) === org_id, 'org_id must be normalized!')

	assert(!Object.keys(state.persons).includes(org_id), `org_id ${org_id} is conflicting with an existing person!`)

	const org: Org = {
		id: org_id,
		notes: [],
	}

	return {
		...state,
		orgs: {
			...state.orgs,
			[org_id]: org,
		},
	}
}

function ensureꓽperson(state: Immutable<State>, person_id: PersonId): Immutable<State> {
	if (state.persons[person_id]) return state

	assert(person_id.startsWith('@'), 'person_id must start with @!')
	assert(person_id.length > 1, 'person_id must not be empty!')
	assert(remove_all_spaces(normalize_unicode(person_id.toLowerCase())) === person_id, 'person_id must be normalized!')

	const org_id: OrgId | undefined = person_id.includes('/')
		? person_id.split('/').at(0)
		: undefined
	if (org_id) {
		assert(person_id.length > org_id.length + 1, 'person_id must not be longer than org_id!')
		assert(state.orgs[org_id], `org_id ${org_id} should exist!`)
	}
	else {
		assert(!Object.keys(state.orgs).includes(person_id), `person_id ${person_id} is conflicting with an existing org!`)
	}

	const person: Person = {
		id: person_id,
		...(org_id && { org_id }),
		status: 'alive', // so far
		known_nationalities: [],
		notes: [],
		dates: {},
	}

	return {
		...state,
		persons: {
			...state.persons,
			[person_id]: person,
		},
	}
}

function claimꓽperson__status(state: Immutable<State>, person_id: PersonId, status: Person['status']): Immutable<State> {
	assert(state.persons[person_id], `person_id ${person_id} should exist!`)

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

function claimꓽperson__date(state: Immutable<State>, person_id: PersonId, id: string, lda: LooseDateAnnotated): Immutable<State> {
	assert(state.persons[person_id], `person_id ${person_id} should exist!`)

	assert(!state.persons[person_id].dates[id], `person_id ${person_id} should not already have a date with id ${id}!`)

	return {
		...state,
		persons: {
			...state.persons,
			[person_id]: {
				...state.persons[person_id],
				dates: {
					...state.persons[person_id].dates,
					[id]: lda,
				}
			}
		},
	}
}

function claimꓽperson__nationality(state: Immutable<State>, person_id: PersonId, n: Nationality): Immutable<State> {
	assert(state.persons[person_id], `person_id ${person_id} should exist!`)

	if (state.persons[person_id].known_nationalities.includes(n)) return state

	const known_nationalities: Person['known_nationalities'] = [
		...state.persons[person_id].known_nationalities,
		n
	].sort()

	return {
		...state,
		persons: {
			...state.persons,
			[person_id]: {
				...state.persons[person_id],
				known_nationalities,
			}
		},
	}
}

function claimꓽperson__note(state: Immutable<State>, person_id: PersonId, note: string): Immutable<State> {
	assert(state.persons[person_id], `claimꓽperson__note(): person_id ${person_id} should exist!`)

	const notes = [
		...state.persons[person_id].notes,
		note,
	].sort()

	return {
		...state,
		persons: {
			...state.persons,
			[person_id]: {
				...state.persons[person_id],
				notes,
			}
		},
	}
}
function claimꓽorg__note(state: Immutable<State>, org_id: OrgId, note: string): Immutable<State> {
	assert(state.orgs[org_id], `org_id ${org_id} should exist!`)

	const notes = [
		...state.orgs[org_id].notes,
		note,
	].sort()

	return {
		...state,
		orgs: {
			...state.orgs,
			[org_id]: {
				...state.orgs[org_id],
				notes,
			}
		},
	}
}
function claimꓽperson_or_org__note(state: Immutable<State>, person_or_org_id: PersonId | OrgId, note: string): Immutable<State> {
	if (Object.keys(state.orgs).includes(person_or_org_id))
		return claimꓽorg__note(state, person_or_org_id, note)

	return claimꓽperson__note(state, person_or_org_id, note)
}

function claimꓽperson__name(state: Immutable<State>, person_id: PersonId, name: string): Immutable<State> {
	assert(state.persons[person_id], `claimꓽperson__name(): person_id ${person_id} should exist!`)

	if (state.persons[person_id].name === name) return state

	assert(!state.persons[person_id].name, `person "${person_id}" name conflict!`)

	return {
		...state,
		persons: {
			...state.persons,
			[person_id]: {
				...state.persons[person_id],
				name,
			}
		},
	}
}
function claimꓽorg__name(state: Immutable<State>, org_id: OrgId, name: string): Immutable<State> {
	assert(state.orgs[org_id], `claimꓽorg__name(): org_id ${org_id} should exist!`)

	if (state.orgs[org_id].name === name) return state

	assert(!state.orgs[org_id].name, `org "${org_id}" name conflict!`)

	return {
		...state,
		orgs: {
			...state.orgs,
			[org_id]: {
				...state.orgs[org_id],
				name,
			}
		},
	}
}
function claimꓽperson_or_org__name(state: Immutable<State>, person_or_org_id: PersonId | OrgId, name: string): Immutable<State> {
	if (Object.keys(state.orgs).includes(person_or_org_id))
		return claimꓽorg__name(state, person_or_org_id, name)

	return claimꓽperson__name(state, person_or_org_id, name)
}

function addꓽdateⵧfree(state: Immutable<State>, group: string, lda: LooseDateAnnotated): Immutable<State> {
	return {
		...state,
		dates: {
			...state.dates,
			[group]: [
				...(state.dates[group] || []),
				lda,
			],
		},
	}
}

/////////////////////////////////////////////////

export {
	create,

	ensureꓽorg,
	ensureꓽperson,

	claimꓽperson_or_org__name,
	claimꓽperson__nationality,
	claimꓽperson_or_org__note,

	claimꓽperson__status,
	claimꓽperson__date,
	claimꓽperson__note,

	addꓽdateⵧfree,
}
