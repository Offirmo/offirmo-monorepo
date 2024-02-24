import assert from 'tiny-invariant'
import { Author, Url‿str, Immutable } from '@offirmo-private/ts-types'
import {
	normalize_unicode,
	normalizeꓽemailⵧsafe,
} from '@offirmo-private/normalize-string'

/////////////////////////////////////////////////
// Author extends WithOnlinePresence
export * from './with-online-presence.js'

/////////////////////////////////////////////////

function getꓽname(author: Immutable<Author>): string {
	return normalize_unicode(author.name).trim()
}

function getꓽintro(author: Immutable<Author>): string | undefined {
	return author.intro
		? normalize_unicode(author.intro).trim()
		: undefined
}

function getꓽemail(author: Immutable<Author>): Url‿str | undefined {
	return author.email
		? normalizeꓽemailⵧsafe(author.email)
		: undefined
}

function getꓽcontact(author: Immutable<Author>): Url‿str | undefined {
	if (author.contact)
		return author.contact

	const email = getꓽemail(author)
	if (email)
		return `mailto:${email}`

	return undefined
}

/////////////////////////////////////////////////

export {
	getꓽname,
	getꓽintro,
	getꓽemail,
	getꓽcontact,
}
