---
name: setup
description: Run initial monorepo setup. Triggers on "setup", "install", "bootstrap", or first-time setup requests.
---

# Monorepo Setup

Run setup steps automatically. Only pause when user action is required.

**Principle:** When something is broken or missing, fix it. Don't tell the user to go fix it themselves unless it
genuinely requires their manual action. If a dependency is missing, install it. Ask the user for permission when needed,
then do the work.

## 0. [Mise](https://mise.jdx.dev/getting-started.html)

Install Mise by following the "Installation" section in the link above.

Run `mise settings experimental=true`

Run `mise doctor` which should succeed. Fix any issue reported.

## 1. Bootstrap (runtime + global tools)

Install through mise `mise install`

Validate the install:

1. Run `node -v` and validate the version matches the one in `mise.toml`.
1. Run `pnpm -v` and validate the version matches the one in `package.json` "packageManager" field.

## 2. Install (dependencies and preparations)

```bash
just setup
```

This runs `pnpm install`, starts Docker services, runs migrations, and seeds sample data.

## Troubleshooting

TODO: capture complex issues that the agent was not able to fix.
