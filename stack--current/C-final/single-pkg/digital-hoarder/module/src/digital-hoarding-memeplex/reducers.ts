import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'
import { normalizeꓽurlⵧhttpₓ } from '@monorepo-private/normalize-string'

import type {LineRecord, DigitalHoardingMeme} from "../digital-hoarding-meme/types.ts";
import * as DigitalHoardingMemeLib from "../digital-hoarding-meme/index.ts";
import type {DigitalHoardingMemeplex} from "./types.ts";
import { isꓽUrl‿str } from '../utils/index.ts'

/////////////////////////////////////////////////

function createꓽDigitalHordingMemeplex(): Immutable<DigitalHoardingMemeplex> {
	return {
		comments: [],
		todos: [],
		memes: [],
		abbreviations: {},
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
		if (state.abbreviations[dhm.headingⵧshortened]) {
			ǃ.forⵧparam({dhm}).require(state.abbreviations[dhm.headingⵧshortened] === dhm.headingⵧfull, `conflicting abbreviations: ${dhm.headingⵧshortened}=>${state.abbreviations[dhm.headingⵧshortened]} vs. ${dhm.headingⵧfull}`)
		}
		else {
			abbreviations = {
				...state.abbreviations,
				[dhm.headingⵧshortened]: dhm.headingⵧfull!,
			}
		}
	}

	return {
		...state,
		memes: [...state.memes, dhm],
		abbreviations,
	}
}

function createꓽDigitalHordingMemeplexⵧfrom_mm_txt(mm_txt: string): DigitalHoardingMemeplex {
	const ǃ = assert_from({createꓽDigitalHordingMemeplex})

	const lines‿LineRecord = DigitalHoardingMemeLib.createꓽLineRecords(mm_txt)

	return lines‿LineRecord.reduce((state, line_record: LineRecord) => {
		const line = line_record._source

		/*if (line._lineno === 460) {
		debugger
		}*/

		if (line.startsWith('//')) {
			return addꓽcomment(state, line)
		}

		if (line.startsWith('[ ]')) {
			return addꓽtodo(state, line)
		}
		if (line.startsWith('http')) {
			return addꓽtodo(state, line)
		}
		if (line.startsWith('+++')) {
			// TODO refactor
			return addꓽtodo(state, line)
		}

		const dhm: DigitalHoardingMeme = {
			...line_record,
			parent_headings: [], // so far
			heading: 'PENDING',
			description: undefined, // so far
			//urls: [],
		}

		let segmentsⵧremaining = line.split(' ')

		segmentsⵧremaining = segmentsⵧremaining.map(segment => {
			if (isꓽUrl‿str(segment)) {
				return normalizeꓽurlⵧhttpₓ(segment)
			}

			return segment
		})

		const last_id_sep_index = segmentsⵧremaining.lastIndexOf('--')
		ǃ.forⵧvalue({last_id_sep_index}).ensure(last_id_sep_index === -1 || last_id_sep_index > 0, '-- separator should not appear at the beginning')

		dhm.parent_headings = last_id_sep_index > 0
			? segmentsⵧremaining.slice(0, last_id_sep_index).join(' ').split(' -- ')
			: []
		segmentsⵧremaining = segmentsⵧremaining.slice(last_id_sep_index + 1)

		/*
		// note the urls
		segmentsⵧremaining.forEach((segment) => {
			if (isꓽUrl‿str(segment)) {
				dhm.urls.push(normalizeꓽurlⵧhttpₓ(segment))
			}
		})

		// remove the trailing urls
		while (segmentsⵧremaining.length > 1 && isꓽUrl‿str(segmentsⵧremaining.at(-1))) {
			segmentsⵧremaining.pop()
		}
		segmentsⵧremaining = segmentsⵧremaining.filter((segment, index) => {
			if (isꓽUrl‿str(segment)) {
				dhm.urls.push(normalizeꓽurlⵧhttpₓ(segment))
				if ((equal_sep_index === -1 && index === 0) || index < equal_sep_index) {
					// XXX do NOT filter out urls before '=' = part of the heading
					return true
				}
				else {
					return false
				}
			}

			return true
		})

		if (segmentsⵧremaining.at(-1) === '=')
			segmentsⵧremaining.pop()
		*/


		let equal_sep_index = segmentsⵧremaining.indexOf('=')
		ǃ.forⵧvalue({equal_sep_index}).ensure(equal_sep_index === -1 || equal_sep_index > 0, '= sign should not appear at the beginning')

		if (equal_sep_index === -1) {
			dhm.description = ''
			// trailing urls are not part of the heading unless just it
			while(segmentsⵧremaining.length > 1 && isꓽUrl‿str(segmentsⵧremaining.at(-1))) {
				dhm.description = segmentsⵧremaining.pop() + ' ' + dhm.description
			}
			dhm.heading = segmentsⵧremaining.join(' ')
		}
		else
		{
			dhm.heading = segmentsⵧremaining.slice(0, equal_sep_index).join(' ')
			dhm.description = segmentsⵧremaining.slice(equal_sep_index + 1).join(' ')
		}
		segmentsⵧremaining = []

		// TODO handle citations
		if (!dhm.heading.startsWith('"') && !dhm.heading.endsWith(';)')) {
			const short_full_split_char = dhm.heading.endsWith(')')
				? '('
				: dhm.heading.endsWith('"')
					? '"'
					: undefined

			if (short_full_split_char) {
				const split = dhm.heading.slice(0, -1).split(short_full_split_char)
				ǃ.forⵧvalue({split_parenthesis: split}).ensure(split.length === 2, `on line ${dhm._lineno}: "${dhm.heading}" "/( should cleanly split`)
				const [headingⵧshortened, headingⵧfull] = split.map(s => s.trim()).sort((a, b) => a.length - b.length)
				dhm.headingⵧshortened = headingⵧshortened!
				dhm.headingⵧfull = headingⵧfull!
				dhm.heading = headingⵧshortened!
			}
		}

		dhm._rest = segmentsⵧremaining.join(' ')

		// TODO
		//ǃ.ensure(dhm.heading.length < 128, `heading too big. Missing = sign? line ${dhm._lineno}: "${dhm.heading}"`)

		ǃ.forⵧvalue({dhm}).ensure(!!dhm.heading)

		return addꓽmeme(state, dhm)
	}, createꓽDigitalHordingMemeplex())
}

/////////////////////////////////////////////////

export {
	createꓽDigitalHordingMemeplex,
	addꓽcomment,
	addꓽtodo,
	addꓽmeme,
	createꓽDigitalHordingMemeplexⵧfrom_mm_txt,
}
