// https://cimi.io/murmurhash3js-revisited/
// https://github.com/cimi/murmurhash3js-revisited
import * as _MurmurHash3_cjs from 'murmurhash3js-revisited'
import stringifyⵧstable from '@offirmo-private/json-stable-stringify'

const MurmurHash3 = (_MurmurHash3_cjs as any).default

/////////////////////////////////////////////////

type TextEncoderConstructor = any // TODO one day
let tec: TextEncoderConstructor | undefined = undefined
function injectꓽtext_encoder(c: TextEncoderConstructor) {
	tec = c
}


const MurmurHash = {
	v3: {
		x64ⵧ128: {
			hashꓽstring(str: string, TextEncoder: TextEncoderConstructor = tec): string {
				if (!TextEncoder)
					throw new Error('@offirmo-private/murmurhash: a textEncoder implementation must be provided!')

				const bytes = new TextEncoder().encode(str)
				return MurmurHash3.x64.hash128(bytes)
			},
			hashꓽobject(o: Readonly<any>, TextEncoder: TextEncoderConstructor = tec): string {
				if (!TextEncoder)
					throw new Error('@offirmo-private/murmurhash: a textEncoder implementation must be provided!')

				const str = stringifyⵧstable(o)
				const bytes = new TextEncoder().encode(str)
				return MurmurHash3.x64.hash128(bytes)
			},
		},
	},
}

/////////////////////////////////////////////////

export {
	injectꓽtext_encoder,

	MurmurHash,
}

export default MurmurHash
