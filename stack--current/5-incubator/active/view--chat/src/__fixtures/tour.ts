import Deferred from '@offirmo/deferred'

import { type Step, StepType } from '../steps/types.js'
import { getꓽInputStepⵧnonEmptyString, getꓽInputStepⵧconfirmation } from '../steps/bases.js'

import { type StepsGenerator } from '../loop/types.js'


export default function* get_next_step(skip_to_index: number = 0) {
	console.log('get_next_step()', { skip_to_index })

	const state = {
		mode: 'main',
		name: undefined as string | undefined,
		city: undefined as string | undefined,
	}

	const warmup_promise = new Deferred<void>()
	setTimeout(() => warmup_promise.reject(new Error('Failed!')), 1000)

	const STEPS: Array<Step<string>> = [

		{
			type: StepType.perceived_labor,

			msg_before: 'Waking up...',
			duration_ms: 500,
			msg_after: 'Awoken!',
		},

		/*{
			type: StepType.progress,

			msg_before: 'Dialing home...',
			promise: warmup_promise,
			msg_after: success => success ? '✔ Ready!' : ' ✖ Dial up unsuccessful.',

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
		}),*/

		getꓽInputStepⵧconfirmation<string>({
			callback: confirmed => console.log(`[callback called: `, confirmed ? '✔ confirmed' : ' ✖ not confirmed'),
		}),

		{
			type: StepType.simple_message,
			msg: 'Please wait for a moment...',
		},
		{
			type: StepType.perceived_labor,
			msg_before: 'Calling server...',
			duration_ms: 500,
		},
		{
			type: StepType.simple_message,
			msg: 'Thanks, good bye.',
		},
	]

	yield* STEPS.slice(skip_to_index)
}
