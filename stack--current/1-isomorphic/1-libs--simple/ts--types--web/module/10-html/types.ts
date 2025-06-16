/* TypeScript types useful when manipulating HTML
 */

/////////////////////////////////////////////////

export type Html‿str = string


export interface Dimensions2D {
	width: number
	height: number
}
export interface Dimensions2DSpec {
	// should define at least 2
	// should be coherent if all 3
	width?: number
	height?: number
	aspect_ratio?: number
}

// TODO look in Typescript "DOM" lib



/*
export type AuthorⳇHtmlMeta = string

export type TitleⳇHtmlMeta = string // https://developers.google.com/search/docs/appearance/title-link

export type DescriptionⳇHtmlMeta = string
*/
