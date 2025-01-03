import { type Immutable } from '@offirmo-private/ts-types'
import { Html‿str } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

export type GenericStory = unknown

export type GenericStoryOutput =
	| Html‿str
	| { $$typeof: Symbol } // React

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

	(story: StoryType | Function, context: StoryContext): StoryType // TODO clarify

}

/////////////////////////////////////////////////
// render params

export interface CommonRenderParams<StoryType = GenericStory> {
	parameters: Parameters
	args: GenericArgs
	decorators: Decorator<StoryType>[]
}
export interface RenderParamsWithComponent<StoryType = GenericStory> extends CommonRenderParams<StoryType> {
	component: GenericStoryComponent
}
export interface RenderParamsWithRenderFunc<StoryType = GenericStory> extends CommonRenderParams<StoryType> {
	render: (args: GenericArgs) => GenericStoryOutput
}
export type RenderParams<StoryType = GenericStory> =
	| RenderParamsWithComponent<StoryType>
	| RenderParamsWithRenderFunc<StoryType>

export function isꓽRenderParamsWithComponent<StoryType>(rp: Immutable<RenderParams<StoryType>>): rp is RenderParamsWithComponent<StoryType> {
	const forTypeDetection = rp as any
	return !!forTypeDetection.component
}
export function isꓽRenderParamsWithRenderFunc<StoryType>(rp: Immutable<RenderParams<StoryType>>): rp is RenderParamsWithRenderFunc<StoryType> {
	const forTypeDetection = rp as any
	return !!forTypeDetection.render
}

/** Basic params possibly present on all stories and meta
 * may not have all fields
 */
export interface RawRenderParams<StoryType = GenericStory> {
	// can have neither, extending another RenderParams or simply being empty!
	component?: GenericStoryComponent
	render?: (args: GenericArgs) => GenericStoryOutput

	// optional
	parameters?: Parameters | undefined
	args?: GenericArgs
	decorators?: Decorator<StoryType>[]
}

/* Aggregate multiple RenderParams into one.
 * Last one wins.
 */
export function aggregateꓽRenderParams<StoryType>(
	...params: Immutable<RawRenderParams<StoryType>[]>
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
	}, {} as Immutable<CommonRenderParams<StoryType>>)

	const forTypeDetection = candidate as any
	if (forTypeDetection.render && forTypeDetection.component)
		throw new Error('Cannot have both a render and a component!')

	if (isꓽRenderParamsWithComponent<StoryType>(forTypeDetection))
		return forTypeDetection
	if (isꓽRenderParamsWithRenderFunc<StoryType>(forTypeDetection))
		return forTypeDetection

	throw new Error('Empty story having neither a render nor a component!')
}
