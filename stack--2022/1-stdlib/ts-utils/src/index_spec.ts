import { expect } from 'chai'

import { Immutable } from '@offirmo-private/ts-types'

import { compare } from '.'


describe('@offirmo-private/ts-utils', function () {


	describe('compare', function () {

		interface Person {
			name: string
			age: number
		}

		function get_age(p: Immutable<Person>): number {
			return p.age
		}

		it('should work', () => {
			const p1: Person = {
				name: 'parent',
				age: 33,
			}

			const p2: Person = {
				name: 'child1',
				age: 3,
			}

			expect(compare(p1, '===', p2, get_age)).to.be.false
			expect(compare(p1, '!==', p2, get_age)).to.be.true
			expect(compare(p1, '>',   p2, get_age)).to.be.true
			expect(compare(p1, '>=',  p2, get_age)).to.be.true
			expect(compare(p1, '<',   p2, get_age)).to.be.false
			expect(compare(p1, '<=',  p2, get_age)).to.be.false

			const p3: Person = {
				name: 'child2',
				age: 3,
			}

			expect(compare(p2, '===', p3, get_age)).to.be.true
			expect(compare(p2, '!==', p3, get_age)).to.be.false
			expect(compare(p2, '>',   p3, get_age)).to.be.false
			expect(compare(p2, '>=',  p3, get_age)).to.be.true
			expect(compare(p2, '<',   p3, get_age)).to.be.false
			expect(compare(p2, '<=',  p3, get_age)).to.be.true
		})
	})
})
