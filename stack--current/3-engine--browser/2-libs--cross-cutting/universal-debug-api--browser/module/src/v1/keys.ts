import { LS_ROOT } from '../consts.ts'

export { LS_ROOT } from '../consts.ts'

export function getOverrideKeyForLogger(name: string): string {
	return `logger.${name || 'default'}.logLevel`
}

export function getLSKeyForOverride(key: string): string {
	// should we put v1 somewhere? no, most likely overkill.
	return `${LS_ROOT}.override.${key}`
}
