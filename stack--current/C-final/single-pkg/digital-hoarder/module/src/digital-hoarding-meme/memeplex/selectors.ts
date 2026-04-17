import { assert, assert_from } from '@monorepo-private/assert'
import type { Immutable, CompareFn } from '@monorepo-private/ts--types'

import type {DigitalHoardingMemeplex, DigitalHoardingMeme} from "../types.ts";
import type {Url‿str} from "@monorepo-private/ts--types--web";

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

	const urlsⵧleft_to_insert = new Set<Url‿str>(dhm.urls.filter(url => !full_id__segments.includes(url)))
	let full_description = [
		dhm.description ?? '',
		...dhm.urls.filter(url => urlsⵧleft_to_insert.has(url))
	].filter(s => !!s).join(' ')

	let result = [
		full_id,
		full_description,
	].filter(s => !!s).join(' = ')

	return result
}

function deriveꓽDigitalHoardingMemeplex‿lines(dhm: Immutable<DigitalHoardingMemeplex>): string[] {
	return [
		...dhm.todos.map(todo => `[ ] ${todo}`),
		...dhm.comments.map(comment => `// ${comment}`),
		...dhm.memes.map(dhm => deriveꓽDigitalHoardingMeme‿line(dhm)),
	].sort()
}

function getꓽmemesⵧroot(state: Immutable<DigitalHoardingMemeplex>): Immutable<DigitalHoardingMeme>[] {
	return state.memes.filter(dhm => dhm.parent_headings.length === 0).sort(compareꓽDigitalHoardingMeme)
}

function getꓽmemesⵧimmediate_children_of(state: Immutable<DigitalHoardingMemeplex>, parent: Immutable<DigitalHoardingMeme> | undefined): Immutable<DigitalHoardingMeme>[] {
	if (!parent) {
		return getꓽmemesⵧroot(state)
	}

	const parent_path = getꓽheadings_path(parent)
	return state.memes.filter(dhm => {
		const candidate_path = getꓽheadings_path(dhm)
		if (candidate_path.length !== (parent_path.length + 1)) return false
		return candidate_path.join(' -- ').startsWith(parent_path.join(' -- '))
	}).sort(compareꓽDigitalHoardingMeme)
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
	getꓽmemesⵧroot,
	getꓽmemesⵧimmediate_children_of,
	deriveꓽDigitalHoardingMeme‿line,
	deriveꓽDigitalHoardingMemeplex‿lines,
	compareꓽDigitalHoardingMeme,
}
