/* PROMPT
 */

import { IETFLanguageType } from '@offirmo-private/ts-types'

import { Html‿str } from '../10-html/index.js'
import { Css‿str } from '../20-css/index.js'
import { JS‿str } from '../30-js/index.js'

/////////////////////////////////////////////////

export interface Contentⳇweb {
	// flat to make it easier to extend

	/////////////////////
	// semantic (as much as we can)
	lang?: IETFLanguageType

	title?: string

	// should be as semantic as possible
	html?:         Html‿str[]

	/////////////////////
	// presentation

	// ideally optional if html is semantic
	css?:          Css‿str[]

	/////////////////////
	// advanced

	// ideally, for augmentation only
	js?:           JS‿str[]

	/////////////////////
	// meta

	// TODO meta?
	// TODO social?

	/////////////////////
	// technical
	// implementation dependent
	cssⵧcritical?: Css‿str[]
	jsⵧcritical?:  JS‿str[]
}
