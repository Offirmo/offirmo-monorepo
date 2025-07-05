
/////////////////////////////////////////////////

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

	status:
		| 'alive'
		| 'dead'
		| 'estranged' // filter out

	known_nationalities: Nationality[]
	notes: string[]
}

/////////////////////////////////////////////////

export {
	type EmojiRegionFlag,

	type Nationality,

	type OrgId,
	type Org,

	type PersonId,
	type Person,
}
