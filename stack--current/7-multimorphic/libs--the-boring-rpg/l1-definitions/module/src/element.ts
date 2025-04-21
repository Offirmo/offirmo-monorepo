import { type WithUUID, generate_uuid } from '@offirmo-private/uuid'

import { ElementType, type Element} from './types.ts'

/////////////////////////////////////////////////

function createꓽelementⵧbase(element_type: ElementType, { uuid = generate_uuid() }: Readonly<Partial<WithUUID>> = {}): Element {
	return {
		uuid,
		element_type,
	}
}

/////////////////////////////////////////////////

export {
	createꓽelementⵧbase,
}
