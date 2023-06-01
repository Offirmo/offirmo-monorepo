import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import * as Graph from '../generic/index.js'

import { FileSystem, Path } from './types.js'

/////////////////////////////////////////////////

function getꓽfiles(fs: Immutable<FileSystem>): Path[] {
	const nodes‿cuid = Graph.getꓽnodes‿cuid(fs.graph)
	return nodes‿cuid.filter(cuid => !cuid.endsWith(fs.options.separator))
}

/////////////////////////////////////////////////

export {
	getꓽfiles,
}
