/////////////////////
// unsure where to sort those types for now

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types
// TODO add Symbol?
export type JSPrimitiveType = boolean | null | undefined | number | string

/////////////////////

export interface NumberMap {
	[k: string]: number
}

/////////////////////

// https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
export type HashOf<T> = Record<string, T>

/////////////////////


// XXX Ideally DO NOT USE!!!
// use dedicated sub-settings instead! cf. https://seanconnolly.dev/dont-be-fooled-by-node-env
// keeping it as it's useful as a shortcut to infer sub-settings
// (Add new envs only if they differ from existing ones)
export type Environment =
//                 verbose?  asserts?  optims?  use canonical?  sends user analytics?  newest features?
	| 'prod'     //  ✘         ✘         ✔        ✔               ✔                     ✘
	| 'staging'  //  ✘         ✘         ✔        ✘               ✘                     ✔
	| 'dev'      //  ✔         ✔         ✘        ✘               ✘                     ✔
//	| 'test'     //  ✔         ✔         ✘        ✘               ✘                     ✔
