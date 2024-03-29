/////////////////////////////////////////////////

export const LIB = '@offirmo/memories-sorter'

export const RELATIVE_PATH_NORMALIZATION_VERSION = 1 // 'YYYY/YYYYMMDD - xyz/MMxxxx-xx-xx_xxhxx_xyz.ext'

// if we can, we must restore those extensions
export const FILE_EXTENSIONSⵧTO_BE_FIXED‿LC = [
	'.CHK', // recovered files from Windows
].map(s => s.toLowerCase())

export const FILE_EXTENSIONSⵧEXIF_POWERED‿LC = [
	// https://en.wikipedia.org/wiki/Exif
	'.heic', '.heif', // new standard mainly used by Apple. contains EXIf according to https://www.photoreview.com.au/tips/shooting/heif-what-you-need-to-know/ + seen experimentally
	'.jpg', '.jpeg',
	'.mov',
	'.mp4',
	'.tif', '.tiff',
	'.wav',

	...FILE_EXTENSIONSⵧTO_BE_FIXED‿LC, // They may be an exif-powered file!
].map(s => s.toLowerCase())

// prefix '.' to make it an invisible file
export const NOTES_FILE__BASENAME‿LC = `.${LIB}_notes.json`.toLowerCase()

// should NOT be a common separator
export const DIGIT_PROTECTION_SEPARATOR = 'x'
