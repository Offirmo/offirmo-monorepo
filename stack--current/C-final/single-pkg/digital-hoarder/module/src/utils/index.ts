import type { Url‿str } from "@monorepo-private/ts--types--web"

/////////////////////////////////////////////////

const URL_PATTERN = /^https?:\/\/\S+/g

function isꓽUrl‿str(s: string | undefined): s is Url‿str {
	return !!s?.match(URL_PATTERN)
}

/////////////////////////////////////////////////

export {
	isꓽUrl‿str,
}
