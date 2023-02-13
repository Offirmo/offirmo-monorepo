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

			describe('usage -- direct', function () {

				it('should work -- default', () => {
					getRootSEC().xTry('level1', ({SEC: SEC1, ENV}) => {

						SEC1.xTry('level2', ({SEC: SEC2}) => {

							expect(SEC2.getLogicalStack()).to.equal('›level1›level2')
							expect(SEC2.getShortLogicalStack()).to.equal('…level2')
							expect(SEC1.getLogicalStack()).to.equal('›level1')
							expect(SEC1.getShortLogicalStack()).to.equal('…level1')
							expect(getRootSEC().getLogicalStack()).to.equal('')
							expect(getRootSEC().getShortLogicalStack()).to.equal('…')
						})
					})

					_mocha_bug_clean_global()
				})

				it('should work -- config', () => {
					getRootSEC().setLogicalStack({
						module: 'app'
					})
					getRootSEC().xTry('level1', ({SEC: SEC1, ENV}) => {

						SEC1.xTry('level2', ({SEC: SEC2}) => {

							expect(SEC2.getLogicalStack()).to.equal('app›level1›level2')
							expect(SEC2.getShortLogicalStack()).to.equal('app…level2')
							expect(SEC1.getLogicalStack()).to.equal('app›level1')
							expect(SEC1.getShortLogicalStack()).to.equal('app…level1')
							expect(getRootSEC().getLogicalStack()).to.equal('app')
							expect(getRootSEC().getShortLogicalStack()).to.equal('app…')
						})
					})

					_mocha_bug_clean_global()
				})
			})

			describe('usage -- in a lib', function() {
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

			describe('_decorateErrorWithLogicalStack()', function () {

				context('on a new error', function () {

					it('should work', () => {
						getRootSEC().setLogicalStack({module: 'foo'})

						getRootSEC().xTry('bar', ({SEC}) => {
							const raw_error = new Error('TEST!')
							const err = (SEC as any)._decorateErrorWithLogicalStack(raw_error)
							expect(err).to.equal(raw_error) // yes, this internal
							expect(err.message).to.equal('foo…bar: TEST!')
						})

						_mocha_bug_clean_global()
					})

					it('should change both the message and the stacktrace to avoid confusion', () => {
						getRootSEC().setLogicalStack({module: 'foo'})

						getRootSEC().xTry('bar', ({SEC}) => {
							const raw_error = new Error('TEST!')
							const err = (SEC as any)._decorateErrorWithLogicalStack(raw_error)
							expect(err.message).to.equal('foo…bar: TEST!')
							expect(err.stack.startsWith('foo…bar: TEST!')).to.be.true
						})

						_mocha_bug_clean_global()
					})
				})

				context('on an already decorated error', function () {

					it('should not redecorate the error', () => {
						let raw_error: any = null
						let err_from_l2: any = null
						let err_from_l1: any = null

						try {
							getRootSEC().xTry('level1', ({SEC: SEC1, ENV}) => {

								try {
									SEC1.xTry('level2', ({SEC: SEC2}) => {
										raw_error = new Error('Test!')
										throw raw_error
									})
								}
								catch (err) {
									err_from_l2 = err
									throw err
								}
							})
						}
						catch (err) {
							err_from_l1 = err

							console.log({
								raw_error,
								err_from_l2,
								err_from_l1,
							})

							expect(err_from_l2.message).to.equal('foo…bar: TEST!')
							expect(err_from_l2.stack.startsWith('foo…bar: TEST!')).to.be.true
						}

						_mocha_bug_clean_global()
					})

					context('when the stack has branched', function () {

						it('should work')
					})
				})
			})
		})
	})
})
