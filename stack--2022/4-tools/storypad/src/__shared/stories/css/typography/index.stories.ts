
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
		'100', '200', '300', '400', '500', '600', '700', '800', '900'
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
</ul>
`
}

export function Demoꓽfontᝍstyle() {
	return `
<ul>
	${[
		'normal  ', 'italic  ', 'oblique',
	].map(fs => `
	<li>
		<code>font-style:${fs}</code>: <span style="font-style: ${fs};">${PANGRAM}</span>
	</li>
`).join('')}
</ul>
</>
`
}

export function DemoꓽAll() {
	return `
${Demoꓽfontᝍweight()}
${DemoꓽHTML_Elements()}
${Demoꓽfontᝍstyle()}
`
}
