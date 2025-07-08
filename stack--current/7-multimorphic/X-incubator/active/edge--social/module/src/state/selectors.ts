import assert from 'tiny-invariant'
import { Temporal } from 'temporal-polyfill'
import type { Immutable } from '@offirmo-private/ts-types'

import {
	capitalizeⵧfirst,
} from '@offirmo-private/normalize-string'

import type { State } from './types.ts'
import type { OrgId, PersonId } from '../types.ts'

/////////////////////////////////////////////////

/////////////////////////////////////////////////

function getꓽname(state: Immutable<State>, id: PersonId | OrgId): string {
	const org = state.orgs[id]
	if (org) {
		return org.name || capitalizeⵧfirst(org.id.slice(1))
	}

	const person = state.persons[id]
	assert(!!person, `get_name: no person with id ${id}!`)
	if (person.name)
		return person.name

	if (!person.id.includes('/'))
		return capitalizeⵧfirst(person.id.slice(1))

	const [org_id, alias] = person.id.split('/')
	return capitalizeⵧfirst(org_id!.slice(1)) + '/' + capitalizeⵧfirst(alias!)
}

function getꓽone_linerⵧperson(state: Immutable<State>, id: PersonId): string {
	const person = state.persons[id]
	assert(person, `get_one_liner: no person with id ${id}!`)

	const age = (() => {
		const birth_day‿lda = person.dates['🎂']
		if (!birth_day‿lda)
			return undefined

		if (!lda.YYYY)
			return undefined // no way to know

		return '999yo' // nimp
	})()

	return [
		//id, no need, the caller has it, can add if needed
		getꓽname(state, person.id),
	].filter(s => !!s)
	.join(' ')
}

function getꓽpartner(state: Immutable<State>): PersonId | undefined {
	// TODO filter dead / estranged if many
	return undefined // NIMP
}

/////////////////////////////////////////////////

export {
	getꓽone_linerⵧperson,
	getꓽpartner,
}
