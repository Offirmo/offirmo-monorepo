/* PROMPT
 */

import { IETFLanguageType } from '@offirmo-private/ts-types'

import { Html‿str } from '../10-html/index.js'
import { Css‿str } from '../20-css/index.js'
import { JS‿str } from '../30-js/index.js'

/////////////////////////////////////////////////

export interface Contentⳇweb {
	// flat to make it easier to extend
	// semantic as much as we can

	// content (structure)
	html?: Html‿str[]
	title?: string // technically redundant, could be inferred from the html

	// presentation (formatting, layout)
	// ideally optional if html is semantic
	css?: Css‿str[]
	cssⵧcritical?: Css‿str[]

	// dynamic behavior or progressive enhancements
	// ideally, for augmentation only
	js?: JS‿str[]
	jsⵧcritical?: JS‿str[]

	/////////////////////
	// meta

	// TODO meta?
	// TODO social?
}
