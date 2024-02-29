/* TypeScript types useful when manipulating CSS
 */

/////////////////////////////////////////////////

export type Css‿str = string
export type CssColor‿str = string


// https://developer.mozilla.org/en-US/docs/Web/CSS/font-family
export type FontFamilyGenericName =
	| 'serif'
	| 'sans-serif'
	| 'monospace'
	| 'cursive'
	| 'fantasy'
	| 'system-ui'
	| 'ui-serif'
	| 'ui-sans-serif'
	| 'ui-monospace'
	| 'ui-rounded'
	| 'emoji'
	| 'math'
	| 'fangsong'


export interface Withꓽfontᝍfamily {
	'font-family': Array<string | FontFamilyGenericName>
}
