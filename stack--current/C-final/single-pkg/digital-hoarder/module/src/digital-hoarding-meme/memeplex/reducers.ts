import { assert, assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import type {DigitalHoardingMemeplex, DigitalHoardingMeme} from "../types.ts";

/////////////////////////////////////////////////

function create(): Immutable<DigitalHoardingMemeplex> {
	return {
		comments: [],
		todos: [],
		memes: [],
		abbreviations: new Map<string, string>(),
	}
}

function addꓽcomment(state: Immutable<DigitalHoardingMemeplex>, line: string): Immutable<DigitalHoardingMemeplex> {
	if (line.startsWith('//')) {
		line = line.slice(2).trim()
	}

	return {
		...state,
		comments: [...state.comments, line].sort(),
	}
}

function addꓽtodo(state: Immutable<DigitalHoardingMemeplex>, line: string): Immutable<DigitalHoardingMemeplex> {
	if (line.startsWith('[ ]')) {
		line = line.slice(3).trim()
	}

	return {
		...state,
		todos: [...state.todos, line].sort(),
	}
}

function addꓽmeme(state: Immutable<DigitalHoardingMemeplex>, dhm: Immutable<DigitalHoardingMeme>): Immutable<DigitalHoardingMemeplex> {
	const ǃ = assert_from({addꓽmeme})

	let { abbreviations } = state
	if (dhm.headingⵧshortened) {
		ǃ.forⵧparam({dhm}).require(!!dhm.headingⵧfull, `internal abbrevation error`)
		if (state.abbreviations.has(dhm.headingⵧshortened)) {
			ǃ.forⵧparam({dhm}).require(state.abbreviations.get(dhm.headingⵧshortened) === dhm.headingⵧfull, `conflicting abbreviations: ${dhm.headingⵧshortened}=>${state.abbreviations.get(dhm.headingⵧshortened)} vs. ${dhm.headingⵧfull}`)
		}
		else {
			abbreviations = new Map<string, string>(state.abbreviations);
			abbreviations.set(dhm.headingⵧshortened, dhm.headingⵧfull!)
		}
	}

	return {
		...state,
		memes: [...state.memes, dhm],
		abbreviations,
	}
}

/////////////////////////////////////////////////

export {
	create,
	addꓽcomment,
	addꓽtodo,
	addꓽmeme,
}
