/* For documentation only.
 * Obviously, this doesn't cause real additional safety
 */

export type Integer = number
export type PositiveInteger = Integer
//export function isꓽPositiveInteger(n: any): n is PositiveInteger {	return Number.isInteger(n) && n > 0 }
//export function assertꓽisꓽPositiveInteger(n: any): asserts n is PositiveInteger {	assert(isꓽPositiveInteger(n)) }
export type PositiveIntegerInRange<min = PositiveInteger, max = PositiveInteger> = PositiveInteger

export type Percentage = number // between 0 and 1

export type Float = number
export type PositiveFloat = Float
export type FloatInRange<min = Float, max = Float> = Float
