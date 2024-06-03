import { UUID, generate_uuid } from '@offirmo-private/uuid'

import { ElementType, Element} from './types.js'


export function create_element_base(element_type: ElementType, hints: Readonly<{uuid?: UUID}> = {}): Element {
	const uuid = hints.uuid || generate_uuid()

	return {
		uuid,
		element_type,
	}
}
