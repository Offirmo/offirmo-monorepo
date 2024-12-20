

export default function report(parent, LIB) {
	const node = LIB.create_node('Environment')


	LIB.add_child(parent, node)
}


// TODO check if dev!
// TODO check browser
// are we a window or a worker?
// TODO listen to all postMessages
// TODO detect webextensions?
// https://developer.mozilla.org/en-US/docs/Web/Privacy/State_Partitioning
