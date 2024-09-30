import { type Step, StepType } from '../types/types.js'
import { type StepsGenerator } from '../loop/types.js'
import Deferred from '@offirmo/deferred'

export default function* get_next_step(skip_to_index: number = 0) {
	console.log('get_next_step()', { skip_to_index })

	const state = {
		mode: 'main',
		name: undefined,
		city: undefined,
	}

	const warmup_promise = new Deferred<void>()
	setTimeout(() => warmup_promise.reject(new Error('Failed!')), 3000)

	const STEPS: Array<Step<string>> = [

		{
			type: StepType.perceived_labor,

			msg_before: 'Waking up...',
			duration_ms: 2000,
			msg_after: 'Awoken!',
		},

		{
			type: StepType.progress,

			msg_before: 'Warming up...',
			promise: warmup_promise,
			msg_after: success => success ? '✔ Ready!' : '❌ Warm up unsuccessful.',

			callback: success => console.log(`[callback called: ${success}]`),
		},

		{
			type: StepType.simple_message,
			msg: 'Welcome. I’ll have a few questions…',
		},

		/*
		{
			type: 'ask_for_string',
			msg_main: 'What’s your name?',
			//validator: null, // TODO
			msgg_as_user: value => `My name is "${value}".`,
			msgg_acknowledge: name => `Thanks for the answer, ${name}!`,
			callback: value => { state.name = value },
		},
		{
			type: 'ask_for_string',
			msg_main: 'What city do you live in?',
			msgg_as_user: value => `I live in "${value}".`,
			msgg_acknowledge: value => `${value}, a fine city indeed!`,
			callback: value => { state.city = value },
		},
		*/

		{
			type: StepType.simple_message,
			msg: 'Please wait for a moment...',
		},
		{
			type: StepType.perceived_labor,
			msg_before: 'Calling server...',
			duration_ms: 1000,
		},
		/*
		{
			msg_main: 'Please choose between 1 and 2?',
			callback: value => { state.mode = value },
			choices: [
				{
					msg_cta: 'Choice 1',
					value: 1,
				},
				{
					msg_cta: 'Choice 2',
					value: 2,
				},
			],
		},*/
		{
			type: StepType.simple_message,
			msg: 'Thanks, good bye.',
		},
	]

	yield* STEPS.slice(skip_to_index)
}
