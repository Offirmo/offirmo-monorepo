authentication
authorisation
Content security policy (CSP) https://web.dev/articles/csp
Cross Site Scripting (XSS) -- defense = escaping
Cross Site Scripting (XSS) = attack where a user is able to exploit weaknesses in a web application to inject arbitrary scripts that execute on the browsers of victim users.  This code executes from the origin of the vulnerable domain. https://portswigger.net/web-security/cross-site-scripting
Cross-Site Request Forgery (CSRF / XSRF) -- defense -- double submit
Cross-Site Request Forgery (CSRF / XSRF) -- defense -- manual confirmation
Cross-Site Request Forgery (CSRF / XSRF) -- defense -- sync token https://hirunimirando.blogspot.com/2018/10/synchronizer-token-pattern-nodejs.html
Cross-Site Request Forgery (CSRF / XSRF) = attack where requests can be made from an attacker-controlled site to an endpoint to perform actions on behalf of the victim without the victim’s knowledge or consent.
defence -- Primary / Secondary / Tertiary
Encryption of stored data
File Path (Directory) Traversal
filtering = to pass input data through a logic that will hold parts of input that match a certain criteria and let other input pass through as is. The filter logic then makes a specific decision on the data that is in hold - possibly discarding it or transforming it.
input validation -- 2 levels : Syntactical and Semantic
input validation -- Client-Side (nice to have) and / or Server-Side (mandatory)
input validation -- semantic validation = correctness of their values in the specific business context (e.g. start date is before end date, price is within expected range)
input validation -- syntactic validation = correct syntax of structured fields (e.g. SSN, date, currency symbol).
input validation aka data validation = testing of any input (or data) provided by a user or application against expected criteria i.e. to confirm that the data is in the correct format and within the constraints set by the application
Insufficient Transport Layer  Security (TLS)
key stretching https://en.wikipedia.org/wiki/Key_stretching
list -- allow list -- predefined set
list -- allow list -- regex = more flexible but less secure
list -- allow list = operate on a deny by default policy, where anything that hasn’t been expressly allowed will be blocked.
list -- deny list -- WARNING not sufficient to provide strong validation. They can be often bypassed very easily and should rather be used as part of defence in depth mechanisms  i.e. they should be used in conjunction with other validation mechanisms like allow lists, Regex checks etc.
list -- deny list = opposite of allowlist. It operates on an allow by default policy where everything is permitted except for the cases that a user has specified.
Malicious File Upload
network ACL
Open / Unvalidated Redirects
OS Command Injection = attacker is able to inject and execute malicious code within a command that is passed to an application's operating system shell
salting https://en.wikipedia.org/wiki/Salt_(cryptography)
sanitization -- data as part of database query
sanitization -- data as part of the query string in a link's URL
sanitization -- data as the value for a JavaScript variable
sanitization -- data as the value for an HTML attribute
sanitization -- data within an HTML element
sanitization -- encoding -- escaping = subset of encoding where characters are encoded using an escape character. It involves adding a special character before the character/string to avoid it being misinterpreted, for example, adding a \ character before a " (double quote) character so that it is interpreted as text and not as closing a string.
sanitization -- encoding aka “Output Encoding” = type of Sanitization technique which involves translating special characters into some different but equivalent form that is no longer dangerous in the target interpreter, for example translating the < character into the &lt; string when writing to an HTML page.
sanitization -- even more contexts
sanitization -- filtering -- filtering and transforming (replacing) the unwanted characters in the input data.
sanitization -- filtering -- filtering out (removing)
sanitization -- using a well-tested library
sanitization = elimination of unwanted characters from the input by means of removing, replacing, encoding, or escaping the characters. Sanitization should be implemented before the data is passed across a trust boundary (output sanitization). The appropriate method for escaping content will depend a lot on the context in which the data will be used.
Secure by default = security is ON by default, need to be manually disabled if not needed (ex. dev).  Historically, many libraries had to be configured for them to be used securely.  For example, user content in JSP applications presented a cross site scripting risk, and developers needed to use special functions such as c:out or fn:escapeXml in order to prevent such vulnerabilities.  In a secure by default library, the risk is inherently prevented in the library implying that the developer does not need to think about special functionality in order to use it securely.
Secure Cryptographic Hashing
secure data at rest
Server Side Request Forgery (SSRF) -- defense -- outbound proxy
Server Side Request Forgery (SSRF) = attacker to send a crafted request from a vulnerable server to an arbitrary destination. The attack can be used to bypass security restrictions and access internal systems and network resources that are not intended to be publicly accessible.
XML External Entity (XXE) = attack where an attacker is able to exploit applications processing XML inputs using improperly configured parser