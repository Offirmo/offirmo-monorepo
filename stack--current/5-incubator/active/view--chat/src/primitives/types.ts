import { type Immutable } from '@offirmo-private/ts-types'

import { type TaskProgressStep, type InputStep, type SelectStep } from '../steps/types.js'

/////////////////////////////////////////////////

// helper types, TypeScript need them when implementing :(
interface InputParameters<ContentType, T> {
	// everything needed for an <input>
	// primitive is free to ignore some params if not needed/supported
	prompt: ContentType | string,
	input_type?: InputStep<ContentType, T>['input_type'],
	default_value?: T,
	placeholder?: ContentType | string,
	normalizer?: (raw: any) => T // raw is most likely string,
	validators: Array<(value: T) => [ boolean, ContentType | string ]>,
}
interface SelectParameters<ContentType, T> {
	// everything needed for a <select>
	// primitive is free to ignore some params if not needed/supported
	prompt: ContentType | string
	default_value?: T
	options: {
		// Choices should be displayed following key insertion order.
		// key will be used as display if none provided.
		[key: string]: {
			value?: T,
			cta?: ContentType | string
		}
	}
}

// primitives should always accept string = common lowest denominator
// up to it to convert to rich text if needed
interface ChatPrimitives<ContentType> {

	/////////////////////////////////////////////////
	// core primitives

	display_message(p: { msg: ContentType | string }): Promise<void>

	// a staple of chat interfaces
	// to be used between steps
	pretend_to_think(p: { duration_ms: number }): Promise<void>

	display_task(p: {
		msg_before: ContentType | string,
		promises: TaskProgressStep<ContentType>['promises'],
		msg_after: NonNullable<TaskProgressStep<ContentType>['msg_after']>,
	}): Promise<void>

	// return type: some input method can't give sth else than a string (ex. terminal)
	// caller must be ready to process the result
	input<T>(p: InputParameters<ContentType, T>): Promise<T | string>

	select<T>(p: SelectParameters<ContentType, T>): Promise<T>

	// while we wait for the next step.
	// wraps the promise, should return it
	// TODO clarify should we pretend to think? or intelligently merge with a previous pretend_to_think if any?
	spin_until_resolution<T>(p: Promise<T>): Promise<T>

	/////////////////////////////////////////////////
	// technical
	// if cleanup is needed
	setup(): Promise<void>
	teardown(): Promise<void>
}

/////////////////////////////////////////////////

export {
	type InputParameters,
	type SelectParameters,

	type ChatPrimitives,
}
