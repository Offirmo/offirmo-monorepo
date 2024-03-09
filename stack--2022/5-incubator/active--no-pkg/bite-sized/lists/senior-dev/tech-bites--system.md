-- https://github.com/donnemartin/system-design-primer
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
availability zone
AWS Shield
AWS WAF
blue/green deployment
caching
CAP https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/
CAP Theorem -- Availability = Every request receives a (non-error) response, without the guarantee that it contains the most recent write.
CAP Theorem -- Consistency = Every read receives the most recent write or an error
CAP Theorem -- Partition tolerance = The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.
CDN ex. CloudFront
cloud native
compliance
compute
containers
cron
database
DDOS (incl. self)
DevOps
event streaming https://kafka.apache.org/intro
event-driven architecture = uses events to trigger and communicate between decoupled services, common with microservices
fanout
finops
flux architecture
ingress egress
ingress/egress = “the act of entering”, “the right of entering”, or “the means of entering”
kafka = pub/sub + store + process
kubernetes TODO
latency
load balancer
load balancer -- google sth
load balancer -- scope, ex. region "AWS ELB Elastic Load Balancer"
message queue ex. AWS SQS
monitoring "Understanding what is happening in your environment is key to maintaining efficient, secure, and compliant applications"
network ACL
observability
orchestrator -- kubernetes
organizations
permissions
perspective -- non-tech -- business = creates business model that integrates IT strategy
perspective -- non-tech -- governance = identify and implement best practices for IT governance and support business processes with technology
perspective -- non-tech -- people
perspective -- tech -- operations = focuses on operating and recovering IT workloads to meet the requirements of your business stakeholders
perspective -- tech -- platform (cloud!)
perspective -- tech -- security
regions
retire, retain, rehost, re-platform, repurchase, refactor/re-architect
scaling -- horizontally = more machines
scaling -- load-shedding
scaling -- vertically = more power
scaling ~ elasticity
security
serverless
state
Sustainable Architectural Decisions https://adr.github.io/
tracing
VPN
well architected -- pillar -- cost optimization = avoiding unnecessary costs -- consumption model, analyzing and attributing expenditure, and using managed services to reduce the cost of ownership.
well architected -- pillar -- operational excellence = running and monitoring systems to deliver business value -- performing operations as code, annotating documentation, anticipating failure, and frequently making small, reversible changes.
well architected -- pillar -- performance efficiency = using IT and computing resources efficiently and maintain this efficiency -- using serverless architectures, and designing systems to be able to go global in minutes
well architected -- pillar -- reliability = consistently and correctly perform intended functions, Recover from infrastructure or service disruptions, Dynamically acquire computing resources to meet demand, Mitigate disruptions such as misconfigurations or transient network issues -- includes testing recovery procedures, scaling horizontally to increase aggregate system availability, and automatically recovering from failure.
well architected -- pillar -- security = protecting information, systems, and assets while delivering business value through risk assessments and mitigation strategies -- Automate security best practices when possible, Apply security at all layers, Protect data in transit and at rest.
well architected -- pillar -- sustainability = minimizing the environmental impact of your technology -- Understand your impact, Establish sustainability goals, Maximize utilization, Anticipate and adopt new, more efficient hardware and software offerings, Use managed services, Reduce the downstream impact of your cloud workloads
XXX Practiced popular system design problems like designing a URL shortening service, Pastebin, Instagram, Dropbox, Facebook Messenger, Twitter, YouTube/Netflix, Typeahead Suggestion, API Rate Limiter, Twitter Search.
XXX Practiced system design for some Google products, including Google Search, YouTube, Google Photo Sharing and Storage, Google Docs, Google Drive.
XXX Read a few research papers: https://medium.com/@rohitverma_87831/my-interview-experience-at-google-afc1080df175
XXX Revised system design concepts such as CAP and PACELC theroem, SQL vs No-SQL, Types of No-SQL databases and their applications, Consistent Hashing, Bloom Filters, Load Balancers, Horizontal Scaling, Caching, Database Partitioning/Sharding, Indexes, Rate Limiting, Distributed Queues, Request Deduplication.
