import { describe, it, mock, before, after, beforeEach, afterEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'

/////////////////////////////////////////////////

class TreeNode {
	val: number
	left: TreeNode | null
	right: TreeNode | null
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = (val===undefined ? 0 : val)
		this.left = (left===undefined ? null : left)
		this.right = (right===undefined ? null : right)
	}
}

/////////////////////////////////////////////////
// https://leetcode.com/problems/binary-tree-maximum-path-sum/

// Complexity: O(N)
function _maxPathSum(node: TreeNode | null): { connected: number, disconnected: number } {
	if (!node)
		return { connected: Number.NEGATIVE_INFINITY, disconnected: Number.NEGATIVE_INFINITY }

	const left_sum = _maxPathSum(node.left)
	const right_sum = _maxPathSum(node.right)

	const connected = Math.max(
		node.val,
		node.val + left_sum.connected,
		node.val + right_sum.connected,
	)

	const disconnected = Math.max(
		left_sum.disconnected,
		right_sum.disconnected,
		left_sum.connected + node.val + right_sum.connected,
		connected,
	)

	return { connected, disconnected }
}

function maxPathSum(root: TreeNode | null): number {
	const { connected, disconnected } = _maxPathSum(root)
	return Math.max(connected, disconnected)
}

/////////////////////////////////////////////////

function unserialize_to_tree(treeAsArray: Array<number | null>): TreeNode | null {
	const final_tree_depth = Math.ceil(Math.log2(treeAsArray.length + 1))
	const val = treeAsArray.shift()!
	if (val === null || val === undefined)
		return null

	const root = new TreeNode(val)

	if (final_tree_depth === 1)
		return root

	const sub_tree_left = []
	const sub_tree_right = []
	for (let depth = 1; depth < final_tree_depth; ++depth) {
		const elem_count = 2 ** depth
		for (let i = 0; i < elem_count; ++i) {
			if (i < elem_count/2)
				sub_tree_left.push(treeAsArray.shift()!)
			else
				sub_tree_right.push(treeAsArray.shift()!)
		}
	}
	root.left = unserialize_to_tree(sub_tree_left)
	root.right = unserialize_to_tree(sub_tree_right)

	return root
}

function maxPathSumFromUnserialized(treeAsArray: Array<number | null>): number {
	const tree = unserialize_to_tree(treeAsArray)

	return maxPathSum(tree)
}



/////////////////////////////////////////////////

describe('exercise', () => {
	const FUT = maxPathSumFromUnserialized
	function test_case(...args: [ ...Parameters<typeof FUT>, ReturnType<typeof FUT> ]) {
		const result__expected: ReturnType<typeof FUT> = args.pop() as any
		const params: Parameters<typeof FUT> = args as any

		return it(`should work -- ${util.inspect(params)} => ${util.inspect(result__expected)}`, (t) => {
			const result__actual = FUT(...params)

			assert.deepEqual(
				result__actual,
				result__expected,
			)
		})
	}

	test_case([1], 1)
	test_case([1,2,3], 6)
	test_case([-10,9,20,null,null,15,7], 42)
	test_case([-3], -3)
	test_case([-10, 11, 11], 12)
	test_case([1,-2,-3,1,3,-2,null,-1], 3)
	test_case([5,4,8,11,null,13,4,7,2,null,null,null,1], 49)

	/*
	it('should be fast', async() => {
		// https://github.com/tinylibs/tinybench
		console.log('Benchmarking…')
		const bench = new Bench({ time: 200 })
		const words = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt sollicitudin nibh, sit amet convallis tellus efficitur ac. Mauris odio ipsum, congue at massa sit amet, vestibulum rhoncus ligula. Fusce eget ipsum urna. Pellentesque velit magna, dapibus pharetra elit a, bibendum condimentum quam. Praesent tristique libero at risus cursus, eu lobortis metus congue. Morbi semper nisi eu magna porta elementum. Aliquam ligula lorem, bibendum id feugiat sed, tincidunt at risus. Integer elit lectus, accumsan sit amet urna eget, tristique tempus neque. Nunc vel leo nunc. Ut gravida tortor accumsan elit rhoncus, eget egestas libero cursus. Vestibulum placerat quam eget laoreet semper. Praesent sed ullamcorper tortor, in dignissim ante. Sed nisl purus, accumsan sit amet nisl ut, gravida pellentesque nisi. Nulla a leo aliquam, blandit nulla vel, ullamcorper quam. Mauris eu sollicitudin lectus. Nam eu elit pharetra, viverra neque vitae, consectetur lacus. Phasellus convallis diam odio, sed dapibus justo sagittis at. In in fermentum nibh, vulputate scelerisque eros. Duis pretium congue velit, at pharetra est ornare quis. Phasellus id tristique arcu. Donec consequat, tellus luctus molestie varius, lectus ligula semper neque, ac posuere tortor erat ut urna. Sed consequat magna eu odio tristique, et tristique felis pharetra. Aliquam molestie eros a magna condimentum gravida. Proin quis aliquam diam, ac tincidunt nisl. Quisque porta, metus ut luctus volutpat, orci magna dignissim enim, ac congue massa ligula eu tortor. Phasellus vel laoreet magna. Maecenas tellus lectus, tempus et turpis et, facilisis efficitur justo. Etiam et laoreet orci. Sed eget libero sodales, tincidunt eros non, dignissim libero. Maecenas semper dolor nec velit imperdiet imperdiet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc ultrices tincidunt lacus sed tempor. In nec nisl ut lorem imperdiet iaculis. Vivamus porttitor magna vel dui rutrum elementum. Cras dui ligula, vestibulum quis elit ut, suscipit scelerisque purus. Pellentesque nec neque sed odio gravida mollis. Nulla efficitur pulvinar ipsum. Sed eu libero sit amet dolor ornare imperdiet. Nulla facilisi. Donec cursus ac augue quis egestas. Phasellus accumsan bibendum pulvinar. Donec quam eros, condimentum et felis in, placerat hendrerit enim. Sed suscipit tincidunt congue. Nullam volutpat in ipsum ac facilisis. Maecenas molestie porttitor purus quis accumsan. Suspendisse accumsan ultricies dignissim. Morbi sit amet lacus vel nisl cursus malesuada eu vel erat. Proin maximus, quam eget interdum fermentum, massa turpis dignissim lectus, vitae egestas lorem risus nec mi. Vivamus dapibus risus at magna iaculis dapibus. Praesent lobortis lacus dictum risus laoreet eleifend. Curabitur et viverra neque, in facilisis ipsum. Quisque consectetur ligula magna, non sagittis sem laoreet eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed consectetur purus ac eros lobortis egestas. Pellentesque sollicitudin fringilla arcu vel blandit. Maecenas mauris sem, commodo sit amet fermentum eu, mollis at lectus. Phasellus ut urna id tortor volutpat consectetur a et quam. Nam nunc sem, volutpat fringilla augue a, finibus euismod sem. Aliquam dictum commodo efficitur. Praesent id porta justo. Aenean pretium volutpat pretium. Duis facilisis mi in commodo efficitur. Nam luctus, nunc in rutrum pretium, sapien tortor fermentum diam, vitae pharetra nisi tortor nec turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat hendrerit dolor, in mollis orci laoreet at. Aenean scelerisque facilisis mollis. Ut non dignissim metus, ac tempor mi. Aliquam id rutrum eros. Phasellus ut ipsum efficitur, dictum erat at, pellentesque ligula. In ac nisi in risus lobortis blandit. Vestibulum nisi nulla, efficitur eu mauris in, dignissim tempor tortor. Praesent sit amet facilisis augue. Donec quis hendrerit justo. Aenean lacinia fermentum massa a auctor. Sed justo mauris, finibus vitae elit dignissim, sollicitudin vehicula augue. Sed a tincidunt velit, vel pellentesque augue. Etiam vehicula magna ex, in sagittis lorem finibus eget. Donec sit amet libero vel justo scelerisque consectetur. Nulla consectetur fermentum consectetur. Mauris mi orci, volutpat et nisi quis, sodales convallis velit. Nulla elementum ex non imperdiet dignissim. Sed posuere eros vitae velit eleifend malesuada. Curabitur interdum tincidunt justo sit amet dapibus. Nam mauris lorem, imperdiet eget sapien bibendum, dictum ultrices odio. Nunc blandit placerat justo, eu consectetur nisi rutrum finibus. Proin felis leo, hendrerit nec suscipit a, ullamcorper tincidunt velit. Praesent maximus efficitur dolor ut tincidunt. Donec semper felis nec tempus venenatis. Aenean quam turpis, condimentum nec condimentum sed, efficitur quis erat. Praesent condimentum libero eu eros elementum, quis volutpat odio auctor. Sed sed egestas eros. Pellentesque in sagittis neque. Maecenas nunc lorem, dignissim et massa in, sodales elementum nisl. Suspendisse potenti. Nulla facilisi. Quisque eros nisl, vestibulum nec bibendum eget, posuere eu justo. Nulla facilisi. Suspendisse tellus felis, viverra eget sem sit amet, faucibus rutrum nisl. Proin finibus sem libero, vel feugiat urna finibus id. Fusce cursus vehicula risus, sit amet aliquet dolor pulvinar ut. Nam lorem ligula, molestie et sem at, lacinia pretium sem. Aliquam erat volutpat. Curabitur imperdiet euismod malesuada. Curabitur in porttitor mi, id vehicula orci. Morbi ac lectus rhoncus, fringilla ligula nec, congue lacus. Duis dignissim tortor in lorem vulputate, eu suscipit est pellentesque. Pellentesque scelerisque dui malesuada metus commodo congue. Nam consectetur sollicitudin nunc id maximus. Curabitur vehicula lectus nunc, at commodo ligula consectetur rutrum. Duis malesuada, nunc nec viverra tincidunt, risus sem lacinia nibh, non aliquet tortor ante at quam. Praesent non varius ligula, consectetur volutpat est. Donec interdum imperdiet orci, eget pulvinar neque mollis sed. Nullam sed dignissim risus, sit amet tempor est. Nunc volutpat mollis nunc, non tincidunt turpis tristique id. Fusce bibendum metus at lacus consequat, ut rhoncus lacus sodales. Cras quis nulla ullamcorper, venenatis ligula maximus, euismod sem. Aenean aliquam nulla gravida turpis aliquam euismod. Aliquam posuere porttitor ipsum, sit amet euismod enim lobortis laoreet. Duis elementum risus non quam semper, quis posuere justo ultrices. Aliquam sit amet luctus diam. Praesent magna tortor, facilisis eu aliquam et, hendrerit malesuada leo. In pharetra lacinia nulla, eget egestas elit. Integer cursus arcu ut nibh laoreet, ac dictum ante rutrum. Praesent commodo malesuada semper. Vivamus eget sem ligula. Aliquam aliquam nulla in massa ultrices dapibus. Aenean nisl erat, ornare a ipsum sit amet, fermentum ullamcorper nisl. Lorem ipsum dolor sit.`.split(' ')
		bench
			.add('v0', () => fullJustify_v0(words, 60))
			.add('current', () => fullJustify(words, 60))

		await bench.warmup() // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
		await bench.run()
		console.table(bench.table())
	})*/
})
