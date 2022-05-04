import { expect } from 'chai'

import getGlobalThis from './index.js'


describe('@offirmo/globalthis-ponyfill', function() {

	it('should work', () => {
		const gthis = getGlobalThis()

		expect(gthis).to.equal(globalThis)
	})
})
