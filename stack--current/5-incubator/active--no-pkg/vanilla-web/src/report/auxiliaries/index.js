

// TODO
// TODO workers https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

import { LIB } from '../consts.js'
/*

 */



function reportꓽoriginsⵧcommunicating(parent, LIB) {
	const node = LIB.create_node('postMessage() spying')

	node.references.push(
		'https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel'
	)

	LIB.try_or_report(node, 'listening to messages…', () => {
		const originsSet = new Set()

		window.addEventListener("message",(event) => {
			console.log(event)
		});

		const bc = new BroadcastChannel(LIB)
		bc.postMessage('Hi!')

		node.results.push(['Seen origins =', originsSet])
	})

	LIB.add_child(parent, node)
}


function reportꓽsubframes(parent, LIB) {
	const node = LIB.create_node('Sub Frames')

	node.references.push(
		'iframes https://developer.mozilla.org/en-US/docs/Web/API/Window/frames',
	)

	/* TODO
	LIB.try_or_report(node, 'trying Y', () => {
		throw new Error('TEST error!')
	})
	*/

	LIB.add_child(parent, node)
}


export default function report(parent, LIB) {
	const node = LIB.create_node('Auxiliaries')

	reportꓽoriginsⵧcommunicating(node, LIB)
	reportꓽsubframes(node, LIB)

	LIB.add_child(parent, node)
}
