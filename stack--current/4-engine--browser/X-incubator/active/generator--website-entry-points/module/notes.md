
= higher level web property generator


index.html are a mess:
- security
- huge list of meta
  - including social ones (with lots of repetition!)
  - favicons
- critical CSS
- preload
- 3rd party scripts
- webmanifest with repetition: titles, favicons...

And above all it's hard to properly comment!

I need a tool.


NOT IN SCOPE
* minification = not this tool's job
* SSR = maybe one day? but ideally we want full static on CDN


TODO evaluate https://posthog.com
TODO rename "web property" ?
TODO auto "link tree" such as this complex one https://linktr.ee/infinex.xyz

security -- domain name registration, DNS, hosting = don't use the same provider so that a compromise don't allow to access everything (from a domain recovery expert) https://www.reddit.com/r/Domains/comments/1gdpqdk/comment/miu1osc/


TODO all sections of https://github.com/about
TODO sitelinks? https://developers.google.com/search/docs/appearance/sitelinks
TODO https://developer.mozilla.org/en-US/docs/Web/Manifest#splash_screens
TODO https://github.com/h5bp/html5-boilerplate#quick-start
TODO real example https://www.domain.com.au/guides/the-ultimate-guide-to-renovating-your-home-982295/
TODO https://developers.google.com/digital-asset-links/v1/getting-started
TODO app stores declarations https://github.com/BlinqOSS/yurl


legal = all of https://vercel.com/


## fitting inside the box

* TODO "pinned tab" (safari ios)
* TODO preview from gmail

## breaking out of the box

TODO https://web.dev/articles/window-controls-overlay
TODO https://alistapart.com/article/breaking-out-of-the-box/
TODO https://medium.com/samsung-internet-dev/toolbars-keyboards-and-the-viewports-10abcc6c3769
TODO on rotate, should resize the viewport (TODO test iOs)

### non-rectangle screen shapes

### notches
* https://blog.felgo.com/cross-platform-app-development/notch-developer-guide-ios-android


### (desktop) Window Controls Overlay
* https://web.dev/articles/window-controls-overlay

### virtual keyboard


### foldable screens
* ~testable in Edge
* TODO +++ https://blogs.windows.com/msedgedev/2020/09/14/introducing-dual-screen-foldable-web-apis/
* TODO https://www.apptunix.com/blog/an-ultimate-guide-to-developing-mobile-apps-for-foldable-devices/

### multi screens
* TODO https://web.dev/patterns/web-apps/multiple-screens
* TODO https://medium.com/geekculture/web-based-multi-screen-apps-including-drag-drop-5e161da6507b



## PWA
- TODO https://web.dev/learn/pwa/app-design
- TODO https://www.pwabuilder.com/

### advocacy
- 2023 https://www.computerworld.com/article/3688575/why-is-apple-making-big-improvements-to-web-apps-for-iphone.html

### Windows
- TODO "pinned sites" https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/hh772707(v=vs.85)

### macOs


### Android

#### WebView ?
https://developer.chrome.com/docs/multidevice/webview/


### iOs


### ipadOs


## Payment!!
TODO https://developer.mozilla.org/en-US/docs/Web/API/Payment_Handler_API

## URLs
https://blog.jim-nielsen.com/2023/examples-of-great-urls/



Something went wrong
Try reloading the page, then check our Statuspage for any current outages. If there are no relevant outages, create a support request so we can help you out.

If you create a request, include the following so we can help you as fast as possible:

Error type: 500 - Internal server error
Log reference: xxx-yyy-zzz



TODO https://opengraphgenerator.org/
TODO https://colinkeany.github.io/brandgrab/
TODO https://llmstxt.org
