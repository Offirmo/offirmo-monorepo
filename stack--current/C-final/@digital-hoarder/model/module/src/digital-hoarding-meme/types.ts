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
	// TODO group?
	headingⵧshortened?: string
	headingⵧfull?: string

	description: string | undefined

	hasꓽevent: // to more easily fish them out
		| 'no'
		| 'pure'
		| 'side'

	//url_canonical?: Url‿str // when there is a clear one. should be appended to the description. (TODO review this?) NO can be dynamically extracted later!
	// XXX what is that? why?
	//urls: Array<Url‿str> // order is important
}

/////////////////////////////////////////////////

export {
	type LineRecord,
	type DigitalHoardingMeme,
}
