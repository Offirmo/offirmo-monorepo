import { expect } from 'chai'

import { LIB } from '../../consts.js'
import {
	SoftExecutionContext,
	getRootSXC,
	_test_only__reset_root_SXC,
} from '../../index.js'


describe(`${LIB}`, function () {
	function _mocha_bug_clean_global() {
		// https://github.com/mochajs/mocha/issues/4954
		_test_only__reset_root_SXC()
	}
	before(_test_only__reset_root_SXC)
	afterEach(_test_only__reset_root_SXC)


	describe('plugins', function () {

		describe('dependency-injection', function () {

			context('direct usage', function () {

				describe('default injections', function () {

					it('should feature the default injections -- root', () => {
						const injections = getRootSXC().getInjectedDependencies()
						expect(injections).to.have.all.keys(
							'SXC',
							'ENV',
							'NODE_ENV',
							'IS_DEV_MODE',
							'IS_VERBOSE',
							'CHANNEL',
							'SESSION_START_TIME_MS',
							'logger',
						)
						expect(injections).to.have.ownProperty('SXC', getRootSXC())
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
						getRootSXC().xTry('test', ({
							                           SXC,
							                           logger,
							                           ENV,
							                           NODE_ENV,
							                           IS_DEV_MODE,
							                           IS_VERBOSE,
							                           CHANNEL,
							                           SESSION_START_TIME_MS,
						                           }) => {
							const injections = SXC.getInjectedDependencies()
							expect(injections).to.have.all.keys(
								'SXC',
								'ENV',
								'NODE_ENV',
								'IS_DEV_MODE',
								'IS_VERBOSE',
								'CHANNEL',
								'SESSION_START_TIME_MS',
								'logger',
							)
							expect(injections).to.have.ownProperty('SXC', SXC)
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
						getRootSXC().injectDependencies({
							IS_DEV_MODE: true,
							CHANNEL: 'staging'
						})

						expect(getRootSXC().getInjectedDependencies()).to.have.ownProperty('IS_DEV_MODE', true)
						expect(getRootSXC().getInjectedDependencies()).to.have.ownProperty('CHANNEL', 'staging')

						getRootSXC().xTry('test', ({
							                           SXC,
							                           IS_DEV_MODE,
							                           CHANNEL,
						                           }) => {
							const injections = SXC.getInjectedDependencies()
							expect(injections).to.have.ownProperty('SXC', SXC)
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
					type SXC = SoftExecutionContext<Injections>

					it('should work and properly override at all levels', () => {
						const SXCⵧroot = getRootSXC<Injections>()
						expect(SXCⵧroot.getInjectedDependencies().name).to.be.undefined

						// already tested in 'usage in a lib'

						_mocha_bug_clean_global()
					})
				})
			})

			context('usage in a lib', function() {

				interface Injections {
					name: string,
				}
				type SXC = SoftExecutionContext<Injections>
				function getꓽSXC(parent: SXC = getRootSXC()): SXC {
					// TODO memoize ? (if !parent)
					return parent
						.createChild()
						.injectDependencies({
							name: parent.getInjectedDependencies().name || 'root',
						})
				}
				function hello({SXC} = {} as { SXC?: SXC}): string {
					return getꓽSXC(SXC).xTry('hello', ({SXC, ENV, logger, name}) => {
						return `Hello, ${name}!`
					})
				}

				it('should work - 1 level(s), default', () => {
					const s = hello()
					expect(s).to.equal('Hello, root!')

					_mocha_bug_clean_global()
				})

				it('should work - 1 level(s), override', () => {
					getRootSXC<Injections>().injectDependencies({
						name: 'Offirmo',
					})

					const s = hello()
					expect(s).to.equal('Hello, Offirmo!')

					_mocha_bug_clean_global()
				})

				it('should work - multi level(s), default + override', () => {
					getRootSXC<Injections>().xTry('level1', ({SXC: SXC1, ENV, name}) => {
						expect(name).to.be.undefined
						expect(hello({SXC: SXC1})).to.equal('Hello, root!')

						SXC1.injectDependencies({
							name: 'Alice'
						})
						expect(hello({SXC: SXC1})).to.equal('Hello, Alice!')
						expect(hello()).to.equal('Hello, root!')

						SXC1.xTry('level2', ({SXC: SXC2, name}) => {
							expect(name).to.equal('Alice')
							expect(hello({SXC: SXC2})).to.equal('Hello, Alice!')

							SXC2.injectDependencies({
								name: 'Bob'
							})
							expect(hello({SXC: SXC2})).to.equal('Hello, Bob!')
							expect(hello({SXC: SXC1})).to.equal('Hello, Alice!')
							expect(hello()).to.equal('Hello, root!')
						})
					})

					_mocha_bug_clean_global()
				})
			})
		})
	})
})
