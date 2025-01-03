
import { Config } from '../../../l0-types/l2-config'

import { StoryUId, StoryTree } from '../types.ts'

/////////////////////////////////////////////////

export interface State {
	config: Config

	first_encountered_story‿uid: StoryUId | undefined

	tree: StoryTree
}
