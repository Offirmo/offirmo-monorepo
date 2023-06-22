
/////////////////////////////////////////////////

interface RenderOptions {
	eol: '' | '\n' | '\r\n' // what should be used for EOL. '' (empty string) = no line return
	max_width: null | number // max width before need to wrap                             NOT IMPLEMENTED
	outline: boolean // add a strong separator at top and bottom so that it stands out    NOT IMPLEMENTED
	indent: string // what should be used for indenting                                   NOT IMPLEMENTED
	max_primitive_str_size: null | number // NOT IMPLEMENTED
	should_recognize_constants: boolean
	should_recognize_globals: boolean
	quote: '\'' | '"'
	date_serialization_fn: string
}

interface StylizeOptions {
	stylizeꓽdim: (s: string) => string
	stylizeꓽsuspicious: (s: string) => string
	stylizeꓽerror: (s: string) => string
	stylizeꓽglobal: (s: string) => string
	stylizeꓽprimitive: (s: string) => string
	stylizeꓽsyntax: (s: string) => string
	stylizeꓽuser: (s: string) => string
}

interface PrettifyOptions {
	never_throw: boolean
	sort_keys: boolean

	prettifyꓽstring: (x: string, st: State) => string
	prettifyꓽnumber: (x: number, st: State) => string
	prettifyꓽbigint: (x: bigint, st: State) => string
	prettifyꓽboolean: (x: boolean, st: State) => string
	prettifyꓽundefined: (x: undefined, st: State) => string
	prettifyꓽsymbol: (x: symbol, st: State) => string

	prettifyꓽnull: (st: State) => string
	prettifyꓽfunction: (x: Function, st: State, ox?: { as_prop?: boolean }) => string
	prettifyꓽarray: (x: Array<any>, st: State) => string[]
	prettifyꓽobject: (x: Object, st: State, ox?: { skip_constructor?: boolean }) => string[]

	prettifyꓽproperty__name: (x: string | number | symbol, st: State) => string

	prettifyꓽany: (a: any, st: State) => string[]
}

type Options = RenderOptions & StylizeOptions & PrettifyOptions

interface State {
	o: Options
	indent_level: number

	circular: WeakSet<object>
}

/////////////////////////////////////////////////

export {
	type RenderOptions,
	type StylizeOptions,
	type PrettifyOptions,
	type Options,
	type State,
}
