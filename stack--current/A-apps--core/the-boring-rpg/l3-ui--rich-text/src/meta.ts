import type { Immutable } from '@offirmo-private/ts-types'

import * as Meta from '@oh-my-rpg/state--meta'
import { VERSION, BUILD_DATE } from '@tbrpg/state'

import * as RichText from '@offirmo-private/rich-text-format'

function _render_meta_infos(metas: Immutable<{[k: string]: string | number | undefined}>): RichText.Document {
	const $doc_list = RichText.listⵧunordered()

	Object.keys(metas).forEach((key: string) => {
		$doc_list.pushRawNode(
			RichText.fragmentⵧinline().pushText(key + ': ' + metas[key]).done(),
			{id: key},
		)
	})

	return $doc_list.done()
}

/*
function render_account_info(state: Immutable<Meta.State>, extra: Immutable<{[k: string]: string | number | undefined}> = {}): RichText.Document {
	const meta_infos = extra

	/* TODO rework
	meta_infos['internal user id'] = m.uuid
	meta_infos['telemetry allowed'] = String(m.allow_telemetry)
	if (m.email) meta_infos['email'] = m.email

	const $doc = RichText.fragmentⵧblock()
		.pushHeading('Account infos:', {id: 'header'})
		.pushNode(
			_render_meta_infos(meta_infos),
			{id: 'list'},
		)
		.done()

	return $doc
}*/

const APP_NAME = '⚔️🛡  The Boring RPG, reborn! 👆🎲'
const APP_PITCH = 'The simplest fantasy RPG ever!'
function render_game_info(extra: Immutable<{[k: string]: string | number | undefined}> = {}): RichText.Document {
	const meta_infos = {
		'game version': VERSION,
		'last update date': BUILD_DATE,
		...extra
	}

	const $doc = RichText.fragmentⵧblock()
		.pushHeading(APP_NAME)
		.pushStrong(APP_PITCH)
		.pushNode(
			_render_meta_infos(meta_infos),
			{id: 'list'},
		)
		.done()

	return $doc
}

export {
	//render_account_info,
	render_game_info,
}
