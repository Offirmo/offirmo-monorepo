import { expect } from 'chai'

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

		describe('dependency-injection', function () {

			context('direct usage', function () {

				describe('default injections', function () {

					it('should feature the default injections -- root', () => {
						const injections = getRootSEC().getInjectedDependencies()
						expect(injections).to.have.all.keys(
							'SEC',
							'ENV',
							'NODE_ENV',
							'IS_DEV_MODE',
							'IS_VERBOSE',
							'CHANNEL',
							'SESSION_START_TIME_MS',
							'logger',
						)
						expect(injections).to.have.ownProperty('SEC', getRootSEC())
						expect(injections).to.have.ownProperty('logger')
						expect(injections).to.have.ownProperty('ENV', 'development')
						expect(injections).to.have.ownProperty('NODE_ENV', 'development')
						expect(injections).to.have.ownProperty('IS_DEV_MODE', false)
						expect(injections).to.have.ownProperty('IS_VERBOSE', false)
						expect(injections).to.have.ownProperty('CHANNEL', 'dev')
						expect(injections.SESSION_START_TIME_MS).to.be.a('number')
						expect(injections.SESSION_START_TIME_MS).to.be.above(1675962062556) // 2023 sth

						_mocha_bug_clean_global()
					})

					it('should feature the core injections + allow easy access -- leaf', () => {
						getRootSEC().xTry('test', ({
							                           SEC,
							                           logger,
							                           ENV,
							                           NODE_ENV,
							                           IS_DEV_MODE,
							                           IS_VERBOSE,
							                           CHANNEL,
							                           SESSION_START_TIME_MS,
						                           }) => {
							const injections = SEC.getInjectedDependencies()
							expect(injections).to.have.all.keys(
								'SEC',
								'ENV',
								'NODE_ENV',
								'IS_DEV_MODE',
								'IS_VERBOSE',
								'CHANNEL',
								'SESSION_START_TIME_MS',
								'logger',
							)
							expect(injections).to.have.ownProperty('SEC', SEC)
							expect(injections).to.have.ownProperty('logger', logger)
							expect(injections).to.have.ownProperty('ENV', ENV)
							expect(injections).to.have.ownProperty('NODE_ENV', NODE_ENV)
							expect(injections).to.have.ownProperty('IS_DEV_MODE', IS_DEV_MODE)
							expect(injections).to.have.ownProperty('IS_VERBOSE', IS_VERBOSE)
							expect(injections).to.have.ownProperty('CHANNEL', CHANNEL)
							expect(injections).to.have.ownProperty('SESSION_START_TIME_MS', SESSION_START_TIME_MS)
						})

						_mocha_bug_clean_global()
					})

					it('should allow overrides', () => {
						getRootSEC().injectDependencies({
							IS_DEV_MODE: true,
							CHANNEL: 'staging'
						})

						expect(getRootSEC().getInjectedDependencies()).to.have.ownProperty('IS_DEV_MODE', true)
						expect(getRootSEC().getInjectedDependencies()).to.have.ownProperty('CHANNEL', 'staging')

						getRootSEC().xTry('test', ({
							                           SEC,
							                           IS_DEV_MODE,
							                           CHANNEL,
						                           }) => {
							const injections = SEC.getInjectedDependencies()
							expect(injections).to.have.ownProperty('SEC', SEC)
							expect(injections).to.have.ownProperty('IS_DEV_MODE', IS_DEV_MODE)
							expect(injections).to.have.ownProperty('CHANNEL', CHANNEL)
							expect(IS_DEV_MODE).to.be.true
							expect(CHANNEL).to.equal('staging')
						})

						_mocha_bug_clean_global()
					})

					it('should properly override along the call chain', () => {
						// already tested in 'usage in a lib'
					})
				})

				describe('custom injections', function () {

					interface Injections {
						name: string,
					}
					type SEC = SoftExecutionContext<Injections>

					it('should work and properly override at all levels', () => {
						const SECⵧroot = getRootSEC<Injections>()
						expect(SECⵧroot.getInjectedDependencies().name).to.be.undefined

						// already tested in 'usage in a lib'

						_mocha_bug_clean_global()
					})
				})
			})

			context('usage in a lib', function() {

				interface Injections {
					name: string,
				}
				type SEC = SoftExecutionContext<Injections>
				function get_lib_SEC(parent: SEC = getRootSEC()): SEC {
					// TODO memoize ? (if !parent)
					return parent
						.createChild()
						.injectDependencies({
							name: parent.getInjectedDependencies().name || 'root',
						})
				}
				function hello({SEC} = {} as { SEC?: SEC}): string {
					return get_lib_SEC(SEC).xTry('hello', ({SEC, ENV, logger, name}) => {
						return `Hello, ${name}!`
					})
				}

				it('should work - 1 level(s), default', () => {
					const s = hello()
					expect(s).to.equal('Hello, root!')

					_mocha_bug_clean_global()
				})

				it('should work - 1 level(s), override', () => {
					getRootSEC<Injections>().injectDependencies({
						name: 'Offirmo',
					})

					const s = hello()
					expect(s).to.equal('Hello, Offirmo!')

					_mocha_bug_clean_global()
				})

				it('should work - multi level(s), default + override', () => {
					getRootSEC<Injections>().xTry('level1', ({SEC: SEC1, ENV, name}) => {
						expect(name).to.be.undefined
						expect(hello({SEC: SEC1})).to.equal('Hello, root!')

						SEC1.injectDependencies({
							name: 'Alice'
						})
						expect(hello({SEC: SEC1})).to.equal('Hello, Alice!')
						expect(hello()).to.equal('Hello, root!')

						SEC1.xTry('level2', ({SEC: SEC2, name}) => {
							expect(name).to.equal('Alice')
							expect(hello({SEC: SEC2})).to.equal('Hello, Alice!')

							SEC2.injectDependencies({
								name: 'Bob'
							})
							expect(hello({SEC: SEC2})).to.equal('Hello, Bob!')
							expect(hello({SEC: SEC1})).to.equal('Hello, Alice!')
							expect(hello()).to.equal('Hello, root!')
						})
					})

					_mocha_bug_clean_global()
				})
			})
		})
	})
})
