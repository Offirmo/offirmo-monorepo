import { FontFamilyGenericName } from '@offirmo-private/ts-types-web'
import { PANGRAM } from './consts.ts'

////////////////////////////////////////////////////////////////////////////////////

export function Demoꓽfontᝍweight() {
	return `
<ul>
	${[
		// semantic first
		'lighter',
		'normal ',
		'bold',
		'bolder ',
		// numerical
		'1', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000',
		].map(fw => `
	<li>
		<code style="font-weight: ${fw}; font-family: monospace;">font-weight:${fw}</code>: <span style="font-weight: ${fw};">${PANGRAM}</span>
	</li>
`).join('')}
</ul>
</>
`
}

export function DemoꓽHTML_Elements() {
	return `
<ul>
	<li><code>&lt;em&gt;</code>: <em>${PANGRAM}</em></li>
	<li><code>&lt;strong&gt;</code>: <strong>${PANGRAM}</strong></li>
	<li><code>&lt;sub/sup&gt;</code>: <sub>${PANGRAM.slice(0, PANGRAM.length/3)}</sub>XX${PANGRAM.slice(PANGRAM.length/3,  2*PANGRAM.length/3)}<sup>${PANGRAM.slice(-1*PANGRAM.length/3)}</sup></li>
</ul>
`
}

export function Demoꓽfontᝍstyle() {
	return `
<ul>
	${[
		'normal  ', 'italic  ', 'oblique', 'oblique 45deg',
	].map(fs => `
	<li>
		<code>font-style:${fs}</code>: <span style="font-style: ${fs};">${PANGRAM}</span>
	</li>
`).join('')}
</ul>
</>
`
}

export function Demoꓽfontᝍvariantᝍcaps() {
	return `
<ul>
	${[
		'normal', 'small-caps', 'all-small-caps', 'petite-caps', 'all-petite-caps', 'unicase', 'titling-caps',
	].map(fvc => `
	<li>
		<code>font-variant-caps:${fvc}</code>: <span style="font-variant-caps: ${fvc};">${PANGRAM}</span>
	</li>
`).join('')}
</ul>
</>
`
}

export function Demoꓽchallenges() {
	return `
<ul>
	<li><code>I vs i</code>: I like it!</li>
	<li><code>D vs O</code>: odd dog, ODD DOG</li>
	<li><code>kerning</code>: Yay! I can stay! YAY...</li>
</ul>
</>
`
}

// TODO caps and small caps

/*
font-stretch: normal;
font-stretch: ultra-condensed;
font-stretch: extra-condensed;
font-stretch: condensed;
font-stretch: semi-condensed;
font-stretch: semi-expanded;
font-stretch: expanded;
font-stretch: extra-expanded;
font-stretch: ultra-expanded;
*/

/*
font-variant-caps:
 */

/*
font-variant-numeric: normal;
font-variant-numeric: ordinal;
font-variant-numeric: slashed-zero;
font-variant-numeric: lining-nums; /* <numeric-figure-values>
font-variant-numeric: oldstyle-nums; /* <numeric-figure-values>
font-variant-numeric: proportional-nums; /* <numeric-spacing-values>
font-variant-numeric: tabular-nums; /* <numeric-spacing-values>
font-variant-numeric: diagonal-fractions; /* <numeric-fraction-values>
font-variant-numeric: stacked-fractions; /* <numeric-fraction-values>
font-variant-numeric: oldstyle-nums stacked-fractions;
 */

export function DemoꓽAll(reference: FontFamilyGenericName | null = 'sans-serif') {
	return `
${reference ? `<div style="font-family: ${reference}"><code>Reference: "${reference}"</code>: ${PANGRAM}</div>` : ''}
${Demoꓽfontᝍweight()}
${DemoꓽHTML_Elements()}
${Demoꓽfontᝍstyle()}
${Demoꓽfontᝍvariantᝍcaps()}
${Demoꓽchallenges()}
`
}
