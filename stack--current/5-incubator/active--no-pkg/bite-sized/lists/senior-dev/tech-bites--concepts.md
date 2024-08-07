12 factors https://12factor.net/
97 Things Every Programmer Should Know
[ ] +++ https://en.wikipedia.org/wiki/List_of_software_development_philosophies
[ ] +++ https://explorer.globe.engineer/
[ ] +++ https://martinfowler.com/
[ ] +++ https://www.hackterms.com/about/all
[ ] +++ https://www.linfo.org/main_index.html
[ ] awesome falsehoods https://github.com/kdeldycke/awesome-falsehood
[ ] https://github.com/kilimchoi/engineering-blogs
[ ] https://www.managingtheunmanageable.net/morerulesofthumb.html
[ ] https://zknill.io/posts/every-programmer-should-know/
[ ] technical things every software developer should know https://github.com/mtdvio/every-programmer-should-know
abstraction https://www.merrickchristensen.com/articles/abstraction/
actually portable executables https://justine.lol/ape.html
allocation
annotation
anomaly detection
API Economy = the depth and breadth of APIs that are available for developers to use in the current landscape.
Application Programming Interface (API) = defines interactions that allows two applications to talk to each other
apply / call / bind
arguments
assembly
async -- design pattern -- reactor pattern
async -- sync = By synchronous we mean a function that calls its callback on the same tick in the javascript event loop, without doing any I/O or using any timers
atomic
audit trail - what happened, when, who made the request and how?
authentication
Backends For Frontends (BFF) https://samnewman.io/patterns/architectural/bff/
BDD - Behavior-Driven Development https://cucumber.io/school/   Discovery -> Formulation -> Automation
blocking
bug -- mail in 500 miles radius https://www.ibiblio.org/harris/500milemail.html
cache
cache -- stampede https://en.wikipedia.org/wiki/Cache_stampede
caching -- S3 FIFO https://s3fifo.com/
capability = an end-to-end user experience or a set of related functionality. Example: “a user can create a ticket in a Jira project”
career -- small business programmer https://smallbusinessprogramming.com/how-to-be-a-wildly-successful-small-business-programmer/
CD Continuous Delivery https://www.browserstack.com/guide/difference-between-continuous-integration-and-continuous-delivery https://spinnaker.io/
changelog -- standard https://keepachangelog.com/  https://common-changelog.org/
changelogs -- conventional https://github.com/conventional-changelog
CI Continuous Integration  https://www.browserstack.com/guide/difference-between-continuous-integration-and-continuous-delivery
class
client/server -- multi-tier architecture 
code is the enemy = It can go wrong, and it needs maintenance. Write less code. Delete code. Don’t write code you don’t need https://opensource.com/article/17/5/30-best-practices-software-development-and-testing
cohesion = degree to which the elements inside a module belong together https://en.wikipedia.org/wiki/Cohesion_(computer_science)
command query responsibility segregation (CQRS)
command query separation (CQS)
comments
comments -- conventional
commits
commits -- conventional  https://www.conventionalcommits.org/  https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13
compile to js
compiler
compilers -- stanford course http://openclassroom.stanford.edu/MainFolder/CoursePage.php?course=Compilers
connascence https://en.wikipedia.org/wiki/Connascence
constructor
context switch
context switching
continuous delivery
continuous deployment
continuous integration
Conway's law https://en.wikipedia.org/wiki/Conway%27s_law
corporate politic https://www.breakingpoint.tech/p/where-do-corporate-politics-come
correlation
cost based rate limiting
coupling -- loose https://en.wikipedia.org/wiki/Loose_coupling
courbe d'expertise
CPU https://cpu.land/
CRDT / automerge / local first https://automerge.org/
create, read, update and delete (CRUD)
cron https://onlineornot.com/the-complete-guide-to-cron-jobs
crunch
currying https://en.wikipedia.org/wiki/Currying
databases
databases -- joins https://justinjaffray.com/joins-13-ways/
databases -- normalization
databases -- sharding https://www.mongodb.com/docs/manual/sharding/
DDOS
DDOS -- self https://waxy.org/2023/07/twitter-bug-causes-self-ddos-possibly-causing-elon-musks-emergency-blocks-and-rate-limits-its-amateur-hour/
debugger
debugging
defensive programming = Always think about what can go wrong, what will happen on invalid input, and what might fail, which will help you catch many bugs before they happen https://opensource.com/article/17/5/30-best-practices-software-development-and-testing
defensive programming https://dev.to/cubiclebuddha/is-defensive-programming-actually-healthy-5flj
demos
dependencies
dependency hell https://en.wikipedia.org/wiki/Dependency_hell
dependency injection = passing parameters. no need for complex lib
deployment maturity levels https://itnext.io/deployment-maturity-levels-feab55c20d04
design patterns
design patterns -- behavioral -- command = command, receiver, invoker and client https://en.wikipedia.org/wiki/Command_pattern
design patterns -- facade https://en.wikipedia.org/wiki/Facade_pattern
design patterns -- strangler https://paulhammant.com/2013/07/14/legacy-application-strangulation-case-studies/
devex
DevOps https://www.browserstack.com/guide/difference-between-continuous-integration-and-continuous-delivery
DevOps Research and Assessment (DORA) = how we should develop our software right and what numbers we should show to our managers to make them happy https://medium.com/booking-com-development/a-step-by-step-guide-on-how-not-to-implement-dora-metrics-85081f0d4484
do what I mean (DWIM) = computer systems attempt to anticipate what users intend to do, correcting trivial errors automatically rather than blindly executing users' explicit but potentially incorrect input
Domain Specific Language (DSL)
Domain-driven design https://en.wikipedia.org/wiki/Domain-driven_design
double auth
DRY don't repeat yourself
dry run
durable execution = development paradigm that preserves complete application state so that upon host or software failure it can seamlessly migrate execution to another machine https://stackoverflow.blog/2024/05/28/an-open-source-development-paradigm/
Effect<Success, Error, Requirements> https://effect.website/docs/guides/essentials/the-effect-type
egress
emscripten
encabulator https://en.wikipedia.org/wiki/Turbo_encabulator  https://www.youtube.com/watch?v=RXJKdh1KZ0w
error -- domain error = out of the specification, ex. sqrt(-x) https://cplusplus.com/reference/stdexcept/domain_error/
error -- handling = exceptions, error codes, monads, etc. https://www.boost.org/doc/libs/1_84_0/libs/outcome/doc/html/alternatives.html
error -- logic error = errors in the internal logical of the program, such as violation of logical preconditions or class invariants https://cplusplus.com/reference/stdexcept/logic_error/
error -- runtime error = errors that can only be detected during runtime https://cplusplus.com/reference/stdexcept/runtime_error/
error = failure = inability of a function to return a valid result, instead producing an error object describing the reason for the failure https://boostorg.github.io/leaf/#tutorial
event loop
execution model https://en.wikipedia.org/wiki/Execution_model
executive
exposer des variables
express, middlewares
external-facing APIs = are where "design up front" and consideration about future use cases really matters. Changing APIs is a pain for us and for our users, and creating backwards incompatibility is horrible (although sometimes impossible to avoid). https://opensource.com/article/17/5/30-best-practices-software-development-and-testing
fail fast = Check input and fail on nonsensical input or invalid state as early as possible, preferably with an exception or error response that will make the exact problem clear to your caller https://opensource.com/article/17/5/30-best-practices-software-development-and-testing
feedback loop -- speed needed
fifo
file read
file write
finished software https://josem.co/the-beauty-of-finished-software/
finops
flatmap
flow state: deep concentration, enjoyment, and a sense of progress
flushing
flux architecture
framework -- "a new framework a day"
function
function -- 1st-class object
function -- first-class function
function -- higher-order function
functional programming
GAFAM -- "megacap companies"
GAFAM -- Amazon https://www.vanityfair.com/news/story/inside-amazon-business-practices
garbage collector
git
global variable
Google, Amazon, Facebook, Apple, Microsoft (GAFAM)
graph
GRASP (object-oriented design) = General Responsibility Assignment Software Patterns = nine fundamental principles in object design and responsibility assignment https://en.wikipedia.org/wiki/GRASP_(object-oriented_design)
GRASP -- 1 Information expert = Assign responsibility to the class that has the information needed to fulfill it
GRASP -- 2 Creator = Who creates object A? In general, Assign class B the responsibility to create object A if one, or preferably more, of the following apply...
GRASP -- 3 Controller = A controller object is a non-user interface object responsible for receiving or handling a system event
GRASP -- 4 Indirection = Assign the responsibility to an intermediate object to mediate between other components or services so that they are not directly coupled
GRASP -- 5 Low coupling = lower dependency between the classes, change in one class having a lower impact on other classes, higher reuse potential
GRASP -- 6 High cohesion = keep objects appropriately focused, manageable and understandable
GRASP -- 7 Polymorphism = responsibility for defining the variation of behaviors based on type is assigned to the type for which this variation happens
GRASP -- 8 Protected variations = Identify points of predicted variation or instability; assign responsibilities to create a stable interface around them
GRASP -- 9 Pure fabrication =
GRASP -- see also: SOLID
handle
hoisting des vars de boucle for et switch
hooks
hotfix
http://devdocs.io/
http://meta.programmers.stackexchange.com/questions/6166/open-letter-to-students-with-homework-problems
http://nodeschool.io/#workshoppers
http://rethinkdb.com/blog/node-4/
http://www.letudiant.fr/palmares/palmares-des-ecoles-d-ingenieurs/ouverture-internationale-2.html
http://www.playkeepout.com/
https://en.wikipedia.org/wiki/Cross-cutting_concern
https://en.wikipedia.org/wiki/Design_smell
https://en.wikipedia.org/wiki/God_object
https://en.wikipedia.org/wiki/Hofstadter's_law
https://en.wikipedia.org/wiki/Inner-platform_effect
https://en.wikipedia.org/wiki/Not_invented_here
https://en.wikipedia.org/wiki/Reference_class_forecasting
https://en.wikipedia.org/wiki/Robustness_principle
https://github.com/anvaka/npmrank/blob/master/sample/dependencies.md
https://medium.com/javascript-scene/the-single-biggest-mistake-programmers-make-every-day-62366b432308
https://www.atlassian.com/team-playbook/plays/elevator-pitch
https://xyproblem.info/
héritage prototypal, héritage en diamant
IDEALS -- 1 Interface segregation
IDEALS -- 2 Deployability (is on you)
IDEALS -- 3 Event-driven
IDEALS -- 4 Availability over consistency
IDEALS -- 5 Loose coupling
IDEALS -- 6 Single responsibility
IDEALS = principles for microservice design
If it ain't broke, don't fix it
IIFE
immutability
Interface segregation principle = instead of a class interface with all possible methods clients might need, there should be separate interfaces catering to the specific needs of each type of client https://en.wikipedia.org/wiki/Interface_segregation_principle
Joel test
JS equality
JS http://ashleynolan.co.uk/blog/frontend-tooling-survey-2015-results
JS http://developer.telerik.com/featured/a-guide-to-javascript-engines-for-idiots/
JS http://stackoverflow.com/questions/17106681/parseint-vs-unary-plus-when-to-use-which/17106702#17106702
JS http://www.toptal.com/javascript/interview-questions
JS https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95
JS jQuery
JSON
jump/goto
kebab-case vs snake etc
KISS
KTLO
language -- Bend = massively parallel, high-level programming language https://github.com/HigherOrderCO/Bend 
language -- go
language interprété types simples / types par référence
language trends
languages -- weekend https://stackoverflow.blog/2017/02/07/what-programming-languages-weekends/
layer -- abstraction
layers -- shearing
lazy-loading
linked list
linting
locality
locality -- conflict locality = reducing conflicts on close changes, ex. enforcing trailing commas, sorting...
lodash
log
loop
loop - breaking out of
LTS, maintenance LTS, active LTS https://nodejs.org/en/about/previous-releases
magic number
map
MDN
memory -- heap
memory -- stack
message passing
message passing https://en.wikipedia.org/wiki/Message_passing
microcode
microprocessor https://firstmicroprocessor.com/
migrations
mocha / chai
monde du web ?
monitoring = observing systems, collecting metrics, evaluating those metrics over time, and then using them to make decisions or take actions
monolith = over time become poorly structured, containing many different, sometimes competing conventions. These conventions and “styles” sprawl throughout the monolith and make it difficult to understand what is going on. Because structures are built with different conventions, to work in the monolith safely, you have to examine everything to make sure you understand this instance of this pattern. It’s not safe to assume anything. This, combined with the lack of boundaries in the monolith means that every change incurs a huge cost in examination and understanding before it can be safely implemented. This skews developer performance to tenure - the longer you have been staring at the code, the more you have wrapped your head around and the faster you can go (mostly). New developers should not be worried about the time it takes to be effective in the monolith - it's the monolith’s fault, not yours."
MVC
namespace
naming https://ntietz.com/blog/when-to-use-cute-names-or-descriptive-names/
nommage des fonctions
npm
nyan cat
object
OOP
OOP -- layer https://en.wikipedia.org/wiki/Layer_(object-oriented_design)
optim des || et && effet de bord
overengineering https://blog.matt-rickard.com/p/stop-overengineering
ownership
pair-programming
PD Personal Data
peer review, green build = condition to merge a code change
perf
perf -- as a feature
personal data
pipeline express success / error / next / send
pointer
polyfill
polymorphism https://en.wikipedia.org/wiki/Polymorphism_(computer_science)
privacy - collect and use someone's info respectfully
privacy - regulations/compliance AND expectations
programming -- application
programming -- systems https://en.wikipedia.org/wiki/Systems_programming
programming language -- Rust https://www.rust-lang.org/
programming language -- Tcl = very compact, often embedded https://en.wikipedia.org/wiki/Tcl
programming model https://en.wikipedia.org/wiki/Programming_model
programming paradigm -- declarative programming
programming paradigm -- functional programming
programming paradigm -- imperative programming
programming paradigm -- object oriented
programming paradigm -- reactive
promises
prototypes
proxy
queue
RAM
ratcheting https://robertgreiner.com/continuous-code-improvement-using-ratcheting/ https://leaddev.com/building-better-software/introducing-quality-ratchets-tool-managing-complex-systems
rate-limiting
rate-limiting -- cost based
React
reactive programming
recursion
regex https://regexlearn.com/
register
release channels https://techcrunch.com/2020/06/15/microsoft-moves-its-windows-10-insider-program-from-rings-to-release-channels/
revisions
rewrite https://medium.com/@herbcaudill/lessons-from-6-software-rewrite-stories-635e4c8f7c22
RFC https://rfc.fyi/
robustness principle (beware bad effects) https://en.wikipedia.org/wiki/Robustness_principle
Role-Based Access Control (RBAC)
rollback
rolling deploy
rule of composition https://www.linfo.org/rule_of_composition.html
rule of silence https://www.linfo.org/rule_of_silence.html
scatter/gather (datastreams)
scope
script
Scripts should be written using the project main language https://joaomagfreitas.link/scripts-should-be-written-using-the-project-main-language/
Scrum
security -- OWASP top 10 https://owasp.org/www-project-top-ten/
security -- principle of least privilege
semaphore
semver
shaving the yak
shim vs polyfill vs ponyfill
shrinkwrap
side-effect free
significant change
simple average
single source of truth (SSOT)
Site-specific browser https://en.wikipedia.org/wiki/Site-specific_browser
SLI Service Level Indicator A measurement of how reliable or performant a Capability is. Example: “time it takes to create a ticket”
SLO Service Level Objective (proactive) A target set on the SLI. Failing to hit the target == unhappy customer! Example: “Jira ticket created in less than 1s”
SME
SOLID -- 1 Single responsibility principle (SRP) https://en.wikipedia.org/wiki/Single_responsibility_principle
SOLID -- 2 Open–closed principle (OCP) https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle
SOLID -- 3 Liskov substitution principle https://en.wikipedia.org/wiki/Liskov_substitution_principle
SOLID -- 4 Interface segregation principle https://en.wikipedia.org/wiki/Interface_segregation_principle
SOLID -- 5 principle https://en.wikipedia.org/wiki/Dependency_inversion_principle
spec
stack overflow
standard deviation
state
state management
stateless
stats https://www.youtube.com/playlist?list=PLltdM60MtzxNwhL4sg7swFFlUlH7EEy7H []
Stick to boring architecture for as long as possible https://addyosmani.com/blog/boring-architecture/
streams
superapp
Sustainable Architectural Decisions https://adr.github.io/
system call
TDD
TDZ
tech debt -- Accidental - e.g. bugs due to human error that unknowingly increases the cost of future work.
tech debt -- Deliberate - e.g. optimising for short term delivery, knowing it increases the cost of future work.
tech debt -- Incidental - e.g. organic changes in complexity over time that increases the cost of future work.
temporary solutions https://80.lv/articles/this-30-year-old-windows-feature-was-created-as-a-temporary-solution/
the room https://lethain.com/getting-in-the-room/
this
thread
tool sprawl
tracing -- distributed https://zipkin.io/
tracing https://andydote.co.uk/2023/09/19/tracing-is-better/
transpilation / transpiler / transpiling
tree
tree walk
typecast
types
types -- slow types https://jsr.io/docs/about-slow-types (also in Swift: The compiler is unable to type-check this expression in reasonable time)
Unix philosophy (OUTDATED -> use JSON ;)) https://en.wikipedia.org/wiki/Unix_philosophy
Unix philosophy -- (much more) https://en.wikipedia.org/wiki/Unix_philosophy
Unix philosophy -- A.01 Make each program do one thing well. To do a new job, build afresh rather than complicate old programs by adding new "features"
Unix philosophy -- A.02 Expect the output of every program to become the input to another, as yet unknown, program. Don't clutter output with extraneous information. Avoid stringently columnar or binary input formats; Don't insist on interactive input
Unix philosophy -- A.03 Design and build software, even operating systems, to be tried early, ideally within weeks. Don't hesitate to throw away the clumsy parts and rebuild them
Unix philosophy -- A.04 Use tools in preference to unskilled help to lighten a programming task, even if you have to detour to build the tools and expect to throw some of them out after you've finished using them
uptime
use boring technology
use strict
User Generated Content (UGC)
vaporware
variables pointer / natives
virtual private cloud (VPC)
web assembly (asm.js)
WET https://overreacted.io/the-wet-codebase/
X considered harmful
yet another guideline I need to follow (YAGINTF)
you aren't gonna need it (YAGNI) -- Too general too soon https://frontendatscale.com/issues/15/
