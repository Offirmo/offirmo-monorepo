import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import {
	create,
	addꓽbook,
	starꓽbook,
} from '../reducers.ts'

import { COVERS } from '../../__fixtures/index.ts'

/////////////////////////////////////////////////

const EXAMPLE = (() => {
	let stash = create({defaultAccessLevel: 'accessⵧyes'})

	COVERS.forEach(cover => {
		stash = addꓽbook(stash, cover)
	})

	stash = starꓽbook(stash, COVERS[0]!.uid, true)

	return stash
})()

/////////////////////////////////////////////////

export {
	EXAMPLE,
}
