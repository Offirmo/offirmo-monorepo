
import { type Step } from '../steps/index.js'

/////////////////////////////////////////////////

type TYield<ContentType> = Step<ContentType> | Promise<Step<ContentType>>

type TReturn<ContentType> = unknown // no contract yet

type TNext<ContentType> = {
	last_step: Step<ContentType> | undefined,
	last_answer: any | undefined,
}

type StepIterator<ContentType> = Iterator<TYield<ContentType>, TReturn<ContentType>, TNext<ContentType>>

/////////////////////////////////////////////////
// helper types for implementation
type StepIteratorTNext<ContentType> = TNext<ContentType>
type StepIteratorYieldResult<ContentType> = IteratorYieldResult<TYield<ContentType>>
type StepIteratorReturnResult<ContentType> = IteratorReturnResult<TReturn<ContentType>>

export {
	type StepIteratorTNext,
	type StepIteratorYieldResult,
	type StepIteratorReturnResult,

	type StepIterator,
}
