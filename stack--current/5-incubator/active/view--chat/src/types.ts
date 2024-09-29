import { PProgress as PromiseWithProgress } from 'p-progress'

import { LIB } from './consts'

/////////////////////////////////////////////////


interface BaseStep {

}

interface SimpleMessageStep extends BaseStep {
	type: 'simple_message'

	msg: string
}

interface PerceivedLaborStep extends BaseStep {
	type: 'perceived_labor'

	msg_before?: string
	duration_ms?: number
	msg_after?: string
}

interface AskForConfirmationStep extends BaseStep {
	type: 'ask_for_confirmation'

	prompt?: string
	msg_after?: (confirmation: boolean) => string

}

interface TaskProgressStep<T = any> extends BaseStep {
	type: 'progress'

	msg_before?: string
	task_promise: Promise<T> | PromiseWithProgress<T>
	msg_after?: (success: boolean, result: T | Error) => string
}

type Step =
	| SimpleMessageStep
	| PerceivedLaborStep
	| AskForConfirmationStep
	| TaskProgressStep



/*
	type:
		| 'ask_for_choice'

	msg_main: string
	msg_details?: string
	choices?: {
		value: string
		label: string
	}[]
	validator?: (value: string) => boolean


}
 */


/////////////////////////////////////////////////

function normalize_step(step: Step) {
	try {
		if (step.type === 'ask_for_confirmation' && step !== STEP_CONFIRM)
			step = Object.assign(
				{},
				STEP_CONFIRM,
				step,
			)

		if (!step.msg_main)
			throw new Error(`${LIB}: Step is missing main message!`)

		if (!step.type) {
			if (!step.choices)
				throw new Error(`${LIB}: Step type is unknown and not inferrable!`)

			step.type = 'ask_for_choice'
		}

		step = Object.assign(
			{
				validator: null,
				choices: [],
			},
			step,
		)

		step.choices = step.choices.map(normalize_choice)

		if (step.choices.length) {
			const known_values = new Set()
			step.choices.forEach((choice, index) => {
				if (known_values.has(choice.value)) {
					const err = new Error(`${LIB}: colliding choices with the same value!`)
					err.details = {
						choice,
						value: choice.value,
						index,
					}
					throw err
				}
				known_values.add(choice.value)
			})
		}


		return step
	}
	catch (e) {
		console.error(to_prettified_str(step))
		throw e
	}
}

function normalize_choice(choice) {
	// TODO auto-id
	try {
		if (!choice.hasOwnProperty('value') || typeof choice.value === 'undefined')
			throw new Error('Choice has no value!')
		choice.msg_cta = choice.msg_cta || String(choice.value)
		return choice
	}
	catch (e) {
		console.error(to_prettified_str(choice))
		throw e
	}
}

/////////////////////////////////////////////////

export {
	Step,
}
