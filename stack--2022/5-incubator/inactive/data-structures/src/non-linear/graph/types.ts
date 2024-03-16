/* GENERIC types for a generic graph
 * Those types should NOT assume any particular implementation.
 */

/////////////////////////////////////////////////

type NodeUId = string
type LinkUId = string

interface WithOptions<Options> {
	options: Options
}

interface WithPayload<Payload> {
	payload: Payload
}

interface Node<NodePayload> extends WithPayload<NodePayload> {
	uid: NodeUId
}

interface Link<LinkPayload> extends WithPayload<LinkPayload>{
	uid: LinkUId

	from: NodeUId
	to: NodeUId
}

interface Graph<NodePayload = undefined, LinkPayload = undefined, Options = {}> extends WithOptions<Options> {
}

/////////////////////////////////////////////////

export {
	type Graph,
	type Node, type NodeUId,
	type Link, type LinkUId,
}
