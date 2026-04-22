import { assert, assert_from } from '@monorepo-private/assert'
import type { Immutable, CompareFn } from '@monorepo-private/ts--types'

import type {DigitalHoardingMeme} from "../digital-hoarding-meme/types.ts";
import { deriveꓽDigitalHoardingMeme‿line, compareꓽDigitalHoardingMeme, getꓽheadings_path } from '../digital-hoarding-meme/index.ts'

import type { DigitalHoardingMemeplex } from "./types.ts";

/////////////////////////////////////////////////

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

/////////////////////////////////////////////////

export {
	getꓽmemesⵧroot,
	getꓽmemesⵧimmediate_children_of,
	deriveꓽDigitalHoardingMemeplex‿lines,
}
