import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { Category, WebsiteEntryPointSpec } from '../types.js'
import { WebManifest } from './types.js'
import {
	getꓽbasenameⵧindexᐧhtml,
	getꓽlang,
	getꓽtitleⵧapp,
	getꓽtitleⵧappⵧshort,
	getꓽcolorⵧbackground,
	getꓽcolorⵧtheme,
} from '../selectors.js'

/////////////////////////////////////////////////

function generateꓽicons(spec: Immutable<WebsiteEntryPointSpec>): [] {
	// TODO
	return []
}
function generate(spec: Immutable<WebsiteEntryPointSpec>): WebManifest {
	const result: WebManifest = {
		// critical to be installable
		name: getꓽtitleⵧapp(spec),
		icons: generateꓽicons(spec),
		start_url: `./${getꓽbasenameⵧindexᐧhtml(spec)}?pinned=true`, // TODO review query param
		display: 'standalone', // TODO refine

		// critical for good experience
		short_name: getꓽtitleⵧappⵧshort(spec),
		theme_color: getꓽcolorⵧtheme(spec),
		background_color: getꓽcolorⵧbackground(spec),
		lang: getꓽlang(spec),

		// nice to have
		//display_override: ['window-controls-overlay'], // https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/window-controls-overlay#enable-the-window-controls-overlay-in-your-app

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
