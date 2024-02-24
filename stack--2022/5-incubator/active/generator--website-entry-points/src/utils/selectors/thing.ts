import assert from 'tiny-invariant'
import { Immutable, Thing, IETFLanguageType } from '@offirmo-private/ts-types'
import {
	normalize_unicode,
} from '@offirmo-private/normalize-string'

import * as AuthorSelectors from './author'

/////////////////////////////////////////////////


function getꓽlang(thing: Immutable<Thing>): IETFLanguageType {
	if (!thing.lang)
		return 'en'

	// TODO check format
	return normalize_unicode(thing.lang).toLowerCase().trim()
}

function getꓽdescription(thing: Immutable<Thing>): string {
	assert(!!thing.description)
	return normalize_unicode(thing.description).trim()
}

function getꓽauthor__name(thing: Immutable<Thing>): string {
	assert(thing.author, `should have an author`)
	return AuthorSelectors.getꓽname(thing.author)
}
function getꓽauthor__intro(thing: Immutable<Thing>): string | undefined {
	return thing.author
		? AuthorSelectors.getꓽintro(thing.author)
		: undefined
}
function getꓽauthor__contact(thing: Immutable<Thing>): string | undefined {
	return thing.author
		? AuthorSelectors.getꓽintro(thing.author)
		: undefined
}

/*
	lang?: IETFLanguageType
	description: string // must be simple, a paragraph at most
 */

/////////////////////////////////////////////////

export {
	getꓽlang,
	getꓽdescription,
	getꓽauthor__name,
	getꓽauthor__intro,
	getꓽauthor__contact,
}
