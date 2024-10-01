import { Enum } from 'typescript-string-enums'
import { PProgress as PromiseWithProgress } from 'p-progress'
import { type Immutable } from '@offirmo-private/ts-types'

import { type TaskProgressStep, type InputStep } from '../steps/types.js'

/////////////////////////////////////////////////

// helper type
interface InputParameters<ContentType, T> {
	// everything needed for an <input>
	// primitive is free to ignore some params if not needed/supported
	prompt: ContentType | string, // required to be displayed if present
	input_type?: InputStep<ContentType, T>['input_type'],
	default_value?: T,
	placeholder?: ContentType | string,
	normalizer?: (raw: any) => T // raw is most likely string,
	validators: Array<(value: T) => [ boolean, ContentType | string ]>,
}

// primitives should always accept string = common lowest denominator
// up to it to convert to rich text if needed
interface ChatPrimitives<ContentType> {

	/////////////////////////////////////////////////
	// core primitives
	display_message(p: {
		msg: ContentType | string,
		choices?: Array<ContentType | string>
	}): Promise<void>

	// a staple of chat interfaces
	// to be used between steps
	pretend_to_think(p: {duration_ms: number}): Promise<void>

	pretend_to_work(p: {
		msg_before: ContentType | string,
		duration_ms: number,
		msg_after: ContentType | string,
	}): Promise<void>

	display_task(p: {
		msg_before: ContentType | string,
		promise: TaskProgressStep<ContentType>['promise'],
		msg_after: NonNullable<TaskProgressStep<ContentType>['msg_after']>,
	}): Promise<void>

	// return type: some input method can't give sth else than a string (ex. terminal)
	// caller must be ready to process the result
	input<T>(p: InputParameters<ContentType, T>): Promise<T | string>

	// while we wait for the next step.
	// wraps the promise, should return it
	// TODO clarify
	spin_until_resolution<T>(p: { promise: Promise<T> }): Promise<T>

	/////////////////////////////////////////////////
	// technical
	// if cleanup is needed
	setup(): Promise<void>
	teardown(): Promise<void>
}

/////////////////////////////////////////////////

export {
	type InputParameters,
	type ChatPrimitives,
}
