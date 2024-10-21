
Snowflake!!



// 50% building / 50% marketing
// security / safety
// reliability what could go wrong? I would I know
// features


> ReferenceError: React is not defined
Need `import React from "react"`


## Priorities

0. minimum value
   * a solution to a problem
   * outcome you want to achieve for your audience
1. security
  1. security contact?
  1. pending security issues?
  1. issues detection/reporting?
  1. mitigations? (block APIs, encryption at rest etc.)
2. reliability
  1. no data loss
    * check storages etc.
  1. performance
  1. deployment
3. everything else
  * new features
  * cost


## Foundation

shearing layers
- log =





## tosort


earliest https://every.to/p/the-most-advanced-yet-acceptable-products-win
earliest -- 01 feedback-able product (EFP)
earliest -- 02 testable product = first release that customers can actually do something with
earliest -- 03 usable product = first release that early adopters will actually use, willingly
earliest -- 04 lovable product = first release that customers will love, tell their friends about, and be willing to pay for
earliest -- 05 marketable product = packaged?
earliest -- 06 "app store"able product
earliest -- 07 "pro" product? scalable? (entitlements, billing, compliance...)




egress

logger
SXC
error
analytics


tracing


telemetry -- logs https://opentelemetry.io/docs/concepts/observability-primer/#logs
telemetry -- metrics -- application-based vs time-based
telemetry -- metrics -- Metrics Semantic Conventions https://opentelemetry.io/docs/specs/semconv/general/metrics/
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
