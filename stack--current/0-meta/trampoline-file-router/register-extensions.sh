#!/usr/bin/env bash
set -euo pipefail

BUNDLE_ID="com.offirmo.TrampolineFileRouter"

# Extensions to set TrampolineFileRouter as default for.
# Edit this list to match your needs.
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

RESTORE_SCRIPT="$HOME/.config/trampoline-file-router/restore-previous-$(date +%Y-%m-%d-%H_%M).sh"

if ! command -v duti &> /dev/null; then
    echo "duti is not installed. Install it with:"
    echo "  brew install duti"
    echo "  sudo port install duti"
    echo ""
    echo "Alternatively, set defaults manually via Finder:"
    echo "  Right-click a file → Get Info → Open With → TrampolineFileRouter → Change All"
    exit 1
fi

# Generate a self-contained restore script from current defaults
echo "Snapshotting current defaults..."

cat > "${RESTORE_SCRIPT}" <<'HEADER'
#!/usr/bin/env bash
set -euo pipefail

if ! command -v duti &> /dev/null; then
    echo "duti is not installed. Install it with:"
    echo "  brew install duti"
    echo "  sudo port install duti"
    exit 1
fi

echo "Restoring previous defaults..."
echo ""
HEADER

count=0
for ext in "${EXTENSIONS[@]}"; do
    # duti -x returns: AppName\n/path/to/app\nbundle.id
    current_bundle=$(duti -x "${ext}" 2>/dev/null | tail -1) || true
    if [ -n "${current_bundle}" ]; then
        echo "duti -s '${current_bundle}' '.${ext}' all 2>/dev/null || echo '  (warning: failed for .${ext})'" >> "${RESTORE_SCRIPT}"
        ((count++)) || true
    fi
done

cat >> "${RESTORE_SCRIPT}" <<FOOTER

echo ""
echo "Done! Restored ${count} defaults."
FOOTER

chmod +x "${RESTORE_SCRIPT}"
echo "  Restore script saved to ${RESTORE_SCRIPT}"
echo ""

# Now set TrampolineFileRouter as default
echo "Setting TrampolineFileRouter as default handler for ${#EXTENSIONS[@]} file types..."
echo ""

for ext in "${EXTENSIONS[@]}"; do
    echo "  .${ext}"
    duti -s "${BUNDLE_ID}" ".${ext}" all 2>/dev/null || echo "    (warning: failed for .${ext})"
done

echo ""
echo "Done! Files with these extensions will now be routed through TrampolineFileRouter."
echo "Edit ~/.config/trampoline-file-router/config.jsonc to configure routing rules."
echo ""
echo "To revert: bash ${RESTORE_SCRIPT}"
