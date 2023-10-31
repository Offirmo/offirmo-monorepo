// TODO render to file
// TODO render inline https://speckyboy.com/inline-svg/
// TODO able to inject width & height

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { EOL, TAB } from '../../consts.js'
import { SVG } from './types.js'

/////////////////////////////////////////////////

// Note that we use single quotes for embeddability in head / css
function renderꓽsvg(svg: Immutable<SVG>, options: {
	//width?: number,
	//heigth?: number
	// TODO embedded?
	wantsꓽcompact?: boolean // if true, omit pedantic stuff and EOL, tabs
} = {}): string {
	const wantsꓽcompact = options.wantsꓽcompact ?? false

	const svg__atributes‿str = [
		`xmlns='http://www.w3.org/2000/svg'`,
		`viewBox='${svg.viewBox.join(' ')}'`
	].filter(a => !!a).join(wantsꓽcompact ? ' ' : `${EOL}${TAB}`)


	return [
		`<svg ${svg__atributes‿str}>`,
		...(svg.content as string[]), // TODO stringify
		`</svg>`
		].map(x => x.trim()).filter(x => !!x).join(wantsꓽcompact ? '' : `${EOL}${TAB}`).trim()
}

/////////////////////////////////////////////////

export * from './types.js'
export * from './reducers.js'
export {
	renderꓽsvg,
}
