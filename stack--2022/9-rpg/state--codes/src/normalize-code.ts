import { coerce_toꓽredeemable_code } from '@offirmo-private/normalize-string'

function normalize_code(s: string): string {
	return coerce_toꓽredeemable_code(s)
}

export default normalize_code
