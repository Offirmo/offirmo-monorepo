/** inspired from https://github.com/andersonba/yve-bot/blob/master/examples/chat.yaml
 */

import * as RichText from '@offirmo-private/rich-text-format'

import {
	type Step,
	StepType,
	getꓽInputStepⵧnonEmptyString,
	getꓽInputStepⵧconfirmation,
	create_dummy_progress_promise,
} from '../index.js'

/////////////////////////////////////////////////

type ContentType = string | RichText.Document

/////////////////////////////////////////////////

function* get_next_step(skip_to_index: number = 0): Generator<Step<string>> {
	console.log('get_next_step()', { skip_to_index })

	const state = {
		name: undefined as string | undefined,
		city: undefined as string | undefined,
	}

	const STEPS: Array<Step<string>> = [

		{
			type: StepType.simple_message,
			msg: () => 'Hello! I\'m Yve Bot.',
		},

		getꓽInputStepⵧnonEmptyString<string>({
			prompt: () => 'What’s your name?',
			msg_acknowledge: (name: string) => `Thanks for the answer, ${name}!`,
			callback: async (name: string) => {
				console.log(`【callback called: ${name}】`)
				state.name = name
			},
		}, {
			lengthⵧmin: 4,
			multiline: false,
		}),

		getꓽInputStepⵧnonEmptyString<string>({
			prompt: () => 'What city do you live in?',
			callback: async (city: string) => {
				console.log(`【callback called: ${city}】`)
				state.city = city
			},
		}, {
			multiline: false,
		}),

		{
			type: StepType.simple_message,
			msg: () => 'I\'ll skip this message',
			//skip: true
		},

		{
			type: StepType.progress,

			msg_before: () => 'Thanks, wait a moment.',
			promises: [ () => create_dummy_progress_promise({DURATION_MS: 4000})],
		},

		{
			type: StepType.select,
			prompt: () => 'Make your choice',
			options: {
				1: {
					//value: 1,
					cta: 'Button 1',
				},
				2: {
					//value: 2,
					cta: 'Button 2',
				}
			},
			msg_acknowledge: (choice: string) => `Okay! You chose the button ${choice}`,
		},

		{
			type: StepType.select,
			prompt: () => 'Which colors do you like?',
			//type: MultipleChoice TODO!
			options: {
				blue: {},
				red: {},
				black: {},
				green: {},
				purple: {},
				yellow: {},
				gray: {},
			},
			msg_acknowledge: (choice: string) => `Cool colors!`,
		},

		/* Could implement it but would need a full class
- message: What you want to do?
	type: SingleChoice
	options:
- label: Restart
next: name
- label: Quit
*/
		{
			type: StepType.simple_message,
			msg: () => `Bye, ${state.name} from ${state.city}!`,
		},
	]

	yield* STEPS.slice(skip_to_index)
}


/////////////////////////////////////////////////

export default get_next_step
