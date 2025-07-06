import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import {
	normalize_unicode,
	coerce_blanks_to_single_spaces,
	normalizeꓽtextⵧsentence,
	normalizeꓽemailⵧsafe,
	normalizeꓽemailⵧreasonable,
	normalizeꓽemailⵧfull,
	normalizeꓽIETFLanguageType,
	normalizeꓽurl,
	normalizeꓽurlⵧhttpₓ,
} from '@offirmo-private/normalize-string'

import type {
	EmojiRegionFlag,

	Nationality,

	OrgId,
	Org,

	PersonId,
	Person,
} from '../types.ts'

import type { State } from '../state/types.ts'
import * as Reducers from '../state/reducers.ts'

/////////////////////////////////////////////////

const LINE_SEP = '\n'

const MARKER_EMOJI_DATE = '📅' as const
const MARKER_EMOJI_ANNIVERSARY_BIRTH = '🎂' as const
const MARKER_EMOJI_ANNIVERSARY_WEDDING = '💒' as const
const MARKER_EMOJI_PATRON_DAY = '📛' as const

/////////////////////////////////////////////////

function deserialize(text: string): Immutable<State> {
	let state = Reducers.create()

	//////
	const linesⵧraw = text.split(LINE_SEP)
		.map(l => coerce_blanks_to_single_spaces(normalize_unicode(l)).trim())
		.filter(l => !!l)
		.filter(l => !l.startsWith('#'))
		.sort()

	console.log(`Raw lines: `, linesⵧraw)

	linesⵧraw.forEach((line, i) => {
		if (line.startsWith('@')) {
			const segments = line.split(' ')
			const person_id: PersonId = segments.shift()!.toLowerCase()
			state = Reducers.ensure_person_and_org(state, person_id)

			const non_claims: string[] = []
			segments.forEach((claim, index) => {
				switch (true) {
					case claim ===  "🪦":
						state = Reducers.claim_person_status(state, person_id, 'dead')
						break

					case claim.startsWith(MARKER_EMOJI_DATE): {
						claim = claim.slice(MARKER_EMOJI_DATE.length)

						let id = ''
						while (claim.at(0) xxx)



						throw new Error(`DATE Not implemented!`)
					}

					default:
						console.error(`NIMP claim = "${claim}"`)
						throw new Error(`Not implemented!`)
				}
			})
		}
		else {
			throw new Error(`Unknown line format: "${line}"`)
		}
	})

	/////

	return state
}

/////////////////////////////////////////////////

function serialize(state: Immutable<State>): string {
	const lines: string[] = []

	const person_ids = Object.keys(state.persons)
		.sort()

	person_ids.map(id => state.persons[id]!)
		.forEach(p => {
			const unhandled_keys = new Set(Object.keys(p))
			let line_intro = `${p.id}`
			unhandled_keys.delete('id')
			unhandled_keys.delete('org_id') // part of the id

			let lines_other = []

			switch (p.status) {
				case 'alive':
					// default, nothing to do
					unhandled_keys.delete('status')
					break
				case 'dead':
					line_intro += ` 🪦`
					unhandled_keys.delete('status')
					break
				default:
					throw new Error(`Unknown status: ${p.status}`)
			}

			;(() => {
				p.known_nationalities.forEach(n => {
					throw new Error(`Not implemented!`)
				})
				unhandled_keys.delete('known_nationalities')
			})()

			;(() => {
				lines_other.push(
					...p.notes.toSorted().map(note => {
						return `${p.id} ${note}`
					})
				)
				unhandled_keys.delete('notes')
			})()

			lines.push(line_intro)
			lines.push(...lines_other)

			if (unhandled_keys.size) {
				throw new Error(`Unhandled keys: ${Array.from(unhandled_keys)}`)
			}
		})

	return lines.join(LINE_SEP) + LINE_SEP
}

/////////////////////////////////////////////////

export {
	deserialize,
	serialize,
}
