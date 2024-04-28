import { expect } from 'chai'

import { LIB } from '../../consts.js'
import {
	SoftExecutionContext,
	getRootSEC,
	_test_only__reset_root_SEC,
} from '../../index.js'


describe(`${LIB}`, function () {
	function _mocha_bug_clean_global() {
		// https://github.com/mochajs/mocha/issues/4954
		_test_only__reset_root_SEC()
	}
	before(_test_only__reset_root_SEC)
	afterEach(_test_only__reset_root_SEC)


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
