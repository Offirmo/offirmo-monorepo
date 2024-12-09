/* Generic, semantic declaration of a value that is needed from the user
 * inspired by <input> https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 * Ex. Action "rename player"
 * requiring a "string", length >= n, no multiline, not already taken, ascii only etc.
 */

/////////////////////////////////////////////////
// SPEC = JSON so that it can be passed across client/server through hypermedia


// OPTIONAL hint to improve the input experience
// inspired by https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
// underlying primitive is free to use or ignore
// can be used for both validation and normalization
export type InputType =
// from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
	| 'text' // A single-line text field. Line-breaks are automatically removed from the input value.
	| 'checkbox' // = confirmation
	// TODO more types as needed. try to use https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types as much as possible


export type StringNormalizationStepId =
	| 'strⳇnormalize_unicode' // ideally default
	| 'strⳇtrim'
	| 'strⳇcoerce_toꓽascii'
	| 'strⳇcapitalizeⵧwords'
	| 'strⳇcaseⵧto_lower'
	| 'strⳇcaseⵧto_upper'
	| 'strⳇcoerce_blanks_to_single_spaces'
	| 'strⳇremove_all_spaces'
	| 'strⳇcoerce_delimiters_to_space'

export type NormalizationStepId =
	| StringNormalizationStepId
	| string


export type StringValidatorId =
	| 'lengthⵧmin'
	| 'lengthⵧmax'
// ex. could add password requirements https://www.latrobe.edu.au/staff/passwords/reset-password-guidelines

export type ValidatorId =
	| StringValidatorId
	| string


// Spec of the VALUE expected
// without the messaging
export interface InputValueSpec<T> {
	input_type?: InputType // useful bc may imply some normalizers and validators
	default_value?: T,
	normalizers?: NormalizationStepId[] // order matters
	validators?: {
		[id: ValidatorId]: {
			params?: any
		}
	}
}

/////////////////////////////////////////////////

// everything needed for an <input>
// Note: the primitive is free to ignore some params if not needed/supported
export interface InputSpec<T, ContentType> extends InputValueSpec<T> {
	prompt: ContentType | string,
	placeholder?: ContentType | string,
	validators?: {
		[id: ValidatorId]: {
			params?: any
			evidence: xxx '' // if absent, means no need to display it when valid
		}
	}
}

// everything needed for a <select>
// Note: the primitive is free to ignore some params if not needed/supported
export interface SelectSpec<T, ContentType> extends InputValueSpec<Array<T>> {
	max_choices?: number // absent/undef = unlimited, negative = max choices - n
	prompt: ContentType | string
	default_selection?: Array<T> // can be empty
	options: {
		// Choices should be displayed following key insertion order.
		// key will be used as display if none provided.
		[key: string]: {
			value?: T,
			cta?: ContentType | string
		}
	}
}

/////////////////////////////////////////////////
// RESOLVED
// = the stuff that will be passed to a UI primitive

export type InputNormalizer<T> = (raw: any) => T // raw is most likely string

export type InputValidator<T, ContentType> = (value: T) => Promise<[ // Promise so that can use server, ex. check if name already taken
	boolean, // pass or not
	ContentType | string // feedback msg. Should follow the result. Can be empty for 'pass' case = don't display anything. Useful for obvious stuff such as length > 0
]>

// this derives from InputSpec
export interface InputParams<T, ContentType> {
	input_type?: InputSpec<T, ContentType>['input_type']
	prompt: InputSpec<T, ContentType>['prompt']
	default_value?: T,
	placeholder?: ContentType | string,
	normalizer?: NormalizationStepId[]
	validators?: {
		[id: ValidatorId]: {
			params?: any
			msgⵧvalid?: ContentType | string // if absent, means no need to display it when valid
			msgⵧinvalid: ContentType | string
		}
	}
}
