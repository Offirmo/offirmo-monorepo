import is_promise from 'is-promise'
import { type Immutable } from '@offirmo-private/ts-types'
import assert from 'tiny-invariant'

import { type ChatPrimitives } from '../primitives/types.js'
import { type Step, StepType, type TaskProgressStep } from '../steps/index.js'
import { type StepIterator } from './types.js'
import { create_dummy_progress_promise } from '../utils/index.js'

/////////////////////////////////////////////////

interface Options<ContentType> {
	gen_next_step: StepIterator<ContentType>
	primitives: ChatPrimitives<ContentType>

	// TODO review! merge?
	//inter_msg_delay_ms?: number // standard time between steps
	after_input_delay_ms?: number // time we should pretend to process the user input

	DEBUG?: boolean
	DEBUG_to_prettified_str?: (x: any) => any
}

const LIB = 'chat_loop'

// TODO one day expose state for React
// state = err | step | answer | progress...

function create<ContentType>({
	gen_next_step,
	primitives,
	//inter_msg_delay_ms = 0,
	after_input_delay_ms = 0, // TODO better defaults
	DEBUG = false,
	DEBUG_to_prettified_str = (x: any) => x, // work with browser
}: Options<ContentType>) {
	if (DEBUG) console.log(`↘ ${LIB}.create()`)
	let stepsᐧcount_for_avoiding_infinite_loops = 0

	async function start() {
		if (DEBUG) console.log(`↘ ${LIB}.start()`)

		try {
			await primitives.setup()

			let should_exit = false
			let last_step = undefined
			let last_answer = undefined

			do {
				const step_start_timestamp_ms = +new Date()
				const raw_yielded = gen_next_step.next({last_step, last_answer})
				//console.log(`[${LIB}]`, raw_yielded)
				const { value: raw_yielded_step, done } = raw_yielded
				if (done) {
					should_exit = true
					continue
				}

				const step: Step<ContentType> = is_promise(raw_yielded_step)
					? (await primitives.spin_until_resolution(raw_yielded_step)) // TODO if previous step was pretend_to_think, we should continue?
					: raw_yielded_step
				//console.log(`[${LIB}]`, {yielded_step: step})

				// TODO process the separation with the previous step
				const elapsed_time_ms = (+new Date()) - step_start_timestamp_ms
				/*
				await primitives.pretend_to_think(inter_msg_delay_ms)
				if (is_step_input(last_step)) {
					// pretend to have processed the user answer
					await primitives.pretend_to_think(Math.max(0, after_input_delay_ms - elapsed_time_ms))
				}
				*/

				//console.log(`[${LIB}] about to execute step`, step)
				const answer = await execute_step(step)

				last_answer = answer
				last_step = step
			} while (!should_exit)
		}
		catch (err) {
			if (DEBUG) console.error(`[${LIB}] encountered error:`, err)
			throw err
		}
		finally {
			await primitives.teardown()
		}
	}

	async function execute_step(step: Step<ContentType>) {
		if (DEBUG) console.log('↘ ${LIB}.execute_step(', DEBUG_to_prettified_str(step), ')')
		stepsᐧcount_for_avoiding_infinite_loops++
		if (stepsᐧcount_for_avoiding_infinite_loops > 10) {
			throw new Error('Too many steps, exiting to avoid infinite loop!')
		}


		//const step = normalize_step(raw_step)

		switch (step.type) {

			case StepType.simple_message:
				await primitives.display_message({ msg: step.msg })
				step.callback?.()
				break

			case StepType.perceived_labor: {
				// we pretend there is a task, so let's use a fake task
				const task_step: TaskProgressStep<ContentType, void> = {
					type: StepType.progress,
					promise: create_dummy_progress_promise({
						DURATION_MS: step.duration_ms || 1200, // 200ms = minimum time to be perceived as work
					}),
				}
				return execute_step(task_step)
			}

			case StepType.progress: {
				let result: any = undefined
				let error: Error | undefined = undefined
				let success = false
				step.promise.then(
					(_res) => {
						success = true
						result = _res
					},
					(_err) => {
						success = false
						error = _err as any // TODO one day coerce to error using error utils
					})

				await primitives.display_task({
						msg_before: step.msg_before || 'Processing…',
						promise: step.promise,
						msg_after: step.msg_after || ((success: boolean, result: any) => {
							if (success)
								return '✔ Success'
							else
								return `✖ Failed ("${result?.message}")`
						}),
					})

				step.callback?.(success, result || error)
				break
			}

			case StepType.input: {
				stepsᐧcount_for_avoiding_infinite_loops = 0 // all good, user can stop if they want
				let answer: any = ''
				let is_valid: boolean = false // so far

				do {
					// not printing the prompt
					// since the underlying input primitive is better suited to do it
					const raw_answer = await primitives.input(step)
					if (DEBUG) console.log(`↖ input(…) result =`, DEBUG_to_prettified_str(raw_answer))

					answer = step.normalizer ? step.normalizer(raw_answer) : raw_answer
					const validations = step.validators.map(validator => validator(answer))
					is_valid = validations.every(([is_valid]) => is_valid)
					if (!is_valid) {
						const failed_validations = validations.filter(([is_valid]) => !is_valid)
						await Promise.all(
							failed_validations
								.map(([_, msg]) => primitives.display_message({msg}))
						)
					}
				} while (!is_valid)

				let ೱcallback = Promise.resolve(step.callback?.(answer))
				let ೱfeedback = Promise.resolve(step.msg_as_user
						&& primitives.display_message({ msg: step.msg_as_user(answer) })
					)
					.then(() => primitives.pretend_to_think({duration_ms: after_input_delay_ms}))
					.then(() => step.msg_acknowledge
						&& primitives.display_message({ msg: step.msg_acknowledge(answer)}))
				await Promise.all([ೱcallback, ೱfeedback])

				break
			}

			case StepType.select: {
				stepsᐧcount_for_avoiding_infinite_loops = 0 // all good, user can stop if they want
				const keys = Object.keys(step.options)
				assert(keys.length, 'Missing options in select step!')
				if (step.default_value) {
					assert(keys.some(key => step.options[key]!.value === step.default_value), 'Default value should be one of the options!')
				}

				const chosen_value = await primitives.select({
					prompt: 'Please select an option:',
					...step
				})

				let ೱcallback = Promise.resolve(step.callback?.(chosen_value))
				let ೱfeedback = Promise.resolve(step.msg_as_user
						&& primitives.display_message({ msg: step.msg_as_user(chosen_value) })
					)
					.then(() => primitives.pretend_to_think({duration_ms: after_input_delay_ms}))
					.then(() => step.msg_acknowledge
						&& primitives.display_message({ msg: step.msg_acknowledge(chosen_value) }))
				await Promise.all([ೱcallback, ೱfeedback])

				break
			}
/*

			case 'ask_for_confirmation':
			case 'ask_for_string':
			case 'ask_for_choice': {
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
			}*/
			default:
				console.error(`Unsupported step type: "${(step as any)?.type}"!`, step)
				throw new Error(`Unsupported step type: "${(step as any)?.type}"!`)
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
*/

	return {
		start,
	}
}

/////////////////////////////////////////////////

export {
	create,
}
export * from './types.js'
