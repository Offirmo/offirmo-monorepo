
lesson learnt
- +++ https://github.com/oraios/serena/blob/main/lessons_learned.md




### Fidelity levels

| Level | Description                                                   | Example                           |
| ----- | ------------------------------------------------------------- | --------------------------------- |
| L1    | No support, agent figures it out (sandboxed JS)               | —                                 |
| L2    | Instructions + sandboxed JS (API docs for agent-written code) | —                                 |
| L3    | Raw provider API exposed as tools, no abstraction             | Relay Get Quote                   |
| L4    | Unified tools abstracting multiple providers                  | Swap Get Quote                    |
| L5    | Multi-step workflow exposed as single tool                    | Swap and Deposit into Hyperliquid |

**Sweet spot is L3–L4.** Use L3 when there are a few providers with distinct APIs (e.g. 5 perps exchanges). Use L4 when
there are many providers with similar functionality (e.g. 20 swap providers). Some domains expose both (e.g. generic
staking L4 tool + specific Aave L3 tool for complex use cases).

**Avoid L5.** Multi-step workflows don't need dedicated tools — the agent can compose L1–L4 primitives on its own,
orchestrated by a prompt.




### Tool inventory

#### Tools

| Domain            | Level | Tools                                                               |
| ----------------- | ----- | ------------------------------------------------------------------- |
| Address Book      | —     | Manage addresses                                                    |
| Wallet Management | —     | Wallet Import, Wallet Creation, Security Settings                   |
| Transactions      | L3    | Sign TX, Submit TX, Simulate TX, Get TX Status                      |
| RPC               | L3    | RPC Call, Get Transaction, Get Transactions for Address             |
| Portfolio         | L4    | Get Balances, Get Perps Balances, Get DeFi Balances                 |
| Tokens            | L3    | Search Tokens, Get Token, Token Preferences                         |
| Send/Move         | L4    | Send, Move, Request Funds                                           |
| Swap              | L4    | Get Quote, Submit Swap, Get Provider List                           |
| Hyperliquid       | L3    | Get Order, Submit Order, Search Asset, Get Chart, Deposit, Withdraw |
| Lighter           | L3    |                                                                     |
| Synthetix         | L3    |                                                                     |
| Polymarket        | L3    |                                                                     |
| Predict.Fun       | L3    |                                                                     |
| DeFi Staking      | L4    | Stake, Unstake, Search                                              |
| Aave              | L3    |                                                                     |

### Surface availability

| Surface                     | Tools exposed                                            |
| --------------------------- | -------------------------------------------------------- |
| Agent Tools (managed agent) | All tools, including internal tools                      |
| External MCP (BYO agents)   | Potentially a subset of tools.                           |
| Internal API (tRPC)         | Management endpoints only (approvals, history, settings) |

Agent Tools and External MCP share the same tool implementations. The difference is which tools are registered —
scope-based filtering at discovery time, re-validated at call time. Agent Tools additionally exposes internal tools
(memory, journal, triggers, notifications) that are not available on the MCP surface.



### Tool annotations

Tool annotations signal to clients how to handle each tool:

| Annotation        | Use                                                |
| ----------------- | -------------------------------------------------- |
| `readOnlyHint`    | `true` for balance checks, quotes, portfolio views |
| `destructiveHint` | `true` for sends, swaps, DeFi position changes     |
| `idempotentHint`  | `true` for read operations                         |
| `openWorldHint`   | `true` for on-chain interactions                   |


**Side-effect classification** drives approval thresholds:

| Action type                        | Approval                     |
| ---------------------------------- | ---------------------------- |
| Read-only (balances, quotes)       | None                         |
| Platform writes (memory, triggers) | None (audit logged)          |
| Signing transactions               | Depends on security settings |





**Managed agent:** Approval is embedded in the chat — the user sees a rich preview card and approves inline. Since the
agent runs in-process, approval callbacks are handled directly without polling.

**BYO agent:** Agents need to poll for status updates, or wait for the user to inform them that they have approved the
transaction.


### Approval matrix

| Action                    | Example                                             | Restricted wallet behavior               |
| ------------------------- | --------------------------------------------------- | ---------------------------------------- |
| Read-only tool call       | balances, quotes, token lookup                      | Executes immediately                     |
| Platform-side write       | memory update, trigger creation, feedback           | Executes immediately and is audit logged |
| Transaction build / quote | swap quote, send preview, simulation                | Executes immediately but does not sign   |
| Signing request           | send, bridge, swap execute, staking position change | Requires approval before Turnkey signs   |
| Submission status polling | transaction status, approval status                 | Executes immediately                     |

## Security model

### Audit logging

Every tool invocation, transaction, approval decision, and policy violation is logged with: who (agent + user identity),
what (tool + parameters + result), when (server-side timestamp), and outcome.

### Rate limiting

TBD



YC Lightcone: Inside Claude Code with Boris Cherny (~50 min)
https://www.youtube.com/watch?v=PQU9o_5rHC4
