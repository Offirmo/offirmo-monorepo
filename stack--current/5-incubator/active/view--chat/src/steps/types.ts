import { Enum } from 'typescript-string-enums'
import { PProgress as PromiseWithProgress } from 'p-progress'
import { type Immutable } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

export const StepType = Enum(
	'simple_message',
	'perceived_labor',
	'ask_for_confirmation',
	'progress',
	'input',
)
export type StepType = Enum<typeof StepType> // eslint-disable-line no-redeclare

/////////////////////////////////////////////////

// TODO more async?? callbacks? everything?

interface BaseStep {
	// TODO needed?
}

interface SimpleMessageStep<ContentType> extends BaseStep {
	type: typeof StepType.simple_message

	msg: ContentType | string
}

interface PerceivedLaborStep<ContentType> extends BaseStep {
	type: typeof StepType.perceived_labor

	msg_before?: ContentType | string
	duration_ms?: number
	msg_after?: ContentType | string

	// callback?
}

interface TaskProgressStep<ContentType, T = any> extends BaseStep {
	type: typeof StepType.progress

	msg_before?: ContentType | string
	promise: Promise<T> | PromiseWithProgress<T>
	msg_after?: (success: boolean, result: T | Error) => ContentType | string

	callback?: (success: boolean, result: T | Error) => void
}

// TODO merge with input?
interface AskForConfirmationStep<ContentType> extends BaseStep {
	type: typeof StepType.ask_for_confirmation

	prompt?: string
	msg_after?: (confirmation: boolean) => ContentType | string

	callback?: (confirmation: boolean) => void
}

// inspired by <input> https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
// TODO refine
// TODO select between choices
// TODO types
interface InputStep<ContentType, T = string> extends BaseStep {
	type: typeof StepType.input

	prompt: ContentType | string
	placeholder?: ContentType | string // may be useful in input, but primitive is free to ignore it https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder
	default?: T
	normalizer?: (raw: any) => T // raw is most likely string
	validators: Array<(value: T) => [ boolean, ContentType | string ]>
	msg_as_user: (value: T) => ContentType | string
	msg_acknowledge: (value: T) => ContentType | string

	callback?: (value: T) => void
}

type Step<ContentType> =
	| SimpleMessageStep<ContentType>
	| PerceivedLaborStep<ContentType>
	| TaskProgressStep<ContentType>
	| AskForConfirmationStep<ContentType>
	| InputStep<ContentType>

/////////////////////////////////////////////////

export {
	type SimpleMessageStep,
	type PerceivedLaborStep,
	type TaskProgressStep,
	type AskForConfirmationStep,
	type InputStep,
	type Step,

	// for convenience
	PromiseWithProgress,
}
