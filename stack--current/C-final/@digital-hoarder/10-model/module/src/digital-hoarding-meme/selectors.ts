import { assert_from } from '@monorepo-private/assert'
import type { Immutable, CompareFn } from '@monorepo-private/ts--types'
import type { Url‿str } from "@monorepo-private/ts--types--web";

import { type LineRecord, type DigitalHoardingMeme, SEGMENT__WHO_IS_WHO } from "./types.ts";

/////////////////////////////////////////////////

function getꓽheadings_path(dhm: Immutable<DigitalHoardingMeme>): string[] {
	return [
		...dhm.parent_headings,
		dhm.heading,
	]
}

function deriveꓽDigitalHoardingMeme‿line(dhm: Immutable<DigitalHoardingMeme>): string {
	const full_id__segments = getꓽheadings_path(dhm)
	let full_id = full_id__segments.join(' -- ')
	if (dhm.headingⵧfull) {
		full_id += ` "${dhm.headingⵧfull}"`
	}

	//const urlsⵧleft_to_insert = new Set<Url‿str>(dhm.urls.filter(url => !full_id__segments.includes(url)))
	let full_description = [
		dhm.description ?? '',
		//...dhm.urls.filter(url => urlsⵧleft_to_insert.has(url))
	].filter(s => !!s).join(' ')

	let result = [
		full_id,
		full_description,
	].filter(s => !!s).join(' = ')

	return result
}

function isꓽWhoIsWho(dhm: Immutable<DigitalHoardingMeme>): boolean {
	return dhm.parent_headings[0] === SEGMENT__WHO_IS_WHO
}

function hasꓽevent(dhm: Immutable<DigitalHoardingMeme>): boolean {
	return dhm.hasꓽevent !== 'no'
}

const compareꓽLineRecord: CompareFn<LineRecord> = (a, b) => {
	let result = a._source.localeCompare(b._source)
	if (result !== 0)
		return result

	return a._lineno - b._lineno
}

const compareꓽDigitalHoardingMeme: CompareFn<DigitalHoardingMeme> = (a, b) => {
	let result = 0

	// not trivial:
	// roughly alphabetical
	// BUT parent before children

	const la = deriveꓽDigitalHoardingMeme‿line(a).toLowerCase()
	const lb = deriveꓽDigitalHoardingMeme‿line(b).toLowerCase()
	assert_from({compareꓽDigitalHoardingMeme}).ensure(la !== lb, `duplicated lines should be equal (case insensitive) check input data! "${la}"`)

	const pathA = getꓽheadings_path(a).join('ⵧ').toLowerCase()
	const pathB = getꓽheadings_path(b).join('ⵧ').toLowerCase()
	if (pathA === pathB) {
		// technically allowed, we allow several definitions of the same concept, esp. when complicated
		// continue...
	}
	else {
		if (pathB.startsWith(pathA)) {
			return -1
		}
		else if (pathA.startsWith(pathB)) {
			return 1
		}
		else {
			// no common part
			return pathA.localeCompare(pathB)
		}
	}

	return la.localeCompare(lb)
}


/////////////////////////////////////////////////

export {
	compareꓽLineRecord,

	getꓽheadings_path,
	deriveꓽDigitalHoardingMeme‿line,
	compareꓽDigitalHoardingMeme,
	isꓽWhoIsWho,
	hasꓽevent,
}
