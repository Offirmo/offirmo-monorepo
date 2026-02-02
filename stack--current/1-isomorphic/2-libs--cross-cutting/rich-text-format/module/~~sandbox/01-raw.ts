import * as RichText from '@offirmo-private/rich-text-format'

let count = 0

/////////////////////////////////////////////////
// single node
count++

let $doc: RichText.NodeLike = 'Hello, world!'
demo($doc)

$doc = {
	$content: 'Hello, world!',
}
demo($doc)

/////////////////////////////////////////////////
// using a sub node
count++

$doc = {
	$content: 'Hello, ⎨⎨target⎬⎬!',
	$sub: {
		target: {
			$type: 'strong',
			$content: 'world',
		},
	},
}
demo($doc)

/////////////////////////////////////////////////
// sub-node is provided by the parent
count++

$doc = {
	$content: '⎨⎨greetings⎬⎬',
	$sub: {
		target: {
			$type: 'strong',
			$content: 'world',
		},
		greetings: 'Hello, ⎨⎨target⎬⎬!', // yes, we allow refs in primitive strings
	},
}
demo($doc)

/////////////////////////////////////////////////
// lists
// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer
count++

$doc = RichText.listⵧordered()
	.customize($doc => {
		$doc.$heading = '3 sector model'
	})
	.pushSubNodes(['primary = raw materials', 'secondary = manufacturing', 'tertiary = services'])
	.done()
demo($doc)

/////////////////////////////////////////////////
// tables
// TODO 1D

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////

function demo($doc: Immutable<RichText.NodeLike>) {
	console.log(
		`\n------- #${count} to text -------\n`
			+ RichText.renderⵧto_text($doc, {
				style: 'markdown',
			}),
	)
}
