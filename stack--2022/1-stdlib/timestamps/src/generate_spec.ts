import { expect } from 'chai'
import sinon from 'sinon'

import {
	getꓽUTC_timestamp‿ms,

	getꓽUTC_timestampⵧhuman_readable‿ms,
	getꓽUTC_timestampⵧhuman_readable‿seconds,
	getꓽUTC_timestampⵧhuman_readable‿minutes,
	getꓽUTC_timestampⵧhuman_readable‿days,

	TEST_TIMESTAMP_MS,
} from './index.js'

declare const console: any


describe('@offirmo-private/timestamps', function() {

	describe('getꓽUTC_timestamp‿ms()', function() {

		it('should return correct UTC unix timestamps in ms', function() {
			//console.log(getꓽUTC_timestamp‿ms())

			for(let i = 0; i < 10; ++i) {
				const stamp = getꓽUTC_timestamp‿ms()
				//console.log(stamp)
				expect(stamp).to.be.a('number')
				expect(stamp).to.be.within(
					1510177449000, // 2017
					4665851049000, // 2117
				)
			}
		})

		describe('testability', function () {
			it('should allow passing a forced time', function() {
				const date = new Date(TEST_TIMESTAMP_MS)
				expect(Number(date)).to.equal(TEST_TIMESTAMP_MS)
				const stamp = getꓽUTC_timestamp‿ms(date)
				expect(stamp).to.equal(TEST_TIMESTAMP_MS)
			})

			context('when using sinon', function() {
				beforeEach(function () {
					;(this as any).clock = sinon.useFakeTimers(TEST_TIMESTAMP_MS)
				})
				afterEach(function () {
					;(this as any).clock.restore()
				})

				it('should be affected by useFakeTimers()', function() {
					// test sinon itself
					const date = new Date()
					expect(Number(date)).to.equal(TEST_TIMESTAMP_MS)

					// and us
					const stamp = getꓽUTC_timestamp‿ms()
					expect(stamp).to.equal(TEST_TIMESTAMP_MS)
				})
			})
		})
	})

	describe('getꓽUTC_timestampⵧhuman_readable‿ms()', function() {

		it('should return correct UTC timestamps up to the millisecond', function() {
			//console.log(getꓽUTC_timestampⵧhuman_readable‿ms())

			for(let i = 0; i < 10; ++i) {
				const stamp = getꓽUTC_timestampⵧhuman_readable‿ms()
				//console.log(stamp)
				expect(stamp).to.be.a('string')
				expect(stamp.length).to.equal(21)
			}
		})
	})

	describe('getꓽUTC_timestampⵧhuman_readable‿seconds()', function() {

		it('should return correct UTC timestamps up to the second', function() {
			//console.log(getꓽUTC_timestampⵧhuman_readable‿seconds())

			for(let i = 0; i < 10; ++i) {
				const stamp = getꓽUTC_timestampⵧhuman_readable‿seconds()
				//console.log(stamp)
				expect(stamp).to.be.a('string')
				expect(stamp.length).to.equal(17)
			}
		})
	})

	describe('getꓽUTC_timestampⵧhuman_readable‿minutes()', function() {

		it('should return correct UTC timestamps up to the minute', function() {
			//console.log(getꓽUTC_timestampⵧhuman_readable‿minutes())

			for(let i = 0; i < 10; ++i) {
				const stamp = getꓽUTC_timestampⵧhuman_readable‿minutes()
				//console.log(stamp)
				expect(stamp).to.be.a('string')
				expect(stamp.length).to.equal(14)
			}
		})
	})

	describe('getꓽUTC_timestampⵧhuman_readable‿days()', function() {

		it('should return correct UTC timestamps up to the day', function() {
			//console.log(getꓽUTC_timestampⵧhuman_readable‿days())

			for(let i = 0; i < 10; ++i) {
				const stamp = getꓽUTC_timestampⵧhuman_readable‿days()
				//console.log(stamp)
				expect(stamp).to.be.a('string')
				expect(stamp.length).to.equal(8)
			}
		})
	})
})
