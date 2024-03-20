import assert from 'tiny-invariant'
import { Resvg } from '@resvg/resvg-js'

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
function generateꓽfile(spec: Immutable<WebPropertyEntryPointSpec>, size: number | null): string | Buffer {
	const svg = getꓽsvg‿str(generateꓽsvg(spec), {
			...(size && { // needed for png gen
				width: size,
				height: size,
			}),
		})

	if (size === null)
		return svg

	// render to png
	//console.log(svg)
	const resvg__opts = {
		font: {
			// emojis are not working, reported
			/*
			fontFiles: ['/Users/yjutard/work/tmp/Noto_Color_Emoji/NotoColorEmoji-Regular.ttf'],
			loadSystemFonts: false, // It will be faster to disable loading system fonts.
			defaultFontFamily: 'Noto Color Emoji',
			*/
			//defaultFontFamily: 'Apple Color Emoji',
		},
	}
	const resvg = new Resvg(svg, resvg__opts)
	const renderedImage = resvg.render()
	//console.info('Output PNG Size  :', `${renderedImage.width} x ${renderedImage.height}`)
	return renderedImage.asPng()
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
