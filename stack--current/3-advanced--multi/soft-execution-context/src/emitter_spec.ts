import { expect } from 'chai'
import { displayError } from '@offirmo-private/print-error-to-terminal'

import { LIB } from './consts.js'
import {
	SoftExecutionContext,
	getRootSXC,
	_test_only__reset_root_SXC,
} from './index.js'


describe(`${LIB}`, function () {
	function _mocha_bug_clean_global() {
		// https://github.com/mochajs/mocha/issues/4954
		_test_only__reset_root_SXC()
	}
	before(_test_only__reset_root_SXC)
	afterEach(_test_only__reset_root_SXC)


	describe('internal event emitter', function () {

		it('should work')

		it('should be shared across all SXC instances')
	})
})
