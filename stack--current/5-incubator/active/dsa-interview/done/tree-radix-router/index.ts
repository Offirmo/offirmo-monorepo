import { describe, it, mock, before, beforeEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'

/////////////////////////////////////////////////
// pseudo radix tree
type Segment = string
type Path = string
type Payload = Object

interface RoutingNode {
	children: {
		[segment: Segment]: RoutingNode
	}
	payload?: Payload // no payload = not terminal
}

interface RoutingTable {
	root: RoutingNode
}

interface RoutingMatch {
	path: Path
	parent_segments: Array<Segment>
	remaining_segments: Array<Segment>
	closest_node: RoutingNode
	params: {
		[id: string]: string
	}
}

/////////////////////////////////////////////////

function normalize_path(path: Path): Path {
	path = path.normalize('NFC')
	const split: Segment[] = path.split('/').map(s => s.trim())
	if (!split[0]) split.shift()
	if (!split.at(-1)) split.pop()
	assert(!split.some(s => !s), `no segment should be empty!`)
	return split.join('/')
}

function match_path(table: RoutingTable, path: string): RoutingMatch {
	path = normalize_path(path)
	const result: RoutingMatch = {
		path: '/' + path,
		parent_segments: [],
		remaining_segments: path.split('/').filter(s => !!s),
		closest_node: table.root,
		params: {}
	}

	while (result.remaining_segments.length) {
		const segment = result.remaining_segments[0]!
		if (!result.closest_node.children[segment]) {
			break
		}

		// TODO params

		result.parent_segments.push(segment)
		result.closest_node = result.closest_node.children[segment]
	}

	return result
}

function create_routing_node(payload: RoutingNode['payload']): RoutingNode {
	return {
		children: {},
		...(payload && { payload }),
	}
}

function create_routing_table(): RoutingTable {
	return {
		root: create_routing_node(undefined)
	}
}

function add_route(table: RoutingTable, path: Path, payload: Payload, parent?: RoutingNode): RoutingTable {
	if (parent) throw new Error('NIMP!')

	const match = match_path(table, path)

	while (match.remaining_segments.length) {
		const segment = match.remaining_segments.shift()!
		const node = create_routing_node(match.remaining_segments.length === 0 ? payload : undefined)
		match.closest_node.children[segment] = node
		match.closest_node = node
		match.parent_segments.push(segment)
	}

	// we now have a node for the full path
	if (!match.closest_node.payload)
		match.closest_node.payload = payload
	try {
		assert(match.closest_node.payload === payload, `payload should not conflict! "${match.parent_segments.join('/')}"`)
	}
	catch (e) {
		console.error(match, payload)
		throw e
	}

	return table
}
/////////////////////////////////////////////////

describe('exercise', () => {
	let table = create_routing_table()

	// main screens
	table = add_route(table,'/', { component: '<Loader>'}) // loader/intro

	// By Bartle
	table = add_route(table,'/explore', { component: '<Explore>'}) // immersion, Bartle "Explorers"
	table = add_route(table,'/social', {}) // social features, Bartle "Socializers"
	table = add_route(table,'/ranks', {}) // competition / climbing ranks, Bartle "Killers"
	table = add_route(table,'/collections', {}) // all achievements, Bartle "Achievers"
	table = add_route(table,'/self', {}) // self, progression. Practical + also "achievers"
	table = add_route(table,'/wiki', {}) // all knowledge
	table = add_route(table,`/about/`, {})
	table = add_route(table,`/credits/`, {}) // all credits
	//table = add_route(table,`/credits/assets/:type/:id`, {})
	table = add_route(table,`/elements/`, {}) // all game elements, for commenting, sharing etc.
	//table = add_route(table,`/elements/:type/:id`, {}) // game elements

	function _match_path(path: Path): Payload | undefined {
		const match = match_path(table, path)
		assert.equal('/' + normalize_path(path), match.path, `matched path = path!`)
		return match.closest_node?.payload
	}
	const FUT = _match_path
	function testꓽcase(...args: [ ...Parameters<typeof FUT>, ReturnType<typeof FUT> ]) {
		const resultⵧexpected = args.pop()
		const params: Parameters<typeof FUT> = args as any

		return it(`should work -- ${util.inspect(params)} => ${util.inspect(resultⵧexpected)}`, (t) => {
			const resultⵧactual = FUT(...params)
			assert.deepEqual(
				resultⵧactual,
				resultⵧexpected,
			)
		})
	}

	testꓽcase(`/explore/foo/bar.xml`, { component: '<Explore>' })
	testꓽcase(`/explore/map/`, { component: '<Explore>' })
	testꓽcase(`/foo/bar`, { component: '<Loader>' })
/*
	testꓽcase(`/social/`, { screen: 'social' })

	testꓽcase(`/ranks/`, { screen: 'ranks' })
	testꓽcase(`/ranks/guild--adventuring/`, { screen: 'ranks' })
	testꓽcase(`/ranks/knight/`, { screen: 'ranks' })

	testꓽcase(`/collections/`, { screen: 'collections' })
	testꓽcase(`/collections/achievements/`, { screen: 'collections' })

	// other useful
	testꓽcase(`/self/`, { screen: 'self' })

	testꓽcase(`/wiki/`, { screen: 'wiki' })
	testꓽcase(`/wiki/place/:id`, { screen: 'wiki' })
	testꓽcase(`/wiki/character/:id`, { screen: 'wiki' })
	testꓽcase(`/wiki/skill/:id`, { screen: 'wiki' })

	// meta
	testꓽcase(`/about/`)
	testꓽcase(`/credits/`) // all credits
	testꓽcase(`/credits/assets/:type/:id`)
	testꓽcase(`/elements/`) // all game elements, for commenting, sharing etc.
	testꓽcase(`/elements/:type/:id`) // game elements*/


	// frames (worth being featured in the path)
	// chat
	// equipment
	// inventory
	// about




	/*testꓽcase([
		'romane',
		'romanus',
		'romulus',
		'rubens',
		'ruber',
		'rubicon',
		'rubicundus',
	], 'rom')

	testꓽcase([
		'test',
		'toaster',
		'toasting',
		'slow',
		'slowly',
	], '')*/

	/*it.skip('should be fast', async() => {
		// https://github.com/tinylibs/tinybench
		console.log('Benchmarking…')
		const bench = new Bench({ time: 200 });
		bench
			.add('v0', () => get_victor_v0([ ['x', 0, 0], ['x', 0, 1], ['x', -1, -1], ['x', -2, -2]]))
			.add('current', () => FUT([ ['x', 0, 0], ['x', 0, 1], ['x', -1, -1], ['x', -2, -2]]))

		await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
		await bench.run();
		console.table(bench.table());
	})*/
})
