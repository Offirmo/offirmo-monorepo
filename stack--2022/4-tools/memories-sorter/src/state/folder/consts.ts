import { Basename } from '../../types.js'
import { Type} from './types.js'

export const LIB = '📂'

function _getꓽspecial_folder_final_base(type: Type): Basename {
	return `- ${type}`
}
export const SPECIAL_FOLDERⵧINBOX__BASENAME = _getꓽspecial_folder_final_base(Type.inbox)
export const SPECIAL_FOLDERⵧCANT_AUTOSORT__BASENAME = _getꓽspecial_folder_final_base(Type.cant_autosort)
export const SPECIAL_FOLDERⵧCANT_RECOGNIZE__BASENAME = _getꓽspecial_folder_final_base(Type.cant_recognize)
export const SPECIAL_FOLDERS_BASENAMES = [
	SPECIAL_FOLDERⵧINBOX__BASENAME,
	SPECIAL_FOLDERⵧCANT_AUTOSORT__BASENAME,
	SPECIAL_FOLDERⵧCANT_RECOGNIZE__BASENAME,
]
