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
	// TODO should we add a size-less SVG? Is there any platform that would use it?
	return getꓽicon__sizes(spec).reduce((acc, size) => {
		const icon_path = getꓽicon__path(spec, size)
		let type = `image/svg+xml`
		switch(true) {
			case icon_path.endsWith('.ico'): {
				// no need in the manifest
				return acc
			}
			case icon_path.endsWith('.svg'):
				type = `image/svg+xml`
				break
			case icon_path.endsWith('.png'):
				type = `image/png`
				break
			default:
				throw new Error(`Generating Webmanifest, unknown icon format! ${icon_path}`)
		}

		acc.push({
			src: `./${icon_path}`, // TODO review should we add ./ ?
			type,
			...(size && {sizes: `${size}x${size}`}),
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
