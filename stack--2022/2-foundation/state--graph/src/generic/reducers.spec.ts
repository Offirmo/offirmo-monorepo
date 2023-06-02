import { expect } from 'chai'

import { LIB } from '../consts.js'
import {
	Graph,
	create,
	insertꓽnode, upsertꓽnode,
	insertꓽedge, upsertꓽedge,
} from './index.js'
import * as console from 'console'



/////////////////////////////////////////////////

describe(`${LIB} -- generic -- reducers`, function() {

	describe('create()', function () {

		it('should work', () => {
			let graph = create()
		})

		it('should have good defaults')
	})

	describe('insertꓽnode()', () => {

		it('should work', () => {
			let graph = create()

			graph = insertꓽnode(graph, 'Paris')
			graph = insertꓽnode(graph, 'Rome')

			expect(Object.keys(graph.nodes_uids_by_custom_id)).to.deep.equal(['Paris', 'Rome'])
		})

		it('should reject duplicates')
	})

	describe('upsertꓽnode()', () => {

		it('should work', () => {
			let graph = create()

			graph = upsertꓽnode(graph, 'Paris')
			let graph_unchanged = upsertꓽnode(graph, 'Paris')
			expect(graph_unchanged).to.equal(graph)

			expect(Object.keys(graph.nodes_uids_by_custom_id)).to.deep.equal(['Paris'])
		})

		it('should NOT reject duplicates')
	})

	describe('insertꓽedge()', () => {

		it('should work', () => {
			let graph = create()

			graph = insertꓽnode(graph, 'Paris')
			graph = insertꓽnode(graph, 'Rome')

			graph = insertꓽedge(graph, 'Paris', 'Rome')
			graph = insertꓽedge(graph, 'Paris', 'Rome', 'road')
			graph = insertꓽedge(graph, 'Paris', 'Rome', 'train')
		})

		it('should reject duplicates -- by id (auto)', () => {
			let graph = create({
				//allows_duplicate_links: false,
			})

			graph = insertꓽnode(graph, 'Paris')
			graph = insertꓽnode(graph, 'Rome')

			graph = insertꓽedge(graph, 'Paris', 'Rome')
			expect(() => insertꓽedge(graph, 'Paris', 'Rome'), 'auto 1').to.throw('already exist')
			// reject bc normalized to Paris -> Rome since undirected graph
			expect(() => insertꓽedge(graph, 'Rome', 'Paris'), 'auto 2 -- normalized').to.throw('already exist')

			// allowed bc different id
			graph = insertꓽedge(graph, 'Paris', 'Rome', 'road')
			// should reject full equal
			expect(() => insertꓽedge(graph, 'Paris', 'Rome', 'road')).to.throw('already exist')
			expect(() => insertꓽedge(graph, 'Rome', 'Paris', 'road')).to.throw('already exist')

			// allowed bc different id
			graph = insertꓽedge(graph, 'Paris', 'Rome', 'train')

			//console.log(graph)
		})
	})

	describe('upsertꓽedge()', () => {

		it('should work', () => {
			let graph = create()

			graph = insertꓽnode(graph, 'Paris')
			graph = insertꓽnode(graph, 'Rome')

			graph = upsertꓽedge(graph, 'Paris', 'Rome')
			let graph_unchanged = upsertꓽedge(graph, 'Paris', 'Rome')
			expect(graph_unchanged).to.equal(graph)

			// same bc not directed
			graph_unchanged = upsertꓽedge(graph, 'Rome', 'Paris')
			expect(graph_unchanged).to.equal(graph)
		})
	})
})
