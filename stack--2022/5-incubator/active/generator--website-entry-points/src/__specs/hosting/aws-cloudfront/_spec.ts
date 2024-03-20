import { expect } from 'chai'

import { LIB } from '../../../consts.js'

import { getꓽwebsiteᝍentryᝍpoints } from '../../../index.js'

import { SPEC } from '../../__fixtures/specs--blog--personal.js'

/////////////////////////////////////////////////

describe(`${LIB} -- hosting -- GitHub Pages`, function() {

	describe('404 Not Found', function () {

		it('should be handled through a 404.html', () => {
			// https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site
			const entry_points = getꓽwebsiteᝍentryᝍpoints(SPEC)
			expect(entry_points).to.have.property('404.html')
		})
	})

	//describe('server functions')

	//describe('edge workers')

})
