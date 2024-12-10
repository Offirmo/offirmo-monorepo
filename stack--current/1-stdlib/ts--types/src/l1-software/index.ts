
/////////////////////////////////////////////////

export type SemVer = string // TODO better? https://semver.org/

/////////////////////////////////////////////////

// SPDX license expression syntax version 2.0 string
// https://spdx.org/licenses/
// https://spdx.dev/learn/handling-license-info/
export type SoftwareLicense‿SPDX = string

// TODO refine, license to what? is it a license to REUSE (as in npm package.json)?
// ALSO spdx is for Software!
//license: License‿SPDX | License‿SPDX[] | undefined // https://spdx.org/licenses/ undef = unknown :-(

/////////////////////////////////////////////////

// BEWARE env vs. build! cf. https://seanconnolly.dev/dont-be-fooled-by-node-env
// BEWARE env vs. release channel, ex. prod with slower "monthly" release channel (aka. "release tracks")
// beware env SPEC vs ACTUAL, ex production could be = prod, prod-cn (usually different laws), fedramp (isolated env for security reasons)
// XXX Ideally DO NOT USE!!! use dedicated sub-settings instead! cf. https://seanconnolly.dev/dont-be-fooled-by-node-env
// keeping it as it's useful as a shortcut to infer sub-settings
// (Add new envs only if they differ from existing ones)
export type UNSAFE_Environment =
//                 verbose?  assertions?  optims?  use canonical?  sends user analytics?  newest features?  Fully supported w/ backups?
	| 'prod'     //   ✘          ✘           ✔        ✔               ✔                     ✘                  ✔
	| 'staging'  //   ✘          ✘           ✔        ✘               ✘                     ✔                  ✘
	| 'dev'      //   ✔          ✔          ✘         ✘               ✘                     ✔                  ✘
//	| 'test'     //   ✔          ✔          ✘         ✘               ✘                     ✔                  -

/////////////////////////////////////////////////


// XXX only applies to Software! TODO review
//version?: SemVer
//changelog?: Url‿str
//source?: Url‿str // if relevant
