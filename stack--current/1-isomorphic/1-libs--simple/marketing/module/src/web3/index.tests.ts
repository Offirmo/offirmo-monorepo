import { expectㆍtoㆍbeㆍaㆍvalidㆍAuthor } from '@monorepo-private/ts--types--web/_expect'

import {
	AUTHOR,
} from './index.ts'

/////////////////////////////////////////////////

describe(`marketing -- web3`, function() {

	describe(`AUTHOR`, function() {

		it('should be valid', () => {
			expectㆍtoㆍbeㆍaㆍvalidㆍAuthor(AUTHOR)
		})
	})
})
