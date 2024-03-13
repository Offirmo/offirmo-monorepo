import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { Category, EntryPoints, WebPropertyEntryPointSpec } from '../types.js'
import { Icon, WebManifest } from './types.js'
import {
	canꓽuse_window_controls_overlay,
	hasꓽown_navigation,
	getꓽbasenameⵧindexᐧhtml,
	getꓽlang,
	getꓽtitleⵧapp,
	getꓽtitleⵧappⵧshort,
	getꓽcolorⵧbackground,
	getꓽcolorⵧtheme, supportsꓽscreensⵧwith_shape, getꓽicon__sizes, getꓽicon__path,
} from '../selectors/index.js'
import { ifꓽdebug } from '../utils/debug.js'

/////////////////////////////////////////////////

function _generateꓽicons(spec: Immutable<WebPropertyEntryPointSpec>): WebManifest['icons'] {
	return getꓽicon__sizes(spec).reduce((acc, size) => {
		acc.push({
			src: `./${getꓽicon__path(spec, size)}`, // TODO review should we add ./ ?
			type: `image/svg+xml`,
			sizes: `${size}x${size}`
		} as Icon)
		return acc
	}, [] as WebManifest['icons'])
}

function generate(spec: Immutable<WebPropertyEntryPointSpec>): WebManifest {
	const result: WebManifest = {
		lang: getꓽlang(spec),

		// critical to be installable
		name: ifꓽdebug(spec).prefixꓽwith(`[wm.n]`,
			getꓽtitleⵧapp(spec)
		),
		icons: _generateꓽicons(spec),
		start_url: `./${getꓽbasenameⵧindexᐧhtml(spec)}?ref=webmanifest`, // TODO review query params

		// enhancements
		display: hasꓽown_navigation(spec)
			? supportsꓽscreensⵧwith_shape(spec)
				? 'fullscreen'
				: 'standalone'
			: 'minimal-ui',

		// critical for good experience
		short_name: ifꓽdebug(spec).prefixꓽwith(`[wm.s]`,
			getꓽtitleⵧappⵧshort(spec)
		),

		theme_color: getꓽcolorⵧtheme(spec),
		background_color: getꓽcolorⵧbackground(spec),

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
