import { describe, it, mock, before, after, beforeEach, afterEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'

/////////////////////////////////////////////////

/////////////////////////////////////////////////
// https://leetcode.com/problems/text-justification

// Complexity: time = O(N), space =
function fullJustify_v0(words: string[], maxWidth: number): string[] {
	const lines: string[][] = []

	const remaining_words = [ ...words]
	while (remaining_words.length) {
		const current_line: string[] = []
		let remaining_width = maxWidth
		while (remaining_words.length && remaining_width >= (remaining_words[0]!.length + (current_line.length ? 1 : 0))) {
			remaining_width -= current_line.length ? 1 : 0 // minimum separator of 1sp
			current_line.push(remaining_words.shift()!)
			remaining_width -= current_line.at(-1)!.length
		}
		lines.push(current_line)
	}

	const result = lines.map((words, i) => {
		let remaining_space_to_spread_between_words = maxWidth - words.reduce((acc, w) => acc + w.length, 0)
		let result = words.shift()!
		while (words.length) {
			const is_last_line = i === lines.length - 1
			const sep = is_last_line
				? ' '
				: ''.padEnd(Math.ceil(remaining_space_to_spread_between_words / words.length))
			result += sep
			remaining_space_to_spread_between_words -= sep.length
			result += words.shift()!
		}
		result = result.padEnd(maxWidth)

		return result
	})

	return result
}

function fullJustify(words: string[], maxWidth: number): string[] {
	const lines: string[][] = []
	const remaining_space_to_spread_between_words_by_line: number[] = []
	const remaining_words = [ ...words]
	while (remaining_words.length) {
		const current_line: string[] = []
		let remaining_space = maxWidth
		while (remaining_words.length && remaining_space >= (remaining_words[0]!.length + (current_line.length ? 1 : 0))) {
			remaining_space -= current_line.length ? 1 : 0
			current_line.push(remaining_words.shift()!)
			remaining_space -= current_line.at(-1)!.length
		}
		lines.push(current_line)
		remaining_space_to_spread_between_words_by_line.push(remaining_space + current_line.length - 1)
	}

	return lines
		.map((words, i) => {
			const is_last_line = i === lines.length - 1
			if (is_last_line)
				return words.join(' ')

			let result = words.shift()!
			let remaining_space_to_spread_between_words = remaining_space_to_spread_between_words_by_line[i]!
			while (words.length) {
				const sep = is_last_line
					? ' '
					: ''.padEnd(Math.ceil(remaining_space_to_spread_between_words / words.length))
				result += sep
				remaining_space_to_spread_between_words -= sep.length
				result += words.shift()!
			}
			return result
		})
		.map(line => line.padEnd(maxWidth))
}

/////////////////////////////////////////////////

describe('exercise', () => {

	const FUT = fullJustify
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

	testꓽcase(["justification."], 16, [
		"justification.  "
	])
	testꓽcase(["This", "is", "an", "example", "of", "text", "justification."], 16, [
		"This    is    an",
		"example  of text",
		"justification.  "
	])
	testꓽcase(["What","must","be","acknowledgment","shall","be"], 16, [
		"What   must   be",
		"acknowledgment  ",
		"shall be        "
	])
	testꓽcase(["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], 20, [
		"Science  is  what we",
		"understand      well",
		"enough to explain to",
		"a  computer.  Art is",
		"everything  else  we",
		"do                  "
	])

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
	})
})
