1% rule -- 90-9-1 = 90% consume, 9% edit, 1% add
1% rule -- lurk, lurker
1% rule = only 1% participants add content https://en.wikipedia.org/wiki/1%25_rule
3 nines / 4 nines / 5 nines -- 3 nines == 99.9% uptime 5 nines == 99.999% uptime, this means your service is down less than 6 min in a year!
[ ] +++ https://github.com/donnemartin/system-design-primer
[ ] +++ https://lethain.com/distributed-systems-vocabulary/
[ ] architecture https://engineering.fb.com/2020/08/17/production-engineering/async/
[ ] client side API gateway "egress" TODO
[ ] concepts https://dgraph.io/docs/design-concepts/
[ ] great articles https://dgraph.io/blog/
[ ] https://carloarg02.medium.com/how-i-scaled-amazons-load-generator-to-run-on-1000s-of-machines-4ca8f53812cf
[ ] https://medium.com/@sureshpodeti/system-design-twitter-a98e7d134634
[ ] https://newsletter.pragmaticengineer.com/p/building-the-threads-app
[ ] https://www.infoq.com/news/2024/01/discord-midjourney-performance/
[ ] https://www.youtube.com/watch?v=paTtLhZFsGE
[ ] kubernetes
[ ] microservice -- design -- https://www.salesforce.com/blog/microservice-design-principles/
[ ] paper "Adding new protocols to the cloud native ecosystem" https://docs.google.com/document/d/13wFFC7vIdB2hkxdyT0dSiGgkZTXCDDBeW_GBPqy9Jy0/edit
[ ] paper https://research.google/pubs/large-scale-cluster-management-at-google-with-borg/
[ ] paper https://research.google/pubs/the-google-file-system/
[ ] paper https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf
[ ] paper https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf
[ ] paper https://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf
[ ] paper https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf
[ ] paper https://www.cs.cornell.edu/projects/ladis2009/papers/lakshman-ladis2009.pdf
[ ] real case https://deno.com/blog/how-we-built-jsr
[ ] research papers: https://medium.com/@rohitverma_87831/my-interview-experience-at-google-afc1080df175
[ ] Software Engineering Advice from Building Large-Scale Distributed Systems
access control
ACID -- 1 Atomicity = transactions are "all or nothing"
ACID -- 2 Consistency = integrity constraints: "valid state" before AND after a transaction
ACID -- 3 Isolation = "independent transactions"
ACID -- 4 Durability = transaction resistance to system failures "once committed, always committed"
ACID = a set of properties of database transactions intended to guarantee data validity despite errors, power failures, and other mishaps https://en.wikipedia.org/wiki/ACID
API gateway
API-First = Built with APIs from the ground up. All functionality is exposed through an API
app -- a11y
app -- API -- common design
app -- API -- pagination
app -- API -- resilience
app -- architecture: LAMP / JAMStack / SSR...
app -- auth
app -- BFFE / GraphQL / REST
app -- collaboration: which model? https://zknill.io/posts/collaboration-no-crdts/
app -- components https://www.componentdriven.org/
app -- constraints: mobile first ? offline first ? low latency ? criticity ?
app -- i18n
app -- navigation
app -- performance
app -- reliability
app -- router
app -- scalability: where will it scroll? perf?
app -- security
app -- session
app -- state
app -- state -- structure
architecture -- 12 factors -- 01 Codebase =  One codebase tracked in revision control, many deploys
architecture -- 12 factors -- 02 Dependencies = Explicitly declare and isolate dependencies
architecture -- 12 factors -- 03 Config = Store config in the environment
architecture -- 12 factors -- 04 Backing services = Treat backing services as attached resources
architecture -- 12 factors -- 05 Build, release, run = Strictly separate build and run stages
architecture -- 12 factors -- 06 Processes = Execute the app as one or more stateless processes
architecture -- 12 factors -- 07 Port binding = Export services via port binding
architecture -- 12 factors -- 08 Concurrency = Scale out via the process model
architecture -- 12 factors -- 09 Disposability = Maximize robustness with fast startup and graceful shutdown
architecture -- 12 factors -- 10 Dev/prod parity = Keep development, staging, and production as similar as possible
architecture -- 12 factors -- 11 Logs = Treat logs as event streams
architecture -- 12 factors -- 12 Admin processes = Run admin/management tasks as one-off processes
architecture -- 12 factors https://12factor.net/
architecture -- entitlement (vs. billing) = a customer’s access to a specific feature or product, within a given plan https://arnon.dk/why-you-should-separate-your-billing-from-entitlement/
audit
audit trail
authentication (authn) = making sure that a person or device is who (or what) they claim to be
authentication vs authorization https://www.cloudflare.com/en-gb/learning/access-management/authn-vs-authz/
authorization (authz) = determines what an authenticated user can see and do
auto-scaling
autocorrection https://www.canva.dev/blog/engineering/building-a-data-driven-autocorrection-system/
availability
availability zone
AWS Shield
AWS WAF
back of the envelope
back-off and retry mechanisms
Backends For Frontends (BFF) https://samnewman.io/patterns/architectural/bff/
Backends For Frontends -- composable https://bff-patterns.com/
Backends For Frontends -- tradeoffs https://zknill.io/posts/backend-for-the-frontend/
backing service = any service the app consumes over the network as part of its normal operation https://12factor.net/backing-services
backpressure
backup
BASE -- 1. BA = Basically available = the system does guarantee availability, in terms of the CAP theorem.
BASE -- 2. S = Soft state = state of the system may change over time, even without input. This is because of the eventual consistency model.
BASE -- 3. E = Eventual consistency = the system will become consistent over time, given that the system doesn't receive input during that time.
BASE = properties of certain databases, usually NoSQL databases. A BASE system gives up on consistency in CAP. opposite of ACID
blue/green deployment
cache
cache -- counter cache https://thoughtbot.com/blog/what-is-counter-cache
cache -- eviction = Time-Based Eviction, Count-Based Eviction, Query Result Eviction, Cache Region Clearing
cache -- invalidation/control
caching -- stale-if-error
caching -- stale-while-revalidate https://www.mnot.net/blog/2007/12/12/stale
canary releasing
CAP https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/
CAP Theorem -- 1. Consistency = Every read receives the most recent write or an error
CAP Theorem -- 2. Availability = Every request receives a (non-error) response, without the guarantee that it contains the most recent write
CAP Theorem -- 3. Partition tolerance = The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes
CAP Theorem -> see also PACELC theorem
capacity planning
cascading failures
cascading failures -- exponential backoff + jitter +
change -- release tracks -- bundled = will get all of the features that were released to Preview Release Track during the previous months (pro tier)
change -- release tracks -- continuous = see new features when they are released (free tier)
change -- release tracks -- preview = will receive all updates released to Continuous Track in the last month (sandbox for admis)
chaos monkey
churn -- subscription -- involuntary or delinquent churn = missed payments causing an automated cancellation
churn -- subscription -- voluntary = subscriber actively cancelling their subscription
cloud native = leverages the full capabilities of the cloud, beyond storage and hosting, including elastic scaling of highly available resources. Functionality is updated automatically no manual effort required
compliance
compute
confidentiality
consistent Hashing
containers
containers -- images -- golden = pre-configured and optimised container images that serve as standardised and reusable foundations for building other images (apps, services...)
containers -- images -- Red Hat Universal Base Image (UBI) = minimal, freely redistributable base image for containerised applications, providing a consistent foundation with essential packages from Red Hat Enterprise Linux (RHEL) to build and deploy reliable and secure containers https://developers.redhat.com/products/rhel/ubi
Content Delivery Network (CDN) ex. CloudFront
coordination -- quorum, leader election
cron
CRUD "Create, Read, Update, Delete" = In SQL, the four related commands are: INSERT (for Create), SELECT (for Read), UPDATE (for Update), and DELETE (for Delete).
data -- 0. raw need to be processed, OLAP, OLTP https://www.snowflake.com/guides/olap-vs-oltp/
data -- 1. analytics = useful
data -- 2. predictive = forecast and predict from data
data -- 3. prescriptive = recommend actions based on data
data loss
data retrieval
data store -- data type -- BLOB (Binary Large Object) https://stackoverflow.com/questions/211895/storing-documents-as-blobs-in-a-database-any-disadvantages
data store -- data type -- CLOB (character large object) value can be up to 2,147,483,647 characters long. A CLOB is used to store unicode character-based data, such as large documents in any character set. https://docs.oracle.com/javadb/10.10.1.2/ref/rrefclob.html
data store -- data type -- JSON, BSON = BSON supposed to be more efficient in space but at the same time also wants to improve traversal by storing extra data, so not always better. depends on the data. 
data store -- database -- Graph = Neo4J, 
data store -- database -- NoSQL = unstructured or semi-structured, less of everything SQL
data store -- database -- relational -- Codd's 12 rules https://en.wikipedia.org/wiki/Codd%27s_12_rules
data store -- database -- relational/SQL = structured, schema, relationships, transactions
data store -- database = specialised, for data not binary, relationships, querying, indexing, transactions https://dgraph.io/blog/post/data-store-vs-database/
data store -- file system -- Google File System (GFS)
data store -- file system -- Hadoop Distributed File System (HDFS)
data store -- file system -- local / distributed
data store -- file system = for binary, hierarchical (tree)
data store -- google sheets https://www.jacobparis.com/content/submit-form-google-sheet https://thenewstack.io/how-to-use-google-sheets-as-a-database-with-react-and-ssr/
data store -- KV store
data store -- KV store -- Memcached
data store -- KV store -- Redis
data store -- object store -- S3
data store -- object store = flat structure of objects + uid + metadata
database -- Bigtable -- Cassandra = open source Bigtable-like
database -- Bigtable -- HBase = open source Bigtable-like for Hadoop https://en.wikipedia.org/wiki/Apache_HBase
database -- Bigtable = wide-column and key-value NoSQL database https://en.wikipedia.org/wiki/Bigtable
database -- denormalization = improving the performance of the database by adding redundant data
database -- indexes
database -- N+1 query problem = cascade, naive, inefficient query https://guides.rubyonrails.org/active_record_querying.html#n-1-queries-problem https://thoughtbot.com/blog/what-is-counter-cache
database -- NoSQL -- Cassandra https://cassandra.apache.org/_/index.html
database -- NoSQL -- MongoDB
database -- partitioning -- multiple DBs or tables
database -- partitioning vs sharding vs replication
database -- primary, foreign key
database -- RDBMS (Relational database management system
database -- replica = copy for redundancy or/and perf -- read replica
database -- sharding -- by key, range, directory https://dgraph.io/blog/post/sharding-database/
database -- sharding -- uneven distribution
database -- sharding https://dgraph.io/blog/post/sharding-database/
database -- SQL (Structured Query Language))
database -- SQL vs NoSQL - NoSQL = less features, more perf (trade offs, debatable)
DDOS (incl. self)
design -- 01b clarifying questions
design -- 01b requirements -> including CAP
design -- 02b breakdown in list of MICRO services: stateless/stateful? scalability?
design -- 02b top-down exploration, service discovery
design -- 02c scalability = sharding method?
design -- 03 high level diagram (HLD)
destructive engineering = kill and get strong in response
DevOps
distributed computing -- fallacies -- 1 The network is reliable
distributed computing -- fallacies -- 2 Latency is zero
distributed computing -- fallacies -- 3 Bandwidth is infinite
distributed computing -- fallacies -- 4 The network is secure
distributed computing -- fallacies -- 5 Topology doesn't change
distributed computing -- fallacies -- 6 There is one administrator
distributed computing -- fallacies -- 7 Transport cost is zero
distributed computing -- fallacies -- 8 The network is homogeneous
distributed computing -- fallacies https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing
distributed lock -- Google Chubby https://static.googleusercontent.com/media/research.google.com/en//archive/chubby-osdi06.pdf
distributed lock -- redis https://redis.io/docs/latest/develop/use/patterns/distributed-locks/
distributed lock = https://www.linkedin.com/advice/0/what-some-common-distributed-locking-patterns
distributed queues
distributed system -- characteristics -- Concurrency = naturally present in Distributed Systems, same activity or functionality performed by separate users who are in remote locations
distributed system -- characteristics -- Fault tolerance = reliability = the system, if there is a failure in Hardware or Software, continues to operate properly without degrading the performance the system
distributed system -- characteristics -- Heterogeneity = Networks, computer hardware, operating systems, programming languages, and developer implementations can all vary and differ among dispersed system components.
distributed system -- characteristics -- Openness = possible extensions and improvements in the system
distributed system -- characteristics -- Resource Sharing = ability to use any Hardware, Software, or Data anywhere in the System.
distributed system -- characteristics -- Scalability: It increases the scale of the system as a number of processors communicate with more users by accommodating to improve the responsiveness of the system.
distributed system -- characteristics -- Transparency = hides the complexity of the Distributed Systems to the Users and Application programs as there should be privacy in every system.
distributed system -- failures -- Communication medium failure = happens once a web site cannot communicate with another operational site within the network. it’s typically caused by the failure of the shift nodes and/or the links of the human activity system.
distributed system -- failures -- Method failure = the distributed system is generally halted and unable to perform the execution. Sometimes it leads to ending up the execution resulting in an associate incorrect outcome. Method failure causes the system state to deviate from specifications, and also method might fail to progress.
distributed system -- failures -- Secondary storage device failure = occurred once the keep information can’t be accessed. This failure is sometimes caused by parity error, head crash, or dirt particles settled on the medium.
distributed system -- failures -- System failure = the processor associated with the distributed system fails to perform the execution. This is caused by computer code errors and hardware issues. Hardware issues may involve CPU/memory/bus failure. This is assumed that whenever the system stops its execution due to some fault then the interior state is lost.
edge
edge -- "So, @vercel reverted all edge rendering back to Node.js" https://twitter.com/leeerob/status/1780705942734331983
efficiency
emergency response
encryption
encryption -- at rest
event streaming https://kafka.apache.org/intro
event-driven architecture = uses events to trigger and communicate between decoupled services, common with microservices
Externalized configuration
failure -- hardware
failure modes -- arbitrary = server produce arbitrary response at arbitrary times
failure modes -- crash = no longer responding (= full omission)
failure modes -- omission = never send a response OR never receive a request (= timing = infinite late)
failure modes -- response = response is flawed. value could be off or transmitted using the inappropriate control flow
failure modes -- timing (perf) = outside the expected time interval (usually = too slow BUT rare cases of too fast, following an upgrade for ex.)
failure modes https://medium.com/baseds/modes-of-failure-part-1-6687504bfed6
fan-out https://www.pubnub.com/guides/what-is-fan-out-software/
fault tolerance +++https://medium.com/baseds/ready-and-available-distributed-systems-161023aca378
finops
flux architecture
full stack trade offs https://zknill.io/posts/backend-for-the-frontend/
Google - Site Reliability Engineering
graceful degradation = ex. of batteries in flashlight
Hadoop https://en.wikipedia.org/wiki/Apache_Hadoop
headless = Front-end presentation is completely decoupled from back-end logic/CMS. Designed to be channel, programming language, and framework agnostic https://jamstack.org/glossary/headless-technology/
heavy hitters = very popular content, celebrities
hypermedia
incident management = prepare, detect, triage, mitigate, resolve, learn, remediate https://sre.google/resources/practices-and-processes/incident-management-guide/
incident values -- 01 Detect = knows before our customers do. A balanced service includes enough monitoring and alerting to detect incidents before our customers do. The best monitoring alerts us to problems before they even become incidents.
incident values -- 02 Respond = Escalate, escalate, escalate. Nobody will mind getting woken up for an incident that it turns out they aren't needed for. But they will mind if they don't get woken up for an incident when they should have been. We won't always have all the answers, so "don't hesitate to escalate".
incident values -- 03 Recover = Shit happens, clean it up quickly. Our customers don't care why their service is down, only that we restore service as quickly as possible. Never hesitate in getting an incident resolved quickly so that we can minimise impact to our customers.
incident values -- 04 Learn = Always Blameless. Incidents are part of running services. We improve services by holding teams accountable, not by apportioning blame.
incident values -- 05 Improve = Never have the same incident twice
incidents
incidents -- rate (i.e. # of HOTs and # repeat incidents)
information retrieval
infrastructure as code (IaC) https://bluelight.co/blog/best-infrastructure-as-code-tools
ingress/egress = “the act of entering”, “the right of entering”, or “the means of entering”
integrity
kafka = pub/sub + store + process
lambdalith https://rehanvdm.com/blog/should-you-use-a-lambda-monolith-lambdalith-for-the-api
latency = the time that passes between an action and the resulting response
latency https://www.a10networks.com/glossary/osi-network-model-and-types-of-load-balancers/
latency numbers -- frontend https://vercel.com/blog/latency-numbers-every-web-developer-should-know
latency numbers https://brenocon.com/dean_perf.html
limiting -- content limiting = ex. only X Gb of storage
limiting -- rate limiting = control the rate of requests sent or received by a network interface (DoS, scraping) https://en.wikipedia.org/wiki/Rate_limiting
load balancer
load balancer -- affinity = grouping related in the same server, when desirable
load balancer -- google sth
load balancer -- L4 vs L7 https://www.a10networks.com/glossary/how-do-layer-4-and-layer-7-load-balancing-differ/  https://www.nginx.com/resources/glossary/layer-4-load-balancing/
load balancer -- scope, ex. region "AWS ELB Elastic Load Balancer"
load shedding
log consolidation
Mean Time Between Failures (MTBF)
Mean Time To Detection (MTTD)
Mean Time To Resolution/repair/recover  (MTTR) https://www.dataset.com/blog/mean-time-to-repair/
message queue = temporary storage and routing system for messages exchanged between different components. ex. AWS SQS, Kafka (real time)
messaging -- queueing -- dead letter queue (DLQ) https://en.wikipedia.org/wiki/Dead_letter_queue
messaging -- queueing -- RabbitMQ
messaging -- queueing https://en.wikipedia.org/wiki/Message_queue
messaging https://www.enterpriseintegrationpatterns.com/patterns/messaging/
metrics layer -- 01 system = CPU, memory, disk...
metrics layer -- 02 application = queues, timing (DB calls), flow, cache hit rate...
metrics layer -- 03 business = usage and core actions
micro-frontend https://micro-frontends.org/ https://the-tractor.store/
microservice -- design -- IDEALS -- 01 Interface segregation = 
microservice -- design -- IDEALS -- 02 Deployability (is on you) = 
microservice -- design -- IDEALS -- 03 Event-driven = event-driven microservices are more likely to meet the scalability and performance requirements
microservice -- design -- IDEALS -- 04 Availability over consistency = see CAP theorem
microservice -- design -- IDEALS -- 05 Loose coupling = facade, adapter, wrapper
microservice -- design -- IDEALS -- 06 Single responsibility =
microservice -- design -- IDEALS https://www.infoq.com/articles/microservices-design-ideals/  https://www.lokajittikayatray.com/post/the-ideals-principles-every-microservice-developer-should-know  https://www.avenga.com/magazine/microservice-architecture/
microservice -- downsides -- data recovery = need recovery in 100s of service (database per microservice)
microservice -- downsides -- proliferation of environments (dev, staging, prod, Fedramp, Isolated Cloud...)
microservice -- service sprawl
microservice = small, loosely coupled distributed. solution to the scalability, independently deployability, and innovation challenges
middleware https://en.wikipedia.org/wiki/Middleware_(distributed_applications)
mitigations: code rollback, data rollback, degrade, upsize, blocklist, drain, quarantine https://www.oreilly.com/content/generic-mitigations/
monitoring
monitoring "Understanding what is happening in your environment is key to maintaining efficient, secure, and compliant applications"
network ACL
network model -- OSI -- Layer 1 = The physical layer, as with TCP/IP, provides the physical connection to the network and defines the electrical and physical characteristics
network model -- OSI -- Layer 2 = The datalink layer conceptually creates a point-to-point connection between network endpoints and receives and sends data to and from the network layer
network model -- OSI -- Layer 2+1 = TCP/IP model -- layer "link"
network model -- OSI -- Layer 3 = TCP/IP model -- layer "internet"
network model -- OSI -- Layer 3 = TCP/IP model -- layer "transport"
network model -- OSI -- Layer 3 = The network layer is responsible for routing data between network endpoints
network model -- OSI -- Layer 4 = The transport layer ensures delivery and quality-of-service functions
network model -- OSI -- Layer 5 = The session layer creates, maintains, and terminates sessions between network endpoints
network model -- OSI -- Layer 6 = The presentation layer converts data streams into formats that can be handled by the lower layers and can also compress/decompress and encrypt/decrypt data
network model -- OSI -- Layer 7 = The application layer provides access to the services provided by the lower layers
network model -- OSI -- Layer 7+6+5 = TCP/IP model -- layer "application"
network model -- OSI https://www.a10networks.com/glossary/osi-network-model-and-types-of-load-balancers/
network model -- TCP/IP -- 1 = application (HTTP, SSH...)
network model -- TCP/IP -- 2 = transport (TCP/UDP)
network model -- TCP/IP -- 3 = internet (IP)
network model -- TCP/IP -- 4 = link (MAC)
network model -- TCP/IP -- 4 = physical
network model -- TCP/IP https://www.geeksforgeeks.org/tcp-ip-model/
Non-Abstract Large System Design
non-abstract large system design (NALSD) = iterative process for designing, assessing, and evaluating distributed systems
non-abstract large system design (NALSD) https://sre.google/classroom/distributed-pubsub/
non-abstract large system design (NALSD) https://sre.google/classroom/imageserver/
non-abstract large system design (NALSD) https://sre.google/workbook/non-abstract-design/
numbers everyone should know https://static.googleusercontent.com/media/sre.google/en//static/pdf/rule-of-thumb-latency-numbers-letter.pdf
observability
observability -- logs -- data model https://opentelemetry.io/docs/specs/otel/logs/data-model/
observability -- logs = logs. Unfortunately, logs aren’t extremely useful for tracking code execution, as they typically lack contextual information, such as where they were called from. They become far more useful when they are included as part of a span, or when they are correlated with a trace and a span. Need to be stored and searchable. beware of costs!
observability -- telemetry
observability = a measure of how well internal states of a system can be inferred from knowledge of its external outputs https://andydote.co.uk/presentations/index.html
observability https://opentelemetry.io/docs/concepts/observability-primer/
on-prem requirements
operations (ops)
operations -- metrics -- incident rate
operations -- metrics -- MTTD
operations -- metrics -- MTTR
ops -- toil
orchestrator -- kubernetes
organizations
PACELC theorem = extension of CAP https://en.wikipedia.org/wiki/PACELC_theorem
peak hours, off-peak hours
performance
permissions
Personal data service (PDS) = user's central point of control for their personal information https://en.wikipedia.org/wiki/Personal_data_service
perspective -- non-tech -- business = creates business model that integrates IT strategy
perspective -- non-tech -- governance = identify and implement best practices for IT governance and support business processes with technology
perspective -- non-tech -- people
perspective -- tech -- operations = focuses on operating and recovering IT workloads to meet the requirements of your business stakeholders
perspective -- tech -- platform (cloud!)
perspective -- tech -- security
polyglot persistence https://en.wikipedia.org/wiki/Polyglot_persistence
post-mortem
private cloud = https://threadreaderapp.com/thread/1800291897245835616.html
protocol -- Advanced Message Queuing Protocol (AMQP) -- ZeroMQ, RabbitMQ https://stackoverflow.com/questions/731233/activemq-or-rabbitmq-or-zeromq-or https://news.ycombinator.com/item?id=9634801
proxy server = intermediaries between client and servers. improve performance by caching, provide security by filtering incoming traffic, enable load balancing for efficient distribution of requests
PubSub = Publish-Subscribe 
push -- long polling, server-side events (SSE), and WebSockets
push vs pull
real-time -- hard real-time = a system is said to be hard real-time if it must meet strict timing constraints
real-time -- protocols -- 01 Session Traversal Utilities for NAT (STUN) - Used to establish a direct UDP connection between two clients.
real-time -- protocols -- 02 Traversal Using Relay around NAT (TURN) - Used to establish a relayed UDP or TCP connection between two clients. Here, the traffic must be relayed through the TURN server to bypass restrictive firewall rules, and the preference is UDP over TCP because TCP's guaranteed ordered delivery of packets implies overhead that is undesirable for real-time communications.
real-time -- protocols -- 03 Secure Traversal Using Relay around NAT (TURNS) Used to establish a relayed TCP/TLS connection between two clients. Here, the traffic must be relayed through the TURN server and through a TLS socket to bypass extremely restrictive firewall rules.
real-time -- protocols -- 04 Interactive Connectivity Establishment (ICE) is a standard for using STUN and TURN to establish connectivity between two endpoints. ICE takes all of the complexity implied in the discussion above, and coordinates the management of STUN, TURN, and TURNS
real-time -- protocols -- STUN, TURN, and ICE https://developer.liveswitch.io/liveswitch-server/guides/what-are-stun-turn-and-ice.html
real-time -- soft real-time = a system is said to be soft real-time if it can tolerate some delays in the processing of data
real-time application -- goals = high throughput, low latency communication between various clients that MAY be behind NATs or firewalls
recommender systems https://www.canva.dev/blog/engineering/recommender-systems-when-they-fail-who-are-you-gonna-call/
redeployment = can impact the service due to rebalancing etc. causing latency, connexions loss, etc.
regions
reliability -- organizational reliability continuum = absent -> reactive -> proactive -> strategic -> visionary / there is a significant cost associated with moving from one phase to another and a cost to remain very high on this curve. In our experience, being proactive is a healthy level to target and is ideal for most products https://cloud.google.com/blog/products/devops-sre/the-five-phases-of-organizational-reliability
replication = improving availability, distribute the load, and enhance fault tolerance
request deduplication
requirements -- functional/behavioral = end user's basic facilities that the system should offer
requirements -- non-functional -- Flexibility
requirements -- non-functional -- Maintainability
requirements -- non-functional -- Performance
requirements -- non-functional -- Portability
requirements -- non-functional -- Reliability
requirements -- non-functional -- Reusability
requirements -- non-functional -- Scalability
requirements -- non-functional -- Security
requirements -- non-functional/non-behavioral  = quality constraints that the system must satisfy
resilience
REST = architectural style, stateless client-server communication model
RESTful = systems which adhere to a set of constraints to achieve simplicity, scalability, and uniformity.
retire, retain, rehost, re-platform, repurchase, refactor/re-architect
routing -- hot/cold potato https://www.usenix.org/legacy/publications/library/proceedings/usenix02/full_papers/subramanian/subramanian_html/node28.html
scaling -- horizontally = more machines
scaling -- load-shedding
scaling -- vertically = more power
scaling ~ elasticity
search -- https://vespa.ai/ (NO OpenSearch)
security
serverless
service
service = software functionality https://en.wikipedia.org/wiki/Service_(systems_architecture)
service availability
service level objectives (SLO) https://sre.google/resources/practices-and-processes/art-of-slos/ https://sre.google/resources/
Service mesh
service monitoring -- Error budget = starts at 1 - SLO and declines as the actual performance misses the SLO
service monitoring -- Service-level agreement (SLA) = refund!!
service monitoring -- Service-level indicator (SLI) = a measurement of performance
service monitoring -- Service-level objective (SLO) = a statement of desired performance
service monitoring https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring
Service Proxy Egress authentication
single point of failure = avoidable with redundancy
site reliability engineering (SRE) "treat operations as if it’s a software problem" https://sre.google/
snowflake (Twitter) = distributed k-sorted uuid generator https://blog.x.com/engineering/en_us/a/2010/announcing-snowflake
SRE -- learning 01 = The riskiness of a mitigation should scale with the severity of the outage
SRE -- learning 02 = Recovery mechanisms should be fully tested before an emergency
SRE -- learning 03 = Canary all changes
SRE -- learning 04 = Have a "Big Red Button"
SRE -- learning 05 = Unit tests alone are not enough - integration testing is also needed
SRE -- learning 06 = COMMUNICATION CHANNELS! AND BACKUP CHANNELS!! AND BACKUPS FOR THOSE BACKUP CHANNELS!!!
SRE -- learning 07 = Intentionally degrade performance modes
SRE -- learning 08 = Test for Disaster resilience
SRE -- learning 09 = Automate your mitigations
SRE -- learning 10 = Reduce the time between rollouts, to decrease the likelihood of the rollout going wrong
SRE -- learning 11 = A single global hardware version is a single point of failure
SRE -- learnings https://sre.google/resources/practices-and-processes/twenty-years-of-sre-lessons-learned/
SRE -- product focused = "prioritizes the product, not the service" https://sre.google/resources/practices-and-processes/product-focused-reliability-for-sre/
SRE -- The Four Golden Signals = Latency, Traffic, Errors, Saturation(utilisation)
state
stateful
stateless -- Prefer simple, stateless services where possible
stream processing = computing paradigm that involves the continuous processing of data streams in real-time (vs. batch). crucial in scenarios where low-latency, real-time insights, and immediate actions on data are essential
Sustainable Architectural Decisions https://adr.github.io/
System design is a mine-field of difficult tradeoffs
system properties -- 01 available = end user can access it and it works as expected https://medium.com/baseds/ready-and-available-distributed-systems-161023aca378
system properties -- 02 highly available = no scheduled/unscheduled maintenance, no downtime, no data loss
system properties -- 03 fault tolerant = can even handle hardware failure (expensive to implement)
system properties -- distributed https://courses.cs.washington.edu/courses/cse490h/07wi/readings/IntroductionToDistributedSystems.pdf
system properties -- ready
take-over
telemetry -- logs https://opentelemetry.io/docs/concepts/observability-primer/#logs
telemetry -- maps = Relationship information between time spans can be used to produce maps for services
telemetry -- metrics -- application-based vs time-based
telemetry -- metrics -- Metrics Semantic Conventions https://opentelemetry.io/docs/specs/semconv/general/metrics/
telemetry -- metrics = Time spans can be aggregated by their attributes to produce metrics.
telemetry -- openTelemetry https://opentelemetry.io/docs/concepts/observability-primer/
telemetry -- signals = system outputs that describe the underlying activity of the operating system and applications running on a platform. A signal can be something you want to measure at a specific point in time, like temperature or memory usage, or an event that goes through the components of your distributed system that you’d like to trace. You can group different signals together to observe the inner workings of the same piece of technology under different angles. https://opentelemetry.io/docs/concepts/signals/
telemetry -- span -- events = events can happen during a time span
telemetry -- span -- hierarchy = root span (ex. edge) > local root span (ex. service) > span
telemetry -- span -- time span = a measure of how long an operation took in a service. Time spans contain information about the operations they represent.
telemetry -- span = a unit of work or operation. tracks specific operations that a request makes, painting a picture of what happened during the time in which that operation was executed  https://opentelemetry.io/docs/concepts/observability-primer/#spans
telemetry -- trace -- context = need to be passed around (traceId, spanId, traceFlags) trace id = non-zero 128-bit, span id = 64 bits, traceFlags = 8bits
telemetry -- trace -- disconnected = Failure to pass the current context to child threads/operations/services can lead to disconnected traces
telemetry -- trace -- distributed = records the paths taken by requests (made by an application or end-user) as they propagate through multi-service architectures, like microservice and serverless applications.
telemetry -- trace -- id -- zipkin https://github.com/openzipkin/b3-propagation
telemetry -- trace -- id = very important to be consistent and could be aggregated!
telemetry -- trace -- Trace Semantic Conventions https://opentelemetry.io/docs/specs/semconv/general/trace/
telemetry -- trace = collection of time spans and their relationships to each other. A trace represents a transaction within a service or across services
telemetry -- tracing = the practice of capturing traces
telemetry -- very important for distributed perf problems! (on big customers, what takes time?)
third-party risk management
time -- leap second
time -- leap second -- leap smear https://googleblog.blogspot.com/2011/09/time-technology-and-leaping-seconds.html
time = difficult yet important for distributed https://unix4lyfe.org/time/
Time to Detection (TTD)
user management -- Domain Enabled Signup
user management -- request, invitation
user management = +++ https://workos.com/blog/the-developers-guide-to-user-management/
user management = broader process of managing user accounts, profiles, and access privileges. It determines what a user is authorized to do or access within the system, after they have been authenticated
utilisation = How “full” or “busy” is the service?
VPN
WebRTC
WebSockets
WebSockets -- gateway
WebSockets -- gateway -- multiplexing & demultiplexing https://www.canva.dev/blog/engineering/enabling-real-time-collaboration-with-rsocket/
WebSockets -- RSocket https://rsocket.io/
well architected -- pillar -- cost optimization = avoiding unnecessary costs -- consumption model, analyzing and attributing expenditure, and using managed services to reduce the cost of ownership.
well architected -- pillar -- operational excellence = running and monitoring systems to deliver business value -- performing operations as code, annotating documentation, anticipating failure, and frequently making small, reversible changes.
well architected -- pillar -- performance efficiency = using IT and computing resources efficiently and maintain this efficiency -- using serverless architectures, and designing systems to be able to go global in minutes
well architected -- pillar -- reliability = consistently and correctly perform intended functions, Recover from infrastructure or service disruptions, Dynamically acquire computing resources to meet demand, Mitigate disruptions such as misconfigurations or transient network issues -- includes testing recovery procedures, scaling horizontally to increase aggregate system availability, and automatically recovering from failure.
well architected -- pillar -- security = protecting information, systems, and assets while delivering business value through risk assessments and mitigation strategies -- Automate security best practices when possible, Apply security at all layers, Protect data in transit and at rest.
well architected -- pillar -- sustainability = minimizing the environmental impact of your technology -- Understand your impact, Establish sustainability goals, Maximize utilization, Anticipate and adopt new, more efficient hardware and software offerings, Use managed services, Reduce the downstream impact of your cloud workloads
