// https://developer.mozilla.org/en-US/docs/Web/HTML/Element
// 2024/05/27
//
// element vs tag: tag = name of the element = source code
// https://developer.mozilla.org/en-US/docs/Glossary/Tag
// https://developer.mozilla.org/en-US/docs/Glossary/Element

/////////////////////////////////////////////////

const HTML_ELEMENTSⵧDEPRECATED = [
	'acronym',
	'big',
	'center',
	'dir',
	'font',
	'frame',
	'frameset',
	'marquee',
	'menuitem', // also non-standard
	'nobr',
	'noembed',
	'noframes',
	'param',
	'plaintext',
	'rb',
	'rtc',
	'strike',
	'tt',
]

const HTML_ELEMENTSⵧEXPERIMENTAL = [
	'fencedframe',
	'portal',
]

const HTML_ELEMENTS = [
	'a',
	'abbr',
	'address',
	'area',
	'article',
	'aside',
	'audio',
	'b',
	'base',
	'bdi',
	'bdo',
	'blockquote',
	'body',
	'br',
	'button',
	'canvas',
	'caption',
	'cite',
	'code',
	'col',
	'colgroup',
	'data',
	'datalist',
	'dd',
	'del',
	'details',
	'dfn',
	'dialog',
	'div',
	'dl',
	'dt',
	'em',
	'embed',
	'fieldset',
	'figcaption',
	'figure',
	'footer',
	'form',
	'h1',
	'head',
	'header',
	'hgroup',
	'hr',
	'html',
	'i',
	'iframe',
	'img',
	'input',
	'ins',
	'kbd',
	'label',
	'legend',
	'li',
	'link',
	'main',
	'map',
	'mark',
	'menu',
	'meta',
	'meter',
	'nav',
	'noscript',
	'object',
	'ol',
	'optgroup',
	'option',
	'output',
	'p',
	'picture',
	'pre',
	'progress',
	'q',
	'rp',
	'rt',
	'ruby',
	's',
	'samp',
	'script',
	'search',
	'section',
	'select',
	'slot',
	'small',
	'source',
	'span',
	'strong',
	'style',
	'sub',
	'summary',
	'sup',
	'table',
	'tbody',
	'td',
	'template',
	'textarea',
	'tfoot',
	'th',
	'thead',
	'time',
	'title',
	'tr',
	'track',
	'u',
	'ul',
	'var',
	'video',
	'wbr',
	'xmp',
]

/////////////////////////////////////////////////

export {
	HTML_ELEMENTS,
	HTML_ELEMENTSⵧEXPERIMENTAL,
	HTML_ELEMENTSⵧDEPRECATED,
}