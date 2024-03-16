import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { getꓽsvg‿str, createꓽfrom_emoji, SVG } from '@offirmo-private/generator--svg'

import { WebPropertyEntryPointSpec } from '../types.js'


/////////////////////////////////////////////////

// TODO get
function generateꓽsvg(spec: Immutable<WebPropertyEntryPointSpec>): Immutable<SVG> {
	if (!spec.icon)
	return createꓽfrom_emoji('🔥')

	if (typeof spec.icon === 'string') {
		return createꓽfrom_emoji(spec.icon)
	}

	return spec.icon
}

// null = size-less (true SVG)
function generateꓽfile(spec: Immutable<WebPropertyEntryPointSpec>, size: number | null): string {
	return getꓽsvg‿str(generateꓽsvg(spec), {
		...(size && {
			width: size,
			height: size,
		}),
	})
}

function generateꓽinline(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return getꓽsvg‿str(generateꓽsvg(spec), {
		wantsꓽcompact: true,
	})
}

/////////////////////////////////////////////////

export {
	generateꓽsvg,
	generateꓽfile,
	generateꓽinline,
}
