import { strict as assert } from 'node:assert'
import { expect } from 'chai'
import { normalizeꓽemailⵧreasonable, normalize_unicode } from '@monorepo-private/normalize-string'

import {
	AUTHOR,
} from './index.ts'

/////////////////////////////////////////////////

describe(`marketing`, function() {

	describe(`AUTHOR`, function() {

		function expectㆍtoㆍbeㆍaㆍvalidㆍurl(raw_url: any, msg: string): void {
			assert(typeof raw_url === 'string', msg + ' -- type')
			expect(() => new URL(raw_url), msg + ' -- URL').not.to.throw
			expect(normalize_unicode(raw_url).trim(), msg + ' -- normalization').to.equal(raw_url)
		}

		it('should have valid urls', () => {
			expectㆍtoㆍbeㆍaㆍvalidㆍurl(AUTHOR.urlⵧcanonical, 'canonical url')
			expectㆍtoㆍbeㆍaㆍvalidㆍurl(AUTHOR.email, 'email')

			for (const social of (AUTHOR.urlsⵧsocial || [])) {
				expectㆍtoㆍbeㆍaㆍvalidㆍurl(social.url, `social url ${social.network}`)
			}

			expect(normalizeꓽemailⵧreasonable(AUTHOR.email!), "normalizeꓽemailⵧreasonable").to.equal(AUTHOR.email)
		})
	})
})
