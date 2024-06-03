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
			const getꓽperson: () => Person = tiny_singleton(() => create_person('Luke'))

			expect(getꓽperson()).to.equal(getꓽperson())
			expect(getꓽperson().ask_name()).to.equal('Luke')
			expect(getꓽperson()).to.equal(getꓽperson())
			expect(getꓽperson().ask_name()).to.equal('Luke')

			// this line should trigger a TypeScript error
			// @ts-expect-error
			getꓽperson().foo
		})
	})

	context('when the generator is taking params', function () {

		it('should forward the params the 1st time', () => {
			const getꓽowner: (name?: string) => Person = tiny_singleton((name?: string) => create_person(name || 'Luke'))

			expect(getꓽowner('Anakin').ask_name() === 'Anakin')
			expect(getꓽowner('Luke').ask_name() === 'Anakin') // no change, previous invocation got priority
			expect(getꓽowner().ask_name() === 'Anakin')
			expect(getꓽowner()).to.equal(getꓽowner()) // still stable
		})
	})
})
