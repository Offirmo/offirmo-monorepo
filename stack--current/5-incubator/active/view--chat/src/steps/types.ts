import { Enum } from 'typescript-string-enums'
import { PProgress as PromiseWithProgress } from 'p-progress'
import { type Immutable } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

export const StepType = Enum(
	// output
	'simple_message',
	'perceived_labor',
	'progress',

	// input
	'input',
	'select',
)
export type StepType = Enum<typeof StepType> // eslint-disable-line no-redeclare

/////////////////////////////////////////////////

// TODO more async?? callbacks? everything?

interface BaseStep {

	// always a callback after the step is done, even for a trivial one
	// for ex. a notification system may want to mark a notif as "read" after it's been displayed
	callback?: (...p: any[]) => void
}

interface SimpleMessageStep<ContentType> extends BaseStep {
	type: typeof StepType.simple_message

	msg: ContentType | string

	callback?: () => void
}

// TODO is it redundant with progress?
interface PerceivedLaborStep<ContentType> extends BaseStep {
	type: typeof StepType.perceived_labor

	msg_before?: ContentType | string
	duration_ms?: number
	msg_after?: ContentType | string

	callback?: () => void
}

interface TaskProgressStep<ContentType, T = any> extends BaseStep {
	type: typeof StepType.progress

	msg_before?: ContentType | string
	promise: Promise<T> | PromiseWithProgress<T>
	msg_after?: (success: boolean, result: T | Error) => ContentType | string

	callback?: (success: boolean, result: T | Error) => void
}

// inspired by <input> https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
// TODO cancel / no choice
interface InputStep<ContentType, T = any> extends BaseStep {
	type: typeof StepType.input

	prompt: ContentType | string
	input_type?: // hint to use for HTML input, primitive is free to use or ignore https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
		| 'text'
		| 'checkbox' // = confirmation
	placeholder?: ContentType | string // may be useful in input, but primitive is free to ignore it https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder
	default_value?: T
	normalizer?: (raw: any) => T // raw is most likely string
	validators: Array<(value: T) => [ boolean, ContentType | string ]>
	msg_as_user: (value: T) => ContentType | string
	msg_acknowledge: (value: T) => ContentType | string

	callback?: (value: T) => void
}

// inspired by <select> https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
// TODO one day multiple options
// TODO cancel / no choice
interface SelectStep<ContentType, T = any> extends BaseStep {
	type: typeof StepType.select

	prompt?: ContentType | string // optional bc. can be auto-generated
	default_value?: T
	options: {
		// Choices should be displayed following key insertion order.
		// key will be used as display if none provided.
		[key: string]: {
			value?: T, // if no value, will return the key
			cta?: ContentType | string // if no CTA, will use the key
			callback?: (value: T) => void // optional dedicated callback
		}
	}

	msg_as_user?: (value: T) => ContentType | string
	msg_acknowledge?: (value: T) => ContentType | string

	callback?: (value: T) => void
}


type Step<ContentType> =
	| SimpleMessageStep<ContentType>
	| PerceivedLaborStep<ContentType>
	| TaskProgressStep<ContentType>
	| InputStep<ContentType>
	| SelectStep<ContentType>

/////////////////////////////////////////////////

export {
	type SimpleMessageStep,
	type PerceivedLaborStep,
	type TaskProgressStep,
	type InputStep,
	type SelectStep,
	type Step,

	// for convenience
	PromiseWithProgress,
}
