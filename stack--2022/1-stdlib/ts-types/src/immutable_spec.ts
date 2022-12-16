/* XXX this is not a unit test!!!
 * this file gets compiled together and should/should not trigger compilation errors
 * (not runnable)
 */
import {
	ImmutableObject,
	Immutable,
	ImmutabilityEnforcer,
} from './index.js'


/////////////////////////////////////////////////

interface Test {
	foo: number
	bar: { // deep
		baz: string
	}
}
const t: Test = { foo: 42, bar: { baz: 'x' } }

/////////////////////////////////////////////////
// test underlying typescript mechanisms
function mutateBuiltin__Readonly__Any(x: Readonly<any>): void {
	// @ts-expect-error TS2542
	x.foo = 33
	// XXX No error... What can we do?
	x.foo.bar = 33
}
mutateBuiltin__Readonly__Any(t)
function mutateBuiltin__Never(x: never): void {
	// @ts-expect-error TS2322
	x = 33
}
mutateBuiltin__Never(null as never)

/////////////////////////////////////////////////
// nothing we can really test...
function mutatePrimitiveType__number(x: Immutable<number>): void {
	x = 33
}
mutatePrimitiveType__number(42)

function mutatePrimitiveType__string(x: Immutable<string>): void {
	x = 'y'
}
mutatePrimitiveType__string('x')

function mutatePrimitiveType__boolean(x: Immutable<boolean>): void {
	x = false
}
mutatePrimitiveType__boolean(true)

/*
function mut(a: number[]) {
	a[0] = 0
}
function indirect(a: ReadonlyArray<number>) {
	mut(a)
}
indirect([] as ReadonlyArray<number>)*/

/////////////////////////////////////////////////
// unknown
/*const a: Immutable<unknown> = 1

function mutateUnknown(x: Immutable<unknown>): void {
	// XXX the errors below are not what we want but better than nothing!
	x.foo = 33
	x['foo'] = 33
	x['bar'].baz = 'y'
}
mutateUnknown({})
mutateUnknown({} as Immutable<unknown>)
*/
/////////////////////////////////////////////////
function mutateAny(x: Immutable<any>): void {
	// XXX the errors below are not what we want but better than nothing!
	// @ts-expect-error TS2542
	x.foo = 33
	// @ts-expect-error TS2542
	x['foo'] = 33
	// @ts-expect-error TS7053 TS4111 TS2542
	x['bar'].baz = 'y'
}
mutateAny({})
mutateAny({} as Immutable<unknown>)

/////////////////////////////////////////////////
function mutateStructure(struct: Immutable<Test>): void {
	// @ts-expect-error TS2540
	struct.foo = 33

	// deep
	// @ts-expect-error TS2540
	struct.bar.baz = 'y'
}
mutateStructure(t)

// Immutable<any> should be castable to any other Immutable
mutateStructure(t as Immutable<unknown>)

// https://github.com/microsoft/TypeScript/issues/13923#issuecomment-1347610117
function mutateMutableStructure(struct: Test): void {
	struct.foo = 33
}
function indirectlyMutateImmutableStructure(struct: { readonly [K in keyof Test]: Test[K] }): void {
	// @xxx-ts-expect-error bug https://github.com/microsoft/TypeScript/issues/13347
	mutateMutableStructure(struct)
}
indirectlyMutateImmutableStructure(t)

/////////////////////////////////////////////////
function mutateArray(array: Immutable<[Test]>): void {
	// @ts-expect-error TS2540
	array[0] = { foo: 42, bar: { baz: 'x' } }

	// deep
	// @ts-expect-error TS2540
	array[0].bar.baz = 'y'
}
mutateArray([t])
mutateArray([t] as Immutable<unknown>)

/////////////////////////////////////////////////
function mutateTuple(tuple: Immutable<[number, Test]>): void {
	// @ts-expect-error TS2540
	tuple[0] = 42
	// @ts-expect-error TS2540
	tuple[1] = { foo: 42, bar: { baz: 'x' } }

	// deep
	// @ts-expect-error
	tuple[1].bar.baz = 'y'
}
mutateTuple([42, { foo: 42, bar: { baz: 'x' } }])
mutateTuple(1 as Immutable<unknown>)

/////////////////////////////////////////////////
function mutateUnion(x: Immutable<Test | number>): void {
	if (typeof x !== 'number') {
		// @ts-expect-error TS2540
		x.foo = 42

		// deep
		// @ts-expect-error TS2540
		x.bar.baz = 'y'
	}
}
mutateUnion(1)
mutateUnion(t)
mutateUnion(t as Immutable<unknown>)

/////////////////////////////////////////////////
function mutateFunction(f: Immutable<(x: string) => string>): void {
	const s1: string = f('world')
	const s2: string = f.call(undefined, 'world')
}
mutateFunction((s: string) => `Hello, ${s}!`)
mutateFunction(1 as Immutable<unknown>)

/////////////////////////////////////////////////
function mutateRecord(x: Immutable<Record<string, Test>>): void {
	// @ts-expect-error TS2542
	x['foo'] = { foo: 42, bar: { baz: 'x' } }

	// deep
	// @ts-expect-error TS2540
	x['foo'].bar.baz = 'y'
}
mutateRecord({ 'foo': t })
mutateRecord({ 'foo': t } as Immutable<any>)

/////////////////////////////////////////////////
function mutateSet(set: Immutable<Set<Test>>): void {
	// @ts-expect-error TS2339
	set.add({ foo: 42, bar: { baz: 'x' } })

	set.forEach(element => {
		// @ts-expect-error TS2540
		element.foo = 33
		// @ts-expect-error TS2540
		element.bar.baz = 'y'
	})

	// @ts-expect-error TS2540
	;[...set.values()][0]!.bar.baz = 'y'
}
mutateSet(new Set<Test>([t]))
mutateSet((new Set<Test>([t])) as Immutable<unknown>)

/////////////////////////////////////////////////
function mutateMap(map: Immutable<Map<Test, Test>>): void {
	const t2: Test = { foo: 33, bar: { baz: 'y' } }
	// @ts-expect-error TS2339
	map.add(t2, t2)

	map.forEach((value, key, map) => {
		// @ts-expect-error TS2540
		value.foo = 33
		// @ts-expect-error TS2540
		value.bar.baz = 'y'
		// @ts-expect-error TS2540
		key.foo = 33
		// @ts-expect-error TS2540
		key.bar.baz = 'y'
		// @ts-expect-error TS2339
		map.add(t2, t2)
	})

	// @ts-expect-error TS2540
	;[...map.values()][0]!.bar.baz = 'y'
	// @ts-expect-error TS2540
	;[...map.keys()][0]!.bar.baz = 'y'
}
;(() => {
	const map = new Map<Test, Test>
	map.set(t, t)

	mutateMap(map)
	mutateMap(map as Immutable<unknown>)
})()


/////////////////////////////////////////////////

const t2: Immutable<Test> = t

const ie: ImmutabilityEnforcer = <T>(s: T | Immutable<T>) => s as Immutable<T>
