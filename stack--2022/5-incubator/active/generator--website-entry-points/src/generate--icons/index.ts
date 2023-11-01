import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { WebsiteEntryPointSpec } from '../types.js'

import { renderꓽsvg, createꓽfrom_emoji, SVG } from '../utils/svg/index.js'

/////////////////////////////////////////////////

// TODO get
function generateꓽsvg(spec: Immutable<WebsiteEntryPointSpec>): Immutable<SVG> {
	return spec.icon ?? createꓽfrom_emoji('🔥')
}

function generateꓽfile(spec: Immutable<WebsiteEntryPointSpec>, size?: number): string {
	return renderꓽsvg(
		generateꓽsvg(spec),
		{
			...(size && {
				width: size,
				height: size,
			}),
			//wantsꓽcompact: true,
		},
	)
}

function generateꓽinline(spec: Immutable<WebsiteEntryPointSpec>): string {
	return renderꓽsvg(generateꓽsvg(spec), {
			wantsꓽcompact: true,
		},
	)
}

/////////////////////////////////////////////////

export {
	generateꓽsvg,
	generateꓽfile,
	generateꓽinline,
}
