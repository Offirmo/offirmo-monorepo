
import { IETFLanguageType } from './international.js'

/////////////////////////////////////////////////
// building blocks
// REFINED in @offirmo-private/ts-types-web

export type Emoji = string
export type Uri‿str = string
export type Url‿str = Uri‿str
export type Email‿str = string

export interface SocialNetworkLink {
	url: Url‿str // mandatory
	handle?: string // ex @Offirmo, u/Offirmo
	network: string // helps to parse, helps to replace
}

export interface WithOnlinePresence {
	urlⵧcanonical: Url‿str
	urlsⵧsocial?: SocialNetworkLink[] // array because it conveys the Author's preference, earlier = preferred
}

export interface Author extends WithOnlinePresence {
	name: string
	intro?: string // very short intro. TODO refine
	email?: Email‿str
	contact?: Url‿str // should not duplicate email
	since‿y?: number // for copyright notice
}

/////////////////////////////////////////////////
// Meta, tech-agnostic content

export interface Thing {
	lang?: IETFLanguageType
	title?: string // Ex. "The Boring RPG" or "La Joconde"
	description: string // must be simple, a paragraph at most
	author: Author | undefined // undef = unknown :-(
	since‿y?: number // for copyright notice
}

export interface ThingWithOnlinePresence extends Thing, WithOnlinePresence {
	contact?: Url‿str // if not provided, default to author's Ideally should be a "contact center" https://docs.aws.amazon.com/connect/latest/adminguide/connect-concepts.html
	contactⵧsecurity?: Url‿str // if not provided, default to contact
	contactⵧsupport?: Url‿str // if not provided, default to contact
}

/////////////////////////////////////////////////
// generic content

// TODO text with lang?

/*
Say the ONE thing you want people to know.
Put the most important info first.
Shrink paragraphs.
Always use action verbs.
Use more emojis. They capture attention. 🛎️
Tell your story to a friend . Then write what you said.
No unnecessary words or context. “Just say it. Then stop.”
*/
// TODO review
// see also
// https://en.wikipedia.org/wiki/Elevator_pitch
// https://en.wikipedia.org/wiki/Mission_statement
// https://en.wikipedia.org/wiki/Vision_statement
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
//export type Descriptionⳇbite_sized = string // TODO max length?? fits in a tweet?
// also very important
//export type Descriptionⳇtitle = string
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


/////////////////////////////////////////////////
// tech specific content
// TODO one day: twitter text, Slack's block kit...

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
