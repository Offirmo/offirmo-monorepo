import { expect } from 'chai'

import { type Immutable } from '@offirmo-private/ts-types'

import {
	compare,
	getꓽcompareFnⵧby_string_key,
} from './index.js'

/////////////////////////////////////////////////

describe('@offirmo-private/ts-utils', function () {

	describe('compare', function () {

		interface Person {
			name: string
			type: 'adult' | 'child'
			age: number
		}

		const p1: Person = {
			name: 'parent',
			type: 'adult',
			age: 33,
		}

		const p2: Person = {
			name: 'child1',
			type: 'child',
			age: 3,
		}

		const p3: Person = {
			name: 'child2',
			type: 'child',
			age: 3,
		}

		function getꓽage(p: Immutable<Person>): number {
			return p.age
		}

		describe('compare()', function () {

			it('should work', () => {
				expect(compare(p1, '===', p2, getꓽage)).to.be.false
				expect(compare(p1, '!==', p2, getꓽage)).to.be.true
				expect(compare(p1, '>',   p2, getꓽage)).to.be.true
				expect(compare(p1, '>=',  p2, getꓽage)).to.be.true
				expect(compare(p1, '<',   p2, getꓽage)).to.be.false
				expect(compare(p1, '<=',  p2, getꓽage)).to.be.false



				expect(compare(p2, '===', p3, getꓽage)).to.be.true
				expect(compare(p2, '!==', p3, getꓽage)).to.be.false
				expect(compare(p2, '>',   p3, getꓽage)).to.be.false
				expect(compare(p2, '>=',  p3, getꓽage)).to.be.true
				expect(compare(p2, '<',   p3, getꓽage)).to.be.false
				expect(compare(p2, '<=',  p3, getꓽage)).to.be.true
			})
		})

		describe('getꓽcompareFnⵧby_string_key()', function () {

			it('should work', () => {
				const a1 = [ p2, p1, p3 ]

				const s1 = a1.toSorted(getꓽcompareFnⵧby_string_key('type', ['adult', 'child']))
				expect(s1.map(p => p.name)).to.deep.equal([ 'parent', 'child1', 'child2' ])

				const s2 = a1.toSorted(getꓽcompareFnⵧby_string_key('type', ['child','adult']))
				expect(s2.map(p => p.name)).to.deep.equal([ 'child1', 'child2', 'parent' ])
			})
		})
	})
})
