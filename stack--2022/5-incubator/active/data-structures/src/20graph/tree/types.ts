/* GENERIC types for a generic tree
 * Those types should NOT assume any particular implementation.
 */
import { Immutable } from '../../00vendor/@offirmo-private/ts-types/index.js'
import { Node, Graph } from '../types.js'

/////////////////////////////////////////////////

export interface Tree<NodePayload, Options> extends Graph<NodePayload, undefined, Options> {
	root: Node<NodePayload> | undefined
}

/////////////////////////////////////////////////

//type createFn<NodePayload, LinkPayload, Options> = (options?: Options) => Graph<NodePayload, LinkPayload, Options>

/////////////////////////////////////////////////