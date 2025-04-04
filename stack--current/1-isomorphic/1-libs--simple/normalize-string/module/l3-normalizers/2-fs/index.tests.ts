import { expect } from 'chai'

import { LIB } from '../../consts.ts'
import type { StringNormalizer } from '../../l1-types/types.ts'
import * as NORMALIZERS from './index.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- basename`, function() {

	const TEST_CASES: any = {

		coerce_toꓽsafe_basenameⵧstrictest: {
			'A': 'a',
			'.A-': 'a',
			'.a--b..c': 'a-b-c',
			'Côte et Ciel': 'cote-et-ciel',
			' lord  MOK ': 'lord-mok',
			'**lord_MOK** ': 'lord-mok',
		},

		normalizeꓽpath: {
			'/' : '',
			'': '', // no change
			'/foo/bar/': 'foo/bar',
			'foo/bar': 'foo/bar', // no change
			'/foo/bar/baz.gif': 'foo/bar/baz.gif',
		}
	}

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

	Object.keys(NORMALIZERS).forEach(key => {
		if (!TEST_CASES[key])
			throw new Error(`(internal check) Missing test cases for normalizer "${key}"!`)
	})
})
