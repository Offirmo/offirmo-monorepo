const LIB = 'Offirmo’s CSS demos'

// https://en.wikipedia.org/wiki/Pangram
const PANGRAM = 'The five boxing wizards jump quickly -> Sphinx of black quartz, judge my vow! Pack my box with five dozen liquor jugs…'

////////////////////////////////////////////////////////////////////////////////////

export function Demoꓽfontᝍweight() {
	return `
<h3>Font weights</h3>
<ul>
	${[
		// semantic first
		'lighter', 'normal', 'bold', 'bolder',
		// numerical
		'100', '200', '300', '400', '500', '600', '700', '800', '900'
		].map(fw => `
	<li>
		<code>${fw}</code>: <span style="font-weight: ${fw};">${PANGRAM}</span>
	</li>
`).join('')}
</ul>
</>
`
}
