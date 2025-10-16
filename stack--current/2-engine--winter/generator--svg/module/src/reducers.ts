import assert from 'tiny-invariant'
import type { Immutable, Emoji } from '@offirmo-private/ts-types'
import type { CssⳇColor‿str, Dimensions2DSpec } from '@offirmo-private/ts-types-web'
import { getꓽdimensions2D } from '@offirmo-private/ts-types-web'

import type { SVG, SVGGroupElement, SVGElement, SVGId, SVGViewBox, Svg‿str, WithId, WithLayerId } from './types.ts'
import { getꓽviewbox__dimensions, getꓽlayer } from './selectors.ts'

/////////////////////////////////////////////////


/////////////////////////////////////////////////

function createꓽgroup(options: Partial<WithId> = {}): Immutable<SVGGroupElement> {
	return {
		...(options.id && { id: options.id }),
		content: [],
	}
}

function addꓽcontentⵧto_group(svg_group: Immutable<SVGGroupElement>, content: Immutable<SVGGroupElement['content'][0]>): Immutable<SVGGroupElement> {
	return {
		...svg_group,
		content: [
			...svg_group.content,
			content,
		],
	}
}

/////////////////////////////////////////////////

function createꓽempty(): Immutable<SVG> {
	return {
		/////////////////////////////////////////////////
		// Overall properties
		viewBox: [ 0, 0, 255, 255 ],
		preserveAspectRatio: `xMidYMid meet`,
		metadata: {},
		xml_namespaces: {},
		styles: {},
		scripts: {},

		/////////////////////////////////////////////////
		// Building blocks
		defs: {},
		symbols: {},
		links: {},
		filters: {},

		/////////////////////////////////////////////////
		// output
		contentⵧpre: [],
		layers: [],
		views: {},
	}
}

function setꓽviewBox(svg: Immutable<SVG>, viewBox: Immutable<SVGViewBox>): Immutable<SVG> {
	return {
		...svg,
		viewBox: [ ...viewBox ],
	}
}

function setꓽbackground_color(svg: Immutable<SVG>, background_color: CssⳇColor‿str | 'auto-theme'): Immutable<SVG> {
	if (background_color === 'auto-theme') {
		throw new Error(`Not implemented!`)
	}

	return {
		...svg,
		background_color,
	}
}

function addꓽlayer(svg: Immutable<SVG>, layer: Immutable<SVGGroupElement>): Immutable<SVG> {
	assert(layer.id, `Layer to add must have an id!`)

	return {
		...svg,
		layers: [
			...svg.layers,
			layer,
		],
	}
}

function updateꓽlayer(svg: Immutable<SVG>, updated_layer: Immutable<SVGGroupElement>): Immutable<SVG> {
	let found = false
	let has_change = false
	const layers = svg.layers.map(layer => {
		if (layer.id === updated_layer.id) {
			found = true
			if (layer !== updated_layer) {
				has_change = true
				layer = updated_layer
			}
		}
		return layer
	})

	assert(found, `Layer to update "${updated_layer.id}" not found!`)
	if (!has_change)
		return svg

	return {
		...svg,
		layers
	}
}

function addꓽcontent(svg: Immutable<SVG>, content: Immutable<SVGGroupElement['content'][0]>, options: Partial<WithLayerId> = {}): Immutable<SVG> {
	let layer: Immutable<SVGGroupElement> = (() => {
		if (options.layer_id) {
			return getꓽlayer(svg, { id: options.layer_id })
		}

		if (svg.layers.length)
			return svg.layers.at(-1)!

		// no layers, let's add one
		const layer = createꓽgroup({id: 'layer-auto'})
		svg = addꓽlayer(svg, layer)
		return layer
	})()

	layer = addꓽcontentⵧto_group(layer, content)

	return updateꓽlayer(svg, layer)
}

function addꓽcontentꘌcontour(svg: Immutable<SVG>, border_width?: number): Immutable<SVG> {
	const { width, height } = getꓽviewbox__dimensions(svg)
	const sw = border_width || Math.min(width, height) / 50

	// inkscape doesn't recognize `fill:transparent`
	return addꓽcontent(svg, `
<rect width="${width}" height="${height}" style="fill:none; stroke-width:${sw}; stroke:black" />
	`)
}

function decorate_for_editors(svg: Immutable<SVG>): Immutable<SVG> {

	const layers = svg.layers.map(layer => {
		layer = {
			...layer,
			attributes: {
				...layer.attributes,
				['class']: 'layer' // seen on https://svgedit.netlify.app not sure if useful
			}
		}

		return layer
	})
/*


 */
	return {
		...svg,
		contentⵧpre: [`
<sodipodi:namedview
id="namedview1"
pagecolor="#ffffff"
bordercolor="#ff0000"
borderopacity="1"
inkscape:showpageshadow="true"
inkscape:pageopacity="0.0"
inkscape:pagecheckerboard="true"
inkscape:deskcolor="#d1d1d1"
/>` ],
		layers,
		xml_namespaces: {
			...svg.xml_namespaces,
			// seen in inkscape output
			inkscape: 'http://www.inkscape.org/namespaces/inkscape',
			sodipodi: 'http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd',
			svg: 'http://www.w3.org/2000/svg', // cargo culting?
		}
	}
}


/////////////////////////////////////////////////

// Do NOT use
// you most likely want to set those on RENDER! @see getꓽsvg‿str()
function setꓽdimensions_ǃnot_recommended(svg: Immutable<SVG>, dimensions: Immutable<Dimensions2DSpec>): Immutable<SVG> {
	const { width, height } = getꓽdimensions2D(dimensions)

	return {
		...svg,
		width,
		height,
	}
}

/////////////////////////////////////////////////

// emoji favicon
// credits https://twitter.com/LeaVerou/status/1241619866475474946
// example:
// <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
// <text y='.9em' font-size='90'>🦄</text>
// </svg>
function createꓽfrom_emoji(emoji: Emoji): Immutable<SVG> {
	let svg = createꓽempty()
	svg = setꓽviewBox(svg, [0, 0, 100, 100])
	// no background color, looks better!
	svg = addꓽcontent(svg, `<text y='.9em' font-size='90'>${emoji}</text>`)

	return svg
}

function createꓽfrom_file(raw: Svg‿str): Immutable<SVG> {
	throw new Error('NIMP!')
}


/////////////////////////////////////////////////

export {
	createꓽempty,
	createꓽfrom_emoji,

	setꓽviewBox,
	setꓽbackground_color,

	addꓽlayer,
	updateꓽlayer,
	addꓽcontentꘌcontour,
	decorate_for_editors,

	setꓽdimensions_ǃnot_recommended,

	////////////

	createꓽgroup,
	addꓽcontentⵧto_group,
}
