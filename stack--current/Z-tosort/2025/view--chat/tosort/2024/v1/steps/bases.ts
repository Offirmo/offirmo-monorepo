import { StepType, type InputStep, type SelectStep } from './types.js'
import {
	combineꓽnormalizers,
	ensure_string,
	normalize_unicode,
	trim,
} from '@offirmo-private/normalize-string'

/////////////////////////////////////////////////

function getꓽInputStepⵧnonEmptyString<ContentType>(
	parts: Partial<Omit<InputStep<ContentType, string>, 'type' | 'input_type'>>,
	options: {
		lengthⵧmin?: number,
		multiline?: boolean,
	} = {},
): InputStep<ContentType, string> {
	const {
		normalizer: _normalizer,
		validators: _validators,
		...rest
	} = parts

	const lengthⵧmin = Math.max(1, options?.lengthⵧmin ?? 1)
	const allow_multiline = !!options?.multiline

	const step: InputStep<ContentType, string> = {
		type: StepType.input,
		input_type: 'text',

		...(rest as any), // to silence TS extra checks

		normalizer: (raw: any): string => {
			let val = ensure_string(raw)
			val = normalize_unicode(val)
			val = trim(val)

			if (!allow_multiline) {
				// TODO one day
			}

			if (_normalizer) {
				val = _normalizer(val)
			}

			return val
		},
		validators: [
			...(_validators || []),
			(value: string) => [value.length >= lengthⵧmin, `Should have at least ${lengthⵧmin} letters!`],
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
