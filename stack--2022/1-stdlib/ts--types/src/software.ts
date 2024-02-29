
export type SemVer = string // TODO better? https://semver.org/

// SPDX license expression syntax version 2.0 string
// https://spdx.org/licenses/
// https://spdx.dev/learn/handling-license-info/
export type SoftwareLicense‿SPDX = string


// XXX only applies to Software! TODO review
//version?: SemVer
//changelog?: Url‿str
//source?: Url‿str // if relevant



// TODO refine, license to what? is it a license to REUSE (as in npm package.json)?
// ALSO spdx is for Software!
//license: License‿SPDX | License‿SPDX[] | undefined // https://spdx.org/licenses/ undef = unknown :-(
