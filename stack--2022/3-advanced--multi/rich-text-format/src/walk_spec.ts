import { expect } from 'chai'

import { LIB } from './consts.js'

/////////////////////////////////////////////////

import * as RichText from './index.js'
import { walk, WalkerCallbacks } from './walk.js'
import { BaseRenderingOptions, Node } from './index.js'

describe(`${LIB}`, function () {

	describe(`internal -- walker`, function () {
		interface State {}
		interface Options extends BaseRenderingOptions {}
		const DEFAULT_OPTIONS: Options = {
			shouldꓽrecover_from_unknown_sub_nodes: false,
		}
		const callbacks: Partial<WalkerCallbacks<State, Options>> = {
			on_nodeⵧenter() { return {} as State },
		}

		describe('walking through all nodes in order', function () {

			it('should work')
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
				expect(str).to.equal('foo\n------------------------------------------------------------\nbar')
			})

			it('should work -- existing -- default (inline)', () => {
				const $doc = {
					$content: 'foo⎨⎨bar⎬⎬baz',
					$sub: {
						'bar': {
							$content: '42',
						}
					},
				}
				const str = RichText.renderⵧto_text($doc)
				expect(str).to.equal('foo42baz')
			})

			it('should work -- existing -- explicit (block)', () => {
				const $doc = {
					$content: 'foo⎨⎨bar⎬⎬baz',
					$sub: {
						'bar': {
							$content: '42',
							$type: RichText.NodeType.fragmentⵧblock,
						}
					},
				}
				const str = RichText.renderⵧto_text($doc)
				expect(str).to.equal('foo\n42\nbaz')
			})

			it('should work -- handling missing -- error', () => {
				const $doc = {
					$content: 'foo⎨⎨gꓽbar⎬⎬baz',
					$sub: {
						// MISSING sub node
					},
				}

				expect(() => walk<State, Options>($doc, {...callbacks})).to.throw('unknown sub-node')
			})

			it('should work -- handling missing -- auto recovery', () => {
				const $doc = {
					$content: 'foo⎨⎨gꓽbar⎬⎬baz',
					$sub: {
						// NO sub node
					},
				}

				const str = RichText.renderⵧto_text($doc, {
					shouldꓽrecover_from_unknown_sub_nodes: true,
					style: 'basic',
				})
				expect(str).to.equal('foo{{??gꓽbar??}}baz')
			})

			it('should work -- handling missing -- resolver', () => {
				const $doc = {
					$content: 'foo⎨⎨gꓽbar⎬⎬baz',
					$sub: {
						// NO sub node
					},
				}

				const str = RichText.renderⵧto_text($doc, undefined, {
					...RichText.callbacksⵧto_text,
					resolve_unknown_subnode($sub_node_id: string, ...rest): Node | undefined {
						if ($sub_node_id === 'gꓽbar')
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
				expect(() => walk<State, Options>($doc, {...callbacks})).to.throw('unmatched')
			})
			it('should detect unmatched ⎨⎨⎬⎬ -- ⎨⎨ 2', () => {
				const $doc = {
					$content: '⎨⎨foo⎬⎬ ⎨⎨bar',
					$sub: {
						'foo': {}
					},
				}
				expect(() => walk<State, Options>($doc, {...callbacks})).to.throw('unmatched')
			})

			it('should detect unmatched ⎨⎨⎬⎬ -- ⎬⎬ 1', () => {

				const $doc = {
					$content: 'foo⎬⎬',
				}
				expect(() => walk<State, Options>($doc, {...callbacks})).to.throw('unmatched')
			})
			it('should detect unmatched ⎨⎨⎬⎬ -- ⎬⎬ 2a', () => {

				const $doc = {
					$content: '⎨⎨foo⎬⎬ bar⎬⎬',
					$sub: {
						'foo': {}
					},
				}
				expect(() => walk<State, Options>($doc, {...callbacks})).to.throw('unmatched')
			})
			it('should detect unmatched ⎨⎨⎬⎬ -- ⎬⎬ 2b', () => {

				const $doc = {
					$content: 'bar⎬⎬ ⎨⎨foo⎬⎬',
					$sub: {
						'foo': {}
					},
				}
				expect(() => walk<State, Options>($doc, {...callbacks})).to.throw('unmatched')
			})

			it('should detect reversed ⎨⎨⎬⎬', () => {

				const $doc = {
					$content: '⎬⎬foo⎨⎨',
					$sub: {
						'foo': {}
					},
				}
				expect(() => walk<State, Options>($doc, {...callbacks})).to.throw('unmatched')
			})
		})
	})
})
