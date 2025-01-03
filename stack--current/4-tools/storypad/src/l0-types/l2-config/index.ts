import { RenderParams } from '../l1-csf'

/////////////////////////////////////////////////

// note: extending RenderParams is non-standard
export interface Config<StoryType = any> extends RenderParams<StoryType> {

	// https://storybook.js.org/docs/configure#configure-your-storybook-project
	addons?: never // not implemented

	// my extensions
	root_title: string
}
