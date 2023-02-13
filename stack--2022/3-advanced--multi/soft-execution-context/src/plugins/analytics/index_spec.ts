import { expect } from 'chai'

import {
	LIB,
	SoftExecutionContext,
	getRootSEC,
	_test_only__reset_root_SEC,
} from '../../index.js'


describe(`${LIB}`, function () {
	function _mocha_bug_clean_global() {
		_test_only__reset_root_SEC()
	}
	before(_test_only__reset_root_SEC)
	afterEach(_test_only__reset_root_SEC)


	describe('plugins', function () {

		describe('analytics', function () {

			describe('setAnalyticsAndErrorDetails', function () {

				it('should work')
			})
		})
	})
})
