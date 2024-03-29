import assert from 'tiny-invariant'
import { expect } from 'chai'

import {
	YEARⵧCURRENT,
	getꓽparams,
	Params,
	_UNSAFE_CURRENT_SYSTEM_TIMEZONE,
	getꓽtimezoneⵧdefault,
} from './params.js'

describe('Params', function() {

	describe('getꓽparams()', function() {
		assert(!getꓽparams().expect_perfect_state, 'code should not be in debug mode')

		it('should work')
	})

	describe('utilities', function () {

		describe('YEARⵧCURRENT', function () {

			it('should work', () => {
				//console.log({ YEARⵧCURRENT })
				expect(YEARⵧCURRENT).to.be.a('number')
				expect(YEARⵧCURRENT).to.be.within(1900, 2100) // wide
				expect(YEARⵧCURRENT).to.be.within(2020, 2025) // practical while I'm the only dev
			})
		})

		describe('_UNSAFE_CURRENT_SYSTEM_TIMEZONE', function() {

			it('should work', () => {
				const current_tz = _UNSAFE_CURRENT_SYSTEM_TIMEZONE
				//console.log({ current_tz })
				expect(current_tz).to.be.a('string')
				expect(current_tz.length).to.be.at.least(5)
				expect(current_tz).to.equal('Australia/Sydney') // practical while I'm the only dev TODO improve
			})
		})

		describe('getꓽtimezoneⵧdefault()', function() {
			let test_params: Params = getꓽparams()
			const now_utc_ms = Number(new Date())

			beforeEach(() => {
				test_params = structuredClone(getꓽparams())
				test_params.default_timezones = []
			})

			it('should work - empty array', () => {
				const system_tz = _UNSAFE_CURRENT_SYSTEM_TIMEZONE
				const default_tz = getꓽtimezoneⵧdefault(now_utc_ms, test_params)
				//console.log({ test_params, system_tz, default_tz })
				expect(default_tz).to.equal(system_tz)
			})

			it('should work - real case', () => {
				test_params.default_timezones = [
					// order expected
					//
					{
						date_utc_ms: Number(Date.UTC(1826, 0)),
						new_default: 'Europe/Paris',
					},
					{
						date_utc_ms: Number(Date.UTC(2009, 7, 10)),
						new_default: 'Asia/Bangkok',
					},
					{
						date_utc_ms: Number(Date.UTC(2010, 6, 8)),
						new_default: 'Europe/Paris',
					},
					{
						date_utc_ms: Number(Date.UTC(2017, 6, 14)),
						new_default: 'Australia/Sydney',
					},
				].sort((a, b) => a.date_utc_ms - b.date_utc_ms)
				//console.log({ test_params, dt: test_params.default_timezones, _UNSAFE_CURRENT_SYSTEM_TIMEZONE })

				// before 1970 = negative timestamp
				const default_tz_1900 = getꓽtimezoneⵧdefault(Number(Date.UTC(1900, 0)), test_params)
				expect(default_tz_1900, '1900').to.equal('Europe/Paris')

				const default_tz_2001 = getꓽtimezoneⵧdefault(Number(Date.UTC(2001, 0)), test_params)
				expect(default_tz_2001, '2001').to.equal('Europe/Paris')

				const default_tz_2009_08_09 = getꓽtimezoneⵧdefault(Number(Date.UTC(2009, 7, 9)), test_params)
				expect(default_tz_2009_08_09).to.equal('Europe/Paris')
				const default_tz_2009_08_10 = getꓽtimezoneⵧdefault(Number(Date.UTC(2009, 7, 10)), test_params)
				expect(default_tz_2009_08_10).to.equal('Asia/Bangkok')

				const default_tz_2010_07_08 = getꓽtimezoneⵧdefault(Number(Date.UTC(2010, 6, 8)), test_params)
				expect(default_tz_2010_07_08).to.equal('Europe/Paris')

				const default_tz_2018 = getꓽtimezoneⵧdefault(Number(Date.UTC(2018, 0)), test_params)
				expect(default_tz_2018, '2018').to.equal('Australia/Sydney')

				const default_tz_now = getꓽtimezoneⵧdefault(now_utc_ms, test_params)
				expect(default_tz_now, 'now').to.equal('Australia/Sydney')
			})

			it('should warn - real case', () => {
				test_params.default_timezones = [
					{
						date_utc_ms: Number(Date.UTC(1826, 1)),
						new_default: _UNSAFE_CURRENT_SYSTEM_TIMEZONE === 'Europe/Paris' ? 'Asia/Bangkok' : 'Europe/Paris',
					},
				].sort((a, b) => a.date_utc_ms - b.date_utc_ms)
				//console.log({ test_params, dt: test_params.default_timezones, system_tz })

				const default_tz_now = getꓽtimezoneⵧdefault(now_utc_ms, test_params)
				// TODO spy logger.warn
			})
		})
	})
})
