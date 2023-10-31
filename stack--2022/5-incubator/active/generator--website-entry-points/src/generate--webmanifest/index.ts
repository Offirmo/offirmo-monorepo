import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { Category, WebsiteEntryPointSpec } from '../types.js'
import { WebManifest } from './types.js'
import {
	canꓽuse_window_controls_overlay,
	hasꓽown_navigation,
	getꓽbasenameⵧindexᐧhtml,
	getꓽlang,
	getꓽtitleⵧapp,
	getꓽtitleⵧappⵧshort,
	getꓽcolorⵧbackground,
	getꓽcolorⵧtheme, supportsꓽscreensⵧwith_shape,
} from '../selectors.js'
import { ifꓽdebug } from '../utils/debug.js'

/////////////////////////////////////////////////

function _generateꓽicons(spec: Immutable<WebsiteEntryPointSpec>): [] {
	// TODO
	return []
}

function generate(spec: Immutable<WebsiteEntryPointSpec>): WebManifest {
	const result: WebManifest = {
		// critical to be installable
		name: ifꓽdebug(spec).prefixꓽwith(`[wm.name]`,
			getꓽtitleⵧapp(spec)
		),
		icons: _generateꓽicons(spec),
		start_url: `./${getꓽbasenameⵧindexᐧhtml(spec)}?ref=webmanifest`, // TODO review query params

		display: hasꓽown_navigation(spec)
			? supportsꓽscreensⵧwith_shape(spec)
				? 'fullscreen'
				: 'standalone'
			: 'minimal-ui',

		// critical for good experience
		short_name: ifꓽdebug(spec).prefixꓽwith(`[wm.short]`,
			getꓽtitleⵧappⵧshort(spec)
		),
		theme_color: getꓽcolorⵧtheme(spec),
		background_color: getꓽcolorⵧbackground(spec),
		lang: getꓽlang(spec),

		...(canꓽuse_window_controls_overlay(spec) && {display_override: ['window-controls-overlay']}),

		//description: ...
		//categories: ...
	}

	return result
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
