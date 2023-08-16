import { expect } from 'chai'
import { displayError } from '@offirmo-private/print-error-to-terminal'

import {
	LIB,
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

		describe('error-handling', function () {

			describe('details storage and retrieval', function() {

				it('should provide default details', () => {
					getRootSEC().setLogicalStack({module: 'test'})
					try {
						getRootSEC().xTry('test', () => {
							const raw_error = new Error('Test error!')
							throw raw_error
						})
					}
					catch (err: any) {
						//console.log(err)
						//displayError(err)
						// IMPORTANT
						// The error should be partially decorated
						// BUT since the error can still bubble up,
						// it should not be fully decorated
						expect(err.message).to.equal('test…test: Test error!') // short stack was added
						expect(err.details).to.have.all.keys(
							'ENV',
							'TIME',
							'SESSION_DURATION_MS',
							'CHANNEL',
							'logicalStack',
						)
						expect(err).to.have.property('_temp')
					}

					_mocha_bug_clean_global()
				})

				describe('setErrorReportDetails()', function () {

					it('should work', () => {
						const err = getRootSEC()
							.setLogicalStack({module: 'test'})
							.setErrorReportDetails({
								foo: 'bar'
							})
							.createError('foo', { gloups: 'gnokman'})

						expect(err.details).to.have.property('foo', 'bar')
						expect(err.details).to.have.property('gloups', 'gnokman')

						_mocha_bug_clean_global()
					})
				})

				describe('setAnalyticsAndErrorDetails()', function () {

					it('should work', () => {
						const err = getRootSEC()
							.setLogicalStack({module: 'test'})
							.setAnalyticsAndErrorDetails({
								foo: 'bar'
							})
							.createError('foo', { gloups: 'gnokman'})

						expect(err.details).to.have.property('foo', 'bar')
						expect(err.details).to.have.property('gloups', 'gnokman')

						_mocha_bug_clean_global()
					})
				})
			})

			describe('xTry()', function () {

				it('should work')
			})

			describe('xTryCatch()', function () {

				it('should work')
			})

			describe('xPromiseTry()', function () {

				it('should work')
			})

			describe('xNewPromise()', function () {

				it('should work')
			})

			describe('final error event', function () {

				it('should be emitted')

				it('should have all the properties')
			})
		})
	})
})
