import { Enum } from 'typescript-string-enums'
import { PProgress as PromiseWithProgress } from 'p-progress'
import type { Immutable } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

export const StepType = Enum(
	// output
	'simple_message',
	//'perceived_labor'  NO! trivial to emulate with "progress"
	'progress',

	// input
	'input',
	'select',
)
export type StepType = Enum<typeof StepType> // eslint-disable-line no-redeclare

/////////////////////////////////////////////////
// Concepts:
// - steps can be generated one by one
// - steps can be generated and yielded in batches (simpler)
// For those reasons:
// - funcs as much as possible, to allow dynamic content while still batch, but only when it's convenient
// - funcs are called as late as possible, only when needed
// - if funcs are not enough, use dynamic step generator
// For the same reason, we don't make everything async. The generator allows async, use an async generator if needed.


interface BaseStep {

	// always a callback after the step is done, even for a trivial one
	// for ex. a notification system may want to mark a notif as "read" after it has been displayed
	// async to remind it's an unknown effect
	callback?: (...p: any[]) => Promise<void>

	// private use area for the client
	// for ex. the client may need to link this step to what caused it (ex. engagement)
	// or may need to store some temp status data (ex. ?)
	_client_temp?: { [k:string]: any }
}

interface SimpleMessageStep<ContentType> extends BaseStep {
	type: typeof StepType.simple_message
	callback?: () => Promise<void> // override

	msg: () => ContentType | string
}

interface TaskProgressStep<ContentType, T = any> extends BaseStep {
	type: typeof StepType.progress
	callback?: (success: boolean, result: T | Error) => Promise<void> // override

	msg_before?: () => ContentType | string
	promises: Array< // array bc common occurrence to have several task aggregated AND some UI may offer a better UX for multi-progress
		| Promise<T> | PromiseWithProgress<T>
		| (() => Promise<T> | PromiseWithProgress<T>) // mainly to allow illusion of labor ;)
		| undefined | null // will be filtered out. allowance for complex scenarios
	>
	msg_after?: (success: boolean, result: T | Error) => ContentType | string
}

// inspired by <input> https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
// TODO cancel / no choice
interface InputStep<ContentType, T = any> extends BaseStep {
	type: typeof StepType.input
	callback?: (value: T) => Promise<void> // override

	prompt: () => ContentType | string
	input_type?: // hint to use for HTML input, primitive is free to use or ignore https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
		| 'text'
		| 'checkbox' // = confirmation
		// TODO more types!
	placeholder?: () => ContentType | string // may be useful in input, but primitive is free to ignore it https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder
	default_value?: () => T
	normalizer?: (raw: any) => T // raw is most likely string
	validators: Array<(value: T) => Promise<[ boolean, ContentType | string ]>> // Promise so that can use server, ex. check if name already taken

	msg_as_user?: (value: T) => ContentType | string
	msg_acknowledge?: (value: T) => ContentType | string
}

// inspired by <select> https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
// TODO one day multiple options
// TODO cancel / no choice
interface SelectStep<ContentType, T = any> extends BaseStep {
	type: typeof StepType.select
	callback?: (value: T) => Promise<void> // override

	prompt?: () => ContentType | string // optional bc. can be auto-generated
	default_value?: () => T
	options: {
		// Choices should be displayed following key insertion order.
		// key will be used as display if none provided.
		[key: string]: {
			value?: T, // if no value, will return the key
			cta?: ContentType | string // if no CTA, will use the key
			callback?: (value: T) => Promise<void> // optional dedicated callback
		}
	}

	msg_as_user?: (value: T) => ContentType | string
	msg_acknowledge?: (value: T) => ContentType | string
}


type Step<ContentType> =
	| SimpleMessageStep<ContentType>
	| TaskProgressStep<ContentType>
	| InputStep<ContentType>
	| SelectStep<ContentType>

/////////////////////////////////////////////////

export {
	type SimpleMessageStep,
	type TaskProgressStep,
	type InputStep,
	type SelectStep,
	type Step,

	// for convenience
	PromiseWithProgress,
}
