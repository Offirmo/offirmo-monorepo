// TODO render to file
// TODO render inline https://speckyboy.com/inline-svg/
// TODO able to inject width & height

import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import { EOL, TAB } from './consts.ts'
import type { SVG, Svg‿str } from './types.ts'

/////////////////////////////////////////////////

// Note that we use single quotes for embeddability in head / css
function getꓽsvg‿str(svg: Immutable<SVG>, options: {
	width?: number, // default is auto
	height?: number // default is auto
	wantsꓽcompact?: boolean // if true, omit EOL, tabs and maybe pedantic stuff
	isꓽnested?: boolean // if true, omit the namespace
} = {}): Svg‿str {
	const wantsꓽcompact = options.wantsꓽcompact ?? false
	const isꓽnested = options.isꓽnested ?? false

	const svg__atributes‿str = [
		isꓽnested ? '' : `xmlns='http://www.w3.org/2000/svg'`,
		options.width ? `width='${options.width}'` : '',
		options.height ? `height='${options.height}'` : '',
		`viewBox='${svg.viewBox.join(' ')}'`
	].filter(a => !!a).join(wantsꓽcompact ? ' ' : `${EOL}${TAB}`)

	return [
		`<svg ${svg__atributes‿str}>`,

		// https://stackoverflow.com/questions/11293026/default-background-color-of-svg-root-element
		// other options: use a giant circle (but circle = computation heavy)
		// TODO review: bleed a little bit the rectangle? Would that be useful?
		svg.background_color
			? `<rect id='background-color' fill='${svg.background_color}' x='${svg.viewBox[0]}' y='${svg.viewBox[1]}' width='${svg.viewBox[2]}' height='${svg.viewBox[3]}' />`
			: '',

		...(svg.content as string[]), // TODO stringify

		`</svg>`
	].map(x => x.trim()).filter(x => !!x).join(wantsꓽcompact ? '' : `${EOL}${TAB}`).trim()
}

/////////////////////////////////////////////////

export {
	getꓽsvg‿str,
}
