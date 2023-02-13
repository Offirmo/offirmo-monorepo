import { expect } from 'chai'
import { displayError } from '@offirmo-private/print-error-to-ansi'

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

		describe('error-handling', function () {

			describe('details storage and retrieval', function() {

				it('should provide default details', () => {
					try {
						getRootSEC().xTry('test', () => {
							const raw_error = new Error('Test error!')
							throw raw_error
						})
					}
					catch (err: any) {
						console.log(err)
						displayError(err)
						// IMPORTANT
						// The error should be partially decorated
						// BUT since the error can still bubble up,
						// it should not be fully decorated
						expect(err.message).to.equal('Test error!') // no change
						expect(err.details).to.have.all.keys(
							'ENV',
							'TIME',
							'SESSION_DURATION_MS',
							'CHANNEL',
							'logicalStack',
						)
						expect(err._temp).to.have.all.keys(
							'SEC',
							'statePath',
						)
					}

					_mocha_bug_clean_global()
				})

				describe('setErrorReportDetails()', function () {

				})

				describe('setAnalyticsAndErrorDetails()', function () {

				})
			})

			describe('xTry()', function () {

				it('should work', () => {

				})
			})

			describe('xTryCatch()', function () {

				it('should work', () => {

				})
			})

			describe('xPromiseTry()', function () {

				it('should work', () => {

				})
			})

			describe('xNewPromise()', function () {

				it('should work', () => {

				})
			})
		})

	})
})
