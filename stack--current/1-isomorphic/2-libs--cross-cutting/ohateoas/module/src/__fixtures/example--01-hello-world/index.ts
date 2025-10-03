import {
	normalizeꓽuri‿str,
	getꓽscheme_specific_part,
} from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'
import type {
	OHARichTextHints,
	OHAServer
} from '@offirmo-private/ohateoas'
import {
	OHALinkRelation,
	DEFAULT_ROOT_URI,
} from '@offirmo-private/ohateoas'

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
		let ꓺ$representation = RichText.fragmentⵧblock() // "block" bc maps to a ~frame/sub-browser

		const ꓺlinks: OHARichTextHints['links'] = {
			//[OHALinkRelation.self]: normalizeꓽuri‿str(path), // intentionally strip query & path until considered relevant
			[OHALinkRelation.home]: DEFAULT_ROOT_URI, // cam be DEFAULT_ROOT_URI or sth else, ex. /user/:xyz/savegame/:xyz/
		}

		const ꓺactions: OHARichTextHints['actions'] = {
		}

		const ꓺengagements: OHARichTextHints['engagements'] = []

		////////////

		switch (path) {
			case DEFAULT_ROOT_URI: { // root, expected to redirect
				ꓺ$representation = ꓺ$representation
					.pushText('Hello, world!')
				break
			}

			default:
				throw new Error(`404 on "${path}"!`)
		}

		////////////
		// wrap together
		ꓺ$representation.addHints<OHARichTextHints>({
			links: ꓺlinks,
			actions: ꓺactions,
			engagements: ꓺengagements,
		})

		DEBUG && console.groupEnd()

		return ꓺ$representation.done()
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
