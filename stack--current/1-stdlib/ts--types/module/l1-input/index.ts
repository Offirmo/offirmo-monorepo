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
	| 'strⳇlengthⵧmin'
	| 'strⳇlengthⵧmax'
// ex. could add password requirements https://www.latrobe.edu.au/staff/passwords/reset-password-guidelines

export type ValidatorId =
	| StringValidatorId
	| string


// GENERIC version
// everything needed for an <input>
// Note: the primitive is free to ignore some params if not needed/supported
interface BaseInputSpec<T, RichTextType> {

	// core input VALUE spec
	default_value?: T,
	normalizers?: NormalizationStepId[] // order matters

	// associated messaging
	prompt: RichTextType | string,
	placeholder?: RichTextType | string,

	// mixed
	validators?: {
		[id: ValidatorId]: {
			params?: any // depending on the validator
			msgⵧvalid?: RichTextType | string // override. the validator will provide defaults if not provided
			msgⵧinvalid?: RichTextType | string // override. the validator will provide defaults if not provided
			evidence?:
				// undef = no display at first, then display valid or invalid when sth is entered
				| 'obvious' // means no need to display it when valid, would be noise https://www.merriam-webster.com/thesaurus/obvious
				| 'obscure' // means need to display even if valid or not yet anything entered as the user needs to be clearly warned, ex. pwd requirements https://www.merriam-webster.com/thesaurus/obscure#thesaurus-entry-1-2
		}
	}

	// hints
	input_type?: InputType // may imply some normalizers and validators
	// extensibility point for any other hints we may want to provide
	// not already covered above.
	// Use sparingly.
	// If semantic, try to update the spec itself.
	_extra_hints?: {
		suggestion_generator_id?: string // 'avatar_name' would auto generate names on demand

		[k:string]: any
	}
}

/////////////////////////////////////////////////

export interface ValueInputSpec<T, RichTextType> extends BaseInputSpec<T, RichTextType> {
	kind: 'value',
}


// everything needed for a <select>
// Note: the primitive is free to ignore some params if not needed/supported
export interface SelectOneInputSpec<T, RichTextType> extends BaseInputSpec<T, RichTextType> {
	kind: 'selectⵧone',

	options: {
		// Choices should be displayed following key insertion order.
		// key will be used as display if none provided.
		[key: string]: {
			value?: T, // if not provided, will use key as value
			cta?: RichTextType | string // if not provided, will use key as display, capitalized
		}
	}
}

export interface SelectMultipleInputSpec<T, RichTextType> extends BaseInputSpec<Array<T>, RichTextType> {
	kind: 'selectⵧmultiple',

	max_choices?: number // absent/undef = as many as wanted, negative = max choices - n

	options: {
		// Choices should be displayed following key insertion order.
		// key will be used as display if none provided.
		[key: string]: {
			value?: T, // if not provided, will use key as value
			cta?: RichTextType | string // if not provided, will use key as display, capitalized
		}
	}
}

export type InputSpec<T, RichTextType> =
	| ValueInputSpec<T, RichTextType>
	| SelectOneInputSpec<T, RichTextType>
	| SelectMultipleInputSpec<T, RichTextType>

/////////////////////////////////////////////////
// RESOLVED
// = the stuff that will be passed to a UI primitive

export type InputNormalizer<T> = (raw: any) => T // raw is most likely string

export type InputValidator<T, RichTextType> = (value: T) => Promise<[ // Promise so that can use server, ex. check if name already taken
	boolean, // pass or not
	RichTextType | string // feedback msg. Should follow the result. Can be empty for 'pass' case = don't display anything. Useful for obvious stuff such as length > 0
]>

// this derives from InputSpec
/*
export interface InputParams<T, RichTextType> {
	input_type?: InputSpec<T, RichTextType>['input_type']
	prompt: InputSpec<T, RichTextType>['prompt']
	default_value?: T,
	placeholder?: RichTextType | string,
	normalizer?: NormalizationStepId[]
	validators?: {
		[id: ValidatorId]: {
			params?: any
			msgⵧvalid?: RichTextType | string // if absent, means no need to display it when valid
			msgⵧinvalid: RichTextType | string
		}
	}
}
*/
