import { createHash } from 'node:crypto'
import { normalizeꓽemailⵧsafe, normalizeꓽemailⵧreasonable, normalizeꓽemailⵧfull } from '@offirmo-private/normalize-string'


export function get_gravatar_url(email: string): string {
	email = normalizeꓽemailⵧreasonable(email) // not too much
	const md5 = createHash('md5').update(email).digest('hex')
	return `https://www.gravatar.com/avatar/${md5}?r=pg&d=retro`
}


export function normalize_email_safe(email: string): string {
	return normalizeꓽemailⵧsafe(email)
}

export function normalize_email_reasonable(email: string): string {
	const safe = normalizeꓽemailⵧsafe(email)
	if (safe.startsWith('offirmo.net+') && safe.endsWith('@gmail.com')) {
		return safe
	}
	return normalizeꓽemailⵧreasonable(email)
}

export function normalize_email_full(email: string): string {
	const safe = normalizeꓽemailⵧsafe(email)
	if (safe.startsWith('offirmo.net+') && safe.endsWith('@gmail.com')) {
		return safe
	}
	return normalizeꓽemailⵧfull(email)
}
