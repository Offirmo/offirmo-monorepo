import { FontFamilyGenericName } from '@offirmo-private/ts-types-web'
import { PANGRAM } from './consts.ts'

////////////////////////////////////////////////////////////////////////////////////

function demo_style({property, values, reference = 'sans-serif', demo_text = PANGRAM}: {
	property: string,
	values: string[],
	reference?: FontFamilyGenericName | null,
	demo_text?: string,
}) {
	return `
<p>
<table>
	<thead>
		<tr>
			<th><code>${property}</code></th>
			<th style="font-family: monospace">demo</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>[reference]</code></td>
			<td><span style="font-family: ${reference};">${demo_text}</span></td>
		</tr>
		${values.map(value => `
			<tr>
				<td><code>${value}</code></td>
				<td><span style="${property}:${value};">${demo_text}</span></td>
			</tr>
		`).join('')}
	</tbody>
</table>
</p>
	`
}

export function Demoꓽfontᝍweight() {
	return demo_style({
		property: 'font-weight',
		values: [
			// semantic first
			'lighter',
			'normal ',
			'bold',
			'bolder ',
			// numerical
			'1', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000',
		]

	})
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
	return demo_style({
		property: 'font-style',
		values: [
			'normal  ',
			'italic  ',
			'oblique',
			'oblique 45deg',
		]
	})
}

export function Demoꓽfontᝍvariantᝍcaps() {
	return demo_style({
		property: 'font-variant-caps',
		values: [
			'normal', 'small-caps', 'all-small-caps', 'petite-caps', 'all-petite-caps', 'unicase', 'titling-caps',
		]
	})
}

// need variable font!
export function Demoꓽfontᝍstretch() {
	return demo_style({
		property: 'font-stretch',
		values: [
			// https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch
			'normal',
			'ultra-condensed',
			'extra-condensed',
			'condensed',
			'semi-condensed',
			'semi-expanded',
			'expanded',
			'extra-expanded',
			'ultra-expanded',
		]
	})
}

export function Demoꓽfontᝍvariantᝍnumeric() {
	return demo_style({
		property: 'font-variant-numeric',
		values: [
			'normal',
			'ordinal',
			'slashed-zero',
			'lining-nums',
			'oldstyle-nums',
			'proportional-nums',
			'tabular-nums',
			'diagonal-fractions',
			'stacked-fractions',
			'oldstyle-nums stacked-fractions',
		],
		demo_text: '01234567890  3.14  3/4  1st, 1er, 1a'
	})
}

export function Demoꓽchallenges() {
	return `
Typographic challenges:
<ul>
	<li><code>I vs i</code>: I like it!</li>
	<li><code>D vs O</code>: odd dog, ODD DOG</li>
	<li><code>kerning</code>: Yay! I can stay! YAY...</li>
</ul>
</>
`
}

/*
'normal;
'ordinal;
'slashed-zero;
'lining-nums; /* <numeric-figure-values>
'oldstyle-nums; /* <numeric-figure-values>
'proportional-nums; /* <numeric-spacing-values>
'tabular-nums; /* <numeric-spacing-values>
'diagonal-fractions; /* <numeric-fraction-values>
'stacked-fractions; /* <numeric-fraction-values>
'oldstyle-nums stacked-fractions;
 */

export function DemoꓽAll(reference: FontFamilyGenericName | null = 'sans-serif') {
	return `
${reference ? `<div style="font-family: ${reference}"><code>Reference: "${reference}"</code>: ${PANGRAM}</div>` : ''}
${Demoꓽfontᝍweight()}
${DemoꓽHTML_Elements()}
${Demoꓽfontᝍstyle()}
${Demoꓽfontᝍvariantᝍcaps()}
${Demoꓽfontᝍstretch()}
${Demoꓽfontᝍvariantᝍnumeric()}
${Demoꓽchallenges()}
`
}
