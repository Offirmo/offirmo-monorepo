
"mono repo management" https://bit.dev/



- JS/TS oriented
- manage the "cruft" = everything not our cool source code
- high level
  - above runtime node/deno/bun...
  - above pkg manager bolt/pnpm
    - can even help transitioning between
- favor multiple small packages
- "resurrect" mode
- allow "focus" mode
- allow "extraction" ex. to "source available"
- catalogs https://bun.com/docs/install/catalogs


- folder based
- can (re)generate package.json / configs
- plugins


Graph:
repo = coordinator / sub https://en.wikipedia.org/wiki/Leader_election
- workspace root
  - workspace layer = line in
    - package = package.json = lib / app (has peer deps or not)
      - entry points = export/sandbox/demo






"dev engines" https://github.com/nodejs/corepack?tab=readme-ov-file#devenginespackagemanager
"known good release" https://github.com/nodejs/corepack?tab=readme-ov-file#known-good-releases
package specifier https://docs.npmjs.com/cli/v11/using-npm/package-spec

type terminology https://nodejs.org/dist/latest/docs/api/util.html#utiltypes

Semver
https://www.npmjs.com/package/semver
https://semver.npmjs.com/
https://www.npmjs.com/package/semver-diff
https://www.npmjs.com/package/semver-truncate
https://www.npmjs.com/package/binary-version



https://en.wikipedia.org/wiki/Dependency_hell

Config
https://keyv.org/docs/keyv/
https://github.com/sindresorhus/home-or-tmp
https://www.npmjs.com/package/package-config
https://www.npmjs.com/package/conf



Matching -- Wildcard https://www.npmjs.com/package/matcher
Matching -- glob

Ts -- tsconfig -- base https://www.npmjs.com/package/@sindresorhus/tsconfig


Path manip
https://www.npmjs.com/package/strip-path
Tildify https://www.npmjs.com/package/tildify
https://www.npmjs.com/package/is-path-inside
https://www.npmjs.com/package/is-path-inside

File manip
https://www.npmjs.com/package/strip-json-comments
https://www.npmjs.com/package/strip-bom
https://www.npmjs.com/package/strip-final-newline
https://www.npmjs.com/package/split-lines
https://www.npmjs.com/package/detect-indent
https://www.npmjs.com/package/detect-newline
https://www.npmjs.com/package/condense-whitespace



https://www.npmjs.com/package/hash-object

https://www.npmjs.com/package/parse-github-repo-url
https://www.npmjs.com/package/temp-path
