import { LS_ROOT } from '../consts.js'

export { LS_ROOT } from '../consts.js'

export function getOverrideKeyForLogger(name: string): string {
	return `logger.${name || 'default'}.logLevel`
}

export function getLSKeyForOverride(key: string): string {
	// should we put v1 somewhere? no, most likely overkill.
	return `${LS_ROOT}.override.${key}`
}
