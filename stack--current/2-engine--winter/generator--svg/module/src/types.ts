// https://developer.mozilla.org/en-US/docs/Web/SVG

import type { IETFLanguageType } from '@offirmo-private/ts-types'
import type { Url‿str, CssⳇColor‿str } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

type Svg‿str = string

type SVGViewBox = [ xmin: number, ymin: number, width: number, height: number]

type SVGId = string // TODO refine

/////////////////////////////////////////////////

// TODO better https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#length
type LengthUnit = 'px' | 'em'
type PercentageString = `${number}%`
//type Length = number | `${number}${LengthUnit}` | PercentageString
type Length = string

interface Withꓽcoordinates {
	x?: Length
	y?: Length
}

/////////////////////////////////////////////////

// https://developer.mozilla.org/en-US/docs/Web/SVG/Element#svg_elements_by_category
interface SVGElement {}

// https://developer.mozilla.org/en-US/docs/Web/SVG/Element#container_elements
interface SVGContainerElement extends SVGElement {
	desc?: string // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/desc
}

// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g
interface SVGGroupElement extends SVGContainerElement {
}

// https://developer.mozilla.org/en-US/docs/Web/SVG/Element#graphics_elements
interface SVGGraphicElement extends SVGElement {
	desc?: string // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/desc
}

// one can nest SVG elements
// https://www.sarasoueidan.com/blog/mimic-relative-positioning-in-svg/
// TODO special handling?

interface SVG extends SVGContainerElement {
	/////////////////////////////////////////////////
	// Overall properties

	// language of text / writings
	lang?: IETFLanguageType

	// viewport
	// NOT recommended to specify this
	// ideally the USER of the SVG should set this as wished
	width?: number
	height?: number

	// https://www.sarasoueidan.com/blog/svg-coordinate-systems/
	// = canvas where the SVG is drawn
	// = user coordinate system
	viewBox: SVGViewBox

	// +++ https://alistapart.com/article/practical-svg/#section2
	// +++ https://www.sarasoueidan.com/demos/interactive-svg-coordinate-system/index.html
	// recommended default `xMidYMid meet`
	preserveAspectRatio?: `x${'Min' | 'Mid' | 'Max'}Y${'Min' | 'Mid' | 'Max'} ${'meet' | 'slice'}`

	metadata: {
		// TODO
	}

	xml_namespaces: {
		[NamespaceId: string]: Url‿str
	}

	// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/style
	styles: {
		// TODO
		// TODO currentColor?
	}

	// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/script
	// WARNING for security purposes those scripts are often disabled cf. https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_as_an_Image#restrictions
	scripts: {
		// TODO
	}


	/////////////////////////////////////////////////
	// Building blocks

	// reusable elements https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
	// see also https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use
	defs: {
		[id: SVGId]: SVGElement
		// TODO patterns https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern
	}
	// TODO defs vs Symbols??
	// https://stackoverflow.com/questions/71180423/in-svg-whats-the-difference-between-using-symbol-versus-using-an-object-defi
	symbols: {
		// TODO
	}

	// reusable links
	links: {
		[id: string]: never // TODO
	}

	// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter
	filters: {
		// TODO
	}

	/////////////////////////////////////////////////
	// output

	// CONVENIENCE for setting an overall background color
	// - good semantic
	// - helps when composing
	// - helps when rasterizing (cf. options of https://github.com/yisibl/resvg-js#nodejs-1)
	background_color?: CssⳇColor‿str

	// order is important
	content: Array<
		| SVGElement
		| SVG
		| string
	>

	// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/view
	// A view is a defined way to view the image, like a zoom level or a detail view.
	// = it's an alternative viewbox
	// can be used for a "sprite-like" svg
	// see also https://caniuse.com/svg-fragment
	views: {
		[id: SVGId]: SVGViewBox
	}
}

/////////////////////////////////////////////////

export {
	type Svg‿str,

	type SVGViewBox,
	type SVGId,

	type SVGElement,
	type SVGContainerElement,
	type SVGGraphicElement,

	type SVG,
}
