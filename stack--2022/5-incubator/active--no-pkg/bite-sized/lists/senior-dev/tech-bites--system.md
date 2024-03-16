-- https://github.com/donnemartin/system-design-primer
[ ] kubernetes
[ ] paper https://research.google/pubs/large-scale-cluster-management-at-google-with-borg/
[ ] paper https://research.google/pubs/the-google-file-system/
[ ] paper https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf
[ ] paper https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf
[ ] paper https://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf
[ ] paper https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf
[ ] paper https://www.cs.cornell.edu/projects/ladis2009/papers/lakshman-ladis2009.pdf
[ ] research papers: https://medium.com/@rohitverma_87831/my-interview-experience-at-google-afc1080df175
12 factors https://12factor.net/
3 nines / 4 nines / 5 nines -- 3 nines == 99.9% uptime 5 nines == 99.999% uptime, this means your service is down less than 6 min in a year!
access control
ACID -- 1 Atomicity "all or nothing"
ACID -- 2 Consistency "valid state"
ACID -- 3 Isolation "independent transactions"
ACID -- 4 Durability "once committed, always committed"
ACID = a set of properties of database transactions intended to guarantee data validity despite errors, power failures, and other mishaps https://en.wikipedia.org/wiki/ACID
audit
audit trail
auth
auto-scaling
availability
availability zone
AWS Shield
AWS WAF
bloom Filters
blue/green deployment
caching
CAP https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/
CAP Theorem -- Availability = Every request receives a (non-error) response, without the guarantee that it contains the most recent write
CAP Theorem -- Consistency = Every read receives the most recent write or an error
CAP Theorem -- Partition tolerance = The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes
CAP Theorem -> see also PACELC theorem
capacity planning
cascading failures
cascading failures -- exponential backoff + jitter +
CDN ex. CloudFront
change management
chaos monkey
cloud native
compliance
compute
confidentiality
consistent Hashing
containers
cron
database
database -- indexes
database -- No-SQL and their applications
database -- partitioning/Sharding
database -- SQL
DDOS (incl. self)
design -- 01b requirements -> including CAP
design -- 01b clarifying questions
design -- 02b top-down exploration, service discovery
design -- 02b breakdown in list of MICRO services: stateless/stateful? scalability?
design -- 02c scalability = sharding method?
design -- 03 high level diagram (HLD)
DevOps
distributed queues
efficiency
emergency response
event streaming https://kafka.apache.org/intro
event-driven architecture = uses events to trigger and communicate between decoupled services, common with microservices
fanout
finops
1% rule = only 1% participants add content https://en.wikipedia.org/wiki/1%25_rule
1% rule -- 90-9-1 = 90% consume, 9% edit, 1% add
1% rule -- lurk, lurker
flux architecture
graceful degradation
incident management = prepare, detect, triage, mitigate, resolve, learn, remediate https://sre.google/resources/practices-and-processes/incident-management-guide/
ingress egress
ingress/egress = “the act of entering”, “the right of entering”, or “the means of entering”
Integrity
interview -- manage time: reqts + estimation - 5 min, HLD - 20 min, deep dive - 15 min, roundup - 5 min
interview -- popular problems = designing a URL shortening service, Pastebin, Instagram, Dropbox, Facebook Messenger, Twitter, YouTube/Netflix, Typeahead Suggestion, API Rate Limiter, Twitter Search...
interview -- popular problems = Google products: Google Search, YouTube, Google Photo Sharing and Storage, Google Docs, Google Drive...
interview -- popular problems = Meta products: facebook, marketplace, instagram, whatsapp...
kafka = pub/sub + store + process
latency
latency = the time that passes between an action and the resulting response
load balancer
load balancer -- google sth
load balancer -- scope, ex. region "AWS ELB Elastic Load Balancer"
load shedding
Mean Time Between Failures (MTBF)
mean time to resolution/repair (MTTR) https://www.dataset.com/blog/mean-time-to-repair/
message queue ex. AWS SQS
metrics layer -- 01 system = CPU, memory, disk...
metrics layer -- 02 application = queues, timing (DB calls), flow, cache hit rate...
metrics layer -- 03 business = usage and core actions
mitigations: code rollback, data rollback, degrade, upsize, blocklist, drain, quarantine https://www.oreilly.com/content/generic-mitigations/
monitoring
monitoring "Understanding what is happening in your environment is key to maintaining efficient, secure, and compliant applications"
network ACL
non-abstract large system design (NALSD) = iterative process for designing, assessing, and evaluating distributed systems
numbers everyone should know https://static.googleusercontent.com/media/sre.google/en//static/pdf/rule-of-thumb-latency-numbers-letter.pdf
observability
ops -- toil
orchestrator -- kubernetes
organizational reliability continuum = absent -> reactive -> proactive -> strategic -> visionary / there is a significant cost associated with moving from one phase to another and a cost to remain very high on this curve. In our experience, being proactive is a healthy level to target and is ideal for most products https://cloud.google.com/blog/products/devops-sre/the-five-phases-of-organizational-reliability
organizations
PACELC theorem = extension of CAP https://en.wikipedia.org/wiki/PACELC_theorem
performance
permissions
perspective -- non-tech -- business = creates business model that integrates IT strategy
perspective -- non-tech -- governance = identify and implement best practices for IT governance and support business processes with technology
perspective -- non-tech -- people
perspective -- tech -- operations = focuses on operating and recovering IT workloads to meet the requirements of your business stakeholders
perspective -- tech -- platform (cloud!)
perspective -- tech -- security
polyglot persistence https://en.wikipedia.org/wiki/Polyglot_persistence
post-mortem
rate limiting
regions
request deduplication
retire, retain, rehost, re-platform, repurchase, refactor/re-architect
scaling -- horizontally = more machines
scaling -- load-shedding
scaling -- vertically = more power
scaling ~ elasticity
security
serverless
service level objectives (SLO) https://sre.google/resources/practices-and-processes/art-of-slos/ https://sre.google/resources/
service monitoring -- Error budget = starts at 1 - SLO and declines as the actual performance misses the SLO
service monitoring -- Service-level indicator (SLI) = a measurement of performance
service monitoring -- Service-level objective (SLO) = a statement of desired performance
service monitoring https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring
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
Time to Detection (TTD)
tracing
utilisation = How “full” or “busy” is the service?
VPN
well architected -- pillar -- cost optimization = avoiding unnecessary costs -- consumption model, analyzing and attributing expenditure, and using managed services to reduce the cost of ownership.
well architected -- pillar -- operational excellence = running and monitoring systems to deliver business value -- performing operations as code, annotating documentation, anticipating failure, and frequently making small, reversible changes.
well architected -- pillar -- performance efficiency = using IT and computing resources efficiently and maintain this efficiency -- using serverless architectures, and designing systems to be able to go global in minutes
well architected -- pillar -- reliability = consistently and correctly perform intended functions, Recover from infrastructure or service disruptions, Dynamically acquire computing resources to meet demand, Mitigate disruptions such as misconfigurations or transient network issues -- includes testing recovery procedures, scaling horizontally to increase aggregate system availability, and automatically recovering from failure.
well architected -- pillar -- security = protecting information, systems, and assets while delivering business value through risk assessments and mitigation strategies -- Automate security best practices when possible, Apply security at all layers, Protect data in transit and at rest.
well architected -- pillar -- sustainability = minimizing the environmental impact of your technology -- Understand your impact, Establish sustainability goals, Maximize utilization, Anticipate and adopt new, more efficient hardware and software offerings, Use managed services, Reduce the downstream impact of your cloud workloads
