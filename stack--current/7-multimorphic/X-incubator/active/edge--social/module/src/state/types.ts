import type { LooseDateAnnotated, Org, OrgId, Person, PersonId } from '../types.ts'

/////////////////////////////////////////////////

// careful of duplicates!
// TODO deprecations? ex. ex-partner_of
const RELATIONSHIP_TYPES = [
	// partner
	'married_with', // normalized a < b
	'partnered_with', // normalized a < b
	'husband_of',
	'wife_of',
	'twin_sister_of',
	'twin_brother_of',

	// family -- closest (if @me)
	// family -- close (if related to @me)
	'father_of',
	'mother_of',
	'parent_of', // normalized = -- target
	'child_of', // normalized = -- target or else parent_of/mother_of/father_of
	'son_of',
	'daughter_of',
	'sibling_of', // normalized a < b
	'sister_of',
	'brother_of',

	'godfather_of',
	'godmother_of',
	'godparent_of',

	// ...
	'coworker_of', // normalized a < b
	'neighbor_of',
	'teacher_of',
	'student_of',

	'other', // normalized a < b
] as const
type RelationshipType = typeof RELATIONSHIP_TYPES[number]

interface Relationship {
	a: PersonId
	b: PersonId
	type: RelationshipType
	date?: LooseDateAnnotated
}

interface State {
	orgs: Record<OrgId, Org>,

	persons: Record<PersonId, Person>,

	relationships: Array<Relationship>

	dates: {
		[group: string]: LooseDateAnnotated[]
	}
}

/////////////////////////////////////////////////

export {
	RELATIONSHIP_TYPES, type RelationshipType, type Relationship,
	type State
}
