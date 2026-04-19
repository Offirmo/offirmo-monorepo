import type { DigitalHoardingMeme } from '../digital-hoarding-meme/types.ts'

/////////////////////////////////////////////////

interface DigitalHoardingMemeplex {
	comments: string[]
	todos: string[]

	memes: DigitalHoardingMeme[]

	// TODO clarify
	abbreviations: Record<string, string>
}

/////////////////////////////////////////////////

export {
	type DigitalHoardingMemeplex,
}
