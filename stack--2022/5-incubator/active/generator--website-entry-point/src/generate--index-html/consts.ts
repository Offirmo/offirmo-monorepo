import { Immutable } from '@offirmo-private/ts-types'

import { HtmlMetaContentⳇViewport } from './types.js'

/////////////////////////////////////////////////

const DEFAULT_VIEWPORT_META: Immutable<HtmlMetaContentⳇViewport> = {
	// only the basic, standard
	width: 'device-width',
	height: 'device-height',
}

/////////////////////////////////////////////////

export {
	DEFAULT_VIEWPORT_META,
}
