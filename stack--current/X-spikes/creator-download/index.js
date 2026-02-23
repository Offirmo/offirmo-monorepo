const LIB = '🖼️ↆ'

/////////////////////////////////////////////////
// small utils

const ANY_BLANK_REGEXP = /\s+/g
const coerce_blanks_to_single_spaces = s => s.replace(ANY_BLANK_REGEXP, ' ')

const RECOMMENDED_UNICODE_NORMALIZATION = 'NFC' // https://www.win.tue.nl/~aeb/linux/uc/nfc_vs_nfd.html
const normalize_unicode = s => {
	s = s.normalize(RECOMMENDED_UNICODE_NORMALIZATION)
	if (s.toWellFormed)
		s = s.toWellFormed() // https://devdocs.io/javascript/global_objects/string/iswellformed
	return s
}

function clean_url_str_from_query_and_hash(url_str) {
	const url‿obj = new URL(url_str)
	return url‿obj.origin + url‿obj.pathname
}

/////////////////////////////////////////////////

/*
export interface SocialNetworkLink {
	url: Url‿str // mandatory
	handle?: string // ex @Offirmo, u/Offirmo
	network: string // helps to parse, helps to replace
}

export interface WithOnlinePresence {
	urlⵧcanonical: Url‿str
	urlsⵧsocial?: SocialNetworkLink[] // array because it conveys the Author's preference, earlier = preferred
}

export interface Author extends WithOnlinePresence {
	name: string
	intro?: string // very short intro. TODO refine
	email?: Email‿str
	contact?: Url‿str // should not duplicate email
	since‿y?: number // for copyright notice
}

/////////////////////////////////////////////////
// Meta, tech-agnostic content

export interface Thing {
	lang?: IETFLanguageType
	title?: string // Ex. "The Boring RPG" or "La Joconde"
	description: string // must be simple, a paragraph at most
	author: Author | undefined // undef = unknown :-(
	since‿y?: number // for copyright notice
}

export interface ThingWithOnlinePresence extends Thing, WithOnlinePresence {
	contact?: Url‿str // if not provided, default to author's Ideally should be a "contact center" https://docs.aws.amazon.com/connect/latest/adminguide/connect-concepts.html
	contactⵧsecurity?: Url‿str // if not provided, default to contact
	contactⵧsupport?: Url‿str // if not provided, default to contact
}
 */

/////////////////////////////////////////////////

class Media {

}

class Post {
	socialNetworkLink = {
		url: undefined, // str
		network: undefined, // helps to parse, helps to replace
		handle: undefined, // ex @Offirmo, u/Offirmo
	}




}

/////////////////////////////////////////////////

// to allow update w/o updating the click handler
function on_click(clicked‿elt) {
	const baseURI‿str = clicked‿elt.baseURI
	const url‿obj = new URL(baseURI‿str)
	const { hostname } = url‿obj
	const urlⵧcanonical = clean_url_str_from_query_and_hash(baseURI‿str)

	switch(hostname) {
		case 'www.instagram.com':
			if (clicked‿elt.nodeName === 'A') {
				console.log(`[${LIB}] clicked on <a> on insta = ignoring (user is just navigating, not downloading an asset)`)
				break
			}

			on_clickⵧwwwᐧᐧinstagramᐧcom(clicked‿elt, {urlⵧcanonical})
			break
		default:
			console.error(`[${LIB}] no handler for hostname "${hostname}"!`, url‿obj)
			break
	}
}

function on_clickⵧwwwᐧᐧinstagramᐧcom(clicked‿elt, {urlⵧcanonical}) {
	const media‿elt = (() => {
		// as seen 2024/12
		const { previousSibling } = clicked‿elt
		return previousSibling.firstChild
	})()

	if (!media‿elt) {
		console.warn(`[${LIB}] no media found.`)
		return
	}

	const baseURI‿str = clicked‿elt.baseURI
	const url‿obj = new URL(baseURI‿str)

	let author_id = url‿obj.pathname.split('/')[1] // insta url structure
	let since‿y = 'TODO'

	let links‿elt = []
	let linkSearch‿elt = clicked‿elt
	const timestamp = +Date.now()
	while(linkSearch‿elt && (author_id === 'TODO' || since‿y === 'TODO')) {
		console.log(`searching for infos...`, { path: url‿obj.pathname })
		links‿elt = Array.from(linkSearch‿elt.querySelectorAll('a'))
		const insta_ref_link = links‿elt.find(link‿elt => {
			if (link‿elt.__seen === timestamp) return false
			link‿elt.__seen = timestamp

			const cleaned_href = clean_url_str_from_query_and_hash(link‿elt.href)
			//console.log({href: cleaned_href})

			const is_ref = cleaned_href === urlⵧcanonical
			if (!is_ref)
				return false

			console.log(`XXX `, { link‿elt })
			const time_elt = Array.from(link‿elt.querySelectorAll('time'))[0]
			if (time_elt) {

				console.log({time_elt})
				since‿y = (new Date(time_elt.dateTime)).getFullYear()
				// TODO one day extract tags from reconstructed text
				return true
			}
		})
		linkSearch‿elt = linkSearch‿elt.parentElement
	}

	console.log(`Infos retrieved`, {
		urlⵧcanonical,
		author_id,
		since‿y,
	})

	processꓽimg(media‿elt, {urlⵧcanonical, author_id, since‿y})
}

async function processꓽimg(img‿elt, {urlⵧcanonical, author_id, since‿y}) {
	try {
		console.log(`[${LIB}] processꓽimg(…)`, {imgElement: img‿elt})

		img‿elt.style.setProperty('border', '3px dotted red')
		const { src, alt } = img‿elt
		console.log({ alt, src })

		if (src.split(' ').length > 1) {
			console.log(`[${LIB}] multiple srcs!`)
			throw new Error('not implemented: multiple srcs!')
		}

		const img__url‿str = src
		const DESCRIPTION = coerce_blanks_to_single_spaces(normalize_unicode(alt || ''))
		const EXT = new URL(img__url‿str).pathname.split('.').pop().toLowerCase()
		const FILENAME = `original.${EXT}`

		const zip = new JSZip()

		zip.file('license.txt',
`LICENSE PENDING

This is an undistributed prototype.

I will contact the author of the image to ask for permission to use it if sth ever get released.`
			);

		zip.file('README.md',
`This is a digital illustration from ${author_id}

Description:
> ${DESCRIPTION}

* license: see license.txt
* source: ${urlⵧcanonical}
* FYI asset retrieval date: ${new Date().toISOString()}
* FYI asset retrieved from: \`${img__url‿str}\`
`
		);

		const promises = []

		const ↆfile‿blob = fetch(img__url‿str)
			.then(r => r.blob())
			.then(blob => {

				zip.file(FILENAME, blob); // adds the image file to the zip file
			})
		promises.push(ↆfile‿blob)

		const ↆdimensions = new Promise((resolve, reject) => {
			// https://www.jeffgeerling.com/blogs/jeff-geerling/finding-images-widthheight
			const img_for_sizing_elt = new Image();
			img_for_sizing_elt.src = img__url‿str

			img_for_sizing_elt.onload = function() {
					//console.log(img_for_sizing_elt.height)
					//console.log(img_for_sizing_elt.width)
					resolve([ img_for_sizing_elt.width, img_for_sizing_elt.height ])
				}
		})

		const ೱindex = ↆdimensions.then(([width, height]) => {
			console.log(`Img dimensions retrieved:`, {width, height})
			const URL_params = []
			if (EXT !== 'webp') {
				URL_params.push(`as=webp`)
			}
			if (width > 1920) {
				URL_params.push(`width=1920`)
			}

			zip.file('index.tsx',`
import { Thing, WithOnlinePresence, ThingWithOnlinePresence, Asset, registerꓽasset_usageⵧload } from '@monorepo-private/credits'
import AUTHOR from "@monorepo-private/credits/src/authors/${author_id}/index.ts"

import type { Background } from '../../../types.ts'

/////////////////////////////////////////////////

// https://parceljs.org/recipes/image/#image-formats
const local_url = (new URL(
	'${FILENAME}?${URL_params.join('&')}',
	import.meta.url,
)).href

const BG: Background = {
	url: local_url,
	width: ${width},
	height: ${height},
	//focusesⵧhorizontal: [ .5, .5 ],
	//focusesⵧvertical: [ .5 .5 ],
}

/////////////////////////////////////////////////

const THING: Thing = {
	description: '${DESCRIPTION}',
	author: AUTHOR,
	since‿y: ${since‿y},
}
const ONLINE_PRESENCE: WithOnlinePresence = {
	urlⵧcanonical: '${urlⵧcanonical}',
}
const THINGⵧONLINE: ThingWithOnlinePresence = {
	...THING,
	...ONLINE_PRESENCE,
}
const ASSET: Asset = {
	...THINGⵧONLINE,
	type: 'background',
	local_url,
}

registerꓽasset_usageⵧload(ASSET)

/////////////////////////////////////////////////

export default BG
`)
		})
		promises.push(ೱindex)


		await Promise.all(promises)

		const zipData = await zip.generateAsync({
			type: "blob",
			streamFiles: true
		})

		zipData.name = 'download.zip'
		downloadFile(zipData)
	}
	catch (err) {
		console.error(`Error processꓽimg()!`, { err })
	}
}

// https://www.stefanjudis.com/snippets/how-trigger-file-downloads-with-javascript/
function downloadFile(file) {
	// Create a link and set the URL using `createObjectURL`
	const link = document.createElement("a");
	link.style.display = "none";
	link.href = URL.createObjectURL(file);
	link.download = file.name;

	// It needs to be added to the DOM so it can be clicked
	document.body.appendChild(link);
	setTimeout(() => {
		link.click();

		// To make this work on Firefox we need to wait
		// a little while before removing it.
		setTimeout(() => {
			URL.revokeObjectURL(link.href);
			link.parentNode.removeChild(link);
		}, 0);
	})
}

/////////////////////////////////////////////////


/// event delegation
document.addEventListener('click', event => {
	console.group(`[${LIB}] 👆 click!`)

	try {
		// as few code as possible
		const { target: clicked‿elt } = event
		if (!clicked‿elt)
			console.log(`[${LIB}] no element clicked.`)
		else {
			console.log(`[${LIB}] clicked element =`, { clicked‿elt })

			on_click(clicked‿elt)
		}
	} catch (err) {
		console.error(`[${LIB}] on click:`, {err})
	}

	console.groupEnd()
})
