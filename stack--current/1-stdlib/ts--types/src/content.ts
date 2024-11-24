
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

/////// package.json ///////
// author
// description
// version
