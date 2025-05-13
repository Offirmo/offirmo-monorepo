import { expect } from 'chai'

import { LIB } from '../../consts.ts'

import { getꓽwebsiteᝍentryᝍpoints } from '../../index.ts'

import { SPEC as _SPEC } from '../__fixtures/specs--game--tbrpg.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- Apple`, function() {
	const SPEC: typeof _SPEC = {
		..._SPEC,
	}
	const entry_points = getꓽwebsiteᝍentryᝍpoints(SPEC)

	// TODO
})
