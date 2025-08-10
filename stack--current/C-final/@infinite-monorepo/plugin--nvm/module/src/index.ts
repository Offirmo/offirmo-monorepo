import type {
	Plugin,
	StructuredFsOutput,
	StructuredFsOutputⳇFileManifest,
	StructuredFsOutputⳇFullFile,
	Node,
} from '@infinite-monorepo/types'

/////////////////////////////////////////////////

const ᐧnvmrc__path: StructuredFsOutput['file_path'] = [ '$WORKSPACE_ROOT', '.nvmrc']

const ᐧnvmrc__manifest: StructuredFsOutputⳇFileManifest = {
	file_path: ᐧnvmrc__path,
	intent: 'ensure',
	format: 'text',
	doc: [
		'https://github.com/nvm-sh/nvm?tab=readme-ov-file#nvmrc',
		'https://www.npmjs.com/package/nvmrc'
	],
}

/////////////////////////////////////////////////

const PLUGIN: Plugin = {
	onꓽload() {
		output.pushManifest(nvmrcⵧmanifest)
	},

	onꓽapply(node: Node) {
		const nvmrcⵧcontent: StructuredFsOutputⳇFullFile = {
			file_path: ᐧnvmrc__path,
			lines: [ 'TODO XXX' ]
		}
		output.pushFile(nvmrcⵧcontent)
	}
}

/////////////////////////////////////////////////

export default PLUGIN
