import type {Url‿str} from "@monorepo-private/ts--types--web";

/////////////////////////////////////////////////

interface LineRecord {
	_source: string // NOT raw but cleaned up: unicode, white spaces, trim...
	_lineno: number // 1+ or NaN
}

interface DigitalHoardingMeme extends LineRecord {

	// "heading" as in an index
	heading: string // NOT unique, repetitions allowed
	parent_headings: string[] // may be empty

	// both or none. .heading is the preferred form, must equal one of those
	headingⵧshortened?: string
	headingⵧfull?: string

	description: string | undefined
	urls: Array<Url‿str> // order is important
}

/////////////////////////////////////////////////

interface DigitalHoardingMemeplex {
	comments: string[]
	todos: string[]

	memes: DigitalHoardingMeme[]

	abbreviations: Map<string, string>
}

/////////////////////////////////////////////////

export {
	type LineRecord,
	type DigitalHoardingMeme,
	type DigitalHoardingMemeplex,
}
