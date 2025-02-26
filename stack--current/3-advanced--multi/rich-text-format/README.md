
A generic, platform-independent, rich text format

The goal is to
- be semantic
- be render-able in both terminal and browser = ascii, html, react...
- being able to be serialized and transferred across protocols
- being usable as a Hypermedia representation for true REST
- challenge JSON, markdown, HTML in some aspects

This format is half-way between raw text and html, a bit similar to Markdown.

It has only 1 dimension (flow) but hints can be added to render in a more fancy way if supported. Ex. a "ul/ol" hint.

It has an underlying JSON structure. See `/demos/*`

A notable difference with other document formats (Atlassian, Slack...) is that we don't have an array of children.
Instead, a text with references to other nodes is used. Advantages:
- a bit more readable
- we can re-use nodes
- we can over-supply nodes and not always use them
Disadvantages
- verbose for lists


```js
import * as RichText from '@offirmo-private/rich-text-format'

const $doc = RichText.fragmentⵧblock()
		.pushNode(RichText.heading().pushText('Identity:').done(), {id: 'header'})
		.pushNode(
			RichText.listⵧunordered()
				.pushKeyValue('name', $doc_name)
				.pushKeyValue('class', $doc_class)
				.done()
		)
		.done()

console.log(RichText.renderⵧto_text($doc))
console.log(RichText.renderⵧto_actions($doc))
```

```ts
import type { Immutable } from '@offirmo-private/ts-types'

import {
	type BaseRenderingOptions,
	DEFAULT_RENDERING_OPTIONSⵧWalk,
	type WalkerCallbacks,
	walk,
} from '@offirmo-private/rich-text-format'

```
Inspiration:
* "Atlassian Document Format" https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/

Related, discovered after I made mine:
* Slack's "block kit" https://api.slack.com/block-kit
  * https://api.slack.com/tools/block-kit-builder
* Twitter Text https://github.com/twitter/twitter-text
* +++ Siren: a hypermedia specification for representing entities https://github.com/kevinswiber/siren

Tosort
* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
* https://formatjs.io/docs/core-concepts/icu-syntax/


TODO add hypermedia as first class?

TODO i18n compatibility!

TODO one day add a linting feature:
- lint types etc.

`⎨⎨foo|Capitalize⎬⎬`
