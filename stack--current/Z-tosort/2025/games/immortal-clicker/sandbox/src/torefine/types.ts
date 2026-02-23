import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'

/////////////////////////////////////////////////

// https://www.forbes.com/sites/kimelsesser/2020/06/15/the-myth-of-biological-sex/
// keep it simple for starter
type BiologicalSex = 'male' | 'female'

type GenderRequirement = BiologicalSex | null

/////////////////////////////////////////////////

export {
	type BiologicalSex,
	type GenderRequirement,
}
