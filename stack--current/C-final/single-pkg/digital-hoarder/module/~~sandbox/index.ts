import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import he from 'he'
import { parse, isꓽUrl‿str } from '@monorepo-private/digital-hoarder'

import * as MemeLib from '../src/digital-hoarding-meme/memeplex/index.ts'
import type {Html‿str, Url‿str} from "@monorepo-private/ts--types--web";
import type {Immutable} from "@monorepo-private/ts--types";
import type {DigitalHoardingMeme, DigitalHoardingMemeplex} from "../src/digital-hoarding-meme";

////////////////////////////////////////////////////////////////////////////////////

const __dirname = dirname(fileURLToPath(import.meta.url))
const filePath = resolve(__dirname, './data/tech-bites--ai.mm.txt')
const content = readFileSync(filePath, 'utf-8')
const memeplex = parse(content)

console.log(memeplex)
//console.log(MemeLib.deriveꓽDigitalHoardingMemeplex‿lines(memeplex))
//console.log(MemeLib.getꓽmemesⵧroot(memeplex).map(MemeLib.deriveꓽDigitalHoardingMeme‿line))
/*
for (const line of memeplex.memes) {
	console.log(line)
	//console.log(colorizeLine(line))
}
*/

const DEBUG = false

function Segment({s}: {s: string}) {
	if (isꓽUrl‿str(s)) {
		const url_obj = new URL(s)

		const url_segments = url_obj.pathname.split('/').filter(Boolean)

		let extras = ''

		const anchor = (() => {

			let host = url_obj.host.startsWith('www.')
				? url_obj.host.slice(4)
				: url_obj.host

			let candidate = host

			if (host === 'github.com') {
				const next_2_segments = url_segments.slice(0, 3)
				const simplified_segments = [...next_2_segments]
				if (simplified_segments.at(-1) === simplified_segments.at(-2))
					simplified_segments.pop()
				/*if (next_2_segments[0] === 'nullclaw') {
					debugger
				}*/

				candidate = [ host, ...simplified_segments].join('/')

				if (simplified_segments.length >= 1) {
					// works on repo or org
					extras += `<a href="https://${host}/${simplified_segments.join('/')}" target="_blank"><img src="https://img.shields.io/github/stars/${simplified_segments.join('/')}?style=social" alt="stars" /></a>`
				}
				if (next_2_segments.length === 2) {
					// works only on repos
					extras += `<a href="https://${host}/${next_2_segments.join('/')}" target="_blank"><img src="https://img.shields.io/github/forks/${next_2_segments.join('/')}?style=social" alt="Forks" /></a>`
				}
			}

			return candidate
		})()
		return `<a href="${s}" target="_blank">${anchor}<span class="flip-vertical">⇲</span></a>${extras}`
	}

	if (s.trim() === '=' || s.trim() === '--') {
		return `<span class="separator">${s}</span>`
	}

	const escaped = he.escape(s)
	return escaped
}


function append(html: Html‿str, memeplex: Immutable<DigitalHoardingMemeplex>, dhm: Immutable<DigitalHoardingMeme> | undefined): Html‿str {
	const children = MemeLib.getꓽmemesⵧimmediate_children_of(memeplex, dhm)

	if (children.length) {
		html += `<div class="meme-container">\n`
	}

	if (dhm) {
		html += `<div class="meme-line">\n`
		if (DEBUG) html += `<small class="original-line">${he.escape(`${dhm._lineno}: ${dhm._source}`)}</small><br/>`
		html += [
			...dhm.parent_headings.map(s => `<span class="parent-heading">${Segment({s})}</span>`),
			`<span class="heading">${Segment({s: dhm.heading})}</span>`,
		].join(`<span class="separator"> -- </span>`)

		const full_id__segments = MemeLib.getꓽheadings_path(dhm)
		const urlsⵧleft_to_insert = new Set<Url‿str>(dhm.urls.filter(url => !full_id__segments.includes(url)))
		let full_description_txt = [
			dhm.description ?? '',
			...dhm.urls.filter(url => urlsⵧleft_to_insert.has(url))
		].filter(s => !!s).join(' ')

		if (full_description_txt) {
			html += Segment({
				s: full_description_txt.startsWith('http')
					? ' '
					: ' = '
			})
			html += [
				dhm.description,
				...dhm.urls.filter(url => urlsⵧleft_to_insert.has(url))
				].filter(s => !!s).map(s => Segment({s: s!})).join(' ')
		}
		html += `</div> <!-- meme -->\n`
	}

	children.forEach((meme) => {
		html = append(html, memeplex, meme)
	})

	if (children.length) {
		html += `</div> <!-- meme-container -->\n`
	}

	return html
}


let output: Html‿str = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
:root {
	font-family: sans-serif;
}
.flip-vertical {
	display: inline-block;
	transform: scaleY(-1);
}
.meme-container {
	border: solid 1px grey;
}
.parent-heading, .separator {
	opacity: .5;
}
.heading {
	xfont-weight: bold;
}
.meme-line {
	text-wrap: nowrap;
	padding-block-start: .2em;
}
.original-line {
	font-weight: lighter;
	font-size: xx-small;
	opacity: .5;
}
.meme-container:nth-child(3n+1) { background: lightblue; }
.meme-container:nth-child(3n+2) { background: lightyellow; }
.meme-container:nth-child(3n+3) { background: lightgreen; }
</style>
</head>

`
output = append(output, memeplex, undefined)

const outputPath = resolve(__dirname, './output.html')
writeFileSync(outputPath, output, 'utf-8')
