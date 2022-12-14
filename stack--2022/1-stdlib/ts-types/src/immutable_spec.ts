/* XXX this is not a unit test!!!
 * this file gets compiled together and should/should not trigger compilation errors
 * (not runnable)
 */
import {
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
function testBuiltin__Readonly__Any(x: Readonly<any>): void {
	// @ts-expect-error TS2542
	x.foo = 33
	// XXX No error... What can we do?
	x.foo.bar = 33
}
testBuiltin__Readonly__Any(t)
function testBuiltin__Never(x: never): void {
	// @ts-expect-error TS2322
	x = 33
}
testBuiltin__Never(null as never)

/////////////////////////////////////////////////
// nothing we can really test...
function testPrimitiveType__number(x: Immutable<number>): void {
	x = 33
}
testPrimitiveType__number(42)

function testPrimitiveType__string(x: Immutable<string>): void {
	x = 'y'
}
testPrimitiveType__string('x')

function testPrimitiveType__boolean(x: Immutable<boolean>): void {
	x = false
}
testPrimitiveType__boolean(true)

/////////////////////////////////////////////////
function testAny(x: Immutable<any>): void {
	// XXX the errors below are not what we want
	// @ts-expect-error TS2542
	x.foo = 33
	// @ts-expect-error TS2542
	x['foo'] = 33
	// xx@ts-expect-error TS4111 TS2542
	x['bar'].baz = 'y' // XXX not the error we want
}
testAny({})

/////////////////////////////////////////////////
function testStructure(struct: Immutable<Test>): void {
	// @ts-expect-error TS2540
	struct.foo = 33

	// deep
	// @ts-expect-error TS2540
	struct.bar.baz = 'y'
}
testStructure(t)

/////////////////////////////////////////////////
function testArray(array: Immutable<[Test]>): void {
	// @ts-expect-error TS2540
	array[0] = { foo: 42, bar: { baz: 'x' } }

	// deep
	// @ts-expect-error TS2540
	array[0].bar.baz = 'y'
}
testArray([t])

/////////////////////////////////////////////////
function testTuple(tuple: Immutable<[number, Test]>): void {
	// @ts-expect-error TS2540
	tuple[0] = 42
	// @ts-expect-error TS2540
	tuple[1] = { foo: 42, bar: { baz: 'x' } }

	// deep
	// @ts-expect-error
	tuple[1].bar.baz = 'y'
}
testTuple([42, { foo: 42, bar: { baz: 'x' } }])

/////////////////////////////////////////////////
function testUnion(x: Immutable<Test | number>): void {
	if (typeof x !== 'number') {
		// @ts-expect-error TS2540
		x.foo = 42

		// deep
		// @ts-expect-error TS2540
		x.bar.baz = 'y'
	}
}
testUnion(1)
testUnion(t)

/////////////////////////////////////////////////
function testFunction(f: Immutable<(x: string) => string>): void {
	const s1: string = f('world')
	const s2: string = f.call(undefined, 'world')
}
testFunction((s: string) => `Hello, ${s}!`)

/////////////////////////////////////////////////
function testRecord(x: Immutable<Record<string, Test>>): void {
	// @ts-expect-error TS2542
	x['foo'] = { foo: 42, bar: { baz: 'x' } }

	// deep
	// @ts-expect-error TS2540
	x['foo'].bar.baz = 'y'
}
testRecord({ 'foo': t })

/////////////////////////////////////////////////
function testSet(set: Immutable<Set<Test>>): void {
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
testSet(new Set<Test>([t]))

/////////////////////////////////////////////////
function testMap(map: Immutable<Map<Test, Test>>): void {
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

	testMap(map)
})()


/////////////////////////////////////////////////

const t2: Immutable<Test> = t

const ie: ImmutabilityEnforcer = <T>(s: T | Immutable<T>) => s as Immutable<T>
