/////////////////////////////////////////////////
// building blocks
import { JSONObject } from './json.js'
import { IETFLanguageType } from './international.js'
import { Html‿str, Url‿str, SocialUrl } from './web.js'

/////////////////////////////////////////////////
// building blocks

export type Emoji = string

export type SemVer = string // TODO better? https://semver.org/

// TODO review
/*

// Tagged union types
export interface Contentⳇplainᝍtext {
	type: 'plain-txt'
	content: string
}
export interface Contentⳇmarkdown {
	type: 'md'
	content: string
}
export interface Contentⳇoffirmoᝍrichᝍtext {
	type: 'offirmoᝍrichᝍtext'
	content: JSONObject
}
export interface Contentⳇhtml {
	type: 'html'
	content: Html‿str
}

export type Content =
	| string
	| Contentⳇplainᝍtext
	| Contentⳇmarkdown
	| Contentⳇoffirmoᝍrichᝍtext
//	| Contentⳇhtml No, Html is more an end format, we only want generic ones
//	| Contentⳇweb No, Content is often a building block to build a web page
*/

export type License‿SPDX = string // SPDX license expression syntax version 2.0 string https://spdx.org/licenses/

export interface WithOnlinePresence {
	urlⵧcanonical: Url‿str
	urlsⵧsocial?: SocialUrl[]
}

export interface Author extends WithOnlinePresence {
	name: string
	contact?: Url‿str
}

// https://en.wikipedia.org/wiki/Impressum
export interface Impressum {
	// Only for germany, TODO one day
}

/////////////////////////////////////////////////
// Meta, tech-agnostic content

export interface Thing {
	lang?: IETFLanguageType
	description: string // must be simple, a paragraph at most
	author: Author | undefined // undef = unknown :-(
	license: License‿SPDX | undefined // undef = unknown :-(
}

export interface ThingWithOnlinePresence extends Thing, WithOnlinePresence {
	version?: SemVer
	changelog?: Url‿str
	source?: Url‿str // if relevant
	contact?: Url‿str // if not provided, default to author's
	contactⵧsecurity?: Url‿str // if not provided, default to contact
}

//
// Content length?
// single line = 50-75 ch https://baymard.com/blog/line-length-readability
// SMS = 160 ch
// Tweet (original) = 140 ch (SMS - margin)
// Tweet (now) = 280 ch
//       ref https://blog.twitter.com/en_us/topics/product/2017/Giving-you-more-characters-to-express-yourself
//           https://blog.twitter.com/engineering/en_us/topics/insights/2017/Our-Discovery-of-Cramming
// Google Search Snippet = ?

// the most important
export type Descriptionⳇbite_sized = string // TODO max length?? fits in a tweet?

// also very important
export type Descriptionⳇtitle = string

// see also
// https://en.wikipedia.org/wiki/Elevator_pitch
// https://en.wikipedia.org/wiki/Mission_statement
// https://en.wikipedia.org/wiki/Vision_statement


/////////////////////////////////////////////////
// generic content




/////////////////////////////////////////////////
// tech specific content
// TODO one day: twitter text, Slack's block kit...

/////// WEB = the most important ///////

export type AuthorⳇHtmlMeta = string

export type TitleⳇHtmlMeta = string // https://developers.google.com/search/docs/appearance/title-link

export type DescriptionⳇHtmlMeta = string


/////// package.json ///////
// author
// description
// version



// Google search
// NO! Useless, we have no control over this...
//export type GoogleSearchTitle = string // https://developers.google.com/search/docs/appearance/title-link
//export type GoogleSearchSnippet = string // https://developers.google.com/search/docs/appearance/snippet
//export type GoogleSearchSiteName = string // https://developers.google.com/search/docs/appearance/site-names#how-to-add-structured-data
// see also https://support.google.com/knowledgepanel/answer/9787176


// Open Graph

// ...

// App stores...