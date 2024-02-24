import assert from 'tiny-invariant'
import { Immutable, Contentⳇweb, Css‿str, Html‿str, JS‿str, IETFLanguageType } from '@offirmo-private/ts-types'

import { HtmlDocumentSpec, FeatureSnippets } from './types.js'

import snippetꓽcssⳇboxᝍlayoutⵧnatural from './snippets/css/box-layout--natural.js'
import snippetꓽcssⳇviewportⵧfull from './snippets/css/viewport--full.js'
import snippetꓽhtmlⳇcontentⵧauto from './snippets/html/content--auto.js'
import snippetꓽhtmlⳇreact_root from './snippets/html/react-root'
import snippetꓽjsⳇnormalizeᝍtrailingᝍslash from './snippets/js/snippet--normalize-url.js'

/////////////////////////////////////////////////
// extends Contentⳇweb

export * from '../selectors/web-content.js'
import {
	getꓽhtml,
	getꓽcss,
	getꓽjs,
	getꓽcssⵧcritical,
	getꓽjsⵧcritical,
} from '../selectors/web-content'

/////////////////////////////////////////////////
// HtmlDocumentSpec

function getꓽspecⵧwith_features_expanded(spec: Immutable<HtmlDocumentSpec>): Immutable<HtmlDocumentSpec> {
	const with_features_expanded = { ...spec }

	const { features = [] } = spec

	features.forEach(feature_id => {

		switch (feature_id) {
			case 'analytics--google':
			case 'site-verification--google':
			case 'page-loader--offirmo':
				console.warn(`TODO implement feature: ${feature_id}!`)
				break

			case 'cssⳇbox-layout--natural':
				with_features_expanded.cssⵧcritical = [ ...getꓽcssⵧcritical(with_features_expanded), snippetꓽcssⳇboxᝍlayoutⵧnatural ]
				break

			case 'cssⳇviewport--full':
				with_features_expanded.cssⵧcritical = [ ...getꓽcssⵧcritical(with_features_expanded), snippetꓽcssⳇviewportⵧfull ]
				break

			case 'normalize-url-trailing-slash':
				with_features_expanded.jsⵧcritical = [ ...getꓽjsⵧcritical(with_features_expanded), snippetꓽjsⳇnormalizeᝍtrailingᝍslash ]
				break

			case 'htmlⳇreact-root':
				with_features_expanded.html = [ ...getꓽhtml(with_features_expanded), snippetꓽhtmlⳇreact_root(spec) ]
				break

			case 'cssⳇfoundation--offirmo':
				with_features_expanded.css = [ ...getꓽcss(with_features_expanded), `@import 'npm:@offirmo-private/css--foundation' layer(foundation);` ]
				break

			case 'cssⳇframework--offirmo':
				with_features_expanded.css = [ ...getꓽcss(with_features_expanded), `@import 'npm:@offirmo-private/css--framework'  layer(framework);` ]
				break

			default:
				throw new Error(`Unknown feature: ${feature_id}!`)
		}

	})

	if (getꓽhtml(with_features_expanded).length === 0) {
		with_features_expanded.html = [ snippetꓽhtmlⳇcontentⵧauto(spec) ]
	}

	if (getꓽjs(with_features_expanded).length === 0) {
		with_features_expanded.js = [ `console.log('Hello, world!')` ]
	}
	else {
		with_features_expanded.html = [ `<noscript>You need to enable JavaScript to run this app.</noscript>`, ...getꓽhtml(with_features_expanded) ]
	}

	return with_features_expanded
}

/////////////////////////////////////////////////

export {
	getꓽspecⵧwith_features_expanded,
}
