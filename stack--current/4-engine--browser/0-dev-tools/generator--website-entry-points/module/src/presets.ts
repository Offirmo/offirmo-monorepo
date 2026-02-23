import type { WebPropertyEntryPointSpec } from './types.ts'
import { FeatureSnippets } from '@monorepo-private/generator--html'

// content oriented
export const PRESETꘌblog: Partial<WebPropertyEntryPointSpec> = {
	icon: {
		emoji: '✍️'
	}
}

// webapp, uses full screen, no nav nor browser controls ex. game
export const PRESETꘌappⵧimmersive: Partial<WebPropertyEntryPointSpec> = {

	hasꓽown_navigation: true,
	features: [
		'cssⳇviewport--full' as FeatureSnippets
	],
}

// "rebound" page trying to promote the real content with a CTA: buy, install app... https://growth.design/case-studies/landing-page-ux-psychology
export const PRESETꘌlanding: Partial<WebPropertyEntryPointSpec> = {

}


// TODO more on-demand
