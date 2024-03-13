import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { renderꓽsvg, createꓽfrom_emoji, SVG } from '@offirmo-private/generator--svg';

import { WebPropertyEntryPointSpec } from '../types.js'


/////////////////////////////////////////////////

// TODO get
function generateꓽsvg(spec: Immutable<WebPropertyEntryPointSpec>): Immutable<SVG> {
	return spec.icon ?? createꓽfrom_emoji('🔥')
}

// null = size-less (true SVG)
function generateꓽfile(spec: Immutable<WebPropertyEntryPointSpec>, size: number | null): string {
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

function generateꓽinline(spec: Immutable<WebPropertyEntryPointSpec>): string {
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
