import assert from 'tiny-invariant'
import type { Immutable, Url‿str } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import type { State } from './types.js'
import { DEFAULT_ROOT_URI } from '../index.ts'

import {
	OHALinkRelation,
	type OHAHyperLink‿x,
	type OHAHyperMedia,
	getꓽuriⵧnormalized‿str,
} from '../../types/index.ts'

import { getꓽlinks } from '../../representation/index.ts'

/////////////////////////////////////////////////
const LIB = 'OHAFrameState'
const DEBUG = true

function create(starting_url: Url‿str = DEFAULT_ROOT_URI): Immutable<State> {
	//DEBUG && console.log(`↘ ${LIB}: create()`, { starting_url })

	return {
		urlⵧhome: DEFAULT_ROOT_URI,

		urlⵧload: starting_url,
		reload_counter: 0,

		$representation: undefined, // so far
		urlⵧself: undefined, // so far

		status: getꓽstatusꘌloading(starting_url),
	}
}

function onꓽloaded(state: Immutable<State>, $representation: OHAHyperMedia | Error): Immutable<State> {
	DEBUG && console.log(`↘ ${LIB}: onꓽloaded()`, {
		state: structuredClone(state),
		$representation,
	})

	if (state.status !== '') {
		state = {
			...state,
			status: '',
		}
	}

	if ($representation instanceof Error) {
		const error = $representation

		if (state.$representation?.$hints?.underlying__data === error) {
			$representation = state.$representation
		}
		else {
			const builder = RichText.fragmentⵧblock()

			builder.pushHeading("Load error")
			builder.pushBlockFragment(`Error loading "${state.urlⵧload}":`)
			builder.pushBlockFragment(String(error))
			builder.addHints({underlying__data: error})

			$representation = builder.done()
		}
	}
	assert(RichText.isꓽNodeLike($representation), `$representation should be a RichText.NodeLike!`)

	if (state.$representation !== $representation) {
		state = {
			...state,
			$representation: $representation,
		}

		const links = getꓽlinks($representation)

		const linkⵧself = links[OHALinkRelation.self]
		if (linkⵧself) {
			const urlⵧself = getꓽuriⵧnormalized‿str(linkⵧself)
			if (urlⵧself !== state.urlⵧself)
				state = {
					...state,
					urlⵧself,
				}
		}

		const linkⵧhome = links[OHALinkRelation.home]
		if (linkⵧhome) {
			const urlⵧhome = getꓽuriⵧnormalized‿str(linkⵧhome)
			if (urlⵧhome !== state.urlⵧhome)
				state = {
					...state,
					urlⵧhome,
				}
		}

		const linkⵧcontinue = links[OHALinkRelation.continueᝍto]
		if (linkⵧcontinue) {
			const linkⵧcontinue_str = getꓽuriⵧnormalized‿str(linkⵧcontinue)
			assert(!linkⵧself || linkⵧcontinue_str !== getꓽuriⵧnormalized‿str(linkⵧself), `linkⵧcontinue should not be the same as linkⵧself!`)
			assert(linkⵧcontinue_str !== state.urlⵧself, `linkⵧcontinue should not be the same as urlⵧself!`)
			assert(linkⵧcontinue_str !== state.urlⵧload, `linkⵧcontinue should not be the same as urlⵧload!`)
			state = navigate_to(state, linkⵧcontinue)
		}
	}

	return state
}

function navigate_to(state: Immutable<State>, options: {
	href?: OHAHyperLink‿x
	type?: 'push' | 'replace'
	reload?: boolean // force (re)load even if same url
}): Immutable<State> {
	DEBUG && console.log(`↘ ${LIB}: navigate_to()`, {
		state: structuredClone(state),
		options,
	})

	let {
		href = state.urlⵧself,
		type = 'push',
		reload = false,
	} = options

	const target_str = getꓽuriⵧnormalized‿str(href)

	const isꓽsame_url = target_str === state.urlⵧload || target_str === state.urlⵧself
	if (isꓽsame_url && !reload) {
		return state // no change
	}

	return {
		...state,
		urlⵧload: target_str,
		urlⵧself: target_str, // so far
		...(isꓽsame_url && reload && { reload_counter: state.reload_counter + 1}),
		status: getꓽstatusꘌloading(target_str),
	}
}

/////////////////////////////////////////////////

function getꓽstatusꘌloading(url: string): string {
	return `Loading: "${url}"…`
}

/////////////////////////////////////////////////

export {
	create,
	onꓽloaded,
	navigate_to,
}
