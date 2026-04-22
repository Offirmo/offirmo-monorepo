import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import '@monorepo-private/css--framework'

import * as MemeLib from '@digital-hoarder/model'
import type { BaseProps } from "../types";

/////////////////////////////////////////////////

export interface Props extends BaseProps {
	s: string
}

export function RichString({s, memeplex}: Props) {
	//console.log('🔄 <RichString/>', {s, memeplex})

	const split = s.split(' ')

	return split
		.flatMap(s => {
			if (MemeLib.isꓽUrl‿str(s)) {
				const url_obj = new URL(s)
				const out = []

				const url_segments = url_obj.pathname.split('/').filter(Boolean)

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

						candidate = [ host, ...simplified_segments].join('/')

						if (simplified_segments.length >= 1) {
							// works on repo or org
							out.push(
								<a href={`https://${host}/${simplified_segments.join('/')}`} target="_blank" className="own-indicator">
									<img className="o⋄inline" src={`https://img.shields.io/github/stars/${simplified_segments.join('/')}?style=social`} alt="stars" />
								</a>
							)
						}

						if (next_2_segments.length === 2) {
							// works only on repos
							out.push(
								<a href={`https://${host}/${next_2_segments.join('/')}`} target="_blank" className="own-indicator">
									<img className="o⋄inline" src={`https://img.shields.io/github/forks/${next_2_segments.join('/')}?style=social`} alt="forks" />
								</a>
							)
						}
					}

					return candidate
				})()

				out.unshift(<a href={s} target="_blank">{anchor}</a>)

				return out
			}

			if (s === '=' || s === '--' || s === 'ⵧ') {
				return <span className="separator">{s}</span>
			}

			if (!memeplex.abbreviations[s]) {
				if (Object.values(memeplex.abbreviations)[s]) {
					// todo
				}
			}
			else {
				return <abbr title={memeplex.abbreviations[s]?.headingⵧfull!}>{s}</abbr>
			}

			return s
		})
		.flatMap(x => [x, ' '])
}

/////////////////////////////////////////////////
