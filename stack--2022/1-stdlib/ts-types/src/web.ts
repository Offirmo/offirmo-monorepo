// for readability. Unfortunately this doesn't cause a real additional safety
// TODO look in Typescript "DOM" lib

/////////////////////////////////////////////////

export type Url‿str = string // TODO new Url spec
export interface SocialUrl {
	url: Url‿str // mandatory
	handle?: string // ex @Offirmo, u/Offirmo
	network: // helps parsing
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
	critical: {
		css: Css‿str[]
		js: JS‿str[]
	},
	html: Html‿str[]
	css: Css‿str[]
	js: JS‿str[]
}
