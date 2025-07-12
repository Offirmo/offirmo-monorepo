import type { LooseDate } from './to-own/loose-dates/index.ts'

/////////////////////////////////////////////////

interface LooseDateAnnotated extends LooseDate {
	description?: string
}

type EmojiRegionFlag = string

type OrgId = string
interface Org {
	id: OrgId
	name?: string

	notes: string[]
}

type PersonId = string

type Nationality = EmojiRegionFlag

// careful of duplicates!
// TODO deprecations? ex. ex-partner_of
const RELATIONSHIPS = [
	'parent_of',
	'child_of',
	'partner_of',
	'coworker_of',
	'unknown',
] as const
type Relationship = typeof RELATIONSHIPS[number]

interface Person {
	id: PersonId
	orgId?: OrgId
	name?: string

	status: 'active' // = default
		// filtered out:
		| 'dead' // TODO 1D could still qualify for death anniversary
		| 'estranged' // ~far ?
		| 'ex'

	known_nationalities: Nationality[]

	dates: Record<string, LooseDateAnnotated>

	relationships: { [Relationship]: Array<PersonId> }

	notes: string[]
}

/////////////////////////////////////////////////

export {
	type LooseDateAnnotated,

	type EmojiRegionFlag,

	type Nationality,

	type OrgId,
	type Org,

	type PersonId,
	type Person,
}
