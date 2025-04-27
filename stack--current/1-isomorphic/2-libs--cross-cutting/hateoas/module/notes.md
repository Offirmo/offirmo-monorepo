
# New improved Hypermedia

## Introduction
Goal:
* new Hypermedia format to be used as "representation" for **true** REST / HATEOAS architecture
  * would need a new kind of browser, of course


### existing
* ancestor: hypercard
* HTML
  * is "screen only", a screen replaces the previous screen on navigation
  * can use frames, but frames have perf issues
* HTML+htmx slightly improves on that
* HXML https://hyperview.org/docs/guide_html


## Spec

We want more.

* new Hypermedia format to be used as "representation" for **true** REST / HATEOAS architecture
  * would need a new kind of browser, of course
  * REST: stateless, cacheable, uniform interface
  * HATEOAS: avoid state as much as possible at all level, try to help the layer above to avoid state
* should be generic to be used in both terminal, chat-like interface, web app, mobile app…
* JSON based (obviously)
* would always have a text representation
  * with optional enrichments as supported by the "browser", but would have a fallback representation
    * illustrations
    * bg picture
      * landscape
    * soundscape
    * ...
* mutations not limited to PUT/POST/DELETE, also RPC/action
  * not restricted to <a> & <form>
* optionally code-on-demand? (lazy loading?)
* would not need a full screen refresh
  * tabs? trees? tables?
  * frames/widgets?
  * tooltips? ("floating UI" https://floating-ui.com/)
* support other "streams" of representation: (TBD!)
  * flow, // normal immediate feedback to user actions
  * vs. floating = not disrupting the flow
  * popup // full screen ? sub-container?
  * flyout
  * popover
  * announcement
  * cutscene
  semantic_level?: 'error' | 'warning' | 'info' | 'success',
  * auto-dismiss?
  * ...
* push from server
* resrc + pending engagements


recommended design?
chain of resources with "continue-to" or actions/engagements?
ex. TBRPG's play = action/engagement? or /aventure -> /adventure/last -> adventures?
-> rsrc when we may want to go back to it (ex last adventure's result)
-> engagement when disposable + we don't want to have it again if revisiting the rsrc
