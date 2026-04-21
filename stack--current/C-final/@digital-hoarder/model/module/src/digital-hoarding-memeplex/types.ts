import type { DigitalHoardingMeme, LineRecord } from '../digital-hoarding-meme/types.ts'

/////////////////////////////////////////////////

interface DigitalHoardingMemeplex {

	// different categories of memes
	events: DigitalHoardingMeme[] // starting with YYYY-MM-DD
	memes: DigitalHoardingMeme[]
	newsfeeds: LineRecord[] // starting with [ ] TODO could be DigitalHoardingMeme[] (later)
	comments: LineRecord[]
	todos: LineRecord[]

	// memes which have abbreviation [short ,long]
	abbreviations: Record<string, DigitalHoardingMeme>
}

/////////////////////////////////////////////////

export {
	type DigitalHoardingMemeplex,
}
