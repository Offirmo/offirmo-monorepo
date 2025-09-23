import type {
	SemVer,
} from '@offirmo-private/ts-types'
import {
	normalizeꓽuri‿str,
	getꓽscheme_specific_part,
} from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'
import { OHALinkRelation } from '../../01-types/types.ts'
import type {
	OHAHyperMedia, OHARichTextHints,
	OHAHyperActionBlueprint,
	OHAHyperAction,
	OHAPendingEngagement,
	OHAHyperLink, OHAHyper,
} from '../../01-types/types.ts'
import {
	type OHAServer,
	DEFAULT_ROOT_URI,
} from '../../30-server/index.ts'

/////////////////////////////////////////////////

const DEBUG = true

/////////////////////////////////////////////////

function createꓽserver(): OHAServer {

	const ↆget: OHAServer['ↆget'] = async (url = DEFAULT_ROOT_URI) => {
		DEBUG && console.group(`↘ OHA ↆget("${url}")`)

		////////////
		const { path, query, fragment } = getꓽscheme_specific_part(url)
		DEBUG && console.log('URL after normalization:', { path, query, fragment })

		////////////
		// prepare aggregation
		let $builder = RichText.fragmentⵧblock() // "block" bc maps to a ~frame/sub-browser

		const links: OHARichTextHints['links'] = {
			//[OHALinkRelation.self]: normalizeꓽuri‿str(path), // intentionally strip query & path until considered relevant
			//[OHALinkRelation.home]: URIꘌROOT, // could be DEFAULT_ROOT_URI or sth else, ex. /user/:xyz/savegame/:xyz/
		}

		const actions: OHARichTextHints['actions'] = {
		}

		const engagements: OHARichTextHints['engagements'] = []

		////////////

		switch (path) {
			case DEFAULT_ROOT_URI: { // root, expected to redirect
				$builder = $builder
					.pushText('Hello, world!')
				break
			}

			default:
				throw new Error(`404 on "${path}"!`)
		}

		////////////
		// wrap together
		$builder.addHints<OHARichTextHints>({
			links,
			actions,
			engagements,
		})

		DEBUG && console.groupEnd()

		return $builder.done()
	}

	const dispatch: OHAServer['dispatch'] = async (action) => {
		throw new Error(`No supported actions!`)
	}

	return {
		ↆget,
		dispatch,
	}
}

/////////////////////////////////////////////////

export {
	createꓽserver,
}
