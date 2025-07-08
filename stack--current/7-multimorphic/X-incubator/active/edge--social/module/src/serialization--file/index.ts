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
	LooseDateAnnotated,
	EmojiRegionFlag,

	Nationality,

	OrgId,
	Org,

	PersonId,
	Person,
} from '../types.ts'

import type { State } from '../state/types.ts'
import * as Reducers from '../state/reducers.ts'
import * as LooseDateLib from '../to-own/loose-date.ts'
import { hasꓽemoji } from '@offirmo-private/type-detection'

/////////////////////////////////////////////////

const LINE_SEP = '\n'

const MARKER_EMOJI_DATE = '📅' as const
const MARKER_EMOJI_ANNIVERSARY_BIRTH = '🎂' as const
const MARKER_EMOJI_ANNIVERSARY_WEDDING = '💒' as const
const MARKER_EMOJI_PATRON_DAY = '📛' as const

const BASES = {

	baby: '👶',

	childⵧboy: '👦',
	childⵧgirl: '👧', // U+1F467
	childⵧunknown: '🧒',

	adultⵧman: '👱',
	adultⵧmanⵧbearded: '🧔',
	adultⵧunknown: '🧑',
	adultⵧwoman: '👩',

	elderⵧman: '👴',
	elderⵧunknown: '🧓',
	elderⵧwoman: '👵',

	//person_with_blond_hair: '👱', // U+1F471
}
function starts_with_base_face(s: string): boolean {
	return Object.values(BASES).some(base => s.startsWith(base))
}

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
			console.log(`processig line "${line}"…`)

			let ld: LooseDateAnnotated | undefined = undefined
			let ld_count = 0
			const segments = line.split(' ')
			const person_id: PersonId = segments.shift()!.toLowerCase()
			state = Reducers.ensureꓽperson_and_org(state, person_id)

			const non_claims: string[] = []
			let claims_count = 0
			segments.forEach((claim, index) => {
				claims_count++ // optimistic
				switch (true) {
					case claim === '--': {
						// it's a separator, ignore
						claims_count--
						assert(non_claims.length === 0 && claims_count === 0, `separator should at start!`)
						break
					}

					case claim ===  "🪦":
						state = Reducers.claimꓽperson__status(state, person_id, 'dead')
						break

					case claim.startsWith(MARKER_EMOJI_DATE): {
						ld_count++
						claim = claim.slice(MARKER_EMOJI_DATE.length)

						let id = ''
						let date_raw = claim
						while (date_raw.length && !LooseDateLib.isꓽpart(date_raw[0]!)) {
							id += date_raw[0]
							date_raw = date_raw.slice(1)
						}
						assert(id, `date should have an id! "${claim}`)
						ld = LooseDateLib.createⵧfrom_str(date_raw)

						state = Reducers.claimꓽperson__date(state, person_id, ld, id)
						break
					}

					default:
						if (hasꓽemoji(claim)) {
							console.error(`NIMP claim = "${claim}"`)
							throw new Error(`claim "${claim}" not implemented!`)
						}
						else {
							claims_count--
							non_claims.push(claim)
						}
				}
			})

			if (non_claims.length) {
				// must be notes
				const note_line = non_claims.join(' ')

				if (claims_count === 0) {
					// pure notes
					state = Reducers.claimꓽperson__note(state, person_id, note_line)
				}
				else if (!!ld) {
					assert(ld_count < 2, `notes have ambiguous claim!`)
					ld.notes = note_line
				}
				else {
					assert(!!ld, `notes should refer to an annotatable previous claim! Line = "${line}"`)
				}

			}
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
