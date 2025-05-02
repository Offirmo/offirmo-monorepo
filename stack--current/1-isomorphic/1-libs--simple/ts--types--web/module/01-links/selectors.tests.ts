import { expect } from 'chai'

import {
	getꓽuriⵧnormalized‿str,
} from './selectors.ts'

/////////////////////////////////////////////////

describe(`@offirmo-private/ts-types-web -- 01-links -- selectors`, function() {

	describe('getꓽuriⵧnormalized‿str()', function () {


		const TEST_CASES: any = {
			// mailto:
			'mailto:a@b.c': 'mailto:a@b.c',
			'mailto:a@b. C': 'mailto:a@b.c',

			// httpₓ:
			'https://www.foo.bar?foo=42#1234': 'https://www.foo.bar/?foo=42#1234',
			' http: //www. foo. bar': 'https://www.foo.bar/',
			' https: //www. foo.bar ': 'https://www.foo.bar/',

			'https://www.foo.bar/index.html': 'https://www.foo.bar/index.html',
			'https://www.foo.bar/baz': 'https://www.foo.bar/baz',

			'https://www.foo.bar?&b=2&a=1': 'https://www.foo.bar/?a=1&b=2',

			// unknown
			// recognized as an email
			'a@b.c': 'mailto:a@b.c',
			'A@b. c': 'mailto:a@b.c',
			// only scheme-specific
			'': '/',
			'/': '/',
		}

		Object.keys(TEST_CASES).forEach(input => {
			const expected_output = TEST_CASES[input]

			it(`should correctly normalize "${input}" to "${expected_output}"`, () => {
				const res = getꓽuriⵧnormalized‿str(input)
				expect(res).to.equal(expected_output)
			})
		})
	})
})
