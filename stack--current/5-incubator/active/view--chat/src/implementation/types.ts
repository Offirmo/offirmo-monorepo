import { Enum } from 'typescript-string-enums'
import { PProgress as PromiseWithProgress } from 'p-progress'
import { type Immutable } from '@offirmo-private/ts-types'

import { type TaskProgressStep } from '../types/types.js'

/////////////////////////////////////////////////

// primitives should always accept string = common lowest denominator
// up to it to convert to rich text if needed
interface ChatPrimitives<ContentType> {
	setup(): Promise<void>

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

	//read_answer(step) TODO clarify

	display_task(p: {
		msg_before: TaskProgressStep<ContentType>['msg_before'],
		promise: TaskProgressStep<ContentType>['promise'],
		msg_after: TaskProgressStep<ContentType>['msg_after'],
	}): Promise<void>

	// while we wait for the next step.
	// wraps the promise, should return it
	// TODO clarify
	spin_until_resolution<T>(p: { promise: Promise<T> }): Promise<T>

	// if cleanup is needed
	teardown(): Promise<void>
}

/////////////////////////////////////////////////

export {
	type ChatPrimitives,
}
