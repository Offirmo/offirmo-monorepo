import { activateꓽstory } from './state--url/reducers.ts'

export * from './state--in-mem/types'

export type RenderMode = 'full' | 'story'
export function isꓽrender_mode(x: any): x is RenderMode {
	return ['full', 'story'].includes(x)
}
