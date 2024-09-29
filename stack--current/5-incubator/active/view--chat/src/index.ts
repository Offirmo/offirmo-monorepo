import is_promise from 'is-promise'
import { type Immutable } from '@offirmo-private/ts-types'

import { LIB } from './consts.js'
import { type Step } from './types.js'
import { create_dummy_progress_promise } from './utils.js'

/////////////////////////////////////////////////


function is_step_input(step: Immutable<Step>): boolean {
	return step && step.type.startsWith('ask_')
}

function create({
	DEBUG,
	gen_next_step,
	ui,
	inter_msg_delay_ms = 0,
	after_input_delay_ms = 0,
	to_prettified_str = x => x, // work with browser
}) {
	if (DEBUG) console.log('↘ create()')


	async function ask_user(step) {
		if (DEBUG) console.log('↘ ask_user(\n', to_prettified_str(step, {outline: true}), '\n)')

		let answer = ''
		const ok = true // TODO used for confirmation
		do {
			await ui.display_message({msg: step.msg_main, choices: step.choices})
			answer = await ui.read_answer(step)
			if (DEBUG) console.log(`↖ ask_user(…) answer = "${answer}"`)
		} while (!ok)
		await ui.pretend_to_think(after_input_delay_ms)

		let acknowledged = false
		if (step.choices.length) {
			const selected_choice = step.choices.find(choice => choice.value === answer)
			if (selected_choice.msgg_acknowledge) {
				await ui.display_message({msg: selected_choice.msgg_acknowledge(answer)})
				acknowledged = true
			}
		}
		if (!acknowledged && step.msgg_acknowledge) {
			await ui.display_message({msg: step.msgg_acknowledge(answer)})
			acknowledged = true
		}
		if (!acknowledged) {
			// Fine! It's optional.
			if (DEBUG) console.warn('You may want to add an acknowledge message to this step.')
		}

		return answer
	}

	async function execute_step(step) {
		if (DEBUG) console.log('↘ execute_step(\n', to_prettified_str(step, {outline: true}), '\n)')

		switch (step.type) {
			case 'simple_message':
				await ui.pretend_to_think(inter_msg_delay_ms)
				await ui.display_message({ msg: step.msg_main })
				break

			case 'progress':
				await ui.display_progress({
					progress_promise: step.progress_promise
							|| create_dummy_progress_promise({ DURATION_MS: step.duration_ms }),
					msg: step.msg_main,
					msgg_acknowledge: step.msgg_acknowledge,
				})
					.then(() => true, () => false)
					.then(success => {
						if (step.callback)
							step.callback(success)
					})
				break

			case 'ask_for_confirmation':
			case 'ask_for_string':
			case 'ask_for_choice': {
				await ui.pretend_to_think(inter_msg_delay_ms)
				const answer = await ask_user(step)

				let reported = false
				if (step.choices.length) {
					const selected_choice = step.choices.find(choice => choice.value === answer)
					if (selected_choice.callback) {
						await selected_choice.callback(answer)
						reported = true
					}
				}
				if (!reported && step.callback) {
					await step.callback(answer)
					reported = true
				}
				if (!reported) {
					const err = new Error('CNF reporting callback in ask for result!')
					err.step = step
					throw err
				}
				return answer
			}
			default:
				throw new Error(`Unsupported step type: "${step.type}"!`)
		}
	}

	async function start() {
		if (DEBUG) console.log('↘ start()')
		try {
			await ui.setup()
			let should_exit = false
			let last_step = undefined // just in case
			let last_answer = undefined // just in case
			do {
				const step_start_timestamp_ms = +new Date()
				const yielded_step = gen_next_step.next({last_step, last_answer})

				// just in case the returned step is a promise.
				const {value: raw_step, done} = is_promise(yielded_step)
					? await ui.spin_until_resolution(yielded_step)
					: yielded_step

				if (done) {
					should_exit = true
					continue
				}

				const step = normalize_step(raw_step)
				const elapsed_time_ms = (+new Date()) - step_start_timestamp_ms
				if (is_step_input(last_step)) {
					// pretend to have processed the user answer
					await ui.pretend_to_think(Math.max(0, after_input_delay_ms - elapsed_time_ms))
				}

				last_answer = await execute_step(step)
				last_step = step
			} while (!should_exit)
			await ui.teardown()
		}
		catch (e) {
			await ui.teardown()
			throw e
		}
	}

	return {
		start,
	}
}

/////////////////////////////////////////////////

export {
	PromiseWithProgress,
	create,
}
