import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import type {Html‿str, Url‿str} from "@monorepo-private/ts--types--web";
import type {Immutable} from "@monorepo-private/ts--types";

import he from 'he'
import type {DigitalHoardingMeme, DigitalHoardingMemeplex} from '@monorepo-private/digital-hoarder'
import * as MemeLib from '@monorepo-private/digital-hoarder'

////////////////////////////////////////////////////////////////////////////////////

const __dirname = dirname(fileURLToPath(import.meta.url))
const filePath = resolve(__dirname, './data/tech-bites--ai.mm.txt')
const content = readFileSync(filePath, 'utf-8')
const memeplex = MemeLib.createꓽDigitalHordingMemeplexⵧfrom_mm_txt(content)

console.log(memeplex)
//console.log(MemeLib.deriveꓽDigitalHoardingMemeplex‿lines(memeplex))
//console.log(MemeLib.getꓽmemesⵧroot(memeplex).map(MemeLib.deriveꓽDigitalHoardingMeme‿line))
/*
for (const line of memeplex.memes) {
	console.log(line)
	//console.log(colorizeLine(line))
}
*/

const DEBUG = true

function Segment({s}: {s: string}) {
	const split = s.split(' ')

	return split
		.map(s => {
			if (MemeLib.isꓽUrl‿str(s)) {
				const url_obj = new URL(s)

				const url_segments = url_obj.pathname.split('/').filter(Boolean)

				let extras = ''

				const anchor = (() => {
					let host = url_obj.host.startsWith('www.')
						? url_obj.host.slice(4)
						: url_obj.host

					let candidate = host

					if (host === 'github.com') {
						const next_2_segments = url_segments.slice(0, 2)
						const simplified_segments = [...next_2_segments]
						if (simplified_segments.at(-1) === simplified_segments.at(-2))
							simplified_segments.pop()
						/*if (next_2_segments[0] === 'nullclaw') {
							debugger
						}*/

						candidate = [ host, ...simplified_segments].join('/')

						if (simplified_segments.length >= 1) {
							// works on repo or org
							extras += `<a href="https://${host}/${simplified_segments.join('/')}" target="_blank" class="own-indicator"><img class="o⋄inline" src="https://img.shields.io/github/stars/${simplified_segments.join('/')}?style=social" alt="stars" /></a>`
						}
						if (next_2_segments.length === 2) {
							// works only on repos
							extras += `<a href="https://${host}/${next_2_segments.join('/')}" target="_blank" class="own-indicator"><img class="o⋄inline" src="https://img.shields.io/github/forks/${next_2_segments.join('/')}?style=social" alt="Forks" /></a>`
						}
					}

					return candidate
				})()
				return `<a href="${s}" target="_blank">${anchor}</a>${extras}`
			}

			if (s === '=' || s === '--' || s === 'ⵧ') {
				return `<span class="separator">${s}</span>`
			}

			return he.escape(s)
		})
		.join(' ')
}

let root_container_counter = 0
let counter = 0
function append(html: Html‿str, memeplex: Immutable<DigitalHoardingMemeplex>, dhm: Immutable<DigitalHoardingMeme> | undefined): Html‿str {
	const children = MemeLib.getꓽmemesⵧimmediate_children_of(memeplex, dhm)

	if (dhm && children.length) {
		html += `<div class="meme-container">\n`
	}

	if (dhm) {
		html += `<div class="meme-line" data-counter="${counter++}">\n`
		if (DEBUG) html += `<small class="original-line">${he.escape(`${dhm._lineno}: ${dhm._source}`)}</small><br/>`
		html += [
			...dhm.parent_headings.map(s => `<span class="parent-heading">${Segment({s})}</span>`),
			`<span class="heading">${Segment({s: dhm.headingⵧfull
				? `${dhm.headingⵧshortened} (${dhm.headingⵧfull})`
				: dhm.heading})}</span>`,
		].join(`<span class="separator"> ⵧ </span>`)

		html += Segment({s: dhm.description ? ` = ${dhm.description}` : ''})

		/*
		const full_id__segments = MemeLib.getꓽheadings_path(dhm)
		//const urlsⵧleft_to_insert = new Set<Url‿str>(dhm.urls.filter(url => !full_id__segments.includes(url)))
		let full_description_txt = [
			dhm.description ?? '',
			//...dhm.urls.filter(url => urlsⵧleft_to_insert.has(url))
		].filter(s => !!s).join(' ')

		if (full_description_txt) {
			html += Segment({
				s: full_description_txt.startsWith('http')
					? ' '
					: ' = '
			})
			html += [
				dhm.description ?? '',
				//...dhm.urls.filter(url => urlsⵧleft_to_insert.has(url))
				].filter(s => !!s).join(' ').split(' ').map(s => Segment({s: s!})).join(' ')
		}
		 */

		html += `</div> <!-- meme -->\n`
	}

	children.forEach((meme) => {
		if (!dhm) {
			html += `<div class="root-container" data-counter="${root_container_counter++}">\n`
		}
		html = append(html, memeplex, meme)

		if (!dhm) {
			html += `</div> <!-- root-container -->\n`
		}
	})

	if (dhm && children.length) {
		html += `</div> <!-- meme-container -->\n`
	}

	return html
}

let output: Html‿str = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Recursive:wght@300..1000&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300..800&display=swap" rel="stylesheet">
<style>
:root {
	line-height: 1em;
	font-optical-sizing: auto;
	font-style: normal;
	--o⋄content-recommended-width: 120ch;
}
body {
	margin: 0;
	overflow: auto;
}

/* FONT BEGIN */
:root {
	font-family: "Recursive", sans-serif; letter-spacing: -0.03em;
	font-weight: 300;
	font-variation-settings:
		"slnt" 0,
		"CASL" 0,
		"CRSV" 0.5,
		"MONO" 0;
}
.heading { font-weight: 400; }
.meme-line { padding-block-start: .2em; padding-block-end: .2em; }
/* FONT END */

.meme-container {
	xborder: solid 1px grey;
}
.parent-heading, .separator {
	opacity: .6;
}
.heading {
}
.meme-line {
	text-wrap: nowrap;
	padding-inline-start: 1ch;
}
.meme-line:has(.original-line) {
padding-block-start:0;
}

.original-line {
	font-weight: lighter;
	font-size: xx-small;
	opacity: .5;
}
a:has(img) {
	margin-inline-start: .5ch;
}
.root-container:nth-child(3n+1) { background: lightblue; }
.root-container:nth-child(3n+2) { background: lightyellow; }
.root-container:nth-child(3n+3) { background: lightgreen; }
</style>
</head>
<body class="o⋄usable-viewport">
<script type="module">
import '@monorepo-private/css--framework'
globalThis.memes = ${JSON.stringify(memeplex.memes.reduce((acc, m) => { acc[m._lineno] = m; return acc; }, []))}
</script>
<h1>${memeplex.memes.length} AI mental models</h1>
`
output = append(output, memeplex, undefined)

const outputPath = resolve(__dirname, './index.html')
writeFileSync(outputPath, output, 'utf-8')
