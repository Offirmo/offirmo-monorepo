import stylize_string from 'chalk'

import {
	DEFAULT_RENDERING_OPTIONSⵧToText,
	renderⵧto_text,
} from '@offirmo-private/rich-text-format'

/////////////////////////////////////////////////

const LIB = '@offirmo-private/rich-text-format--to-terminal'

const DEFAULT_RENDERING_OPTIONSⵧToAnsi = Object.freeze({
	...DEFAULT_RENDERING_OPTIONSⵧToText,
})

/////////////////////////////////////////////////

// TODO handle boxification ? (needed?)

////////////

// TODO handle clickable links https://github.com/sindresorhus/terminal-link
// TODO handle pictures https://github.com/sindresorhus/terminal-image

function on_type({ $type, $parent_node, state, $node, depth }, options) {
	//console.log(`${LIB} on_type()`)
	switch($type) {
		case 'heading':
			/* fallthrough */
		case 'strong':
			state.str = stylize_string.bold(state.str)
			break
		case 'em':
			state.str = stylize_string.italic(state.str)
			break
		case 'weak':
			state.str = stylize_string.dim(state.str)
			break
		default:
			break
	}

	return state
}

// TODO remove and put somewhere else? (extensible)
function on_classⵧafter({ $class, state, $node, depth }, options) {

	// not implemented!
	// TODO one day...
	//console.log(`${LIB} on_classⵧafter()`)
	//const { $hints } = $node
	//console.warn(`${LIB}: NIMP class "${$class}", ignored.`) // todo avoid repetition

	return state
}

const callbacksⵧto_terminal = {
	on_type,
	on_classⵧafter,
}

function renderⵧto_terminal(doc, callback_overrides = {}) {
	//console.log(`${LIB} Rendering:`, doc)
	return renderⵧto_text(
		doc,
		{
			style: 'advanced',
		},
		{
			...callbacksⵧto_terminal,
			...callback_overrides,
		},
	)
}

/////////////////////////////////////////////////

export default renderⵧto_terminal

export {
	LIB,

	renderⵧto_terminal,

	callbacksⵧto_terminal,
}
