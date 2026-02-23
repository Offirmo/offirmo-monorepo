import assert from 'tiny-invariant'
import { type Immutable } from '@monorepo-private/ts--types'

import { type Planet } from './types.ts'

/////////////////////////////////////////////////

function create(): Immutable<Planet> {
	return {
		name: {
			own: 'XYZ-323'
		},
		archetype: 'earthlike',
		civilization: {},
	}
}

/////////////////////////////////////////////////

export {
	create,
}
