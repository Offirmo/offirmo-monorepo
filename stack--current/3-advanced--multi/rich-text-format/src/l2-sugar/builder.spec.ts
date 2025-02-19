import { expect } from 'chai'

import { LIB } from '../consts.ts'

import * as RichText from './builder.ts'
import { renderⵧto_text } from '../l2-renderers/to_text.ts'

import { isꓽNode } from '../l1-types/guards.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- sugar -- builder`, () => {

	describe('creation', function () {

		it('should work -- empty', () => {
			const $doc = RichText.fragmentⵧinline().done()

			expect(isꓽNode($doc)).to.be.true
			expect(renderⵧto_text($doc)).to.equal('')
		})

		it('should work -- from content: string', () => {
			const $doc = RichText.fragmentⵧinline('foo').done()

			expect(isꓽNode($doc)).to.be.true
			expect(renderⵧto_text($doc)).to.equal('foo')
		})

		it('should work -- from content: number', () => {
			const $doc = RichText.fragmentⵧinline(42).done()

			expect(isꓽNode($doc)).to.be.true
			expect(renderⵧto_text($doc)).to.equal('42')
		})

		it('should work -- from content: node', () => {
			const $doc = RichText.strong({
				$content: '⎨⎨sub⎬⎬',
				$type: 'fragmentⵧinline',
				$classes: ['bar'],
				$sub: {
					sub: 'foo'
				},
				$hints: { uuid: '1234' },
			}).done()

			expect(isꓽNode($doc)).to.be.true
			expect(renderⵧto_text($doc)).to.equal('foo')

			// was lifted with no loss
			expect($doc.$classes).to.deep.equal(['bar'])
			expect($doc.$hints).to.deep.equal({ uuid: '1234' })
			expect($doc.$content).to.equal('⎨⎨sub⎬⎬')
		})
	})

	describe('pushText()', function () {

		it('should work', () => {
			const $doc = RichText.fragmentⵧinline()
				.pushText('Hello!')
				.done()

			expect(isꓽNode($doc)).to.be.true
			expect(renderⵧto_text($doc)).to.equal('Hello!')
		})
	})

	describe('addHints()', function () {

		it('should work', () => {
			const $doc = RichText.fragmentⵧinline()
				.pushText('Hello!')
				.addHints({ uuid: '1234' })
				.done()

			expect(isꓽNode($doc)).to.be.true
			expect(renderⵧto_text($doc)).to.equal('Hello!')
			expect($doc.$hints).to.deep.equal({ uuid: '1234' })
		})
	})

	describe('addClass()', function () {

		it('should work', () => {
			const $doc = RichText.fragmentⵧinline()
				.pushText('Hello!')
				.addClass('foo', 'bar')
				.done()

			expect(isꓽNode($doc)).to.be.true
			expect(renderⵧto_text($doc)).to.equal('Hello!')
			expect($doc.$classes).to.deep.equal(['foo', 'bar'])
		})
	})

	// this is the basic primitive on top of whom other are built
	describe('pushRawNode()', function () {

		it('should work', () => {
			const $doc = RichText.fragmentⵧinline()
				.pushRawNode(RichText.strong('foo').done())
				.done()

			expect(isꓽNode($doc)).to.be.true
			expect(Object.values($doc.$sub).length).to.equal(1)
			expect(Object.keys($doc.$sub)).to.deep.equal(['0001']) // auto id
			expect(renderⵧto_text($doc)).to.equal('') // yes, empty! We pushed a raw sub node without referencing it
		})
	})

	describe('pushRawNodes()', function () {

		it('should work', () => {
			const $doc = RichText.fragmentⵧinline()
				.pushRawNodes({
					foo: RichText.strong('foo').done(),
					bar: RichText.strong('bar').done(),
				})
				.done()

			expect(isꓽNode($doc)).to.be.true
			expect(Object.values($doc.$sub).length).to.equal(2)
			expect(Object.keys($doc.$sub)).to.deep.equal(['foo', 'bar']) // ids were preserved
			expect(renderⵧto_text($doc)).to.equal('') // yes, empty! see above
		})
	})

	describe('pushNode()', function () {

		it('should work -- auto id', () => {
			const $doc = RichText.fragmentⵧinline()
				.pushNode(RichText.strong('foo').done())
				.done()

			expect(isꓽNode($doc)).to.be.true
			expect(Object.values($doc.$sub).length).to.equal(1)
			expect(Object.keys($doc.$sub)).to.deep.equal(['0001']) // auto id
			expect($doc.$content).to.equal('⎨⎨0001⎬⎬') // auto id
			expect(renderⵧto_text($doc)).to.equal('foo')
		})

		it('should work -- explicit id', () => {
			const $doc = RichText.fragmentⵧinline()
				.pushNode(RichText.strong('foo').done(), { id: 'bar' })
				.done()

			expect(isꓽNode($doc)).to.be.true
			expect(Object.values($doc.$sub).length).to.equal(1)
			expect(Object.keys($doc.$sub)).to.deep.equal(['bar'])
			expect($doc.$content).to.equal('⎨⎨bar⎬⎬')
			expect(renderⵧto_text($doc)).to.equal('foo')
		})

		it('should check semantic', () => {
			expect( () => RichText.fragmentⵧinline()
				.pushNode(RichText.strong('foo').done(), { classes: ['bar'] } as any)
				.done(),
			).to.throw('option')
		})
	})

	describe('pushKeyValue()', function () {

		it('should allow loose nodes', () => {
			const n1 = RichText.listⵧordered().pushKeyValue('foo', '42').done()
			expect(renderⵧto_text(n1)).to.equal('foo..42')

			const n2 = RichText.listⵧordered().pushKeyValue('foo', 42).done()
			expect(renderⵧto_text(n2)).to.equal('foo..42')

			const n3 = RichText.listⵧordered().pushKeyValue('foo', { $content: '42' }).done()
			expect(renderⵧto_text(n3)).to.equal('foo..42')
		})

		it('should perform some checks', () => {
			const builder = RichText.fragmentⵧinline()

			expect(
				() => builder.pushKeyValue('foo', 42)
			).to.throw('Key/value is intended to be used in a ol/ul only!')
		})
	})
})
