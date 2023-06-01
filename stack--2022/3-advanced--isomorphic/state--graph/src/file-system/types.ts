import { Graph } from '../generic/index.js'

/////////////////////////////////////////////////

type Path = string

interface FileSystem {
	options: {
		separator: string
	}

	graph: Graph
}

/////////////////////////////////////////////////

export {
	type Path,
	type FileSystem,
}
