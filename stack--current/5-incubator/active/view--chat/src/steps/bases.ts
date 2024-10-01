import { StepType, type InputStep } from './types.js'
import {
	combineꓽnormalizers,
	ensure_string,
	normalize_unicode,
	trim,
} from '@offirmo-private/normalize-string'

function getꓽInputStepⵧnonEmptyString<ContentType>(
	parts: Omit<InputStep<ContentType, string>, 'type' | 'normalizer' | 'validators'>
): InputStep<ContentType, string> {
	const step: InputStep<ContentType, string> = {
		type: StepType.input,
		input_type: 'text',

		normalizer: (raw: any): string => {
			let val = ensure_string(raw)
			val = normalize_unicode(val)
			val = trim(val)
			return val
		},
		validators: [
			(value: string) => [value.length > 0, 'Should have at least 1 letter.'],
		],
		...parts
	}
	return step
}

/*
function getꓽInputStepⵧconfirmation<ContentType>(): InputStep<ContentType, boolean> {
	return {
		type: typeof StepType.input,

		normalizer: (raw: any): number => {
			let val = Boolean(raw)
			return val
		},
		validators: [
		],
	}
}

function getꓽInputStepⵧinteger<ContentType>(): Omit<InputStep<ContentType, number>, 'prompt' | 'msg_as_user' | 'msg_acknowledge'> {
	return {
		type: typeof StepType.input,

		normalizer: (raw: any): number => {
			raw = ensure_string(raw)
			let val = Number(raw)

			val = normalize_unicode(val)
			val = trim(val)
			return val
		},
		validators: [

		],
	}
}*/

/////////////////////////////////////////////////

export {
	getꓽInputStepⵧnonEmptyString,
}
