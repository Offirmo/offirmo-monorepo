import { StepType, type InputStep, type SelectStep } from './types.js'
import {
	combineꓽnormalizers,
	ensure_string,
	normalize_unicode,
	trim,
} from '@offirmo-private/normalize-string'

/////////////////////////////////////////////////

function getꓽInputStepⵧnonEmptyString<ContentType>(
	parts: Omit<InputStep<ContentType, string>, 'type'>
): InputStep<ContentType, string> {
	const { _normalizer, _validators, ...rest } = parts

	const step: InputStep<ContentType, string> = {
		type: StepType.input,
		input_type: 'text',

		...rest,

		normalizer: (raw: any): string => {
			let val = ensure_string(raw)
			val = normalize_unicode(val)
			val = trim(val)

			if (_normalizer) {
				val = _normalizer(val)
			}

			return val
		},
		validators: [
			...(_validators || []),
			(value: string) => [value.length > 0, 'Should have at least 1 letter.'],
		],
	}
	return step
}


function getꓽInputStepⵧconfirmation<ContentType>(
	parts: Omit<SelectStep<ContentType, boolean>, 'type' | 'options'>
): SelectStep<ContentType, boolean> {
	return {
		type: StepType.select,
		prompt: 'Are you sure?',
		options: {
			yes: { value: true },
			no: { value: false },
		},
		msg_as_user: (confirm: boolean) => confirm ? `Yes, I confirm.` : `No, I cancel.`,
		msg_acknowledge: (confirm: boolean) => confirm ? `Ok, let's proceed ✔` : `Let's cancel that ✖`,
		...parts,
	}
}

/*
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
	getꓽInputStepⵧconfirmation,
}
