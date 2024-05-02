import { Immutable } from '@offirmo-private/ts-types'
import { Html‿str } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

export type GenericStory = unknown
export type GenericStoryOutput = Html‿str // TODO extend return type
export type GenericStoryComponent = any // TODO type better

// https://storybook.js.org/docs/writing-stories/decorators
export interface Decorator<StoryType = GenericStory> {
	(story: StoryType): StoryType
}


export type GenericArg = any // TODO type better

export interface GenericArgs {
	[key: string]: GenericArg
}

/** Basic params present possible on all stories and meta
 */
export interface RenderParams<StoryType = GenericStory> {
	// can have neither, extending another RenderParams or simply being empty!
	component?: GenericStoryComponent
	render?: (args: GenericArgs) => GenericStoryOutput

	// https://storybook.js.org/docs/api/parameters#available-parameters
	parameters?: {
		// TODO layout: 'centered' | 'fullscreen' | 'padded' // Default: 'padded'
	} | undefined

	// https://storybook.js.org/docs/writing-stories#using-args
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
