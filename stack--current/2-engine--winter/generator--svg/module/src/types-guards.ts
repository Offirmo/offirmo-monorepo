
import { type SVG, type SVGContainerElement, type SVGElement, type SVGGroupElement } from './types.ts'

/////////////////////////////////////////////////

function isꓽSVG(x: SVGElement): x is SVG {
	return Object.hasOwn(x, 'viewBox')
}
function isꓽSVGGroupElement(x: SVGElement): x is SVGGroupElement {
	return Object.hasOwn(x,'content')
}

/////////////////////////////////////////////////

export {
	isꓽSVG,
	isꓽSVGGroupElement,
}
