
function getRandomU32() {
	const randoms = new Uint32Array(1)
	crypto.getRandomValues(randoms)
	return randoms[0]
}

export function getRandomIntInRange(min, max, randomU32 = getRandomU32()) {
	const range = max - min + 1;
	return min + (randomU32 % range);
}

function getRandomArrayElt(array, randomU32) {
	return array[getRandomInt(0, array.length - 1, randomU32)]
}
