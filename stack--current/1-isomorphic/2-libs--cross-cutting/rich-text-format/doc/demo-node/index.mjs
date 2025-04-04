console.log('Rich Text Format Demo')


import * as RichText from '@offirmo-private/rich-text-format'


import * as DEMOS from '@offirmo-private/rich-text-format/demos'


import renderⵧto_terminal from '../../../rich-text-format--to-terminal/src/index.ts'

function demo(wrapped_doc) {
	const key = Object.keys(wrapped_doc)[0]
	const doc = wrapped_doc[key]

	console.log(`\n------- ${key} -------`)

	console.log('\n------- to text -------\n' + RichText.renderⵧto_text(doc, {
		//style: 'advanced', // default
		style: 'markdown',
	}))

	if (renderⵧto_terminal) console.log('\n------- to terminal -------\n' + renderⵧto_terminal(doc))
}

////////////////////////////////////

Object.entries(DEMOS).forEach((entry) => {
	demo(Object.fromEntries([entry]))
})

// TODO actions
// TODO links
