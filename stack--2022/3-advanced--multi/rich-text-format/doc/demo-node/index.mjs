console.log('Rich Text Format Demo')

import * as RichText from '@offirmo-private/rich-text-format'

import {
	DOC_DEMO_BASE_TYPES,
	DOC_DEMO_ADVANCED_TYPES,
	DOC_DEMO_HINTS,
	DOC_DEMO_RPG_01,
	DOC_DEMO_RPG_02,
	DOC_DEMO_RPG_03,
	DOC_DEMO_INVENTORY,
} from '../examples.mjs'

import renderⵧto_ansi from '../../../rich-text-format--to-ansi/index.mjs'

function demo(wrapped_doc) {
	const key = Object.keys(wrapped_doc)[0]
	const doc = wrapped_doc[key]

	console.log(`\n------- ${key} -------`)

	console.log('\n------- to text -------\n' + RichText.to_text(doc))

	if (renderⵧto_ansi) console.log('\n------- to ansi -------\n' + renderⵧto_ansi(doc))
}

////////////////////////////////////

demo({DOC_DEMO_BASE_TYPES})
demo({DOC_DEMO_ADVANCED_TYPES})
demo({DOC_DEMO_HINTS})
demo({DOC_DEMO_RPG_01})
demo({DOC_DEMO_RPG_02})
demo({DOC_DEMO_RPG_03})
demo({DOC_DEMO_INVENTORY})

// TODO actions
// TODO links
