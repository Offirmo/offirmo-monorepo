import { expect } from 'chai'

import {
	COMMON_ERROR_FIELDS_EXTENDED,
} from './fields.ts'

import type { XXError } from './types.ts'

import { createError } from './util--create.ts'


describe(`@offirmo/error-utils`, () => {

	describe('createError()', () => {

		it('should work', () => {
			const err = createError('foo', {
				statusCode: 555,
				foo: 42,
				framesToPop: 3,
			})

			expect(err.message).to.equal('Error: foo')

			expect(err.statusCode).to.equal(555)
			expect(err.details?.['statusCode']).to.be.undefined

			expect(err.details?.['foo']).to.equal(42)
			expect((err as any).foo).to.be.undefined

			expect(err.framesToPop).to.equal(4) // +1 added
			expect(err.details?.['framesToPop']).to.be.undefined
		})

		describe('message', function() {

			it('should add "error" in the message if not present', () => {
				const err = createError('foo!')
				expect(err.message).to.equal('Error: foo!')
			})

			it('should NOT add "error" in the message present', () => {
				const err = createError('Some eRRor!')
				expect(err.message).to.equal('Some eRRor!')
			})

			it('should pick the message from the attributes if present', () => {
				const err = createError('', {
					message: 'foo!',
				})
				expect(err.message).to.equal('Error: foo!')
				expect(err).not.to.have.deep.property('details.message')
			})
		})

		describe('attributes', function() {

			it('should attach the attributes at the correct place', () => {
				const chained_error = new Error('Foo!')

				expect(COMMON_ERROR_FIELDS_EXTENDED, 'This unit test needs an update! (1)').to.have.lengthOf(12)

				const err = createError('test!', {
					name: 'TEST_NAME', // will be ignored and lost
					message: 'TEST_MSG', // idem
					stack: 'TST_STACK', // idem

					// leftovers, should be added in details (pre)
					bar: 33,

					// should stay as is
					cause: chained_error,
					errors: [ chained_error ],
					suppressed: chained_error,
					code: '1234', // rem: string type according to nodejs doc
					statusCode: 567,
					shouldRedirect: false,
					framesToPop: 3,
					details: {
						foo: 42,
					},
					_temp: {
						SXC: {},
						statePath: 'TEST_STATE_PATH',
					},

					// leftovers, should be added in details (post)
					logicalStack: 'TST_LOGICAL_STACK',
				}, TypeError)

				const expected = {
					name: 'TypeError',
					message: 'TypeError: test!',
					stack: err.stack,
					cause: chained_error,
					errors: [ chained_error ],
					suppressed: chained_error,
					code: '1234', // rem: string type according to nodejs doc
					statusCode: 567,
					shouldRedirect: false,
					framesToPop: 4, // +1 added
					details: {
						bar: 33,
						foo: 42,
						logicalStack: 'TST_LOGICAL_STACK',
					},
					_temp: {
						SXC: {},
						statePath: 'TEST_STATE_PATH',
					},
				}
				COMMON_ERROR_FIELDS_EXTENDED.forEach((k: keyof XXError) => {
					expect(err, `have field "${k}"`).to.have.property(k)
					expect(err[k], `preserved field "${k}"`).to.deep.equal((expected as any)[k])
				})
				Object.keys(err).forEach(k => {
					expect(expected, k).to.have.property(k)
				})
			})
		})
	})
})
