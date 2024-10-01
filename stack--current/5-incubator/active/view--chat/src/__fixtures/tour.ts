import Deferred from '@offirmo/deferred'

import { type Step, StepType } from '../steps/types.js'
import { getꓽInputStepⵧnonEmptyString } from '../steps/bases.js'

import { type StepsGenerator } from '../loop/types.js'

export default function* get_next_step(skip_to_index: number = 0) {
	console.log('get_next_step()', { skip_to_index })

	const state = {
		mode: 'main',
		name: undefined as string | undefined,
		city: undefined as string | undefined,
	}

	const warmup_promise = new Deferred<void>()
	setTimeout(() => warmup_promise.reject(new Error('Failed!')), 3000)

	const STEPS: Array<Step<string>> = [

		{
			type: StepType.perceived_labor,

			msg_before: 'Waking up...',
			duration_ms: 1000,
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

		getꓽInputStepⵧnonEmptyString<string>({
			prompt: 'What’s your name?',
			msg_as_user: (value: string) => `My name is "${value}".`,
			msg_acknowledge: (value: string) => `Thanks, ${value}!`,

			callback: (value: string) => {
				console.log(`[callback called: ${value}]`)
				state.name = value
			},
		}),
		/*
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
