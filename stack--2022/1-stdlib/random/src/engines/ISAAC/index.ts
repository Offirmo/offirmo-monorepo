import { Int32, PRNGEngine, PRNGState, Seed } from '../../types.js'
import { assert } from '../../embedded-deps/assert/index.js'
import { Immutable } from '../../embedded-deps/types/index.js'

const SIZE = 256 // For readability only. SIZE=256 is a property of the algorithm and can't be changed


/* js string (ucs-2/utf16) to a 32-bit integer (utf-8 chars, little-endian) array */
function _to_Int32Array(s: string): Int32Array {
	const result: Int32[] = []
	s = s + '\0\0\0'; // pad string to avoid discarding last chars
	const l = s.length - 1;

	let i = 0
	let r4 = []
	while(i < l) {
		const w1 = s.charCodeAt(i++)
		const w2 = s.charCodeAt(i+1)
		if        (w1 < 0x0080) {
			// 0x0000 - 0x007f code point: basic ascii
			r4.push(w1);
		} else if (w1 < 0x0800) {
			// 0x0080 - 0x07ff code point
			r4.push(((w1 >>>  6) & 0x1f) | 0xc0);
			r4.push(((w1 >>>  0) & 0x3f) | 0x80);
		} else if ((w1 & 0xf800) != 0xd800) {
			// 0x0800 - 0xd7ff / 0xe000 - 0xffff code point
			r4.push(((w1 >>> 12) & 0x0f) | 0xe0);
			r4.push(((w1 >>>  6) & 0x3f) | 0x80);
			r4.push(((w1 >>>  0) & 0x3f) | 0x80);
		} else if (((w1 & 0xfc00) == 0xd800)
			&& ((w2 & 0xfc00) == 0xdc00)) {
			// 0xd800 - 0xdfff surrogate / 0x10ffff - 0x10000 code point
			const u = ((w2 & 0x3f) | ((w1 & 0x3f) << 10)) + 0x10000;
			r4.push(((u >>> 18) & 0x07) | 0xf0);
			r4.push(((u >>> 12) & 0x3f) | 0x80);
			r4.push(((u >>>  6) & 0x3f) | 0x80);
			r4.push(((u >>>  0) & 0x3f) | 0x80);
			i++;
		} else {
			// invalid char
			throw new Error('unexpected char!')
		}

		/* add integer (four utf-8 value) to array */
		if(r4.length >= 4) {
			// little endian
			result.push(
				  (r4.shift()! <<  0)
				| (r4.shift()! <<  8)
				| (r4.shift()! << 16)
				| (r4.shift()! << 24))
		}
	}

	return new Int32Array(result.length).map((v, i) => result[i]!)
}

// 32-bit integer safe adder
function _add(x: Int32, y: Int32): Int32 {
	const lsb = (x & 0xffff) + (y & 0xffff)
	const msb = (x >>>   16) + (y >>>   16) + (lsb >>> 16)
	return (msb << 16) | (lsb & 0xffff)
}

function _normalize_seed(raw_seed: Seed | Int32Array): Int32Array {
	let normalized_seed = ((): Int32Array => {

		if(typeof raw_seed === 'string') {
			assert(raw_seed.length > 0, `seed as string should not be empty!`)
			return _to_Int32Array(raw_seed)
		}

		if(typeof raw_seed === 'number') {
			// TODO check format?
			return new Int32Array(1).fill(raw_seed)
		}

		if (Array.isArray(raw_seed)) {
			return new Int32Array(raw_seed.length).fill(0).map((v, i) => raw_seed[i]!)
		}

		assert((raw_seed as any)?.BYTES_PER_ELEMENT === 4, `_seed: wrong TypeArray type!`)
		return (raw_seed as any)
	})()

	// seed should now be an Int32Array
	assert(normalized_seed.BYTES_PER_ELEMENT === 4, `_seed: wrong param type!`)
	assert(normalized_seed.every(i => typeof i === 'number'), `seed: array should be array of numbers!`)

	return normalized_seed
}

function _get_random_seed(): Seed {
	// @ts-expect-error
	if (globalThis?.crypto?.getRandomValues) {
		// @ts-expect-error
		return [...globalThis.crypto.getRandomValues(new Int32Array(SIZE)).values()]
	}

	return (new Array(SIZE)).fill(0).map(() => Math.random() * 0x100_000_000 | 0)
}




export function get_RNGⵧISAAC32(options: {
	// DO NOT USE THOSE OPTIONS
	// THEY ARE PROVIDED FOR UNIT TESTS ONLY
	// seed:
	// - [not provided] = init'ed from Math.random() not the best, better than nothing, cf. discussion https://github.com/rubycon/isaac.js/issues/2
	// - undefined      = seeding happens, using the "internal/spec default" seed (FOR UNIT TESTS ONLY)
	// - null           = no seed, no seeding at all (FOR UNIT TESTS ONLY)
	_xxx_seed: Seed | undefined | null,
	// TODO seeding method
	// flag
	// - unclear param that alters the behavior of the seeding
	// - should always be true, but one of the test suite requires it to be false
	_xxx_flag: boolean,
} = { _xxx_seed: _get_random_seed(), _xxx_flag: true }): PRNGEngine {
	let results = new Int32Array(SIZE)
	let next_available_result_index = -1 // -1 means no more results in the buffer
	let temp_mem = new Int32Array(SIZE)
	let generation_count: Int32 = 0 // # of generations of a new results buffer
	let accumulator: Int32 = 0
	let brs: Int32 = 0 // last result (unclear what this is)
	let last_seed: Seed = 0

	function _reset_state() {
		results.fill(0)
		next_available_result_index = -1
		temp_mem.fill(0)
		generation_count = accumulator = brs = 0
		last_seed = 0
	}

	function _seed(seed?: Int32Array, flag = options._xxx_flag): void {
		_reset_state()

		if (seed) {
			// seeding is unclearly defined in the ISAAC spec
			// but since the algorithm uses the current "result" as a seed,
			// it makes sense to init the "result" array with what is provided as a seed
			for(let i = 0; i < seed.length; i++) {
				results[i % SIZE] += seed[i]!
			}
		}

		let a: Int32, b: Int32, c: Int32, d: Int32, e: Int32, f: Int32, g: Int32, h: Int32

		/* seeding the seeds of love */
		a = b = c = d = e = f = g = h = 0x9e3779b9; /* the golden ratio */

		/* private: seed mixer */
		function _seed_mix() {
			a ^= b <<  11; d = _add(d, a); b = _add(b, c)
			b ^= c >>>  2; e = _add(e, b); c = _add(c, d)
			c ^= d <<   8; f = _add(f, c); d = _add(d, e)
			d ^= e >>> 16; g = _add(g, d); e = _add(e, f)
			e ^= f <<  10; h = _add(h, e); f = _add(f, g)
			f ^= g >>>  4; a = _add(a, f); g = _add(g, h)
			g ^= h <<   8; b = _add(b, g); h = _add(h, a)
			h ^= a >>>  9; c = _add(c, h); a = _add(a, b)
		}

		for(let i = 0; i < 4; ++i) /* scramble it */
			_seed_mix();

		for(let i = 0; i < SIZE; i += 8) {
			if (flag) { /* use all the information in the seed */
				a = _add(a, results[i + 0]!); b = _add(b, results[i + 1]!)
				c = _add(c, results[i + 2]!); d = _add(d, results[i + 3]!)
				e = _add(e, results[i + 4]!); f = _add(f, results[i + 5]!)
				g = _add(g, results[i + 6]!); h = _add(h, results[i + 7]!)
			}
			_seed_mix()
			/* fill in temp_mem[] with messy stuff */
			temp_mem[i + 0] = a; temp_mem[i + 1] = b; temp_mem[i + 2] = c; temp_mem[i + 3] = d
			temp_mem[i + 4] = e; temp_mem[i + 5] = f; temp_mem[i + 6] = g; temp_mem[i + 7] = h
		}
		if (flag) {
			/* do a second pass to make all of the seed affect all of temp_mem[] */
			for(let i = 0; i < 256; i += 8) {
				a = _add(a, temp_mem[i + 0]!); b = _add(b, temp_mem[i + 1]!)
				c = _add(c, temp_mem[i + 2]!); d = _add(d, temp_mem[i + 3]!)
				e = _add(e, temp_mem[i + 4]!); f = _add(f, temp_mem[i + 5]!)
				g = _add(g, temp_mem[i + 6]!); h = _add(h, temp_mem[i + 7]!)
				_seed_mix()
				/* fill in temp_mem[] with messy stuff (again) */
				temp_mem[i + 0] = a; temp_mem[i + 1] = b; temp_mem[i + 2] = c; temp_mem[i + 3] = d
				temp_mem[i + 4] = e; temp_mem[i + 5] = f; temp_mem[i + 6] = g; temp_mem[i + 7] = h
			}
		}
	}

	function _generate_next_batch_of_results() {
		generation_count = _add(generation_count,   1);
		brs = _add(brs, generation_count);

		for(let x: Int32 = 0, y: Int32 = 0, i = 0; i < SIZE; i++) {
			switch(i & 3) {
				case 0: accumulator ^= accumulator <<  13; break;
				case 1: accumulator ^= accumulator >>>  6; break;
				case 2: accumulator ^= accumulator <<   2; break;
				case 3: accumulator ^= accumulator >>> 16; break;
			}
			accumulator       = _add(temp_mem[(i +  128) & 0xff]!, accumulator)
			x = temp_mem[i]!
			temp_mem[i] =   y = _add(temp_mem[(x >>>  2) & 0xff]!, _add(accumulator, brs))
			results[i]  = brs = _add(temp_mem[(y >>> 10) & 0xff]!, x)
		}

		next_available_result_index = SIZE - 1
	}

	function _ensure_enough_result_available() {
		if (next_available_result_index < 0)
			_generate_next_batch_of_results()
	}

	function _next(): Int32 {
		_ensure_enough_result_available()

		return results[next_available_result_index--]!
	}

	switch (options._xxx_seed) {
		case null:
			// the user really doesn't want to seed at all
			break
		case undefined:
			// seed with the default seed
			_seed(undefined)
			break
		default:
			_seed(_normalize_seed(options._xxx_seed))
			last_seed = options._xxx_seed
			break
	}

	const engine = {
		is_prng() { return true },
		get_Int32() {
			return _next()
		},
		seed(seed: Seed) {
			_seed(_normalize_seed(seed))
			last_seed = seed
			return engine
		},
		set_state(state: Immutable<PRNGState>) {
			_seed(_normalize_seed(state.seed))
			last_seed = state.seed
			if (state.call_count > 0) {
				for(let i = 0; i < state.call_count / SIZE; ++i) {
					_generate_next_batch_of_results()
				}
				const remainder = state.call_count % SIZE || 256 // remainder = 0 means we used the whole batch = 256 results
				if (remainder) {
					//_generate_next_batch_of_results()
					next_available_result_index -= remainder
				}
			}
			return engine
		},
		get_state() {
			return {
				seed: last_seed,
				call_count: generation_count === 0
					? 0
					: generation_count * SIZE - next_available_result_index - 1,
			}
		},
		_get_internals() {
			return {
				results,
				next_available_result_index,
				temp_mem,
				generation_count,
				accumulator,
				brs,
			}
		}
	}
	return engine
}
