
## Pragmatic Graph data structure library

Includes:
- generic graph
- specific graph: file system representation (arborescence of folder, files)
- TODO craft
- TODO places and connexions

WARNING: only the features I need are implemented. For ex. NO node / vertex removal!

## Usage

Note: reading some refresher about graph theory is highly recommended!
- https://en.wikipedia.org/wiki/Multigraph

### concepts

Note: terminology
- This lib uses the standard terminology form graph theory
- I settled on `node`/`link` terminology for max clarity (over `vertex`/`edge` for ex.)

#### Custom UIDs vs internal UIds
- This lib requires the user to provide a **custom *unique* id** for nodes
- This lib does NOT allow the storage of meta-data



TOSORT
Basics:
* https://ehizman.live/graph-data-structures-typescript
* https://ricardoborges.dev/data-structures-in-typescript-graph
* https://en.wikipedia.org/wiki/Graph_theory
* Existing implementation: https://segfaultx64.github.io/typescript-graph/index.html
