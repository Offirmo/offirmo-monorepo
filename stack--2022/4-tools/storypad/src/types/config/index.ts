
import { Decorator } from '../csf'

/////////////////////////////////////////////////

export interface Config<StoryType = any> {
	root_title: string

	decorators: Decorator<StoryType>[]
}
