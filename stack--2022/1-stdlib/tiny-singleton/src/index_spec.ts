import { expect } from 'chai'

import tiny_singleton from './index.js'


describe('tiny-singleton', function () {
	interface Person {
		name: string,
		ask_name: () => string,
	}

	function create_person(name: string): Person {
		return {
			name,
			ask_name() {
				return name
			},
		}
	}

	context('when the generator is taking no params', function () {

		it('should work and prevent subsequent creations', () => {
			const get_person: () => Person = tiny_singleton(() => create_person('Luke'))

			expect(get_person()).to.equal(get_person())
			expect(get_person().ask_name()).to.equal('Luke')
			expect(get_person()).to.equal(get_person())
			expect(get_person().ask_name()).to.equal('Luke')

			// this line should trigger a TypeScript error
			// @ts-expect-error
			get_person().foo
		})
	})

	context('when the generator is taking params', function () {

		it('should forward the params the 1st time', () => {
			const get_owner: (name?: string) => Person = tiny_singleton((name?: string) => create_person(name || 'Luke'))

			expect(get_owner('Anakin').ask_name() === 'Anakin')
			expect(get_owner('Luke').ask_name() === 'Anakin') // no change, previous invocation got priority
			expect(get_owner().ask_name() === 'Anakin')
			expect(get_owner()).to.equal(get_owner()) // still stable
		})
	})
})
