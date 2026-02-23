import type { Immutable } from '@monorepo-private/ts--types'
import {
	PATHVARⵧROOTⵧNODE,
	type StructuredFsⳇFileManifest,
	type NodeRelativePath,
	type Node,
} from '@infinite-monorepo/types'
import * as StateLib from '@infinite-monorepo/state'
import type { FileOutputPresent, State } from '@infinite-monorepo/state'
import { manifestꓽᐧgitignore } from '@infinite-monorepo/plugin--git'

/////////////////////////////////////////////////

const ᐧeditorconfig__path‿ar: NodeRelativePath = `${PATHVARⵧROOTⵧNODE}/.editorconfig`

const manifestꓽᐧeditorconfig: StructuredFsⳇFileManifest = {
	path‿ar: ᐧeditorconfig__path‿ar,
	format: 'text',
	doc: [
		'https://editorconfig.org/',
		'https://spec.editorconfig.org/',
		'https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties',
	],
}

/////////////////////////////////////////////////

const PLUGIN: Plugin = {
	onꓽload(state: Immutable<StateLib.State>): Immutable<StateLib.State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽᐧeditorconfig)

		return state
	},

	onꓽapply(state: Immutable<State>, node: Immutable<Node>) {
		switch (node?.type) {
			case 'workspace': {
				const output_spec: FileOutputPresent = {
					parent_node: node,
					manifest: manifestꓽᐧeditorconfig,
					intent: 'present--exact',
					content: {
						text: `
# EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs
# editorconfig.org

# top-most EditorConfig file
root = true


[*]
charset = utf-8
trim_trailing_whitespace = true
end_of_line = lf
insert_final_newline = true
# tab with visual width 3
indent_style = tab
indent_size = tab
tab_width = 3


[*.md]
## markdown has its own syntax
indent_style = space
indent_size = 2
## https://github.com/microsoft/vscode/issues/1679
trim_trailing_whitespace = false


## non standard EditorConfig entries
## https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties
[*]
indent_brace_style = K&R
max_line_length = off
quote_type = single
spaces_around_operators = true
						`.trim(),
					},
				}
				state = StateLib.requestꓽfile_output(state, output_spec)
				break
			}
			// TODO 1D any node where parent node != current node
			default:
				break
		}

		return state
	},
}

/////////////////////////////////////////////////

export default PLUGIN
export { PLUGIN, manifestꓽᐧeditorconfig }
