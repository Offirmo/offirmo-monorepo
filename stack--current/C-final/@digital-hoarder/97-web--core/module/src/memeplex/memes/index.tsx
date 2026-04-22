import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import { type ReactNode } from 'react'

import { type DigitalHoardingMeme } from "@digital-hoarder/model";
import * as ModelLib from "@digital-hoarder/model";

import type { BaseProps } from "../types";
import { Meme } from '../meme'
import {isꓽstringified_integer} from "@monorepo-private/type-detection";

/////////////////////////////////////////////////
export interface Props extends BaseProps {
	memes: Immutable<DigitalHoardingMeme>[] // the subset to display (can be ABSENT from the memplex = for ex. if tweaked)
	isOpen?: boolean
	heading?: ReactNode
}

export function Memes(props: Props) {
	//console.log('🔄 <Memes/>', props)
	const { _debug, heading, memes, isOpen } = props

	let heading_path_counters: number[] = []
	let previous_root = undefined // TODO 1D alphabetical separators for readability
	const meme_nodes = memes.map((meme, index) => {

		/*if (index === 6) {
			debugger
		}*/

		const hp_current = ModelLib.getꓽheadings_path(meme)
		const hp_previous = memes[index-1] ? ModelLib.getꓽheadings_path(memes[index-1]) : []

		let has_incremented_a_previous_path_segment = false
		heading_path_counters = hp_current.map((s, i) => {
			if (has_incremented_a_previous_path_segment)
				return 0 // all subsequent reset

			let candidate = heading_path_counters[i] ?? 0

			if (s === hp_previous[i]) {
				// no change => no increase
				return candidate
			}

			has_incremented_a_previous_path_segment = true
			return candidate + 1
		})

		return <Meme {...props} meme={meme} heading_path_counters={heading_path_counters}/>
	})

	return <details open={isOpen ?? !_debug}>
			<summary><h1>{heading} ({meme_nodes.length})</h1></summary>
			<div>
				{meme_nodes}
			</div>
		</details>
}

/////////////////////////////////////////////////
