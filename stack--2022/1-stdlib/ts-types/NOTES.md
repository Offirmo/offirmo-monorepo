

/* 2022 Other past versions, kept bc still looking for the best trad-offs

XXX ↓ this line breaks castability !
: IsAny<T> extends true ? Readonly<any> // not deep, but best we can do (see discussion below)

export type Immutable<T> =
// order is important, some checks are greedy
IsAny<T> extends true ? Readonly<any> // not deep, but best we can do (see discussion below)
: T extends ImmutablePrimitive ? T // already immutable + no real point for primitive types
//: T extends Array<infer U> ? ImmutableArray<U> doesn't seem needed, doesn't change anything
: T extends Map<infer K, infer V> ? ImmutableMap<K, V>
: T extends Set<infer M> ? ImmutableSet<M>
:  T extends {} ? ImmutableObject<T> // catch-all, must be at the end
: never // unhandled, we should investigate

export type Immutable<T> =
// order is important, some checks are greedy
IsAny<T> extends true ? Readonly<any> // not deep, but best we can do :( TODO report?
//: T extends Array<infer U> ? ImmutableArray<U> not needed
: T extends Map<infer K, infer V> ? ImmutableMap<K, V>
: T extends Set<infer M> ? ImmutableSet<M>
: T extends ImmutablePrimitive ? T // already immutable + no real point for primitive types
: T extends {} ? ImmutableObject<T> // catch-all, must be at the end
: never // unhandled, we should investigate

- old version, doesn't handle Readonly<any> well
  export type Immutable<T> =
  T extends ImmutablePrimitive ? T
  //: T extends Array<infer U> ? ImmutableArray<U> no need!
  : T extends Map<infer K, infer V> ? ImmutableMap<K, V>
  : T extends Set<infer M> ? ImmutableSet<M>
  : ImmutableObject<T>
  */
