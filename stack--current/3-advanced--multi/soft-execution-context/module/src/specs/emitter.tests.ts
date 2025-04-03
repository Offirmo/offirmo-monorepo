import { expect } from 'chai'
import { displayError } from '@offirmo-private/print-error-to-terminal'

import { LIB } from '../consts.ts'
import { _TEST_ONLY__reset_root_SXC } from '../index.ts'


describe(`${LIB}`, function () {
	function _mocha_bug_clean_global() {
		// https://github.com/mochajs/mocha/issues/4954
		_TEST_ONLY__reset_root_SXC()
	}
	before(_TEST_ONLY__reset_root_SXC)
	afterEach(_TEST_ONLY__reset_root_SXC)


	describe('internal event emitter', function () {

		it('should work')

		it('should be shared across all SXC instances')
	})
})
