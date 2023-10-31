import assert from 'tiny-invariant'
import { Immutable, Emoji } from '@offirmo-private/ts-types'

import { SVG, SVGElement, SVGId, SVGViewBox } from './types.js'

/////////////////////////////////////////////////

function createꓽempty(): Immutable<SVG> {
	return {
		/////////////////////////////////////////////////
		// Overall properties
		viewBox: [ 0, 0, 255, 255 ],
		preserveAspectRatio: `xMidYMid meet`,
		metadata: {},
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

function addꓽcontent(svg: Immutable<SVG>, content: Immutable<SVG['content'][0]>): Immutable<SVG> {
	return {
		...svg,
		content: [
			...svg.content,
			content,
		],
	}
}

/////////////////////////////////////////////////

// emoji favicon https://twitter.com/LeaVerou/status/1241619866475474946
// <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
// <text y='.9em' font-size='90'>🦄</text>
// </svg>
function createꓽfrom_emoji(emoji: Emoji): Immutable<SVG> {
	let svg = createꓽempty()
	svg = setꓽviewBox(svg, [0, 0, 100, 100])
	svg = addꓽcontent(svg, `<text y='.9em' font-size='90'>${emoji}</text>`)

	return svg
}

/////////////////////////////////////////////////

export {
	createꓽempty,
	setꓽviewBox,
	addꓽcontent,

	createꓽfrom_emoji,
}
