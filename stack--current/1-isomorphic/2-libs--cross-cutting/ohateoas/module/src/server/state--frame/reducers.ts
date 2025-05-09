
import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type { State } from './types.js'
import { DEFAULT_ROOT_URI } from '../index.ts'

import {
	type OHAHyperLink‿x,
	getꓽuriⵧnormalized‿str, type OHAHyperMedia,
} from '../../types/index.ts'
import { getꓽlinks } from '../../representation/index.ts'

/////////////////////////////////////////////////

function create(): Immutable<State> {
	return {
		urlⵧload: DEFAULT_ROOT_URI,
		urlⵧself: DEFAULT_ROOT_URI, // so far
		reload_counter: 0,
		$representation: undefined,
	}
}

// "replace" type navigation
function onꓽloaded(state: Immutable<State>, $representation: OHAHyperMedia): Immutable<State> {
	const self = getꓽlinks($representation).self


	if (self) {
		const urlⵧself = getꓽuriⵧnormalized‿str(self)
		if (urlⵧself !== state.urlⵧself)
		state = {
			...state,
			urlⵧself,
		}
	}

	if (state.$representation !== $representation) {
		state = {
			...state,
			$representation,
		}
	}

	return state
}

function navigate_to(state: Immutable<State>, options: {
	href?: OHAHyperLink‿x
	type?: 'push' | 'replace'
	reload?: boolean // force (re)load even if same url
}): Immutable<State> {
	let {
		href = state.urlⵧself,
		type = 'push',
		reload = false,
	} = options

	const target_str = getꓽuriⵧnormalized‿str(href)

	const is_same_url = target_str === state.urlⵧload || target_str === state.urlⵧself

	if (is_same_url && !reload) {
		return state // no change
	}

	return {
		...state,
		urlⵧload: target_str,
		urlⵧself: target_str, // so far
		...(is_same_url && reload && { reload_counter: state.reload_counter + 1}),
	}
}

/////////////////////////////////////////////////

export {
	create,
	onꓽloaded,
	navigate_to,
}
