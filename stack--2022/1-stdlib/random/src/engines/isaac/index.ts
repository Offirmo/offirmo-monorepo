/* ----------------------------------------------------------------------
 * Copyright (c) 2012 Yves-Marie K. Rinquin
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * ----------------------------------------------------------------------
 *
 * ISAAC is a cryptographically secure pseudo-random number generator
 * (or CSPRNG for short) designed by Robert J. Jenkins Jr. in 1996 and
 * based on RC4. It is designed for speed and security.
 *
 * ISAAC's informations & analysis:
 *   http://burtleburtle.net/bob/rand/isaac.html
 * ISAAC's implementation details:
 *   http://burtleburtle.net/bob/rand/isaacafa.html
 *
 * ISAAC succesfully passed TestU01
 *
 * ----------------------------------------------------------------------
 *
 * Usage:
 *   <script src="isaac.js"></script>
 *   var random_number = isaac.random();
 *
 * Output: [ 0x00000000; 0xffffffff]
 *         [-2147483648; 2147483647]
 *
 */


/* js string (ucs-2/utf16) to a 32-bit integer (utf-8 chars, little-endian) array */
import { Int32, PRNGEngine, Seed } from '../../types.js'
import { assert } from '../../utils/assert.js'

const SIZE = 256 // For readability only. SIZE=256 is a property of the algorithm and can't be changed


function _toIntArray(s: string): Array<any> {
	const result = []
	s = s + '\0\0\0'; // pad string to avoid discarding last chars
	const l = s.length - 1;

	let i = 0
	while(i < l) {
		const w1 = s.charCodeAt(i++)
		const w2 = s.charCodeAt(i+1)
		let r4 = []
		if       (w1 < 0x0080) {
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

	return result;
}

// 32-bit integer safe adder
function _add(x: Int32, y: Int32): Int32 {
	const lsb = (x & 0xffff) + (y & 0xffff)
	const msb = (x >>>   16) + (y >>>   16) + (lsb >>> 16)
	return (msb << 16) | (lsb & 0xffff)
}


export function get_RNGⵧISAAC32ⵧmutating(seed: Seed = Math.random()): PRNGEngine {
	let results: Int32[] = Array(SIZE)
	let next_available_result_index = -1
	let temp_mem: Int32[] = Array(SIZE)
	let generation_count: Int32 = 0 // # of generations of a new result
	let accumulator: Int32 = 0
	let brs: Int32 = 0 // last result (unclear what this is)

	function _reset_state() {
		results.fill(0)
		next_available_result_index = -1
		temp_mem.fill(0)
		generation_count = accumulator = brs = 0
	}

	// flag is an unclear param that trigger using the current "result" array to init a..h = seeding
	//      flag should normally always be true
	// seeding is unclearly defined in the ISAAC spec but since the current "result" is used as a seed,
	//      it makes sense to init the "result" array with the provided seed
	function _seed(seed?: ReadonlyArray<number>, flag = true): void {
		_reset_state()

		if (seed) {
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

	function _ensure_enough_result_available() {
		if (next_available_result_index >= 0)
			return

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

		next_available_result_index += SIZE
	}

	function _next(): Int32 {
		_ensure_enough_result_available()

		return results[next_available_result_index--]!
	}

	// XXX TOREVIEW
	_seed()
	//_seed([Math.random() * 0xffffffff])

	const engine = {
		is_mutating() { return true },
		get_Int32() {
			return {
				i: _next(),
				next_engine: engine,
			}
		},
		seed(seed: Seed) {
			let normalized_seed = ((raw_seed): ReadonlyArray<number> => {

				if(typeof raw_seed === 'string') {
					assert(raw_seed.length > 0, `seed as string should not be empty!`)
					return _toIntArray(raw_seed)
				}

				if(typeof raw_seed === 'number') {
					// TODO check format?
					return [ raw_seed ]
				}

				return raw_seed
			})(seed)

			// seed should now be an array<number>
			assert(Array.isArray(normalized_seed), `_seed: wrong param type!`)
			assert(normalized_seed.every(i => typeof i === 'number'), `seed: array should be array of numbers!`)

			_seed(normalized_seed)

			return engine
		},
		set_state() {
			throw new Error('Not Implemented!')
		},
		get_state() {
			throw new Error('Not Implemented!')
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
