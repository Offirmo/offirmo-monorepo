# Isomorphic Flux Architecture

## Theory

* intro https://medium.com/code-cartoons/a-cartoon-guide-to-flux-6157355ab207
* official description https://facebookarchive.github.io/flux/ and https://facebookarchive.github.io/flux/docs/in-depth-overview/
* related concepts https://github.com/gajus/canonical-reducer-composition/blob/master/README.md, https://github.com/redux-utilities/flux-standard-action

## Practical

* Main store + secondary stores = hint, we don't necessarily want the secondary stores to re-reduce the whole state each time.
* offline first = main store is the "in-memory" one (or session)
  * secondary stores, in order of remote-ness
    * local storage
    * service worker (to sync between tabs)
    * edge worker KV
    * cloud server
  * secondary stores may be async
* on creation of the flux wiring, the main store can be init'd from a secondary store, ex. local storage

## Spec

MUST be monotonic, see https://en.wikipedia.org/wiki/Eventual_consistency

Should be compatible with
* React's [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
* React's suspense [use]()
* and indirectly with [useReducer](https://react.dev/reference/react/useReducer)


TODO flux error should report to dispatcher
