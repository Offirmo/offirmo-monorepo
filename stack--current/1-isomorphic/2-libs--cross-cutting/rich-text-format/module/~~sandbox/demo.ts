
import * as RichText from '@offirmo-private/rich-text-format'

const $doc = RichText.fragmentⵧinline()
	.pushText('Hello ')
	.pushNode('world', { id: 'target'})
	.pushText('!')
	.done()

console.log('\n------- to text -------\n' + RichText.renderⵧto_text($doc, {
	style: 'markdown',
}))

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
