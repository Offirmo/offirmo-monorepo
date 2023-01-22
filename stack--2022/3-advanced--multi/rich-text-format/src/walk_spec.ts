import { expect } from 'chai'

import {
	LIB
} from './consts.js'


import { walk, WalkerCallbacks } from './walk.js'

describe(`${LIB}`, function () {

	describe(`internal -- walker`, function () {

		it('should work', () => {
			// TODO
		})

		describe('error detection', function () {
			interface State {}
			interface Options {}
			const callbacks: Partial<WalkerCallbacks<State, Options>> = {
				on_node_enter() {
					return {} as State
				}
			}

			it('should detect unmatched {{}} -- {{ 1', () => {
				const $doc = {
					$content: '{{foo',
				}
				expect(() => walk<State, Options>($doc, {...callbacks})).to.throw('unmatched')
			})
			it('should detect unmatched {{}} -- {{ 2', () => {
				const $doc = {
					$content: '{{foo}} {{bar',
					$sub: {
						'foo': {}
					},
				}
				expect(() => walk<State, Options>($doc, {...callbacks})).to.throw('unmatched')
			})

			it('should detect unmatched {{}} -- }} 1', () => {

				const $doc = {
					$content: 'foo}}',
				}
				expect(() => walk<State, Options>($doc, {...callbacks})).to.throw('unmatched')
			})
			it('should detect unmatched {{}} -- }} 2', () => {

				const $doc = {
					$content: '{{foo}} bar}}',
					$sub: {
						'foo': {}
					},
				}
				expect(() => walk<State, Options>($doc, {...callbacks})).to.throw('unmatched')
			})
			it('should detect unmatched {{}} -- }} 2', () => {

				const $doc = {
					$content: 'bar}} {{foo}}',
					$sub: {
						'foo': {}
					},
				}
				expect(() => walk<State, Options>($doc, {...callbacks})).to.throw('unmatched')
			})
		})
	})
})
