import * as RichText from '@offirmo-private/rich-text-format'

/////////////////////////////////////////////////

let $doc = RichText.fragmentⵧinline().pushText('Hello, world!').done()

console.log(
	'\n------- to text -------\n'
		+ RichText.renderⵧto_text($doc, {
			style: 'markdown',
		}),
)

/////////////////////////////////////////////////
// using a sub node

$doc = RichText.fragmentⵧinline()
	.pushText('Hello, ')
	.pushSubNodes({ target: RichText.strong('world').done() })
	.pushText('!')
	.done()

console.log(
	'\n------- to text -------\n'
		+ RichText.renderⵧto_text($doc, {
			style: 'markdown',
		}),
)

/////////////////////////////////////////////////
// sub-node is provided by the parent

$doc = RichText.fragmentⵧinline().pushText('Hello, ').pushRef('target').pushText('!').done()

let $wrapper = RichText.fragmentⵧblock()
	.addSubs({ target: 'world' })
	.pushSubNodes({ greetings: $doc })
	.done()

console.log(
	'\n------- to text -------\n'
		+ RichText.renderⵧto_text($wrapper, {
			style: 'markdown',
		}),
)

/////////////////////////////////////////////////
// lists

$doc = RichText.listⵧordered()
	.customize($doc => {
		$doc.$heading = '3 sector model'
	})
	.pushSubNodes(['primary = raw materials', 'secondary = manufacturing', 'tertiary = services'])
	.done()

console.log(
	'\n------- to text -------\n'
		+ RichText.renderⵧto_text($wrapper, {
			style: 'markdown',
		}),
)

/////////////////////////////////////////////////
// tables

/*
import * as DEMOS from '@offirmo-private/rich-text-format/demos'

function demo(wrapped_doc) {
	const key = Object.keys(wrapped_doc)[0]
	const doc = wrapped_doc[key]

	console.log(`\n------- ${key} -------`)

	console.log('\n------- to text -------\n' + RichText.renderⵧto_text(doc, {
		//style: 'advanced', // default
		style: 'markdown',
	}))

	if (renderⵧto_terminal)
}

Object.entries(DEMOS).forEach((entry) => {
	demo(Object.fromEntries([entry]))
})

// TODO actions
// TODO links
*/
