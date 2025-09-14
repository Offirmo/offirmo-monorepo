import { expect } from 'chai'

import { LIB } from '../../consts.ts'
import type { StringNormalizer } from '../../l1-types/types.ts'
import * as NORMALIZERS from './index.ts'
import { capitalizeⵧwords, capitalizeⵧwordsⵧadvanced, ensure_string } from './index.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- base`, function() {

	const TEST_CASES: any = {

		ensure_string: {
			'foo ': 'foo ', // no change if string
			'': '', // same
			// see dedicated tests for non-string inputs
		},

		capitalizeⵧfirst: {
			'': '',
			' ': ' ',
			'a': 'A',
			' a': ' a',
			'foo': 'Foo',
			'FoO': 'FoO',
			' foo  bar-baz ': ' foo  bar-baz ',
		},
		capitalizeⵧwords: {
			'': '',
			' ': ' ',
			'a': 'A',
			' a': ' A',
			'foo': 'Foo',
			'FoO': 'FoO',
			' foo  bar-baz ': ' Foo  Bar-baz ',
		},
		capitalizeⵧwordsⵧadvanced: {
			'': '',
			' ': ' ',
			'a': 'A',
			' a': ' A',
			'foo': 'Foo',
			'FoO': 'FoO',
			' foo  bar-baz ': ' Foo  Bar-Baz ',
		},

		to_lower_case: {
			'': '',
			' ': ' ',
			'a': 'a',
			' A': ' a',
			'ÉTANG': 'étang',
			'FoO': 'foo',
		},

		to_upper_case: {
			'': '',
			' ': ' ',
			'a': 'A',
			' A': ' A',
			'étang': 'ÉTANG',
			'FoO': 'FOO',
		},

		trim: {
			'': '',
			' ': '',
			'a': 'a',
			' a': 'a',
			' 	a 	': 'a',
		},

		coerce_toꓽascii: {
			'': '',
			' ': ' ',
			'a': 'a',
			'Côte et Ciel': 'Cote et Ciel',
			'🐯éçę’s iPadೱ': "??ece's iPad?", // TODO better emoji stripping
		},

		normalize_unicode: {
			'': '',
			' ': ' ',
			'a': 'a',
			['Côte et Ciel'.normalize('NFKD')]: 'Côte et Ciel',
			['Côte et Ciel'.normalize('NFD')]: 'Côte et Ciel',
		},

		coerce_blanks_to_single_spaces: {
			'': '',
			' ': ' ',
			'	': ' ',
			'a': 'a',
			'	 		': ' ',
			'foo bar': 'foo bar',
			'foo	 bar': 'foo bar',
			'Lord	Mok': 'Lord Mok',
		},

		remove_all_spaces: {
			'': '',
			' ': '',
			'  ': '',
			'	': '	',
			'  a  b  ': 'ab',
			'	 		': '			',
			'foo bar ': 'foobar',
		},

		coerce_delimiters_to_space: {
			'': '',
			' ': ' ',
			'-': ' ',
			'a': 'a',
			'-+-?': '    ',
			'foo-bar': 'foo bar',
			'++foo/bar++': '  foo bar  ',
			'Lord_Mok': 'Lord Mok',
		},

		coerce_underscores_to_space: {
			'_hello_world__bob_': ' hello world  bob ',
		},

		convert_spaces_to_camel_case: {
			'': '',
			' ': '',
			'a': 'A',
			'Côte et Ciel': 'CôteEtCiel',
			'lord Mok': 'LordMok',
		},

		convert_spaces_to_kebab_case: {
			'': '',
			' ': '',
			'a': 'a',
			'Côte et Ciel': 'Côte-et-Ciel',
			'lord Mok': 'lord-Mok',
		},
	}

	// special
	describe('ensure_string', function() {
		expect(ensure_string('foo ')).to.equal('foo ')
		expect(ensure_string('')).to.equal('')
		expect(ensure_string(undefined)).to.equal('')
		expect(ensure_string(null)).to.equal('')
		expect(ensure_string(true)).to.equal('true')
		expect(ensure_string(false)).to.equal('false')
		expect(ensure_string(0)).to.equal('0')
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

	Object.keys(NORMALIZERS).forEach(key => {
		if (key === 'RECOMMENDED_UNICODE_NORMALIZATION')
			return

		if (!TEST_CASES[key])
			throw new Error(`(internal check) Missing test cases for normalizer "${key}"!`)
	})
})
