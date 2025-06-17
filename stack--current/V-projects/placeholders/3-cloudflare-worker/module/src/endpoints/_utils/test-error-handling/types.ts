import { Enum } from 'typescript-string-enums'

/////////////////////////////////////////////////

export const FailureMode = Enum(
	'none',
	'manual',
	'assertion-sync',
	'throw-sync',
	'throw-sync-non-error',
	'throw-async',
	'timeout',
	'rejection',
	'unhandled-rejection',
	'bad-status-code',
	'non-json-stringified-body',
	'non-stringified-body',
	'non-stringifiable-body',
	'no-response-set',
)
export type FailureMode = Enum<typeof FailureMode> // eslint-disable-line no-redeclare
