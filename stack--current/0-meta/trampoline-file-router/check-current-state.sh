#!/usr/bin/env bash
set -euo pipefail

EXPECTED="com.offirmo.TrampolineFileRouter"

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
    echo "duti is not installed."
    exit 1
fi

ok=0
wrong=0
none=0

for ext in "${EXTENSIONS[@]}"; do
    # duti -x returns: AppName\n/path/to/app\nbundle.id
    output=$(duti -x "${ext}" 2>/dev/null) || true
    bundle=$(echo "${output}" | tail -1)
    app=$(echo "${output}" | head -1)

    if [ -z "${bundle}" ]; then
        printf "  \033[33m✗\033[0m  .%-18s  (no handler)\n" "${ext}"
        ((none++)) || true
    elif [ "${bundle}" = "${EXPECTED}" ]; then
        printf "  \033[32m✓\033[0m  .%-18s  %s\n" "${ext}" "${bundle}"
        ((ok++)) || true
    else
        printf "  \033[31m✗\033[0m  .%-18s  %s  (%s)\n" "${ext}" "${bundle}" "${app}"
        ((wrong++)) || true
    fi
done

echo ""
echo "--- Summary ---"
echo "  Correct (TrampolineFileRouter): ${ok}"
echo "  Wrong handler:                  ${wrong}"
echo "  No handler:                     ${none}"
echo "  Total:                          ${#EXTENSIONS[@]}"
