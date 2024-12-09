// more a demo use case, not a real test

import {
	type InputSpec, InputType, NormalizationStepId, ValidatorId,
} from '../index.js'

/////////////////////////////////////////////////

type HyperMediaType = string

const ActionRenameAvatar = {
	type: 'rename-avatar',
	avatar_id: {
		input_type: 'text',
		prompt: `What's your name, hero?`,
		placeholder: `Your hero's name`,
		default_value?: T,
		normalizers: [
			'strⳇnormalize_unicode',
			'strⳇcoerce_toꓽascii',
			'strⳇcoerce_delimiters_to_space',
			'strⳇcoerce_blanks_to_single_spaces',
			'strⳇcaseⵧto_lower',
			'strⳇcapitalizeⵧwords',
			'strⳇtrim',
		],
		validators: {
			lengthⵧmin: {
				params: 1,
				msgⵧinvalid: 'Your name must be at least 1 character long.',
			},
			lengthⵧmax: {
				params: 24,
				msgⵧinvalid: 'Your name must be no more than 24 characters long.',
			},
		},
	} satisfies InputSpec<HyperMediaType, string>,
}
