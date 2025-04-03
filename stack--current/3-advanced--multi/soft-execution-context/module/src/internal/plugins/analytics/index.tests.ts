import { expect } from 'chai'

import { LIB } from '../../../consts.ts'
import {
	_TEST_ONLY__reset_root_SXC,
} from '../../../index.ts'


describe(`${LIB} -- plugins -- analytics`, function () {
	function _mocha_bug_clean_global() {
		// https://github.com/mochajs/mocha/issues/4954
		_TEST_ONLY__reset_root_SXC()
	}
	before(_TEST_ONLY__reset_root_SXC)
	afterEach(_TEST_ONLY__reset_root_SXC)


	describe('setAnalyticsAndErrorDetails', function () {

		it('should work')
	})

	describe('analytics event', function () {

		it('should be emitted')

		it('should have all the properties')
	})
})
