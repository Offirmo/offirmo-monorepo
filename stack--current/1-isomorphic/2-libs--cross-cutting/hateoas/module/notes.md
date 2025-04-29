
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

See all the essays in https://htmx.org/essays/

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
* keep the semantic!
* mutations not limited to PUT/POST/DELETE, also RPC/action
  * not restricted to <a> & <form>
* optionally code-on-demand? (lazy loading?)
* would not need a full screen refresh (the case for SPA)
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
  * skippable
  * possibility of aborting? (difficult)
  semantic_level?: 'error' | 'warning' | 'info' | 'success',
  * auto-dismiss?
  * ...
* push from server (the other missing case)
* rsrc + pending engagements
* offline first
* progressive enhancement
* improved concept of "session"
  * not tied to tab life
    * bc for ex. if tab left for a long time, may be considered a new session
    * also bc we want to embrace "multi tab" work = no need to have several recaps or notifs
  * also concept of recap
* ideally should embed the concept of notifications as well
* And don't forget!
  * cool!
  * whimsical!


recommended design?
chain of resources with "continue-to" or actions/engagements?
ex. TBRPG's play = action/engagement? or /aventure -> /adventure/last -> adventures?
-> rsrc when we may want to go back to it (ex last adventure's result)
-> engagement when disposable + we don't want to have it again if revisiting the rsrc
