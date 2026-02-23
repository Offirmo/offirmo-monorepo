import { Immutable } from '@monorepo-private/ts--types'
import * as RichText from '@monorepo-private/rich-text-format'

import { Quality } from './types'


export function get_class__quality(quality: Immutable<Quality>): string {
	return 'quality--' + quality
}
