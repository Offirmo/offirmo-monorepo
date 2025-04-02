import { expect } from 'chai'

import { LIB } from '../../consts.ts'
import {
	SoftExecutionContext,
	getRootSXC,
	_test_only__reset_root_SXC,
} from '../../index.ts'


describe(`${LIB}`, function () {
	function _mocha_bug_clean_global() {
		// https://github.com/mochajs/mocha/issues/4954
		_test_only__reset_root_SXC()
	}
	before(_test_only__reset_root_SXC)
	afterEach(_test_only__reset_root_SXC)


	describe('plugins', function () {

		describe('analytics', function () {

			describe('setAnalyticsAndErrorDetails', function () {

				it('should work')
			})

			describe('analytics event', function () {

				it('should be emitted')

				it('should have all the properties')
			})
		})
	})
})
