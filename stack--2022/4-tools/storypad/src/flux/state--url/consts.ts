import { URLSearchParamsⳇName } from './types.ts'


export const QUERYPARAMS = {
	// let's try to stay compatible with Storybook
	// https://storybook.js.org/docs/sharing/embed

	// path vs. id ??
	// ?path=/story/section-header--default
	// ?id=/story/shadowboxcta--default
	story_uid: 'id',
	story_path: 'path',

	// args

	// &viewMode=story
	render_mode: 'viewMode',

	// globals=theme:dark
}

//const SEP_FOR_UID = 'Ⳇ' // :
//const ROOT_ID = '╣ROOT╠'
