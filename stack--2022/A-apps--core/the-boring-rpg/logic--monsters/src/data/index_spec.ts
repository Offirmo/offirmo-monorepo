import { expect } from 'chai'

import { ENTRIES } from './index.js'

describe('@oh-my-rpg/logic-monsters - data:', function() {

	it('should have all the expected monsters', () => {
		expect(ENTRIES).to.have.lengthOf(76)
	})
})
