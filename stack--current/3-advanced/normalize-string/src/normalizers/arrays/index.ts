
import { StringNormalizer } from '../../types.js'
import { normalizeꓽarray } from '../../normalize.js'
import { ensure_string, trim, normalize_unicode } from '../../normalizers/base/index.js'

/////////////////////////////////////////////////

// light, obvious normalization + options
function normalizeꓽarrayⵧof_strings(a: ReadonlyArray<string | undefined | null> | undefined | null = [], {
	filter_out_empty = true,
	deduplicate = false,
	sort = false,
	extra_normalizers = [] as StringNormalizer[],
} = {}): string[] {
	let result = normalizeꓽarray(a || [], ensure_string, normalize_unicode, trim, ...extra_normalizers)

	if (filter_out_empty) {
		result = result.filter(s => !!s)
	}

	if (deduplicate) {
		const set = new Set(result)
		result = Array.from(set)
	}

	if (sort) {
		result.sort()
	}

	return result
}

/////////////////////////////////////////////////

export {
	normalizeꓽarrayⵧof_strings,
}
