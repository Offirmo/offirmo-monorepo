import { type Immutable } from '@offirmo-private/ts-types'
import { Html‿str } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

export type GenericStory = unknown
export type GenericStoryOutput = Html‿str // TODO extend return type
export type GenericStoryComponent = any // TODO type better, can be a React component, a simple function, a web component as class...

/////////////////////////////////////////////////
// https://storybook.js.org/docs/writing-stories/args
// https://storybook.js.org/docs/writing-stories#using-args

export type GenericArg = any // TODO type better

export interface GenericArgs {
	[key: string]: GenericArg
}

// TODO argTypes
// Storybook's argTypes allow you to customize and fine-tune your stories args

/////////////////////////////////////////////////
// https://storybook.js.org/docs/api/parameters

export interface Parameters {
	// https://storybook.js.org/docs/api/parameters#available-parameters
	// TODO layout: 'centered' | 'fullscreen' | 'padded' // Default: 'padded'
	//pageLayout = 'page' (or 'page-mobile'
}

/////////////////////////////////////////////////
// https://storybook.js.org/docs/writing-stories/decorators

// https://storybook.js.org/docs/writing-stories/decorators#context-for-mocking
export interface StoryContext {
	args: GenericArgs
	//argTypes: unknown
	//globals: unknown
	//hooks: unknown
	//parameters: unknown
	//viewMode: unknown
}
export interface Decorator<StoryType = GenericStory> {
	(story: StoryType, context: StoryContext): StoryType
}

/////////////////////////////////////////////////

/** Basic params present possible on all stories and meta
 */
export interface RenderParams<StoryType = GenericStory> {
	// can have neither, extending another RenderParams or simply being empty!
	component?: GenericStoryComponent
	render?: (args: GenericArgs) => GenericStoryOutput

	parameters?: Parameters | undefined

	args?: GenericArgs

	decorators?: Decorator<StoryType>[]
}

/* aggregate multiple RenderParams into one
 * last one win
 */
export function aggregateꓽRenderParams<StoryType>(
	...params: Immutable<RenderParams<StoryType>[]>
): Immutable<RenderParams<StoryType>> {
	const candidate = params.reduce((acc, rp) => {
		return {
			...acc,
			...rp,
			...(typeof rp === 'function' && {render: rp}), // for CSF v2 stories
			parameters: {
				...acc.parameters,
				...rp.parameters,
			},
			args: {
				...(acc.args as any), // TODO fix type
				...(rp.args as any), // TODO fix type
			},
			decorators: [
				...(acc.decorators || []),
				...(rp.decorators || []),
			],
		}
	}, {} as Immutable<RenderParams<StoryType>>)

	if (candidate.render && candidate.component)
		throw new Error('Cannot have both a render and a component!')

	if (!candidate.render && !candidate.component)
		throw new Error('Empty story having neither a render nor a component!')

	return candidate
}
