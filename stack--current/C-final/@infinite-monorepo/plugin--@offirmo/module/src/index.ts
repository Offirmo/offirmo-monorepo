import type { Immutable } from '@monorepo-private/ts--types'

import * as StateLib from '@infinite-monorepo/state'
import type {FileOutputPresent, Plugin, State} from '@infinite-monorepo/state'
import {type Node, PATHVARⵧROOTⵧNODE} from "@infinite-monorepo/types-for-plugins";

/////////////////////////////////////////////////

/////////////////////////////////////////////////

const PLUGIN: Plugin = {
	onꓽload(state: Immutable<StateLib.State>): Immutable<StateLib.State> {
		return state
	},

	onꓽapply(state: Immutable<State>, node: Immutable<Node>) {
		switch (node?.type) {
			case 'monorepo': {
				const files = {
					'##CONTRIBUTING/01-intro.md': `
## Introduction

Welcome to this repo, thanks for browsing! (and maybe contributing?)`
				}
				Object.entries(files).forEach(([path‿ar, text]) => {
					const output_spec: FileOutputPresent = {
						parent_node: node,
						manifest: {
							path‿ar: `${PATHVARⵧROOTⵧNODE}/${path‿ar}`,
							doc: []
						},
						intent: 'present',
						content: {
							text,
						},
					}
					state = StateLib.requestꓽfile_output(state, output_spec)
				})

				break
			}
			default:
				break
		}

		return state
	},
}

/////////////////////////////////////////////////

export default PLUGIN
