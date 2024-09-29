import { Enum } from 'typescript-string-enums'

const EngagementKey = Enum(
	'just-some-text',
	'hello_world--flow',
	'hello_world--aside',
	'hello_world--warning',

)
type EngagementKey = Enum<typeof EngagementKey> // eslint-disable-line no-redeclare

export {
	EngagementKey,
}
