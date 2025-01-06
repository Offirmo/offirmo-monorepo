import { PProgress as PromiseWithProgress } from 'p-progress'

import {
	type TaskProgressStep,
	type InputStep,
} from '../steps/types.js'

/////////////////////////////////////////////////

interface UIPrimitives<RichTextType> {



}


// helper types, TypeScript need them when implementing :(
interface InputParameters<RichTextType, T> {
	// everything needed for an <input>
	// fully resolved (vs. step which has funcs for resolving)
	// Note: the primitive is free to ignore some params if not needed/supported
	prompt: RichTextType | string,
	input_type?: InputStep<RichTextType, T>['input_type'],
	default_value?: T,
	placeholder?: RichTextType | string,
	normalizer?: InputStep<RichTextType, T>['normalizer']
	validators: InputStep<RichTextType, T>['validators']
}
interface SelectParameters<RichTextType, T> {
	// everything needed for a <select>
	// fully resolved (vs. step which has funcs for resolving)
	// Note: the primitive is free to ignore some params if not needed/supported
	prompt: RichTextType | string
	default_value?: T
	options: {
		// Choices should be displayed following key insertion order.
		// key will be used as display if none provided.
		[key: string]: {
			value?: T,
			cta?: RichTextType | string
		}
	}
}

// primitives should always accept string = common lowest denominator
// up to it to convert to rich text if needed
interface ChatPrimitives<RichTextType> extends UIPrimitives<RichTextType> {

	/////////////////////////////////////////////////
	// core primitives

	display_message(p: { msg: RichTextType | string }): Promise<void>

	// a staple of chat interfaces
	// to be used between steps
	pretend_to_think(p: { duration_ms: number }): Promise<void>

	display_task<T>(p: {
		msg_before: RichTextType | string,
		promises: Array< // array bc common occurrence to have several task aggregated AND some UI may offer a better UX for multi-progress
			| Promise<T> | PromiseWithProgress<T>
			>,
		msg_after: NonNullable<TaskProgressStep<RichTextType>['msg_after']>,
	}): Promise<void>

	// return type: some input method can't give sth else than a string (ex. terminal)
	// caller must be ready to process the result
	input<T>(p: InputParameters<RichTextType, T>): Promise<T | string>

	select<T>(p: SelectParameters<RichTextType, T>): Promise<T>

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
