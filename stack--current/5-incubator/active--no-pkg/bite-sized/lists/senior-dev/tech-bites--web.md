+++ https://courses.joshwcomeau.com/
+++ https://developer.mozilla.org/en-US/curriculum/
+++ https://medium.com/@cramforce/designing-very-large-javascript-applications-6e013a3291a3 + https://medium.com/@cramforce/designing-even-larger-applications-460ee029012d
[ ] +++ https://dev.to/anze_kop1tar/acronyms-you-should-know-when-going-to-a-job-interview-369l
[ ] security https://portswigger.net/web-security/all-topics
[ ] security https://xsleaks.dev/
[ ] TODO shearing layers https://en.wikipedia.org/wiki/Shearing_layers
APIs web
appli web
architecture -- Islands
architecture -- JAMStack = [JavaScript, APIs, Markup] as much HTML as possible is pre-built and stored in a content delivery network (CDN). Instead of running a monolithic backend application on the server side to generate dynamic content, dynamic components of the application are based on APIs. Ideally, this results in a much faster user experience and a much simpler developer experience. https://www.cloudflare.com/learning/performance/what-is-jamstack/  https://jamstack.org/what-is-jamstack/
architecture -- LAMP (outdated)
architecture -- SSR
CDN
Chrome = the graphical framework and elements surrounding the content. means different things depending on the context: In the context of a web browser it is the navigation, toolbar etc. In the context of a website it is navigation, ad-space and other fixed aspects of the design https://stackoverflow.com/a/5072092/587407
client/server -- multi-tier architecture -- 01 presentation
client/server -- multi-tier architecture -- 02 application
client/server -- multi-tier architecture -- 03 business
client/server -- multi-tier architecture -- 04 data access
client/server -- multi-tier architecture https://en.wikipedia.org/wiki/Multitier_architecture
collaborative experiences https://zknill.io/posts/collaboration-no-crdts/
components https://www.componentdriven.org/
CSS -- atomic
CSS -- cascade https://2019.wattenberger.com/blog/css-cascade
CSS -- color -- formats = hex, rgb(), hsl(), lch() https://www.joshwcomeau.com/css/color-formats/
CSS -- Combinators https://courses.joshwcomeau.com/css-for-js/00-recap/04.03-combinators
CSS -- containing block
CSS -- fixed -- https://meyerweb.com/eric/thoughts/2011/09/12/un-fixing-fixed-elements-with-css-transforms/
CSS -- isolate
CSS -- layers
CSS -- layers
CSS -- margin -- negative https://www.quirksmode.org/blog/archives/2020/02/negative_margin.html
CSS -- Media Queries https://courses.joshwcomeau.com/css-for-js/00-recap/03-media-queries
CSS -- methodologies -- BEM
CSS -- nesting
CSS -- Pseudo-classes :xyz https://courses.joshwcomeau.com/css-for-js/00-recap/04.01-pseudo-classes
CSS -- Pseudo-elements ::xyz  https://courses.joshwcomeau.com/css-for-js/00-recap/04.02-pseudo-elements
CSS -- rule = selector + property + value + unit https://courses.joshwcomeau.com/css-for-js/00-recap/02-anatomy
CSS -- stacking context https://github.com/andreadev-it/stacking-contexts-inspector
CSS -- transforms
CSS -- z-index
CSS https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started
data fetching https://martinfowler.com/articles/data-fetch-spa.html
DDoS
devices -- support
features -- "infantile level" https://www.linkedin.com/pulse/one-reason-why-invision-failed-greg-nudelman/
features -- scale = Search, sort, diffs, authorship tracking, comments, permissions (user management), sharing security, SSO, integrations... https://www.linkedin.com/pulse/one-reason-why-invision-failed-greg-nudelman/
fonts
fonts -- calibration https://web.dev/articles/css-size-adjust#calibrating_fonts
HTML -- concepts
HTML -- elements
HTML -- tags
htmx https://htmx.org/
hypermedia
i18e Ecosystem Performance = Cleanup, Speedup, Levelup. One Package at a time. https://e18e.dev/
iframe
iframe -- fenced
iframe -- sandbox
iframe -- seamless
interop https://developer.mozilla.org/en-US/blog/interop2023-mdn-doc-updates/
JS -- exports https://webpack.js.org/guides/package-exports/
MDN
MDN curriculum https://developer.mozilla.org/en-US/curriculum/
perf metrics -- "9 must known" https://twitter.com/alexxubyte/status/1769748487317651962
perf metrics -- core web vitals -- 01 Largest Contentful Paint (LCP) = loading performance. LCP must occur within 2.5 seconds of when the page first starts loading 
perf metrics -- core web vitals -- 02 Interaction to Next Paint (INP) = interactivity. To provide a good user experience, pages must have a INP of 200 milliseconds or less.
perf metrics -- core web vitals -- 03 Cumulative Layout Shift (CLS) = visual stability. To provide a good user experience, must should maintain a CLS of 0.1. or less.
perf metrics -- core web vitals -- First Input Delay (FID) DEPRECATED https://web.dev/articles/fid
perf metrics -- core web vitals https://web.dev/articles/vitals  https://web.dev/explore/learn-core-web-vitals
perf metrics -- DOMContentLoaded (DCL) = time it takes for the full HTML code of a webpage to be loaded. The faster this happens, the faster users can see useful functionality. doesn’t include loading CSS and other assets
perf metrics -- First Contentful Paint (FCP) = time at which content first begins to be “painted” by the browser. It can be a text, image, or even background color.
perf metrics -- Load Time = time taken by the web browser to download and display the webpage. measured in milliseconds
perf metrics -- Page Size = total file size of all content and assets that appear on the page. Over the last several years, the page size of websites has been growing constantly
perf metrics -- Render Blocking Resources: Some resources block other parts of the page from being loaded. It’s important to track the number of such resources. The more render-blocking resources a webpage has, the greater the delay for the browser to load the page.
perf metrics -- Request Count = number of HTTP requests a browser has to make to fully load the page. The lower this count, the faster a website will feel to the user
perf metrics -- Round Trip Time (RTT) = amount of time a round trip takes. A round trip constitutes a request traveling from the browser to the origin server and the response from the server going to the browser. Reducing RTT is one of the key approaches to improving a website’s performance.
perf metrics -- Time to above-the-fold load
perf metrics -- Time to First Byte (TTFB) = time taken by the browser to receive the first byte of data from the web server. TTFB is crucial because it indicates the general ability of the server to handle traffic
PWA https://whatpwacando.today/
react
react -- hooks
realtime -- patterns -- Poke/pull
realtime -- patterns -- Push biz events
realtime -- patterns -- Push state
realtime -- patterns -- Push state diff
realtime updates https://zknill.io/posts/how-to-adopt-realtime/
rendering strategy -- client-side rendering (CSR) = give customers ingredients to prepare themselves
rendering strategy -- incremental static re-generation = refire cold plates
rendering strategy -- partial pre-rendering 
rendering strategy -- server-side rendering (SSR) = cook dishes as orders come in
rendering strategy -- static rendering = pre-cook everything
rendering strategy https://vercel.com/blog/how-to-choose-the-best-rendering-strategy-for-your-app
security -- clickjacking https://portswigger.net/web-security/clickjacking
security -- cross-site leaks https://xsleaks.dev/
security -- in-app browsers https://krausefx.com/blog/ios-privacy-instagram-and-facebook-can-track-anything-you-do-on-any-website-in-their-in-app-browser
testing -- Netflix's SafeTest https://www.infoq.com/news/2024/02/netflix-safetest-front-end-test/
testing https://www.testingjavascript.com/
typology -- dead simple site https://deadsimplesites.com/
typology -- landing site
typology -- naked site
UI -- Application posture = sovereign, transient, background, auxiliary https://en.wikipedia.org/wiki/Application_posture
UI -- aria https://www.w3.org/WAI/ARIA/apg/
UI -- chrome
UI -- contrast ratio https://www.siegemedia.com/contrast-ratio
UI -- HUD
UI -- modals -- sheets = ~semi-modal https://en.wikipedia.org/wiki/Modal_window#Modal_sheets_in_Mac_OS_X
UI -- modals https://en.wikipedia.org/wiki/Modal_window
UI -- modes https://en.wikipedia.org/wiki/User_interface#Modalities_and_modes
UI -- views
User Agent Interface (UA) https://www.bram.us/2021/07/08/the-large-small-and-dynamic-viewports/#large-viewport
UX -- Above the fold = is the area of a webpage that fits in a browser window without a user having to scroll down. This is the content that is first seen by the user and often dictates whether they’ll continue reading the webpage.
UX -- honeycomb = useful + usable + findable + desirable + accessible + credible = valuable https://en.wikipedia.org/wiki/User_interface#A_model_of_design_criteria:_User_Experience_Honeycomb
UX -- honeycomb = useful + usable + findable + desirable + accessible + credible = valuable https://en.wikipedia.org/wiki/User_interface#A_model_of_design_criteria:_User_Experience_Honeycomb 
viewport
viewport -- large, small, dynamic
viewport -- visual
viewport -- Visual Viewport API = Window.visualViewport https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport
Web Application Firewall (WAF)
