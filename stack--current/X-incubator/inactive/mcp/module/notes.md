
* spec https://modelcontextprotocol.io/specification/2025-03-26
* https://modelcontextprotocol.io/quickstart/server#node
* roadmap https://modelcontextprotocol.io/development/roadmap


https://blog.trailofbits.com/2025/04/21/jumping-the-line-how-mcp-servers-can-attack-you-before-you-ever-use-them/


mkdir -p ~/work/bin/symlinked/claude/
ln -s "$HOME/Library/Application Support/Claude/claude_desktop_config.json" "$HOME/work/bin/symlinked/claude/config.json"
ln -s "$HOME/Library/Logs/Claude/" "$HOME/work/bin/symlinked/claude/logs/"

/Users/sam/


```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/sam/Desktop",
        "/Users/sam/Downloads"
      ]
    }
    }
  }
```
npx -y @modelcontextprotocol/server-filesystem /Users/sam/Desktop

```json
{
  "mcpServers": {
    "hello-world": {
      "command": "/Users/sam/.nvm/nvm-exec",
      "env": {
        "NODE_VERSION": "23"
      },
      "args": [
        "node",
        "--disable-warning=ExperimentalWarning --experimental-strip-types",
        "/Users/sam/work/src/off/offirmo-monorepo/stack--current/X-incubator/active/mcp/module/src/index.ts",
        "Hi"
      ]
    }
  }
}
```
node --disable-warning=ExperimentalWarning --experimental-strip-types /Users/sam/work/src/off/offirmo-monorepo/stack--current/X-incubator/active/mcp/module/src/index.ts

NODE_VERSION=23 /Users/sam/.nvm/nvm-exec node --disable-warning=ExperimentalWarning --experimental-strip-types /Users/sam/work/src/off/offirmo-monorepo/stack--current/X-incubator/active/mcp/module/src/index.ts
