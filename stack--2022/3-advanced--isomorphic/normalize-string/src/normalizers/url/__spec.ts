import { expect } from 'chai'

import { LIB } from '../../consts.js'
import { StringNormalizer } from '../../types.js'
import * as NORMALIZERS from './index.js'

/////////////////////////////////////////////////

describe(`${LIB} -- url`, function() {

	const TEST_CASES: any = {

		normalizeꓽurl: {
			'mailto:a@b.c': 'mailto:a@b.c',
			'mailto:a@b. C': 'mailto:a@b.c',
			' https://www.foo.bar': 'https://www.foo.bar',
		},
	}
	Object.keys(NORMALIZERS).forEach(key => {
		if (!TEST_CASES[key])
			throw new Error(`(internal check) Missing test cases for normalizer "${key}"!`)
	})

	Object.keys(TEST_CASES).forEach(key => {
		const normalizer: StringNormalizer = (NORMALIZERS as any)[key]
		if (!normalizer)
			throw new Error(`Wrong test case for unknown normalizer "${key}"!`)

		describe(`normalizer "${key}"`, function() {

			const NORMALIZER_TEST_CASES = TEST_CASES[key]
			Object.keys(NORMALIZER_TEST_CASES).forEach(input => {
				const expected_output = NORMALIZER_TEST_CASES[input]

				it(`should correctly normalize "${input}" to "${expected_output}"`, () => {
					const res = normalizer(input)
					expect(res).to.equal(expected_output)
				})
			})
		})
	})
})
