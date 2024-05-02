
import { Config } from '../../types/config'
import { StoryUId, StoryTree } from '../types'

/////////////////////////////////////////////////

export interface State {
	config: Config

	first_encountered_story‿uid: StoryUId | undefined

	tree: StoryTree
}
