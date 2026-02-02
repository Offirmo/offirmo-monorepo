import { expect } from 'chai'

import { LIB } from '../consts.ts'

/////////////////////////////////////////////////

import * as RichText from '../index.ts'
import { walk, type WalkerCallbacks } from './walk.ts'
import { type BaseRenderingOptions, type Node } from '../index.ts'

describe(`${LIB} -- renderers -- walker (internal)`, function () {
	interface State {}
	interface Options extends BaseRenderingOptions {}
	const callbacks: Partial<WalkerCallbacks<State, Options>> = {
		onꓽnodeⵧenter() {
			return {} as State
		},
	}

	let rendering_options: Options
	beforeEach(() => {
		rendering_options = {
			shouldꓽrecover_from_unknown_sub_nodes: false,
		}
	})

	describe('sub-nodes resolution', function () {
		it('should work -- predefined -- br', () => {
			const $doc = {
				$content: 'foo⎨⎨br⎬⎬bar',
				// no sub-nodes: it's pre-defined!
			}
			const str = RichText.renderⵧto_text($doc)
			expect(str).to.equal('foo\nbar')
		})

		it('should work -- predefined -- hr', () => {
			const $doc = {
				$content: 'foo⎨⎨hr⎬⎬bar',
				// no sub-nodes: it's pre-defined!
			}
			const str = RichText.renderⵧto_text($doc)
			expect(str).to.equal(
				'foo\n------------------------------------------------------------\nbar',
			)
		})

		it('should work -- existing -- default (inline)', () => {
			const $doc = {
				$content: 'foo⎨⎨bar⎬⎬baz',
				$refs: {
					bar: {
						$content: '42',
					},
				},
			}
			const str = RichText.renderⵧto_text($doc)
			expect(str).to.equal('foo42baz')
		})

		it('should work -- existing -- explicit (block)', () => {
			const $doc = {
				$content: 'foo⎨⎨bar⎬⎬baz',
				$refs: {
					bar: {
						$content: '42',
						$type: RichText.NodeType.fragmentⵧblock,
					},
				},
			}
			const str = RichText.renderⵧto_text($doc)
			expect(str).to.equal('foo\n42\nbaz')
		})

		it('should work -- handling missing -- error', () => {
			const $doc = {
				$content: 'foo⎨⎨gꓽbar⎬⎬baz',
				$refs: {
					// MISSING sub node
				},
			}

			expect(() => walk<State, Options>($doc, { ...callbacks }, rendering_options)).to.throw(
				'unknown sub-node',
			)
		})

		it('should work -- handling missing -- auto recovery -- placeholder', () => {
			const $doc = {
				$content: 'foo⎨⎨gꓽbar⎬⎬baz',
				$refs: {
					// NO sub node
				},
			}

			const str = RichText.renderⵧto_text($doc, {
				shouldꓽrecover_from_unknown_sub_nodes: 'placeholder',
				style: 'basic',
			})
			expect(str).to.equal('foo{{??gꓽbar??}}baz')
		})

		it('should work -- handling missing -- auto recovery -- root', () => {
			const $doc = {
				$content: '⎨⎨greeting⎬⎬',
				$refs: {
					username: 'John',
					greeting: {
						$content: 'Hello, ⎨⎨username⎬⎬!',
					},
				},
			}

			const str = RichText.renderⵧto_text($doc, {
				shouldꓽrecover_from_unknown_sub_nodes: 'root',
				style: 'basic',
			})
			expect(str).to.equal('Hello, John!')
		})

		it('should work -- handling missing -- resolver', () => {
			const $doc = {
				$content: 'foo⎨⎨gꓽbar⎬⎬baz',
				$refs: {
					// NO sub node
				},
			}

			const str = RichText.renderⵧto_text($doc, undefined, {
				...RichText.callbacksⵧto_text,
				resolveꓽunknown_ref($refs_node_id: string, ...rest): Node | undefined {
					if ($refs_node_id === 'gꓽbar')
						return {
							$content: '33',
							$type: RichText.NodeType.fragmentⵧblock,
						}

					return undefined
				},
			})
			expect(str).to.equal('foo\n33\nbaz')
		})
	})

	describe('callbacks -- types', function () {
		it('should work -- catch all')
		it('should work -- specify')
	})

	describe('callbacks -- filters', function () {
		it('should work -- catch all')
		it('should work -- specify')
	})

	describe('callbacks -- classes', function () {
		it('should work -- catch all')
		it('should work -- specify')
	})

	describe('error detection', function () {
		it('should detect unmatched ⎨⎨⎬⎬ -- ⎨⎨ 1', () => {
			const $doc = {
				$content: '⎨⎨foo',
			}
			expect(() => walk<State, Options>($doc, { ...callbacks }, rendering_options)).to.throw(
				'unmatched',
			)
		})
		it('should detect unmatched ⎨⎨⎬⎬ -- ⎨⎨ 2', () => {
			const $doc = {
				$content: '⎨⎨foo⎬⎬ ⎨⎨bar',
				$refs: {
					foo: {},
				},
			}
			expect(() => walk<State, Options>($doc, { ...callbacks }, rendering_options)).to.throw(
				'unmatched',
			)
		})

		it('should detect unmatched ⎨⎨⎬⎬ -- ⎬⎬ 1', () => {
			const $doc = {
				$content: 'foo⎬⎬',
			}
			expect(() => walk<State, Options>($doc, { ...callbacks }, rendering_options)).to.throw(
				'unmatched',
			)
		})
		it('should detect unmatched ⎨⎨⎬⎬ -- ⎬⎬ 2a', () => {
			const $doc = {
				$content: '⎨⎨foo⎬⎬ bar⎬⎬',
				$refs: {
					foo: {},
				},
			}
			expect(() => walk<State, Options>($doc, { ...callbacks }, rendering_options)).to.throw(
				'unmatched',
			)
		})
		it('should detect unmatched ⎨⎨⎬⎬ -- ⎬⎬ 2b', () => {
			const $doc = {
				$content: 'bar⎬⎬ ⎨⎨foo⎬⎬',
				$refs: {
					foo: {},
				},
			}
			expect(() => walk<State, Options>($doc, { ...callbacks }, rendering_options)).to.throw(
				'unmatched',
			)
		})

		it('should detect reversed ⎨⎨⎬⎬', () => {
			const $doc = {
				$content: '⎬⎬foo⎨⎨',
				$refs: {
					foo: {},
				},
			}
			expect(() => walk<State, Options>($doc, { ...callbacks }, rendering_options)).to.throw(
				'unmatched',
			)
		})
	})
})
