import type { LooseDateAnnotated, Org, OrgId, Person, PersonId } from '../types.ts'

/////////////////////////////////////////////////

interface State {
	orgs: Record<OrgId, Org>,
	persons: Record<PersonId, Person>,

	dates: {
		[group: string]: LooseDateAnnotated[]
	}
}

/////////////////////////////////////////////////

export {
	type State
}
