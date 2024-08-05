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
	// technicalities. Ideally we'd be fully semantic and not need this
	// allow to add classes and data-x to the root element.
	// if standalone page, root = <html>
	// but could also be any container if embedded.
	// ex. 'body': ['.class1', 'data-o-theme="dark--default"']
	html__root__attributes?: [ `.${string}` | `data-${string}="${string}"` ]

	// presentation (formatting, layout)
	// ideally optional if html is semantic / or just an import of a default stylesheet
	css?: Css‿str[]
	// technicalities. Ideally we'd be semantic and not want this
	// or could this be aggregated from the plain css through a more advanced type?
	cssⵧtop__layers?: string[] // should be declared once and first, hence special treatment to avoid duplicates/conflicts
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
