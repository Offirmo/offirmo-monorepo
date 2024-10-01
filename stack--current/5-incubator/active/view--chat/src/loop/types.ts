
import { type Step } from '../steps/index.js'

/////////////////////////////////////////////////

// what is yielded by the generator
type StepsGeneratorYield<ContentType> = Step<ContentType>

// what is eventually returned by the generator
type StepsGeneratorReturn<ContentType> = Step<ContentType> | Promise<Step<ContentType>>

// parameters of the generator.next() method
type StepsGeneratorNext<ContentType> = unknown

// all together
type StepsGenerator<ContentType> = Generator<
	StepsGeneratorYield<ContentType>,
	StepsGeneratorReturn<ContentType>,
	StepsGeneratorNext<ContentType>
>

/////////////////////////////////////////////////

export {
	type StepsGenerator,
}
