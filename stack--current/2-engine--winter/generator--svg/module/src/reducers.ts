import assert from 'tiny-invariant'
import type { Immutable, Emoji } from '@offirmo-private/ts-types'
import type { CssⳇColor‿str, Dimensions2DSpec } from '@offirmo-private/ts-types-web'
import { getꓽdimensions2D } from '@offirmo-private/ts-types-web'

import type { SVG, SVGElement, SVGId, SVGViewBox, Svg‿str } from './types.ts'
import { getꓽviewbox__dimensions } from './selectors.ts'

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
		content: [],
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

function addꓽcontent(svg: Immutable<SVG>, content: Immutable<SVG['content'][0]>): Immutable<SVG> {
	return {
		...svg,
		content: [
			...svg.content,
			content,
		],
	}
}

function addꓽcontentꘌcontour(svg: Immutable<SVG>, border_width?: number): Immutable<SVG> {
	const { width, height } = getꓽviewbox__dimensions(svg)
	const sw = border_width || Math.min(width, height) / 50

	return addꓽcontent(svg, `
<rect width="${width}" height="${height}" style="fill:transparent; stroke-width:${sw}; stroke:black" />
	`)
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

	setꓽviewBox,
	setꓽbackground_color,

	addꓽcontent,
	addꓽcontentꘌcontour,

	setꓽdimensions_ǃnot_recommended,

	createꓽfrom_emoji,
}
