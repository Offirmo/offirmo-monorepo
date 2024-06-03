import assert from 'tiny-invariant'
import { Resvg } from '@resvg/resvg-js'

import { Immutable } from '@offirmo-private/ts-types'
import { getꓽsvg‿str, createꓽfrom_emoji, SVG, Svg‿str } from '@offirmo-private/generator--svg'

import { WebPropertyEntryPointSpec, EntryPoints } from '../types.js'
import { getꓽicon__sizes, getꓽiconⵧemoji, getꓽiconⵧsvg, getꓽicon__path } from '../selectors/index.js'


/////////////////////////////////////////////////

// null = size-less (true SVG)
function generateꓽfile(spec: Immutable<WebPropertyEntryPointSpec>, size: number | null): Svg‿str | Buffer {
	console.warn(`TODO generate PNG icon!`, { size })
	return 'TODO'
	/*
	if (size === null) {
		const svg = getꓽsvg(spec)
		return svg && getꓽsvg‿str(svg)
	}

	if (size === 16) {
		// TODO .ico
		throw new Error('NIMP!')
	}

	const pngⵧbiggest_or_equal = getꓽpng_icon_pathⵧclosest_to_size(spec)
	// render to png
	//console.log(svg)
	const resvg__opts = {
		font: {
			// emojis are not working, reported
			/*
			fontFiles: ['/Users/xyz/work/tmp/Noto_Color_Emoji/NotoColorEmoji-Regular.ttf'],
			loadSystemFonts: false, // It will be faster to disable loading system fonts.
			defaultFontFamily: 'Noto Color Emoji',
			*/
			//defaultFontFamily: 'Apple Color Emoji',
		/*},
	}
	const resvg = new Resvg(svg, resvg__opts)
	const renderedImage = resvg.render()
	//console.info('Output PNG Size  :', `${renderedImage.width} x ${renderedImage.height}`)
	return renderedImage.asPng()*/
}

function generateꓽinline(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return getꓽsvg‿str(createꓽfrom_emoji(getꓽiconⵧemoji(spec)), {
		wantsꓽcompact: true,
	})
}

/////////////////////////////////////////////////

function generateꓽfixed_sizes(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return getꓽicon__sizes(spec).reduce((acc, size) => {
			acc[getꓽicon__path(spec, size)] = generateꓽfile(spec, size)
			return acc
		}, {} as EntryPoints)
}

function generate(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		// size-less version (SVG) if possible
		...(getꓽiconⵧsvg(spec) && { [getꓽicon__path(spec, null)]: generateꓽfile(spec, null) }),

		...generateꓽfixed_sizes(spec),
	}
}

/////////////////////////////////////////////////

export default generate
export {
	generateꓽinline,
}
