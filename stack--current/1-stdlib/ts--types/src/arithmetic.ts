/////////////////////
// For documentation only.
// Obviously this doesn't cause a real additional safety
// see also: zod

export type Integer = number
export type PositiveInteger = number
//export function isꓽPositiveInteger(n: any): n is PositiveInteger {	return Number.isInteger(n) && n > 0 }
//export function assertꓽisꓽPositiveInteger(n: any): asserts n is PositiveInteger {	assert(isꓽPositiveInteger(n)) }

export type PositiveIntegerInRange<min = number, max = number> = number

export type Percentage = number // between 0 and 1

export type Real = number
export type RealInRange<min = number, max = number> = number
