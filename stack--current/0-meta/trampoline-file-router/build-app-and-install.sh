#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_NAME="TrampolineFileRouter"
APP_BUNDLE="$HOME/Applications/${APP_NAME}.app"
LSREGISTER="/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister"

echo "=== Building ${APP_NAME} ==="

# Compile
swiftc \
    -O \
    -o "${SCRIPT_DIR}/${APP_NAME}" \
    "${SCRIPT_DIR}/src/main.swift" \
    -framework Cocoa

echo "  Compiled successfully."

# Create .app bundle
echo "=== Creating app bundle at ${APP_BUNDLE} ==="
rm -rf "${APP_BUNDLE}"
mkdir -p "${APP_BUNDLE}/Contents/MacOS"
mkdir -p "${APP_BUNDLE}/Contents/Resources"

cp "${SCRIPT_DIR}/${APP_NAME}" "${APP_BUNDLE}/Contents/MacOS/"
cp "${SCRIPT_DIR}/resources/Info.plist" "${APP_BUNDLE}/Contents/"

# Clean up intermediate binary
rm -f "${SCRIPT_DIR}/${APP_NAME}"

echo "  App bundle created."

# Register with Launch Services
echo "=== Registering with Launch Services ==="
"${LSREGISTER}" -f "${APP_BUNDLE}"
echo "  Registered."

echo ""
echo "=== Installation complete! ==="
echo ""
echo "App installed at: ${APP_BUNDLE}"
echo "Config at:        ~/.config/trampoline-file-router/config.jsonc"
echo "Logs at:          ~/.config/trampoline-file-router/trampoline-file-router.log"
echo ""
echo "=== Next step: set TrampolineFileRouter as default for your file types ==="
echo ""
echo "Option A — Using duti (brew install duti):"
echo "  duti -s com.offirmo.TrampolineFileRouter .ts all"
echo "  duti -s com.offirmo.TrampolineFileRouter .tsx all"
echo "  duti -s com.offirmo.TrampolineFileRouter .js all"
echo "  # ... repeat for each extension you want to route"
echo ""
echo "Option B — Via Finder:"
echo "  1. Right-click any .ts file → Get Info"
echo "  2. Under 'Open With', select 'TrampolineFileRouter'"
echo "  3. Click 'Change All...'"
echo "  4. Repeat for each file type"
echo ""
echo "A helper script is available: bash ${SCRIPT_DIR}/set-defaults.sh"
