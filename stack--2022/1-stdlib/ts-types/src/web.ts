// for readability. Unfortunately this doesn't cause a real additional safety
// TODO look in Typescript "DOM" lib

/////////////////////////////////////////////////

import { IETFLanguageType } from './international'

export type Email‿str = string // TODO spec?

export type Url‿str = string // TODO new Url spec

export interface SocialNetworkLink {
	url: Url‿str // mandatory
	handle?: string // ex @Offirmo, u/Offirmo
	network: // helps to parse. Not optional bc I can add if missing
		| 'artstation'
		| 'github'
		| 'instagram'
		| 'producthunt'
		| 'reddit'
		| 'twitter'
}

/////////////////////////////////////////////////
// HTML
export type Html‿str = string


/////////////////////////////////////////////////
// CSS
export type Css‿str = string
export type CssColor‿str = string


/////////////////////////////////////////////////
// JS
export type JS‿str = string

/////////////////////////////////////////////////
// Aggreg
export interface Contentⳇweb {
	// flat to make it easier to extend
	lang?: IETFLanguageType
	title?: string
	html?:         Html‿str[]
	cssⵧcritical?: Css‿str[]
	css?:          Css‿str[]
	js?:           JS‿str[]
	jsⵧcritical?:  JS‿str[]

	// TODO semantic (how??)
	// TODO meta?
	// TODO social?
}


/////// WEB = the most important ///////
/*
export type AuthorⳇHtmlMeta = string

export type TitleⳇHtmlMeta = string // https://developers.google.com/search/docs/appearance/title-link

export type DescriptionⳇHtmlMeta = string
*/
