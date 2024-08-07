1% rule -- 90-9-1 = 90% consume, 9% edit, 1% add
1% rule -- lurk, lurker
1% rule = only 1% participants add content https://en.wikipedia.org/wiki/1%25_rule
12 factors https://12factor.net/
3 nines / 4 nines / 5 nines -- 3 nines == 99.9% uptime 5 nines == 99.999% uptime, this means your service is down less than 6 min in a year!
[ ] +++ https://github.com/donnemartin/system-design-primer
[ ] +++ https://lethain.com/distributed-systems-vocabulary/
[ ] architecture https://engineering.fb.com/2020/08/17/production-engineering/async/
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
access control
ACID -- 1 Atomicity "all or nothing"
ACID -- 2 Consistency "valid state"
ACID -- 3 Isolation "independent transactions"
ACID -- 4 Durability "once committed, always committed"
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
app -- collaboration: which model? XXX TODO
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
architecture -- entitlement (vs. billing) = a customer’s access to a specific feature or product, within a given plan +++https://arnon.dk/why-you-should-separate-your-billing-from-entitlement/
architecture -- JamStack = decouples the web experience layer from data and business logic, improving flexibility, scalability, performance, and maintainability
architecture -- LAMP
architecture -- microservices, API-first, cloud-native SaaS, headless (MACH) https://machalliance.org/mach-technology
audit
audit trail
auth
auto-scaling
availability
availability zone
AWS Shield
AWS WAF
back-off and retry mechanisms
Backends For Frontends (BFF) https://samnewman.io/patterns/architectural/bff/
Backends For Frontends -- composable https://bff-patterns.com/
Backends For Frontends -- tradeoffs https://zknill.io/posts/backend-for-the-frontend/
bloom Filters
blue/green deployment
cache -- counter cache https://thoughtbot.com/blog/what-is-counter-cache
caching
canary releasing
CAP https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/
CAP Theorem -- Availability = Every request receives a (non-error) response, without the guarantee that it contains the most recent write
CAP Theorem -- Consistency = Every read receives the most recent write or an error
CAP Theorem -- Partition tolerance = The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes
CAP Theorem -> see also PACELC theorem
capacity planning
cascading failures
cascading failures -- exponential backoff + jitter +
change management
chaos monkey
client side API gateway "egress" TODO
cloud native = leverages the full capabilities of the cloud, beyond storage and hosting, including elastic scaling of highly available resources. Functionality is updated automatically no manual effort required
compliance
compute
confidentiality
consistent Hashing
containers
containers -- images -- golden = pre-configured and optimised container images that serve as standardised and reusable foundations for building other images (apps, services...)
containers -- images -- Red Hat Universal Base Image (UBI) = minimal, freely redistributable base image for containerised applications, providing a consistent foundation with essential packages from Red Hat Enterprise Linux (RHEL) to build and deploy reliable and secure containers https://developers.redhat.com/products/rhel/ubi
Content Delivery Network (CDN) ex. CloudFront
cron
data retrieval
database
database -- Bigtable -- Cassandra = open source Bigtable-like
database -- Bigtable -- HBase = open source Bigtable-like for Hadoop https://en.wikipedia.org/wiki/Apache_HBase
database -- Bigtable = wide-column and key-value NoSQL database https://en.wikipedia.org/wiki/Bigtable
database -- google sheets https://www.jacobparis.com/content/submit-form-google-sheet https://thenewstack.io/how-to-use-google-sheets-as-a-database-with-react-and-ssr/
database -- hierarchical, relational...
database -- indexes
database -- N+1 query problem = naive, inefficient query https://thoughtbot.com/blog/what-is-counter-cache
database -- No-SQL and their applications
database -- partitioning/Sharding
database -- SQL
Database per Microservice
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
distributed queues
edge
edge "So, @vercel reverted all edge rendering back to Node.js" https://twitter.com/leeerob/status/1780705942734331983
efficiency
emergency response
event streaming https://kafka.apache.org/intro
event-driven architecture = uses events to trigger and communicate between decoupled services, common with microservices
Externalized configuration
failure modes -- arbitrary
failure modes -- crash = no longer responding (= full omission)
failure modes -- omission = never send a response OR never receive a request (= timing = infinite late)
failure modes -- response
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
interview -- manage time: reqts + estimation - 5 min, HLD - 20 min, deep dive - 15 min, roundup - 5 min
interview -- popular problems = designing a URL shortening service, Pastebin, Instagram, Dropbox, Facebook Messenger, Twitter, YouTube/Netflix, Typeahead Suggestion, API Rate Limiter, Twitter Search...
interview -- popular problems = Google products: Google Search, YouTube, Google Photo Sharing and Storage, Google Docs, Google Drive...
interview -- popular problems = Meta products: facebook, marketplace, instagram, whatsapp...
kafka = pub/sub + store + process
lambdalith https://rehanvdm.com/blog/should-you-use-a-lambda-monolith-lambdalith-for-the-api
latency = the time that passes between an action and the resulting response
latency https://www.a10networks.com/glossary/osi-network-model-and-types-of-load-balancers/
load balancer
load balancer -- google sth
load balancer -- L4 vs L7 https://www.a10networks.com/glossary/how-do-layer-4-and-layer-7-load-balancing-differ/  https://www.nginx.com/resources/glossary/layer-4-load-balancing/
load balancer -- scope, ex. region "AWS ELB Elastic Load Balancer"
load shedding
log consolidation
Mean Time Between Failures (MTBF)
Mean Time To Detection (MTTD)
Mean Time To Resolution/repair/recover  (MTTR) https://www.dataset.com/blog/mean-time-to-repair/
message queue ex. AWS SQS
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
microservice -- downsides -- data recovery = need recovery in 100s of service 
microservice -- downsides -- proliferation of environments (dev, staging, prod, Fedramp, Isolated Cloud...)
microservice -- service sprawl
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
non-abstract large systems design (NALSD) https://sre.google/workbook/non-abstract-design/
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
organizational reliability continuum = absent -> reactive -> proactive -> strategic -> visionary / there is a significant cost associated with moving from one phase to another and a cost to remain very high on this curve. In our experience, being proactive is a healthy level to target and is ideal for most products https://cloud.google.com/blog/products/devops-sre/the-five-phases-of-organizational-reliability
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
PubSub = Publish-Subscribe 
rate limiting
regions
request deduplication
retire, retain, rehost, re-platform, repurchase, refactor/re-architect
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
service monitoring -- Service-level indicator (SLI) = a measurement of performance
service monitoring -- Service-level objective (SLO) = a statement of desired performance
service monitoring https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring
Service Proxy Egress authentication
site reliability engineering (SRE) "treat operations as if it’s a software problem" https://sre.google/
SRE -- learning 01 -- The riskiness of a mitigation should scale with the severity of the outage
SRE -- learning 02 -- Recovery mechanisms should be fully tested before an emergency
SRE -- learning 03 -- Canary all changes
SRE -- learning 04 -- Have a "Big Red Button"
SRE -- learning 05 -- Unit tests alone are not enough - integration testing is also needed
SRE -- learning 06 -- COMMUNICATION CHANNELS! AND BACKUP CHANNELS!! AND BACKUPS FOR THOSE BACKUP CHANNELS!!!
SRE -- learning 07 -- Intentionally degrade performance modes
SRE -- learning 08 -- Test for Disaster resilience
SRE -- learning 09 -- Automate your mitigations
SRE -- learning 10 -- Reduce the time between rollouts, to decrease the likelihood of the rollout going wrong
SRE -- learning 11 - A single global hardware version is a single point of failure
SRE -- learnings https://sre.google/resources/practices-and-processes/twenty-years-of-sre-lessons-learned/
SRE -- product focused = "prioritizes the product, not the service" https://sre.google/resources/practices-and-processes/product-focused-reliability-for-sre/
SRE -- The Four Golden Signals -- Latency, Traffic, Errors, Saturation(utilisation)
state
stateless -- Prefer simple, stateless services where possible
Sustainable Architectural Decisions https://adr.github.io/
System design is a mine-field of difficult tradeoffs
system properties -- 01 available = end user can access it and it works as expected https://medium.com/baseds/ready-and-available-distributed-systems-161023aca378
system properties -- 02 highly available = no scheduled/unscheduled maintenance, no downtime, no data loss
system properties -- 03 fault tolerant = can even handle hardware failure (expensive to implement)
system properties -- distributed https://courses.cs.washington.edu/courses/cse490h/07wi/readings/IntroductionToDistributedSystems.pdf
system properties -- ready
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
Time to Detection (TTD)
utilisation = How “full” or “busy” is the service?
VPN
well architected -- pillar -- cost optimization = avoiding unnecessary costs -- consumption model, analyzing and attributing expenditure, and using managed services to reduce the cost of ownership.
well architected -- pillar -- operational excellence = running and monitoring systems to deliver business value -- performing operations as code, annotating documentation, anticipating failure, and frequently making small, reversible changes.
well architected -- pillar -- performance efficiency = using IT and computing resources efficiently and maintain this efficiency -- using serverless architectures, and designing systems to be able to go global in minutes
well architected -- pillar -- reliability = consistently and correctly perform intended functions, Recover from infrastructure or service disruptions, Dynamically acquire computing resources to meet demand, Mitigate disruptions such as misconfigurations or transient network issues -- includes testing recovery procedures, scaling horizontally to increase aggregate system availability, and automatically recovering from failure.
well architected -- pillar -- security = protecting information, systems, and assets while delivering business value through risk assessments and mitigation strategies -- Automate security best practices when possible, Apply security at all layers, Protect data in transit and at rest.
well architected -- pillar -- sustainability = minimizing the environmental impact of your technology -- Understand your impact, Establish sustainability goals, Maximize utilization, Anticipate and adopt new, more efficient hardware and software offerings, Use managed services, Reduce the downstream impact of your cloud workloads
