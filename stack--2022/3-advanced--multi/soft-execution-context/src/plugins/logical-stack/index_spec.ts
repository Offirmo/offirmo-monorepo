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

		describe('logical-stack', function () {

			context('usage in a lib', function() {
				const LIB = 'FOO'
				function get_lib_SEC(parent?: SoftExecutionContext): SoftExecutionContext {
					// TODO memoize ? (if !parent)
					return (parent || getRootSEC())
						.createChild()
						.setLogicalStack({module: LIB}) // <-- THIS
				}
				function hello(target: string, {SEC} = {} as { SEC?: SoftExecutionContext}): string {
					return get_lib_SEC(SEC).xTry('hello', ({SEC, ENV, logger}) => {

						expect(SEC.getShortLogicalStack()).to.equal('FOO…hello') // always
						expect(SEC.getLogicalStack().startsWith('FOO›')).to.be.true
						expect(SEC.getLogicalStack().endsWith('›hello')).to.be.true
						const err = (SEC as any)._decorateErrorWithLogicalStack(new Error('TEST'))
						expect(err.message.startsWith('FOO…hello: ')).to.be.true // always

						//logger.info('[This is a log entry]', {SEC, ENV})
						return `Hello, ${target}! (from ${SEC.getLogicalStack()})`
					})
				}
				function polite_hello(target: string, {SEC} = {} as { SEC?: SoftExecutionContext}): string {
					return get_lib_SEC(SEC).xTry('add_honorifics', ({SEC, ENV, logger}) => {

						return hello(`Mx. ${target}`, {SEC})
					})
				}
				function great_politely(target: string, {SEC} = {} as { SEC?: SoftExecutionContext}) {
					get_lib_SEC(SEC).xTry('great', ({SEC, ENV, logger}) => {

						console.log(polite_hello(target, {SEC}))
					})
				}

				it('should work -- 1 level(s)', () => {
					const s = hello('Offirmo')
					expect(s).to.equal('Hello, Offirmo! (from FOO›hello)')

					_mocha_bug_clean_global()
				})

				it('should work -- 2 level(s)', () => {
					const s = polite_hello('Offirmo')
					expect(s).to.equal('Hello, Mx. Offirmo! (from FOO›add_honorifics›hello)')

					_mocha_bug_clean_global()
				})

				it('should work', () => {
					great_politely('Offirmo')

					_mocha_bug_clean_global()
				})
			})
		})
	})
})
