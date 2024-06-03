A generic, platform independent rich text format.

It's half-way between raw text and html. It has only 1 dimension.

Can be rendered in ascii, html, react...

See /demos/*

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

Inspiration:
* "Atlassian Document Format" https://bitbucket.org/atlassian/adf-builder-javascript#readme

Related, discovered after I made mine:
* Slack's "block kit" https://api.slack.com/block-kit
  * https://api.slack.com/tools/block-kit-builder
* Twitter Text https://github.com/twitter/twitter-text


Tosort
* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
* https://formatjs.io/docs/core-concepts/icu-syntax/
