import { EOL } from 'os'

import getꓽterminal_size from 'term-size'
import toꓽstringⵧwithout_ansi from 'strip-ansi';

import {
	RenderOptions,
	PrettifyOptions,
	StylizeOptions,
	State,
} from './types.js'
import {
	isꓽnegative_zero,
	cmp,
} from './utils.js'

/////////////////////////////////////////////////

const DEFAULTS_STYLE_OPTIONS: RenderOptions = {
	eol: EOL as RenderOptions['eol'],
	max_width‿charcount: getꓽterminal_size().columns,
	outline: false,
	indent_size‿charcount: 3,
	max_primitive_str_size: null,
	should_recognize_constants: true,
	should_recognize_globals: true,
	quote: '\'',
	date_serialization_fn: 'toLocaleString',
}

const DEFAULTS_STYLIZE_OPTIONS__NONE: StylizeOptions = {
	stylizeꓽdim: (s: string) => s,
	stylizeꓽsuspicious: (s: string) => s,
	stylizeꓽerror: (s: string) => s,
	stylizeꓽglobal: (s: string) => s,
	stylizeꓽprimitive: (s: string) => s,
	stylizeꓽsyntax: (s: string) => s,
	stylizeꓽuser: (s: string) => s,
}

const DEBUG = false
const DEFAULTS_PRETTIFY_OPTIONS: PrettifyOptions = {
	never_throw: true,
	sort_keys: false,

	// primitives
	prettifyꓽstring: (s: string, st: State) => {
		const { o } = st
		return o.stylizeꓽdim(o.quote) + o.stylizeꓽuser(s) + o.stylizeꓽdim(o.quote)
	},
	prettifyꓽnumber: (n: number, st: State) => {
		const { o } = st
		if (o.should_recognize_constants) {
			switch (n) {
				case Number.EPSILON:
					return o.stylizeꓽglobal('Number.EPSILON')
				case Number.MAX_VALUE:
					return o.stylizeꓽglobal('Number.MAX_VALUE')
				case Number.MIN_VALUE:
					return o.stylizeꓽglobal('Number.MIN_VALUE')
				case Number.MAX_SAFE_INTEGER:
					return o.stylizeꓽglobal('Number.MAX_SAFE_INTEGER')
				case Number.MIN_SAFE_INTEGER:
					return o.stylizeꓽglobal('Number.MIN_SAFE_INTEGER')

				case Math.PI:
					return o.stylizeꓽglobal('Math.PI')
				case Math.E:
					return o.stylizeꓽglobal('Math.E')
				// no more Math, seldom used

				default:
				// fallback
			}
		}

		return isNaN(n)
			? o.stylizeꓽerror(String(n))
			: isꓽnegative_zero(n)
				? o.stylizeꓽerror('-0')
				: o.stylizeꓽprimitive(String(n))
	},
	prettifyꓽbigint: (b: bigint, st: State) => {
		const { o } = st
		return o.stylizeꓽprimitive(String(b) + 'n')
	},
	prettifyꓽboolean: (b: boolean, st: State) => {
		const { o } = st
		return o.stylizeꓽprimitive(String(b))
	},
	prettifyꓽundefined: (u: undefined, st: State) => {
		const { o } = st
		return o.stylizeꓽsuspicious(String(u))
	},
	prettifyꓽsymbol: (s: symbol, st: State) => {
		const { o } = st
		try {
			return ''
				+ o.stylizeꓽglobal('Symbol')
				+ o.stylizeꓽsyntax('(')
				+ (s.description ? o.prettifyꓽstring(s.description, st) : '')
				+ o.stylizeꓽsyntax(')')
		}
		catch (err) {
			return o.stylizeꓽerror(`[error prettifying:${(err as any)?.message}/ps]`)
		}
	},

	// objects
	prettifyꓽnull: (st: State) => {
		if (DEBUG) console.log('prettifyꓽnull')
		const { o } = st
		return o.stylizeꓽprimitive('null')
	},
	prettifyꓽfunction: (f: Function, st: State, { as_prop = false } = {}) => {
		const { o } = st

		if (f.name && (globalThis as any)[f.name] === f) {
			return o.stylizeꓽuser(f.name)
		}

		let result = ''

		if (f.name) {
			if (!as_prop) {
				// class detection may not work with Babel
				result += o.stylizeꓽsyntax(f.toString().startsWith('class ') ? 'class ' : 'function ')
			}

			result += o.stylizeꓽuser(f.name)
		}

		result += o.stylizeꓽsyntax('()')
		result += o.stylizeꓽsyntax(f.name ? ' ' : ' => ')
		result += o.stylizeꓽsyntax('{')
		result += o.stylizeꓽdim('\/\*…\*\/')
		result += o.stylizeꓽsyntax('}')

		return result
	},
	prettifyꓽarray: (a: Array<any>, st: State) => {
		if (DEBUG) console.log('prettifyꓽarray', a)
		st = {
			...st,
			circular: new Set([ ...Array.from(st.circular as any), a ]),
		}
		const { o } = st

		// TODO MULTI LINE
		return [
			o.stylizeꓽsyntax('[')
			+ a.map(e => o.prettifyꓽany(e, st)) // NOTE when fully empty, map won't execute (but it looks nice, no pb)
				.join(o.stylizeꓽsyntax(','))
			+ o.stylizeꓽsyntax(']'),
		]
	},
	prettifyꓽobject: (obj: Object, st: State, { skip_constructor = false } = {}): string[] => {
		if (DEBUG) console.log('prettifyꓽobject', obj)
		const { o } = st

		try {
			if (o.should_recognize_globals) {
				try {
					switch (obj) {
						case globalThis:
							return [ o.stylizeꓽglobal('globalThis') ]

						default:
						// fallback
					}
				}
				catch (err) {
					return [ o.stylizeꓽerror(`[error prettifying:${(err as any)?.message}/po.g]`) ]
				}
			}

			if (!skip_constructor) {
				try {
					const proto = Object.getPrototypeOf(obj)
					if (proto && proto.constructor && proto.constructor.name) {
						if (proto.constructor !== Object) {
							return [
								o.stylizeꓽsyntax('new ')
								+ ((globalThis as any)[proto.constructor.name] === proto.constructor
										? o.stylizeꓽglobal(proto.constructor.name)
										: o.stylizeꓽuser(proto.constructor.name)
								)
								+ o.stylizeꓽsyntax('(')
								+ (() => {
									switch (proto.constructor.name) {
										// all primitives that can be an Object
										case 'String':
											return o.prettifyꓽstring(obj as string, st)
										case 'Number':
											return o.prettifyꓽnumber(obj as number, st)
										case 'Boolean':
											return o.prettifyꓽboolean(obj as boolean, st)

										// recognize some objects
										case 'Set':
											return o.prettifyꓽarray(Array.from((obj as Set<any>).keys()), st)
										case 'WeakSet':
											return o.stylizeꓽdim('/\*not enumerable*\/')
										case 'Date':
											return o.stylizeꓽdim(`/*${(obj as any)[o.date_serialization_fn]()}*/`)

										// node
										case 'Buffer':
											// too big!
											return '/*…*/'
										case 'Gunzip': // seen in fetch_ponyfill response
											// too big!
											return '/*…*/'

										// other
										default:
											if (proto.constructor.name.endsWith('Error')) {
												const err: Error = obj as any
												// no need to pretty print it as copy/pastable to code,
												// 99.9% chance that's not what we want here
												return o.stylizeꓽerror(o.quote + err.message + o.quote)
											}

											// Beware! This can turn into a huge thing, ex. a fetch response
											// REM we MUST have skip_constructor = true to avoid infinite loops
											return o.prettifyꓽobject(obj, st, { skip_constructor: true })
										//return '/*…*/'
									}
								})()
								+ o.stylizeꓽsyntax(')'),
							]
						}
					}
				}
				catch (err) {
					return [ o.stylizeꓽerror(`[error prettifying:${(err as any)?.message}/po.c]`) ]
				}
			}

			const keys = Reflect.ownKeys(obj)

			if (keys.length === 0 && skip_constructor)
				return [ o.stylizeꓽdim(`/*${obj.toString()}*/`) ]

			///// display as hash:

			if (o.sort_keys)
				keys.sort((a: string | number | symbol, b: string | number | symbol) => {
					let res = cmp(typeof a, typeof b)

					if (res === 0) {
						res = cmp(a, b)
					}

					return res
				})

			const parent_state = st // for passing infos up
			st = {
				...st,
				indent_levelⵧcurrent: st.indent_levelⵧcurrent + 1,
				remaining_width‿charcount: st.remaining_width‿charcount - o.indent_size‿charcount,
				indent_levelⵧmax: Math.max(st.indent_levelⵧmax, st.indent_levelⵧcurrent + 1),
				circular: new Set([ ...Array.from(st.circular as any), obj ]),
			}

			const trailing_comma = o.stylizeꓽsyntax(',')
			let lines: string[] = [
				...keys.map((k): string[] | string => {
					const v = (obj as any)[k]

					if (typeof v === 'function' && v.name === k)
						return [ o.prettifyꓽfunction(v, st, { as_prop: true }) ]

					const key = o.prettifyꓽproperty__name(k, st)
					let sub_lines = o.prettifyꓽany(v, st)

					/*
					const max_remaining_length‿charcount = o.max_width‿charcount - st.indent_levelⵧcurrent * o.indent_size‿charcount - toꓽstringⵧwithout_ansi(key).length - 1
					if (toꓽstringⵧwithout_ansi(sub_lines.join(',')).length < max_remaining_length‿charcount) {
						// coerce into a single line
						sub_lines = [
							sub_lines.join(', '),
						]
					}
*/
					if (sub_lines.length === 1) {
						// merge into a single line
						return key + o.stylizeꓽsyntax(': ') + sub_lines[0] + trailing_comma
					}

					return [
						key + o.stylizeꓽsyntax(': ') + sub_lines[0],
						...sub_lines.slice(1, -1),
						...sub_lines.slice(-1).map(s => s + trailing_comma),
					]
				}),
			].flat()
			// pass up
			parent_state.indent_levelⵧmax = Math.max(parent_state.indent_levelⵧmax, st.indent_levelⵧmax)

			return [
				o.stylizeꓽsyntax('{'),
				...lines.map(s => st.indent_string + s),
				o.stylizeꓽsyntax('}'),
			]
		}
		catch (err) {
			return [ o.stylizeꓽerror(`[error prettifying:${(err as any)?.message}/po]`) ]
		}
	},

	// utils
	prettifyꓽproperty__name: (p: string | number | symbol, st: State) => {
		const { o } = st

		try {
			switch (typeof p) {
				case 'number':
					return o.prettifyꓽnumber(p, st)
				case 'string': {
					// TODO use quotes only if needed
					// https://mathiasbynens.be/notes/javascript-properties
					return o.prettifyꓽstring(p, st)
				}
				case 'symbol':
					return o.stylizeꓽsyntax('[')
						+ o.prettifyꓽsymbol(p, st)
						+ o.stylizeꓽsyntax(']')
			}
		}
		catch (err) {
			return o.stylizeꓽerror(`[error prettifying:${(err as any)?.message}/ppn]`)
		}
	},

	// root
	prettifyꓽany(any: any, st: State): string[] {
		if (DEBUG) console.log('prettifyꓽany', any)
		const { o } = st

		try {
			switch (typeof any) {

				/////// primitive type ///////
				case 'string':
					return [ o.prettifyꓽstring(any, st) ]
				case 'number':
					return [ o.prettifyꓽnumber(any, st) ]
				case 'bigint':
					return [ o.prettifyꓽbigint(any, st) ]
				case 'boolean':
					return [ o.prettifyꓽboolean(any, st) ]
				case 'undefined':
					return [ o.prettifyꓽundefined(any, st) ]
				case 'symbol':
					return [ o.prettifyꓽsymbol(any, st) ]

				/////// non-primitive type ///////
				case 'function': // special sub-type of object
					return [ o.prettifyꓽfunction(any, st) ]
				case 'object': {
					// we pre-filter some objects flavour
					// it's a design decision,
					// it allows for more efficient overloads via custom options

					if (any === null)
						return [ o.prettifyꓽnull(st) ]

					if (st.circular.has(any))
						return Array.isArray(any)
							? [ o.stylizeꓽerror('[<Circular ref!>]') ]
							: [ o.stylizeꓽerror('{<Circular ref!>}') ]

					if (Array.isArray(any))
						return o.prettifyꓽarray(any, st)

					return o.prettifyꓽobject(any, st)
				}

				default:
					return [ `[unsupported type:${typeof any}]` ]
			}
		}
		catch (err) {
			return [ o.stylizeꓽerror(`[error prettifying:${(err as any)?.message}/pa]`) ]
		}
	},
}

/////////////////////////////////////////////////

export {
	DEFAULTS_STYLE_OPTIONS,
	DEFAULTS_STYLIZE_OPTIONS__NONE,
	DEFAULTS_PRETTIFY_OPTIONS,
}
