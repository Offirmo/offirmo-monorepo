+++ https://courses.joshwcomeau.com/
+++ https://developer.mozilla.org/en-US/curriculum/
+++ https://medium.com/@cramforce/designing-very-large-javascript-applications-6e013a3291a3 + https://medium.com/@cramforce/designing-even-larger-applications-460ee029012d
[ ] +++ https://dev.to/anze_kop1tar/acronyms-you-should-know-when-going-to-a-job-interview-369l
[ ] advanced architecture -- Background Synchronization API
[ ] advanced architecture -- https://devdocs.io/dom/content_index_api
[ ] advanced architecture -- navigator.sendBeacon() for backup
[ ] advanced architecture -- Web Periodic Background Synchronization API https://devdocs.io/dom/web_periodic_background_synchronization_api
[ ] security https://portswigger.net/web-security/all-topics
[ ] security https://xsleaks.dev/
[ ] TODO shearing layers https://en.wikipedia.org/wiki/Shearing_layers
AJAX (Asynchronous JavaScript And XML) = LEGACY interactive web apps now fetch + json
AMP (Accelerated Mobile Pages)
animations -- API https://devdocs.io/dom/web_animations_api
APIs web
appli web
Application posture = sovereign, transient, background, auxiliary https://en.wikipedia.org/wiki/Application_posture
architecture -- islands
architecture -- JAMStack = "JavaScript, APIs, Markup" as much HTML as possible is pre-built and stored in a content delivery network (CDN). Instead of running a monolithic backend application on the server side to generate dynamic content, dynamic components of the application are based on APIs. Ideally, this results in a much faster user experience and a much simpler developer experience. https://www.cloudflare.com/learning/performance/what-is-jamstack/  https://jamstack.org/what-is-jamstack/
architecture -- JamStack = decouples the web experience layer from data and business logic, improving flexibility, scalability, performance, and maintainability
architecture -- LAMP (outdated) Linux, Apache, MySQL, PHP/Python/Perl
architecture -- MEAN "MongoDB, Express.js, Angular, Node.js"
architecture -- microservices, API-first, cloud-native SaaS, headless (MACH) https://machalliance.org/mach-technology
architecture -- SSR, ISR, CSR, PPR (see 'rendering')
ARIA "Accessible Rich Internet Applications" https://www.w3.org/WAI/ARIA/apg/
Backends For Frontends (BFF) https://samnewman.io/patterns/architectural/bff/
bleed
bot detection
browsing contexts = such as several windows, iframes or even workers
CDN
chrome = the graphical framework and elements surrounding the content. means different things depending on the context: In the context of a web browser it is the navigation, toolbar etc. In the context of a website it is navigation, ad-space and other fixed aspects of the design https://stackoverflow.com/a/5072092/587407
Chrome is not the standard https://v4.chriskrycho.com/2017/chrome-is-not-the-standard.html
client/server -- multi-tier architecture -- 01 presentation
client/server -- multi-tier architecture -- 02 application
client/server -- multi-tier architecture -- 03 business
client/server -- multi-tier architecture -- 04 data access
client/server -- multi-tier architecture https://en.wikipedia.org/wiki/Multitier_architecture
collaborative experiences https://zknill.io/posts/collaboration-no-crdts/
components https://www.componentdriven.org/
Contrast ratio https://www.siegemedia.com/contrast-ratio
CORS (Cross-Origin Resource Sharing)
CSS -- atomic = small, single-purpose classes with names based on visual function https://css-tricks.com/lets-define-exactly-atomic-css/
CSS -- cascade https://2019.wattenberger.com/blog/css-cascade
CSS -- color -- formats = hex, rgb(), hsl(), lch() https://www.joshwcomeau.com/css/color-formats/
CSS -- Combinators https://courses.joshwcomeau.com/css-for-js/00-recap/04.03-combinators
CSS -- containing block
CSS -- fixed -- https://meyerweb.com/eric/thoughts/2011/09/12/un-fixing-fixed-elements-with-css-transforms/
CSS -- geometric properties = affect the layout = width height top left
CSS -- immutable = classes are never to be modified, thus producing highly dependable results
CSS -- isolate
CSS -- layers
CSS -- layout -- layout, paint and composite
CSS -- layout -- reflow
CSS -- margin -- negative https://www.quirksmode.org/blog/archives/2020/02/negative_margin.html
CSS -- Media Queries https://courses.joshwcomeau.com/css-for-js/00-recap/03-media-queries
CSS -- methodologies -- BEM
CSS -- nesting
CSS -- perf -- avoid modifying the layout (geometric properties)
CSS -- Pseudo-classes :xyz https://courses.joshwcomeau.com/css-for-js/00-recap/04.01-pseudo-classes
CSS -- Pseudo-elements ::xyz  https://courses.joshwcomeau.com/css-for-js/00-recap/04.02-pseudo-elements
CSS -- rule = selector + property + value + unit https://courses.joshwcomeau.com/css-for-js/00-recap/02-anatomy
CSS -- selectors -- descendant combinator -- expensive (perf) https://medium.com/@devdevcharlie/things-nobody-ever-taught-me-about-css-5d16be8d5d0e
CSS -- selectors -- descendant combinator `ul li {`
CSS -- stacking context https://github.com/andreadev-it/stacking-contexts-inspector
CSS -- transforms
CSS -- triggers https://csstriggers.com/
CSS -- z-index
CSS https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started
data fetching https://martinfowler.com/articles/data-fetch-spa.html
devices -- support
dialog
DNS = distributed database for IP address translation
Document = The Document interface represents any web page loaded in the browser and serves as an entry point into the web page's content, which is the DOM tree. It provides functionality globally to the document, like how to obtain the page's URL and create new elements in the document.
DOM -- CSSOM "CSS Object Model" = part of the DOM
DOM -- Nodes -- 01 Elements = like <p> or <div>.
DOM -- Nodes -- 02 Attributes -- data-* https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*
DOM -- Nodes -- 02 Attributes -- global https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
DOM -- Nodes -- 02 Attributes -- item* = WHATWG HTML Microdata feature https://html.spec.whatwg.org/multipage/microdata.html#microdata
DOM -- Nodes -- 02 Attributes = attribute of an element https://devdocs.io/dom/attr
DOM -- Nodes -- 03 Text = text between elements (lot of white space) https://devdocs.io/dom/text
DOM -- Nodes -- 04 CDATA = <!CDATA[[ … ]]> https://devdocs.io/dom/cdatasection
DOM -- Nodes -- 05, 06 (not in the list) https://devdocs.io/dom/node/nodetype
DOM -- Nodes -- 07 Processing Instruction = <?xml-stylesheet … ?>
DOM -- Nodes -- 08 Comments = <!-- … -->
DOM -- Nodes -- 09 Document
DOM -- Nodes -- 10 Document Type = <!DOCTYPE html>
DOM -- Nodes -- 11 Fragment
DOM -- Nodes -- types =  ELEMENT, ATTRIBUTE, TEXT, CDATA, PROCESSING_INSTRUCTION, COMMENT, DOCUMENT, DOCUMENT_TYPE https://devdocs.io/dom/node/nodetype 
DOM tree = Nodes = text, elements, attributes, comments... includes elements such as <body> and <table>, among many others. 
ECMAScript - European Computer Manufacturers Association Script (ES)
fonts
fonts -- calibration https://web.dev/articles/css-size-adjust#calibrating_fonts
fonts -- Font Friday https://pimpmytype.com/fontfriday/
FORC "Fear of Removing CSS" = https://x-team.com/blog/forc-fear-of-removing-css
HTML -- concepts
HTML -- elements
HTML -- tags
htmx https://htmx.org/
hypermedia
hypertext
i18e Ecosystem Performance = Cleanup, Speedup, Levelup. One Package at a time. https://e18e.dev/
iframe
iframe -- fenced
iframe -- sandbox
iframe -- seamless
IIFE (Immediately-Invoked Function Expression)
interop https://developer.mozilla.org/en-US/blog/interop2023-mdn-doc-updates/
JS -- book -- Exploring JavaScript (ES2024 Edition) https://exploringjs.com/js/book/index.html
JS -- exports https://webpack.js.org/guides/package-exports/
JS -- tasks & microtasks https://devdocs.io/dom/html_dom_api/microtask_guide
JSON - Javascript Object Notation
MDN
MDN curriculum https://developer.mozilla.org/en-US/curriculum/
MIME - Multipurpose Internet Mail Extensions
monitoring -- labs = made by a lab, ex. camera
monitoring -- Real user monitoring (RUM) = passive monitoring technology that records all user interaction with a website or client interacting with a server or cloud-based application (vs. lab) https://en.wikipedia.org/wiki/Real_user_monitoring
monitoring -- synthetic = own test bot https://en.wikipedia.org/wiki/Synthetic_monitoring
organic vs inorganic concept = coming from a real user or a bot/AI or app etc.
perf -- content jump = https://css-tricks.com/content-jumping-avoid/
perf metrics -- "9 must known" https://twitter.com/alexxubyte/status/1769748487317651962
perf metrics -- core web vitals -- 01 Largest Contentful Paint (LCP) = loading performance. LCP must occur within 2.5 seconds of when the page first starts loading 
perf metrics -- core web vitals -- 02 Interaction to Next Paint (INP) = interactivity. To provide a good user experience, pages must have a INP of 200 milliseconds or less.
perf metrics -- core web vitals -- 03 Cumulative Layout Shift (CLS) = visual stability. To provide a good user experience, must should maintain a CLS of 0.1. or less.
perf metrics -- core web vitals -- First Input Delay (FID) DEPRECATED https://web.dev/articles/fid
perf metrics -- core web vitals https://web.dev/articles/vitals  https://web.dev/explore/learn-core-web-vitals
perf metrics -- DOMContentLoaded (DCL) = time it takes for the full HTML code of a webpage to be loaded. The faster this happens, the faster users can see useful functionality. doesn’t include loading CSS and other assets
perf metrics -- First Contentful Paint (FCP) = time at which content first begins to be “painted” by the browser. It can be a text, image, or even background color. timestamp of the first render frame with visible content
perf metrics -- Largest Contentful Paint (LCP) = timestamp of the render frame which introduced the largest visible block-level element
perf metrics -- Load Time = time taken by the web browser to download and display the webpage. measured in milliseconds
perf metrics -- Page Size = total file size of all content and assets that appear on the page. Over the last several years, the page size of websites has been growing constantly
perf metrics -- Render Blocking Resources: Some resources block other parts of the page from being loaded. It’s important to track the number of such resources. The more render-blocking resources a webpage has, the greater the delay for the browser to load the page.
perf metrics -- Request Count = number of HTTP requests a browser has to make to fully load the page. The lower this count, the faster a website will feel to the user
perf metrics -- Round Trip Time (RTT) = amount of time a round trip takes. A round trip constitutes a request traveling from the browser to the origin server and the response from the server going to the browser. Reducing RTT is one of the key approaches to improving a website’s performance.
perf metrics -- Time to above-the-fold load
perf metrics -- Time to First Byte (TTFB) = from the browser, time taken to receive the first byte of data from the web server. TTFB is crucial because it indicates the general ability of the server to handle traffic
perf metrics -- Time to Interactive (TTI) = time at which the page becomes consistently responsive to user input. This is a less well-defined milestone, but is sometimes calculated as the point when the CPU and network both become idle
perf metrics -- Time to Visually Complete (TTVC) = time of the last visible paint event. Nothing on the user’s screen should change without user input https://dropbox.tech/frontend/measuring-ttvc-web-performance-metric-open-source-library
popover https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
puppeteer -- firefox https://hacks.mozilla.org/2024/08/puppeteer-support-for-firefox/
puppeteer -- vs Selenium, Playwright, Cypress https://www.testim.io/blog/puppeteer-selenium-playwright-cypress-how-to-choose/
puppeteer https://pptr.dev/
PWA https://whatpwacando.today/ https://web.dev/learn/pwa
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
response times -- 0.1s = about the limit for having the user feel that the system is reacting instantaneously, meaning that no special feedback is necessary except to display the result.
response times -- 1.0s = about the limit for the user's flow of thought to stay uninterrupted, even though the user will notice the delay. Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second, but the user does lose the feeling of operating directly on the data.
response times -- 10s = about the limit for keeping the user's attention focused on the dialogue. For longer delays, users will want to perform other tasks while waiting for the computer to finish, so they should be given feedback indicating when the computer expects to be done. Feedback during the delay is especially important if the response time is likely to be highly variable, since users will then not know what to expect.
response times -- computers can be too fast! https://www.nngroup.com/articles/too-fast-ux/
response times https://www.nngroup.com/articles/response-times-3-important-limits/
security -- clickjacking https://portswigger.net/web-security/clickjacking
security -- cross-site leaks https://xsleaks.dev/
security -- in-app browsers https://krausefx.com/blog/ios-privacy-instagram-and-facebook-can-track-anything-you-do-on-any-website-in-their-in-app-browser
testing -- Netflix's SafeTest https://www.infoq.com/news/2024/02/netflix-safetest-front-end-test/
testing https://www.testingjavascript.com/
typology -- dead simple site https://deadsimplesites.com/
typology -- landing site
typology -- naked site
UI -- HUD
UI -- modals -- sheets = ~semi-modal https://en.wikipedia.org/wiki/Modal_window#Modal_sheets_in_Mac_OS_X
UI -- modals https://en.wikipedia.org/wiki/Modal_window
UI -- modes https://en.wikipedia.org/wiki/User_interface#Modalities_and_modes
UI -- views
User Agent Interface (UA) https://www.bram.us/2021/07/08/the-large-small-and-dynamic-viewports/#large-viewport
UX -- Above the fold = is the area of a webpage that fits in a browser window without a user having to scroll down. This is the content that is first seen by the user and often dictates whether they’ll continue reading the webpage.
UX -- honeycomb = useful + usable + findable + desirable + accessible + credible = valuable https://en.wikipedia.org/wiki/User_interface#A_model_of_design_criteria:_User_Experience_Honeycomb
viewport
viewport -- small <= dynamic <= large
viewport -- visual
viewport -- Visual Viewport API = Window.visualViewport https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport
Web Application Firewall (WAF)
web components -- custom elements
web components -- is
web components -- shadow DOM
web components -- templates
web components -- templates -- slots https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/slot
web components https://developer.mozilla.org/en-US/docs/Web/API/Web_components
web workers -- dedicated = utilized by a single script https://devdocs.io/dom/worker
web workers -- service = proxy https://devdocs.io/dom/service_worker_api
web workers -- shared = can be utilized by multiple scripts running in different windows, IFrames, etc., as long as they are in the same domain as the worker https://devdocs.io/dom/sharedworker
WebDriver BiDi https://developer.chrome.com/blog/firefox-support-in-puppeteer-with-webdriver-bidi
WebGPU / WebGL = https://devdocs.io/dom/webgpu_api
WebXR / WebVR = VR / AR 
Wep pages UX design -- concepts https://www.nngroup.com/courses/web-page-design/
XSS -- injection sinks https://devdocs.io/dom/trusted_types_api
