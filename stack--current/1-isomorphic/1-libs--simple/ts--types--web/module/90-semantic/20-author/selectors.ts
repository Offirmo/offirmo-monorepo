import assert from 'tiny-invariant'
import type { Author, Url‿str, Immutable } from '@monorepo-private/ts--types'
import {
	normalize_unicode,
	normalizeꓽemailⵧsafe,
	normalizeꓽurl,
} from '@monorepo-private/normalize-string'

/////////////////////////////////////////////////
// Author extends WithOnlinePresence
export * from '../10-with-online-presence/selectors.ts'

/////////////////////////////////////////////////

function getꓽname(author: Immutable<Author>): string {
	return normalize_unicode(author.name).trim()
}

function getꓽintro(author: Immutable<Author>): string | undefined {
	return author.intro
		? normalize_unicode(author.intro).trim()
		: `${getꓽname(author)}, author.`
}

function getꓽemail(author: Immutable<Author>): Url‿str | undefined {
	return author.email
		? normalizeꓽemailⵧsafe(author.email)
		: undefined
}

function getꓽcontact(author: Immutable<Author>): Url‿str | undefined {
	if (author.contact)
		return normalizeꓽurl(author.contact)

	const email = getꓽemail(author)
	if (email)
		return normalizeꓽurl(`mailto:${email}`)

	return undefined
}

/////////////////////////////////////////////////

export {
	getꓽname,
	getꓽintro,
	getꓽemail,
	getꓽcontact,
}
