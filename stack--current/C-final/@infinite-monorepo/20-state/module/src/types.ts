import type {
	MultiMonorepoSpec,
	Node,
	StructuredFsOutput,
	StructuredFsOutputⳇFileManifest,
} from '@infinite-monorepo/types'

/////////////////////////////////////////////////

export interface State {
	spec: MultiMonorepoSpec

	graph: {
		nodesⵧall: { [path: string]: Node }
	}

	file_manifests: Array<StructuredFsOutputⳇFileManifest>

	file_output: Array<StructuredFsOutput>
}
