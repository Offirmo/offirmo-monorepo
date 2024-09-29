import { Enum } from 'typescript-string-enums'
import { PProgress as PromiseWithProgress } from 'p-progress'
import { type Immutable } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

interface ChatPrimitives<ContentType> {
	setup(): Promise<void>

	// core primitives
	display_message(p: {msg: ContentType, choices?: ContentType[]}): Promise<void>

	// a staple of chat interfaces
	// to be used between steps
	pretend_to_think(p: {duration_ms: number}): Promise<void>

	pretend_to_work(p: {
		msg_before: ContentType,
		duration_ms: number,
		msg_after: ContentType,
	}): Promise<void>

	//read_answer(step) TODO clarify

	display_task(p: {
		msg_before: ContentType,
		progress_promise: PromiseWithProgress<any>,
		msg_after: ContentType,
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
