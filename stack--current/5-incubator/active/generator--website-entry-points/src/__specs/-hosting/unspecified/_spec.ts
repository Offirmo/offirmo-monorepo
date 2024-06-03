import { expect } from 'chai'

import { LIB } from '../../../consts.js'

import { getꓽwebsiteᝍentryᝍpoints } from '../../../index.js'

import { SPEC as _SPEC } from '../../__fixtures/specs--blog--personal.js'

/////////////////////////////////////////////////

describe(`${LIB} -- hosting -- (unspecified)`, function() {
	const SPEC: typeof _SPEC = {
		..._SPEC,
	}

	describe('404 Not Found', function () {

		it('should be handled through a 404.html', () => {
			// https://developers.cloudflare.com/pages/configuration/serving-pages/#not-found-behavior
			const entry_points = getꓽwebsiteᝍentryᝍpoints(SPEC)
			expect(entry_points).to.have.property('404.html')
		})
	})

	//describe('server functions')

	//describe('edge workers')
})
