

Agile
Architectural Decision Records (ADRs) https://adr.github.io/
Big Hairy Audacious Goals (BHAG) https://www.jimcollins.com/article_topics/articles/BHAG.html
big rocks
comms "the loop" 01 -- Open up your work in progress = Avoid after-the-fact advice by sharing your work-in-progress for feedback early and often
comms "the loop" 02 -- Curate, don’t automate = Information overload does not have to paralyze your project. Get and give just the right amount of data and details so your stakeholders stay in the loop and your work gets noticed.
comms "the loop" 03 -- Common vocabulary over common tooling = Whether we know it or not, every time we communicate we make comprehension and speed trade-offs
comms "the loop" 04 -- Show that you’re paying attention = We spend too much time on status reports for them not to be read
comms -- project -- "the loop" https://www.atlassian.com/loop/
Conway's law
Critical User Journeys (CUJ)
decision making -- 01 LDR “lightweight decision record” = for 2 way doors, lightweight decisions that have already been made and should be recorded. Should reference the slack threads, pages, comments, and tasks where the decision was made.
decision making -- 02 RFC “request for comments” = the first - in some cases the only - formal step in agreeing on a proposal. should only ever contain a single option with the intention to receive comments and additional insights. Does not require an explicit approver, although it does require a general consensus. It is expected that the correct stakeholders are included on the page with a reasonable timeframe to provide their inputs.
decision making -- 03 DACI “driver, approver, contributor, informed" = will contain multiple solutions to be discussed and one chosen. expensive process both as it requires significant time and mental investment. required for higher impact decisions or when a consensus cannot be found from an RFC document https://www.atlassian.com/team-playbook/plays/daci
Directly Responsible Individual (DRI) individuals who own and drive outcomes for specific parts of the business funnel, making decisions, collaborating across functions, and escalating when necessary. They are accountable for developing and evolving the thesis on how to drive their assigned metrics, and represent the funnel in business rhythms like OKRs and WBRs
documentation -- CEDAR -- 01 Clear = How easy was it to read? Does the document contain ambiguity?
documentation -- CEDAR -- 02 Effective = How useful is it? Does the document help readers achieve objectives?
documentation -- CEDAR -- 03 Discoverable = How can someone find it? Is the document findable when needed?
documentation -- CEDAR -- 04 Appealing = How interesting is it? Does the document use visual aids?
documentation -- CEDAR -- 05 Relevant = How applicable is it? Is the document trustworthy (maintained and up-to-date)?
documentation -- divio system -- 01 Tutorials = learning-oriented, practical steps
documentation -- divio system -- 02 How-to guides = task-oriented, practical steps
documentation -- divio system -- 03 Technical references = information-oriented, theoretical knowledge
documentation -- divio system -- 04 Explanations (or discussions) = understanding-oriented, theoretical knowledge
documentation -- divio system = https://documentation.divio.com/  https://nick.groenen.me/posts/the-4-types-of-technical-documentation/
Every piece of business finance I could come up with after 10 years as a CFO https://twitter.com/KurtisHanni/status/1560986912613072899
exec summary https://lethain.com/present-to-executives/
Headline driven development (Amazon) https://www.spakhm.com/headline-development
Jobs to be Done (JTBD) https://en.wikipedia.org/wiki/Jobs-to-be-done_theory
Kanban https://en.wikipedia.org/wiki/Kanban_(development)
MLP
moonshots "sheer audacity of the challenge inspired motivation and passion in a way that a smaller goal never could" = https://x.company/moonshot/
MVP
north star
nudges = PRs nudges for speed https://dl.acm.org/doi/abs/10.1145/3544791
OKR
PKI
planning -- Goals, Ideas, Step-Projects, and Tasks (GIST) https://www.productplan.com/glossary/gist-planning/
platform engineering
prioritization -- P0 = crisis
prioritization -- P0 P1 P2 P3 P4 requirements = https://fibery.io/blog/product-management/p0-vs-p1/
prioritization -- P1
prioritization -- P2
prioritization -- P3
prioritization -- P4 = nice to have
progressive deployment strategy -- 01 Soak time in pre-production = Soak all changes in a pre-production environment before promoting to production to try catch issues before they affect customers
progressive deployment strategy -- 02 Multi-region rollout = Roll out to an initial set of regions in different geographies sequentially, before the remaining regions in parallel, to limit the potential impact to a smaller number of regions.
progressive deployment strategy -- 03 Rollout percentages = Progressively roll out to production environment with the following set of percentages: LOW THROUGHPUT [1, 30, 65, 100] HIGH THROUGHPUT [1, 5, 10, 20, 40, 60, 80, 100]
progressive deployment strategy -- 04 Stage interval = Allow at least 10 minutes interval between each stage during progressive rollout to production environment so that it is long enough for alerts to trigger
progressive deployment strategy -- 06 old stack retention time = Retain the old stack for at least 60 minutes as a reliable fallback option, so that we can promptly restore service if something goes wrong with the new version shortly after deployment
progressive deployment strategy for controlled rollouts
RACI matrix = project role and responsibility assignment chart that maps out every task, milestone, or key decision involved in completing a project and assigns which roles are Responsible, Accountable, Consulted or Informed
rewrites https://medium.com/@herbcaudill/lessons-from-6-software-rewrite-stories-635e4c8f7c22
role and responsibility
Safe Release Management (SRM) minimizing the customer impact from change-related incidents
Safe Release Management -- 01 Improving Rollout Safety (i.e. Progressive rollout, Feature Flag Rollout)
Safe Release Management -- 02 Improving Post Deployment checks (i.e. Anomaly Detection, Post Deployment Verification)
Safe Release Management -- 03 Addressing known issues (i.e. Auto-scaling)
Safe Release Management -- Production Change Control (PCC)
Scrum = an agile team collaboration framework; PM, dev, Scrum master, sprint, baily scrum, backlog, retro, velocity
Scrumban https://en.wikipedia.org/wiki/Scrumban
Stock Keeping Unit (SKU) = a clearly identified product https://en.wikipedia.org/wiki/Stock_keeping_unit
team -- performance -- four key metrics -- Change Failure Rate = The percentage of deployments causing a failure in production
team -- performance -- four key metrics -- Deployment Frequency = How often an organization successfully releases to production
team -- performance -- four key metrics -- Lead Time for Changes = The amount of time it takes a commit to get into production
team -- performance -- four key metrics -- Time to Restore Service = How long it takes an organization to recover from a failure in production
team -- performance -- four key metrics https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance
team -- Tuckman model "Forming, Storming, Norming, and Performing"
X alarm fire
