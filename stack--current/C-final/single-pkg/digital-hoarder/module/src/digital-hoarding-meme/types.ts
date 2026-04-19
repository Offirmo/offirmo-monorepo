import type {Url‿str} from "@monorepo-private/ts--types--web";
import type { LineNumber } from '@monorepo-private/ts--types'

/////////////////////////////////////////////////

interface LineRecord {
	_lineno: LineNumber
	_raw: string
	_source: string // cleaned up: unicode, white spaces, trim...
}

interface DigitalHoardingMeme extends LineRecord {

	// "heading" as in an index
	heading: string // NOT unique: repetitions allowed
	parent_headings: string[] // may be empty

	// both or none. .heading is the preferred form, must equal one of those, usually "shortened"
	headingⵧshortened?: string
	headingⵧfull?: string

	description: string | undefined

	// XXX what is that? why?
	//urls: Array<Url‿str> // order is important
}

/////////////////////////////////////////////////

export {
	type LineRecord,
	type DigitalHoardingMeme,
}
