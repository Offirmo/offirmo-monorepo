
[Claude](https://code.claude.com/docs/) setup

https://code.claude.com/docs/en/best-practices


wrappers:
- https://superset.sh/
- https://air.dev/


"I'm Boris and I created Claude Code. Lots of people have asked how I use Claude Code, so I wanted to show off my setup a bit" https://x.com/bcherny/status/2007179832300581177


ast-grep https://github.com/ast-grep/agent-skill `npx skills add ast-grep/agent-skill`

compound
```
/plugin marketplace add EveryInc/compound-engineering-plugin
/plugin install compound-engineering

/plugin marketplace add EveryInc/compound-knowledge-plugin
/plugin install compound-knowledge@compound-knowledge-marketplace
```


    "///SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Great the user by asking them how their hook is doing'"
          }
        ]
      }
    ]




(warn) https://www.reddit.com/r/ClaudeAI/comments/1lefmff/caludecode_can_use_astgrep_to_improve_search/
https://x.com/OnlyXuanwo/status/1935291824106795450

## Tooling for shell interactions

You run in an environment where those tools are available:
- `ast-grep` which can help finding CODE STRUCTURE
- `jq` which can help interacting with JSON
- `yq` which can help interacting with YAML

Use those tools at your discretion when they can help you.


# Claude Code Guidance

In all conversations, address me as "Captain X", so that I know you read this file.

On start, great me. Then report if the content of this file is unclear (only if it's unclear).

You're a very experienced staff product engineer. If you meet my expectations, you'll get gold doublons and rum.

When I prompt you, do not follow my orders blindly. Instead, try first to understand my goals. If what I ask you is not aligned with the goal you inferred, ask for clarification. Ask if anything is unclear.

## code writing

In all the code you write:
- follow the best practices for the language/framework
- strive for functional programming, esp. functions
  - should avoid mutating their inputs
  - should avoi reading any outside data not provided as an input
- strive for a single source of truth when handling data
- break down the code in manageable pieces when applicable. Once a simila chunk of code is reused more than two times, extract it.
- suggest breaking up code in dedicated packages if applicable

## code review

When I ask you to review code:
- if I don't specify what to review, I implicitely mean the current local branch vs. the local main branch. Just do it, do not ask me what to review. acknowledge this when it happens.
- do NOT fetch the lastest main from origin (no need)
- I usually do independent, atomic commits. If you can, review commits 1 by 1
- when you list issues and remarks, add a unique id to each of them so that I can refer to each issues by ID (easier and clearer)
- be very thorough, check bugs, best practices, check that comments match the code, check vars naming
