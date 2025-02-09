import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import {
	normalize_unicode,
} from '@offirmo-private/normalize-string'

import * as AuthorSelectors from '../20-author/selectors.js'

import { Thing } from './types.js'

/////////////////////////////////////////////////

function getꓽdescription(thing: Immutable<Thing>): string {
	assert(thing.description, `should have a description`)
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
		? AuthorSelectors.getꓽcontact(thing.author)
		: undefined
}

/////////////////////////////////////////////////

export {
	getꓽdescription,
	getꓽauthor__name,
	getꓽauthor__intro,
	getꓽauthor__contact,
}
