// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

import assert from 'tiny-invariant'
import { Immutable, Html‿str, JS‿str, Css‿str } from '@offirmo-private/ts-types'
import { normalize_unicode } from '@offirmo-private/normalize-string'

import { EOL } from '../consts.js'
import { WebsiteEntryPointSpec } from '../types.js'
import { HtmlDocumentSpec, FeatureSnippets, generate as generate_html } from '../utils/html/index.js'
import { HtmlMetaContentⳇViewport, HtmlMetas } from './types.js'
import {
	getꓽlang,
	getꓽtitleⵧpage,
	getꓽtitleⵧsocial,
	getꓽdescriptionⵧpage,
	getꓽcolorⵧtheme,
	getꓽcolorⵧbackground,
	getꓽcolorⵧforeground,
	usesꓽpull_to_refresh,
	needsꓽwebmanifest,
	getꓽbasenameⵧwebmanifest,
	shouldꓽgenerateꓽsourcecode,
	getꓽfeatures,
} from '../selectors.js'
import { ifꓽdebug } from '../utils/debug.js'
import { getꓽmetas } from './selectors.js'
import snippetꓽcssⳇcssⳇboxᝍlayoutⵧnatural from './snippets/css/box-layout--natural.js'
import snippetꓽcssⳇviewportⵧfull from './snippets/css/viewport--full.js'
import snippetꓽjsⳇnormalizeᝍtrailingᝍslash from './snippets/js/snippet--normalize-url.js'
import snippetꓽhtmlⳇcontentⵧauto from './snippets/html/content--auto.js'
import snippetꓽhtmlⳇreact_root from './snippets/html/react-root'

import {
	generateꓽinline as generateꓽfavicon__iconⵧinline,
} from '../generate--icons/index.js'

/////////////////////////////////////////////////




/////////////////////////////////////////////////

function generate(spec: Immutable<WebsiteEntryPointSpec>): Html‿str {
	const doc_spec = getꓽhtml_doc_spec(spec)
	const result = generate_html(doc_spec)

	// TODO check IW10 <14k https://developers.google.com/speed/docs/insights/mobile#delivering-the-sub-one-second-rendering-experience
	return normalize_unicode(result)
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
