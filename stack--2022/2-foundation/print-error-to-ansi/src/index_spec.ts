//import { expect } from 'chai'

import {
	displayError,
	error_to_string,
} from './index.js'

import { createError } from '@offirmo/error-utils'


describe(`@offirmo-private/print-error-to-ansi`, () => {

	describe('error_to_string()', () => {

		it('should work -- trivial error', () => {
			const err = new Error('foo')
			;(err as any).statusCode = 555

			console.error(error_to_string(err))
		})

		it('should work -- typed error', () => {
			const err = new TypeError('foo')
			;(err as any).statusCode = 555

			console.error(error_to_string(err))
		})

		it('should work -- advanced error', () => {
			const err = createError('foo', {
				statusCode: 555,
				foo: 42,
				framesToPop: 3,
			})

			console.error(error_to_string(err))
		})

		describe('cause chaining', function () {

			it.only('should work -- trivial error', () => {
				const err1 = new Error('bar')
				;(err1 as any).code = 'ERR_CPU_USAGE'

				const err2 = new Error('foo')
				;(err2 as any).statusCode = 555
				err2.cause = err1

				console.error(error_to_string(err2))
			})


			it('should work -- advanced error', () => {
				const err = createError('foo', {
					statusCode: 555,
					foo: 42,
					framesToPop: 3,
				})

				console.error(error_to_string(err))
			})


			it('should work -- infinite loop -- trivial', () => {
				const err = new Error('foo')
				;(err as any).statusCode = 555
				err.cause = err

				console.error(error_to_string(err))
			})
		})
	})

	describe('displayError()', () => {

		it('should work', () => {
			const err = new Error('foo')
			;(err as any).statusCode = 555

			displayError(err)
		})
	})
})
