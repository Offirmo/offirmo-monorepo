import { expect } from 'chai'

import { LIB } from '../../../consts.js'

import { getꓽwebsiteᝍentryᝍpoints } from '../../../index.js'

import { SPEC as _SPEC } from '../../__fixtures/specs--blog--personal.js'

/////////////////////////////////////////////////

describe(`${LIB} -- hosting -- Cloudflare Pages`, function() {
	const SPEC = {
		..._SPEC,
		host: 'cloudflare-pages',
	}

	describe('404 Not Found', function () {

		context('when NOT a SPA', function () {

			it('should be handled through a 404.html', () => {
				// https://developers.cloudflare.com/pages/configuration/serving-pages/#not-found-behavior
				const entry_points = getꓽwebsiteᝍentryᝍpoints(SPEC)
				expect(entry_points).to.have.property('404.html')
			})
		})

		context('when a SPA', function () {
			it('should NOT have a 404.html', () => {
				// https://developers.cloudflare.com/pages/configuration/serving-pages/#single-page-application-spa-rendering
				const entry_points = getꓽwebsiteᝍentryᝍpoints(
					{
						...SPEC,
						isꓽcatching_all_routes: true,
					}
				)
				expect(entry_points).not.to.have.property('404.html')
			})
		})

	})

	//describe('server functions')

	//describe('edge workers')
})
