/* A data structure specifying a webpage.
 * Given such a structure, we should be able to generate a corresponding html file.
 */
import { WithCharset, WithLang, WithTitle } from '../00-base/index.js'
import { Url‿str } from '../01-links/index.js'
import { Html‿str } from '../10-html/index.js'
import { Css‿str } from '../20-css/index.js'
import { JS‿str } from '../30-js/index.js'

/////////////////////////////////////////////////

// See also HtmlDocumentSpec
// this version can be seen as "simplified", focusing purely on content?
// TODO clarify cf. other type HtmlDocumentSpec
export interface Contentⳇweb extends
	WithCharset,
	WithLang,
	WithTitle
{
	// flat to make it easier to extend
	// semantic as much as we can

	// content (structure)
	// inherited: lang
	// inherited: charset
	// inherited: title // could be considered redundant: could be inferred from the content (LLM?)
	html?: Html‿str[]
	// technicalities. Ideally we'd be semantic and not want this
	htmlⵧelements__classes?: {
		// ex. 'body': ['class1', 'class2']
		// normally only UNIQUE elements should appear: html, body, main, header, footer...
		[element: string]: string[],
	}

	// presentation (formatting, layout)
	// ideally optional if html is semantic / or just an import of a default stylesheet
	css?: Css‿str[]
	// technicalities. Ideally we'd be semantic and not want this
	// or could this be aggregated from the plain css through a more advanced type?
	cssⵧtop__layers?: string[] // should be declared once and first, hence special treatment
	cssⵧtop__namespaces?: { // should be declared first, hence special treatment
		[name: string]: Url‿str
	}
	cssⵧcritical?: Css‿str[]

	// dynamic behavior or progressive enhancements
	// ideally, for augmentation only
	js?: JS‿str[]
	// technicalities. Ideally we'd be semantic and not want this
	jsⵧcritical?: JS‿str[]

	/////////////////////
	// TODO meta
	// or not considered content??
	// TODO social?
}
