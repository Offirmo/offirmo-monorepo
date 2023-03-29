import { UUID, WithUUID } from './types.js'

interface Test extends WithUUID {
	another: UUID
}
