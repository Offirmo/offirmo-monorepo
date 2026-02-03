import * as RichText from '@offirmo-private/rich-text-format'

let count = 0

/////////////////////////////////////////////////
// single node

base1: {
	count++
	let $doc: RichText.NodeLike = 'Hello, world!'
	demo($doc)
}

base2: {
	count++
	let $doc: RichText.NodeLike = {
		$content: 'Hello, world!',
	}
	demo($doc)
}

/////////////////////////////////////////////////

sub_node: {
	count++
	let $doc: RichText.NodeLike = {
		$content: 'Hello, ⎨⎨target⎬⎬!',
		$refs: {
			target: {
				$type: 'strong',
				$content: 'world',
			},
		},
	}
	demo($doc)
}

/////////////////////////////////////////////////
// sub-node is provided by the parent
sub_node_inherited: {
	count++

	let $doc: RichText.NodeLike = {
		$content: '⎨⎨greetings⎬⎬',
		$refs: {
			target: {
				$type: 'strong',
				$content: 'world',
			},
			greetings: 'Hello, ⎨⎨target⎬⎬!', // yes, we allow refs in primitive strings
		},
	}
	demo($doc)
}


/////////////////////////////////////////////////
// lists
// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer

list: {
	count++
	const $doc = {
		$type: 'ol',
		$heading: '3 sector model',
		$content: [
			'primary = raw materials',
			'secondary = manufacturing',
			'tertiary = services'
		],
	}
	demo($doc)
}


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
