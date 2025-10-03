import {
	type InputSpec,
	type InputType, type ValueInputSpec,
} from '@offirmo-private/ts-types'
import {
	normalizeꓽuri‿str,
	getꓽscheme_specific_part,
} from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'
import type {
	OHAHyperMedia, OHARichTextHints,
	OHAHyperActionBlueprint,
	OHAHyperAction,
	OHAPendingEngagement,
	OHAHyperLink, OHAHyper,
	OHAServer,
	OHAFeedback,
} from '@offirmo-private/ohateoas'
import {
	OHALinkRelation,
	DEFAULT_ROOT_URI,
} from '@offirmo-private/ohateoas'

/////////////////////////////////////////////////

const DEBUG = true
const URI__ROOT = normalizeꓽuri‿str(DEFAULT_ROOT_URI)
const URI__GREET = normalizeꓽuri‿str('/hello')

/////////////////////////////////////////////////

interface State {
	username: string
}

const ACTION_ID_SET_USERNAME = 'set_username'

/////////////////////////////////////////////////

const state: State = {
	username: 'Stranger'
}

function createꓽserver(): OHAServer {

	const ↆget: OHAServer['ↆget'] = async (url = URI__ROOT) => {
		DEBUG && console.group(`↘ OHA ↆget("${url}")`)

		////////////
		const { path, query, fragment } = getꓽscheme_specific_part(url)
		DEBUG && console.log('URL after normalization:', { path, query, fragment })

		////////////
		let ꓺ$representation = RichText.fragmentⵧblock() // "block" bc maps to a ~frame/sub-browser

		const ꓺlinks: OHARichTextHints['links'] = {
			[OHALinkRelation.home]: URI__ROOT, // cam be DEFAULT_ROOT_URI or sth else, ex. /user/:xyz/savegame/:xyz/
			[OHALinkRelation.self]: normalizeꓽuri‿str(path), // intentionally strip query & path until considered relevant
		}

		const ꓺactions: OHARichTextHints['actions'] = {
		}

		const ꓺengagements: OHARichTextHints['engagements'] = []

		////////////

		// Reminder
		// this is UI-based
		// we'll have a single user who want to always be greeted by their name if they come back
		// this calls for a server side storage for long-term memory

		switch (path) {
			case URI__ROOT: { // root, expected to redirect
				ꓺ$representation = ꓺ$representation
					.pushText('Welcome to the OHA greeter')

				const username_input_spec: ValueInputSpec<string, OHAHyperMedia> = {
					kind: 'value',
					type: 'string--line',
					prompt: 'How should I call you?',
					valueⵧdefault: 'Stranger',
					valueⵧcurrent: state.username,
					normalizers: [
						'strⳇcoerce_blanks_to_single_spaces',
						'strⳇtrim',
						'strⳇcapitalizeⵧwords',
					],
					validators: {
						'strⳇlengthⵧmin': {
							params: 1,
						}
					},
				}

				const prompt_for_username: OHAHyperActionBlueprint = {
					type: ACTION_ID_SET_USERNAME,
					input: {
						username: username_input_spec,
					},
					hints: {
						change_type: 'update'
					},
					feedback: {
						[OHALinkRelation.continueᝍto]: URI__GREET,
					}
				}

				ꓺactions[prompt_for_username.type] = prompt_for_username
				break
			}


// URI__GREET
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
		switch(action.type) {
			case ACTION_ID_SET_USERNAME:
				// TODO server validation of the input of course
				state.username = action.payload.username
				break
			default:
				throw new Error(`Unsupported action "${action.type}"!`)
		}
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
