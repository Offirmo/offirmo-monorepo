import { expect } from 'chai'
import { displayError } from '@offirmo-private/print-error-to-terminal'

import {
	LIB,
	SoftExecutionContext,
	getRootSEC,
	_test_only__reset_root_SEC,
} from './index.js'


describe(`${LIB}`, function () {
	function _mocha_bug_clean_global() {
		// https://github.com/mochajs/mocha/issues/4954
		_test_only__reset_root_SEC()
	}
	before(_test_only__reset_root_SEC)
	afterEach(_test_only__reset_root_SEC)


	describe('internal event emitter', function () {

		it('should work')

		it('should be shared across all SEC instances')
	})
})
