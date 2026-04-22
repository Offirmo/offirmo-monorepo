import type { Url‿str } from "@monorepo-private/ts--types--web"

/////////////////////////////////////////////////

const URL_PATTERN = /^https?:\/\/\S+/g

function isꓽUrl‿str(s: string | undefined): s is Url‿str {
	return !!s?.match(URL_PATTERN)
}

/////////////////////////////////////////////////

const DATE_PATTERN_YMD = /^\d{4}-\d{2}-\d{2}/;
const DATE_PATTERN_YM = /^\d{4}-\d{2}/;
const DATE_PATTERN_Y = /^\d{4}/;

function isꓽYMDDate(s: string | undefined): s is string {
	return !!s?.match(DATE_PATTERN_YMD)
		|| !!s?.match(DATE_PATTERN_YM)
		|| !!s?.match(DATE_PATTERN_Y)
}

/////////////////////////////////////////////////

export {
	isꓽUrl‿str,
	isꓽYMDDate
}
