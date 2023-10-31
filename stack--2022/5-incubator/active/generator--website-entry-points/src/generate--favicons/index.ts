
import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { WebsiteEntryPointSpec } from '../types.js'

import { renderꓽsvg, createꓽfrom_emoji, SVG } from '../utils/svg/index.js'

/////////////////////////////////////////////////

function generateꓽsvg(spec: Immutable<WebsiteEntryPointSpec>): Immutable<SVG> {
	return createꓽfrom_emoji(
			spec.favicon ?? '🔥' // TODO selector, TODO improve
		)
}

function generateꓽfile(spec: Immutable<WebsiteEntryPointSpec>): string {
	return renderꓽsvg(generateꓽsvg(spec), {
			//wantsꓽcompact: true,
		}
	)
}

function generateꓽiconⵧinline(spec: Immutable<WebsiteEntryPointSpec>): string {
	return renderꓽsvg(generateꓽsvg(spec), {
			wantsꓽcompact: true,
		}
	)
}

/////////////////////////////////////////////////

export {
	generateꓽsvg,
	generateꓽfile,
	generateꓽiconⵧinline,
}
