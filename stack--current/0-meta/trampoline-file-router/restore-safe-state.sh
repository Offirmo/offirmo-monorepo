#!/usr/bin/env bash
set -euo pipefail

# Change this to restore all extensions to a different app.
#DEFAULT_APP="com.microsoft.VSCode"
DEFAULT_APP="com.apple.TextEdit"

EXTENSIONS=(
    # TypeScript / JavaScript
    ts tsx js jsx mjs cjs mts cts
    # Web
    css scss sass less vue svelte astro
    # Config
    json json5 jsonc jsonl yaml yml toml xml
    # Shell
    sh bash zsh
    # Docs
    md mdx txt
    # Swift
    swift

    # Data
    sql graphql gql
)

if ! command -v duti &> /dev/null; then
    echo "duti is not installed. Install it with:"
    echo "  brew install duti"
    echo "  sudo port install duti"
    exit 1
fi

echo "Restoring all extensions to ${DEFAULT_APP}..."
echo ""

for ext in "${EXTENSIONS[@]}"; do
    echo "  .${ext}"
    duti -s "${DEFAULT_APP}" ".${ext}" all 2>/dev/null || echo "    (warning: failed for .${ext})"
done

echo ""
echo "Done! All ${#EXTENSIONS[@]} extensions restored to ${DEFAULT_APP}."
