import { assert_from } from '@monorepo-private/assert'
import {
	normalize_unicode,
	coerce_blanks_to_single_spaces,
	trim,
	normalizeꓽurlⵧhttpₓ,
} from '@monorepo-private/normalize-string'

import type { LineRecord,DigitalHoardingMeme, DigitalHoardingMemeplex } from './types.ts'
import * as MemeplexLib from './memeplex/index.ts'
import type {Url‿str} from "@monorepo-private/ts--types--web";

/////////////////////////////////////////////////

const URL_PATTERN = /^https?:\/\/\S+/g
function isꓽUrl‿str(s: string | undefined): s is Url‿str {
	return s?.match(URL_PATTERN)
}

/////////////////////////////////////////////////

function get‿DigitalHordingMemeplex(mm_txt: string): DigitalHoardingMemeplex {
	const ǃ = assert_from({get‿DigitalHordingMeme: get‿DigitalHordingMemeplex})

	const lines‿LineRecord = get‿LineRecords(mm_txt)

	return lines‿LineRecord.reduce((state, line: LineRecord) => {
		const lineⵧraw = line._source

		if (lineⵧraw.startsWith('//')) {
			return MemeplexLib.addꓽcomment(state, lineⵧraw)
		}

		if (lineⵧraw.startsWith('[ ]')) {
			return MemeplexLib.addꓽtodo(state, lineⵧraw)
		}
		if (lineⵧraw.startsWith('http')) {
			return MemeplexLib.addꓽtodo(state, lineⵧraw)
		}

		if (lineⵧraw.startsWith('+++')) {
			// TODO refactor
			return MemeplexLib.addꓽtodo(state, lineⵧraw)
		}

		const dhm: DigitalHoardingMeme = {
			...line,
			parent_headings: [], // so far
			heading: 'PENDING',
			description: undefined, // so far
			urls: [],
		}

		let segmentsⵧremaining = lineⵧraw.split(' ')

		let equal_sep_index = segmentsⵧremaining.indexOf('=')
		ǃ.forⵧvalue({equal_sep_index}).ensure(equal_sep_index === -1 || equal_sep_index > 0, '= sign should not appear at the beginning')

		// note the urls
		segmentsⵧremaining.forEach((segment) => {
			if (isꓽUrl‿str(segment)) {
				dhm.urls.push(normalizeꓽurlⵧhttpₓ(segment))
			}
		})

		/*if (line._lineno === 460) {
			debugger
		}*/

		/*
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
		}) */

		if (segmentsⵧremaining.at(-1) === '=')
			segmentsⵧremaining.pop()

		const last_id_sep_index = segmentsⵧremaining.lastIndexOf('--')
		ǃ.forⵧvalue({last_id_sep_index}).ensure(last_id_sep_index === -1 || last_id_sep_index > 0, '-- separator should not appear at the beginning')

		dhm.parent_headings = last_id_sep_index > 0
			? segmentsⵧremaining.slice(0, last_id_sep_index).join(' ').split(' -- ')
			: []
		segmentsⵧremaining = segmentsⵧremaining.slice(last_id_sep_index + 1)

		equal_sep_index = segmentsⵧremaining.indexOf('=')
		ǃ.forⵧvalue({equal_sep_index}).ensure(equal_sep_index === -1 || equal_sep_index > 0, '= sign should not appear at the beginning (remaining)')
		if (equal_sep_index === -1) {
			dhm.heading = segmentsⵧremaining.join(' ')
			xxx TODO trailing urls go to description
		}
		else
		{
			dhm.heading = segmentsⵧremaining.slice(0, equal_sep_index).join(' ')
			dhm.description = segmentsⵧremaining.slice(equal_sep_index + 1).join(' ')
		}
		segmentsⵧremaining = []

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
				dhm.headingⵧshortened = headingⵧshortened
				dhm.headingⵧfull = headingⵧfull
				dhm.heading = headingⵧshortened
			}
		}

		dhm._rest = segmentsⵧremaining.join(' ')

		// TODO
		//ǃ.ensure(dhm.heading.length < 128, `heading too big. Missing = sign? line ${dhm._lineno}: "${dhm.heading}"`)

		ǃ.forⵧvalue({dhm}).ensure(!!dhm.heading)

		return MemeplexLib.addꓽmeme(state, dhm)
	}, MemeplexLib.create())
}

function get‿LineRecords(mm_txt: string): LineRecord[] {
	return mm_txt
		.split('\n')
		.map(normalizeꓽmm_line)
		.map(s => {
			return s
				.replaceAll('<-', '←')
				.replaceAll('->', '→')
				.replaceAll('<=', '⇐')
				.replaceAll('=>', '⇒')
		})
		.filter(line => !!line)
		.map((line, index): LineRecord => ({
			_source: line,
			_lineno: index + 1,
		}))
}

function normalizeꓽmm_line(line: string): string {
	return trim(coerce_blanks_to_single_spaces(normalize_unicode(line)))
}

/////////////////////////////////////////////////

export {
	type DigitalHoardingMeme,
	type DigitalHoardingMemeplex,
	get‿DigitalHordingMemeplex,

	isꓽUrl‿str,
}
