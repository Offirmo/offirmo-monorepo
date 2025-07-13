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
