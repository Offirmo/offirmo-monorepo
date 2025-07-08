import type { LooseDate } from './to-own/loose-date.ts'

/////////////////////////////////////////////////

interface LooseDateAnnotated extends LooseDate {
	notes?: string
}

type EmojiRegionFlag = string

type OrgId = string
interface Org {
	id: OrgId
	name?: string
}

type PersonId = string

type Nationality = EmojiRegionFlag

interface Person {
	id: PersonId
	orgId?: OrgId
	name?: string

	status: 'alive' // = default, active
		// filtered out:
		| 'dead'
		| 'estranged' // ~far ?
		| 'ex'

	known_nationalities: Nationality[]

	notes: string[]

	dates: Record<string, LooseDateAnnotated>
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
