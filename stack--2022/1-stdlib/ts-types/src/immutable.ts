/////////////////////
// better than Readonly<T>
// To be used in parameters to enforce immutability / no side effects
//
// Why providing this type ourselves when there are many libs offering it?
// - it's critical
// - uses the "Immutable" vocabulary
// - deep by default
// - has unit tests
// - can be cancelled for special cases
//
// We aim at the most common types, not exhaustive
// Reminder: Readonly is meaningful for aggregation types (arrays, maps, etc.)

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
type IsAny<T> = 0 extends 1 & T ? true : false;


// 1) derived from https://github.com/microsoft/TypeScript/issues/13923#issuecomment-557509399
// 2) improved
// 3) then contributed back https://github.com/microsoft/TypeScript/issues/13923#issuecomment-716706151
export type ImmutablePrimitive = undefined | null | boolean | string | number | Function


export type Immutable<T> =
	// order is important, some checks are greedy
	IsAny<T> extends true ? Readonly<unknown> // better than Readonly<any>. This version is 1) deep 2) allows casting
		: T extends ImmutablePrimitive ? T // already immutable + no real point for primitive types
			//: T extends Array<infer U> ? ImmutableArray<U> doesn't seem needed, doesn't change anything
				: T extends Map<infer K, infer V> ? ImmutableMap<K, V>
					: T extends Set<infer M> ? ImmutableSet<M>
						:  T extends {} ? ImmutableObject<T> // catch-all, must be at the end
								: never // unhandled, we should investigate

//	IsAny<T> extends true ? Readonly<any> | ImmutableObject<{ [k: string]: any }> // better than Readonly<any>. This version is 1)  deep 2) allows casting

/*
export type Immutable<T> =
	// order is important, some checks are greedy
	IsAny<T> extends true ? Readonly<any> // not deep, but best we can do :( TODO report?
		//: T extends Array<infer U> ? ImmutableArray<U> not needed
			: T extends Map<infer K, infer V> ? ImmutableMap<K, V>
				: T extends Set<infer M> ? ImmutableSet<M>
					: T extends ImmutablePrimitive ? T // already immutable + no real point for primitive types
						: T extends {} ? ImmutableObject<T> // catch-all, must be at the end
							: never // unhandled, we should investigate
*/

/* old version, doesn't handle Readonly<any> well
export type Immutable<T> =
	T extends ImmutablePrimitive ? T
		//: T extends Array<infer U> ? ImmutableArray<U> no need!
		: T extends Map<infer K, infer V> ? ImmutableMap<K, V>
			: T extends Set<infer M> ? ImmutableSet<M>
				: ImmutableObject<T>
 */


export type ImmutableArray<T>  = ReadonlyArray<Immutable<T>>
export type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>
export type ImmutableSet<T>    = ReadonlySet<Immutable<T>>
export type ImmutableObject<T> = { +readonly [K in keyof T]: Immutable<T[K]> }
// TODO add WeakMap, WeakSet?
// TODO add Promise?

/////////////////////

export type ImmutabilityEnforcer = <T>(x: T | Immutable<T>) => Immutable<T>

/////////////////////

// to cancel an Immutable (beware! You're breaking the contract!)
// Example usage: API outside your control that refuse to take an Immutable, ex. ORM
export type Mutable<I> =
	I extends ImmutablePrimitive ? I
		: I extends ImmutableMap<infer IK, infer IV> ? MutableMap<IK, IV>
			: I extends ImmutableSet<infer IM> ? MutableSet<IM>
				: MutableObject<I>

export type MutableMap<IK, IV> = Map<Mutable<IK>, Mutable<IV>>
export type MutableSet<IT>     = Set<Mutable<IT>>
export type MutableObject<IT>  = { -readonly [K in keyof IT]: Mutable<IT[K]> }
