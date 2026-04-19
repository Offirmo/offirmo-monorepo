import { assert_from } from '@monorepo-private/assert'
import type { Immutable, CompareFn } from '@monorepo-private/ts--types'
import type {Url‿str} from "@monorepo-private/ts--types--web";

import type { DigitalHoardingMeme } from "./types.ts";

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

const compareꓽDigitalHoardingMeme: CompareFn<DigitalHoardingMeme> = (a, b) => {
	const la = deriveꓽDigitalHoardingMeme‿line(a).toLowerCase()
	const lb = deriveꓽDigitalHoardingMeme‿line(b).toLowerCase()

	const result = la.localeCompare(lb)
	assert_from({compareꓽDigitalHoardingMeme}).forⵧvalue({result}).ensure(result !== 0, `no 2 lines should be equal (case insensitive) check input data! "${la}"`)

	return result
}

/////////////////////////////////////////////////

export {
	getꓽheadings_path,
	deriveꓽDigitalHoardingMeme‿line,
	compareꓽDigitalHoardingMeme,
}
