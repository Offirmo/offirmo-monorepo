import is_promise from 'is-promise'
import { type Immutable } from '@offirmo-private/ts-types'

import { type ChatPrimitives } from '../implementation/types.js'
import { type Step } from '../types/index.js'
import { create_dummy_progress_promise } from '../utils/index.js'
import { StepsGenerator } from './types.js'

/////////////////////////////////////////////////

interface Options<ContentType> {
	DEBUG: boolean
	gen_next_step: StepsGenerator<ContentType>
	primitives: ChatPrimitives<ContentType>
	//inter_msg_delay_ms: number
	//after_input_delay_ms: number
	//to_prettified_str: (x: any) => string
}

function create<ContentType>({
	DEBUG,
	gen_next_step,
	primitives,
	//inter_msg_delay_ms = 0,
	//after_input_delay_ms = 0,
	//to_prettified_str = x => x, // work with browser
}: Options<ContentType>) {
	if (DEBUG) console.log('↘ chat_loop.create()')

	async function start() {
		if (DEBUG) console.log('↘ chat_loop.start()')

		try {
			await primitives.setup()

			let should_exit = false
			let last_step = undefined // just in case
			let last_answer = undefined // just in case
			do {
				const step_start_timestamp_ms = +new Date()
				const raw_yielded_step = gen_next_step.next({last_step, last_answer})
				console.log('raw_yielded_step', raw_yielded_step)

				// TODO can be a promise?
				const yielded_step: any = is_promise(raw_yielded_step)
					? await primitives.spin_until_resolution(raw_yielded_step as any)
					: raw_yielded_step
				console.log('yielded_step', yielded_step)

				const { value: raw_step, done } = yielded_step
				if (done) {
					should_exit = true
					continue
				}

				console.log('about to execute step', raw_step)
				throw new Error(`NIMP!`)

				/*
				const step = normalize_step(raw_step)
				const elapsed_time_ms = (+new Date()) - step_start_timestamp_ms
				if (is_step_input(last_step)) {
					// pretend to have processed the user answer
					await primitives.pretend_to_think(Math.max(0, after_input_delay_ms - elapsed_time_ms))
				}

				last_answer = await execute_step(step)
				last_step = step
				*/
			} while (!should_exit)
		}
		catch (err) {
			if (DEBUG) console.error('chat_loop encountered error:', err)
			throw err
		}
		finally {
			await primitives.teardown()
		}
	}
/*
	async function ask_user(step) {
		if (DEBUG) console.log('↘ ask_user(\n', to_prettified_str(step, {outline: true}), '\n)')

		let answer = ''
		const ok = true // TODO used for confirmation
		do {
			await primitives.display_message({msg: step.msg_main, choices: step.choices})
			answer = await primitives.read_answer(step)
			if (DEBUG) console.log(`↖ ask_user(…) answer = "${answer}"`)
		} while (!ok)
		await primitives.pretend_to_think(after_input_delay_ms)

		let acknowledged = false
		if (step.choices.length) {
			const selected_choice = step.choices.find(choice => choice.value === answer)
			if (selected_choice.msgg_acknowledge) {
				await primitives.display_message({msg: selected_choice.msgg_acknowledge(answer)})
				acknowledged = true
			}
		}
		if (!acknowledged && step.msgg_acknowledge) {
			await primitives.display_message({msg: step.msgg_acknowledge(answer)})
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
				await primitives.pretend_to_think(inter_msg_delay_ms)
				await primitives.display_message({ msg: step.msg_main })
				break

			case 'progress':
				await primitives.display_progress({
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
				await primitives.pretend_to_think(inter_msg_delay_ms)
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

 */
	return {
		start,
	}
}

/////////////////////////////////////////////////

export {
	create,
}
