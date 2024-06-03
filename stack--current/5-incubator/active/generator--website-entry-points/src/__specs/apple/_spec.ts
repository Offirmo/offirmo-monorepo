import { expect } from 'chai'

import { LIB } from '../../consts.js'

import { getꓽwebsiteᝍentryᝍpoints } from '../../index.js'

import { SPEC as _SPEC } from '../__fixtures/specs--game--tbrpg.js'

/////////////////////////////////////////////////

describe(`${LIB} -- Apple`, function() {
	const SPEC: typeof _SPEC = {
		..._SPEC,
	}
	const entry_points = getꓽwebsiteᝍentryᝍpoints(SPEC)

	// TODO
})
