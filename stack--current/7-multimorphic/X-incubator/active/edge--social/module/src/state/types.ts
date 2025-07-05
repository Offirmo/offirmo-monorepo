import type {Org, OrgId, Person, PersonId} from "../types.ts";

/////////////////////////////////////////////////

interface State {
	orgs: Record<OrgId, Org>,
	persons: Record<PersonId, Person>,
}

/////////////////////////////////////////////////

export {
	type State
}
