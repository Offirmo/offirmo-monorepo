import assert from 'tiny-invariant'
import memoize_one from 'memoize-one'

import { getꓽlogger } from '@tbrpg/definitions'
import { getꓽUTC_timestamp‿ms } from '@offirmo-private/timestamps'

import { LIB, TICK_MS } from './consts.js'
import { UState, TState } from './types.js'
import { Fraction, time_to_human } from './utils.js'

////////////////////////////////////

// Safely define a max refilling rate.
// This cap is to avoid huge numbers during onboarding that causes UX issues.
// must be smaller than .5 for rounding reasons (TODO why?)
const MAX_ALLOWED_REFILLING_RATE_PER_MS = new Fraction(10, 21) // 10 energy / 21 ms = huge.

function get_current_energy_refilling_rate_per_ms(u_state: Readonly<UState>, t_state: Readonly<TState> ): Fraction {
	if (t_state.timestamp_ms + TICK_MS < getꓽUTC_timestamp‿ms()) {
		getꓽlogger().warn(`${LIB}.get_current_energy_refilling_rate_per_ms() called on outdated state!`)
	}

	// allow an "onboarding" regeneration rate:
	// where energy regenerates faster at the beginning
	// Formula: https://www.desmos.com/calculator/s1kpakvnjw
	//                                        onboarding_coeff
	// refilling rate = floor(--------------------------------------------- + established_energy_refilling_rate_per_ms)
	//                        (total_energy_refilled_so_far + adjust)^onboarding_power

	const { total_energy_consumed_so_far } = u_state
	const total_energy_refilled_so_far = total_energy_consumed_so_far + getꓽavailable_energy‿int(t_state) - u_state.max_energy
	assert(total_energy_refilled_so_far >= 0, `${LIB}.get_current_energy_refilling_rate_per_ms() total_energy_refilled_so_far = ${total_energy_refilled_so_far}!`)

	if (total_energy_refilled_so_far <= 0) {
		// <= 0 to avoid dividing by 0
		return MAX_ALLOWED_REFILLING_RATE_PER_MS
	}

	const established_energy_refilling_rate_per_ms = new Fraction(
		// 7/24h, in ms
		7,
		24 * 3600 * 1000,
	)
	const onboarding_coeff = 55 // bigger = faster refill
	const onboarding_adjustment = 5 // to skip the too many "0s" refill at the beginning
	const onboarding_power = 5 // bigger = slower refill

	const onboarding_energy_refilling_rate_per_ms = new Fraction(
		onboarding_coeff,
		Math.pow(total_energy_refilled_so_far + onboarding_adjustment, onboarding_power),
	)

	let rate = (
		onboarding_energy_refilling_rate_per_ms
			.add(established_energy_refilling_rate_per_ms)
			// for rounding reasons, we floor() the result
			// established = 7/day = ~0.000000081028970/ms
			.floor(12) // 12 because seen dropping the /day rate at 10
	)

	if (total_energy_refilled_so_far <= 10 && rate.compare(MAX_ALLOWED_REFILLING_RATE_PER_MS) > 0) {
		rate = MAX_ALLOWED_REFILLING_RATE_PER_MS
		// onboarding early values may be too big
		// we don't use Math.max to check that, it only happens during onboarding
	}

	if (rate.compare(MAX_ALLOWED_REFILLING_RATE_PER_MS) > 0) {
		getꓽlogger().error('rate too big!', {
			rate,
			rate_v: rate.valueOf(),
			u_state,
			t_state,
			total_energy_refilled_so_far,
			onboarding_coeff,
			onboarding_power,
			established_energy_refilling_rate_per_ms,
			established_energy_refilling_rate_per_ms_v: established_energy_refilling_rate_per_ms.floor(12).valueOf(),
			den: Math.pow(total_energy_refilled_so_far, onboarding_power),
		})
	}
	assert(rate.compare(MAX_ALLOWED_REFILLING_RATE_PER_MS) <= 0, 'rate should not be too big')

	return rate
}

////////////

function debugTTNx(energy_refilling_rate_per_ms: number) {
	/*const ttn = (
		(new Fraction(1))
			.div(energy_refilling_rate_per_ms)
			.round(0)
			.valueOf()
	)
	console.warn('debug', {
		energy_refilling_rate_per_ms,
		ttn,
	})*/
}
// @ts-expect-error memoize_one import issue TODO fix
const debugTTN = memoize_one(debugTTNx)

function get_milliseconds_to_next(u_state: Readonly<UState>, t_state: Readonly<TState>): number {
	if (t_state.timestamp_ms + TICK_MS < getꓽUTC_timestamp‿ms()) {
		/*console.log('outdated:', {
			TICK_MS,
			't_state.timestamp_ms': t_state.timestamp_ms,
			UTC_timestamp_ms: getꓽUTC_timestamp‿ms()
		})*/
		getꓽlogger().warn(`${LIB}.get_milliseconds_to_next() called on outdated state!`)
	}

	const available_energy = new Fraction(t_state.available_energy)

	if (available_energy.compare(u_state.max_energy) >= 0)
		throw new Error(`${LIB}.get_milliseconds_to_next() called with no next!`)

	const energy_refilling_rate_per_ms = get_current_energy_refilling_rate_per_ms(u_state, t_state)
	const fractional_available_energy = available_energy.mod(1)

	//console.log('fractional_available_energy', fractional_available_energy.valueOf())
	//console.log('remaining fractional_available_energy', (new Fraction(1)).sub(fractional_available_energy).valueOf())
	debugTTN(energy_refilling_rate_per_ms.valueOf())

	// time to next = (1 - frac) / refilling
	const ttn = (
		(new Fraction(1))
			.sub(fractional_available_energy)
			.div(energy_refilling_rate_per_ms)
			.round(0)
			.valueOf()
	)

	// if 0, sth is wrong
	if (ttn <= 0) {
		getꓽlogger().log('ms 0!', {
			u_state,
			t_state,
			available_energy,
			available_energy_v: available_energy.valueOf(),
			fractional_available_energy,
			fractional_available_energy_v: fractional_available_energy.valueOf(),
			energy_refilling_rate_per_ms,
			energy_refilling_rate_per_ms_v: energy_refilling_rate_per_ms.valueOf(),
			ttn,
			ttn_f: (
				(new Fraction(1))
					.sub(fractional_available_energy)
					.div(energy_refilling_rate_per_ms)
			),
		})
	}
	assert(ttn > 0, `${LIB}.get_milliseconds_to_next() should never return 0!`)

	return ttn
}

function get_human_time_to_next(u_state: Readonly<UState>, t_state: Readonly<TState>): string {
	if (t_state.timestamp_ms + TICK_MS < getꓽUTC_timestamp‿ms()) {
		getꓽlogger().warn(`${LIB}.get_human_time_to_next() called on outdated state!`)
	}

	const energy = new Fraction(t_state.available_energy)

	if (energy.compare(u_state.max_energy) >= 0)
		return ''

	const millisec_until_next = get_milliseconds_to_next(u_state, t_state)
	const sec_until_next = Math.ceil(millisec_until_next / 1000.)
	return time_to_human(sec_until_next)
}

////////////

function getꓽavailable_energy‿float(t_state: Readonly<TState>): number {
	if (t_state.timestamp_ms + TICK_MS < getꓽUTC_timestamp‿ms()) {
		getꓽlogger().warn(`${LIB}.getꓽavailable_energy‿float() called on outdated state!`)
	}

	const available_energy = new Fraction(t_state.available_energy)
	return available_energy.floor(2).valueOf()
}

function getꓽavailable_energy‿int(t_state: Readonly<TState>): number {
	if (t_state.timestamp_ms + TICK_MS < getꓽUTC_timestamp‿ms()) {
		getꓽlogger().warn(`${LIB}.getꓽavailable_energy‿int() called on outdated state!`)
	}

	return Math.floor(getꓽavailable_energy‿float(t_state))
}

////////////////////////////////////

export {
	get_current_energy_refilling_rate_per_ms,
	get_milliseconds_to_next,
	get_human_time_to_next,

	getꓽavailable_energy‿float,
	getꓽavailable_energy‿int,
}
