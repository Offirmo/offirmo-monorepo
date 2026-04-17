import  { get‿DigitalHordingMemeplex, type DigitalHoardingMemeplex, isꓽUrl‿str } from './digital-hoarding-meme/index.ts'

/////////////////////////////////////////////////

function parse(mm_txt: string): DigitalHoardingMemeplex {
	return get‿DigitalHordingMemeplex(mm_txt)
}

/////////////////////////////////////////////////

export {
	parse,
	isꓽUrl‿str,
}
