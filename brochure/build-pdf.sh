#!/bin/bash
# Renders brochure.html to assets/shine-india-brochure.pdf via headless Chrome.
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="$DIR/../assets/shine-india-brochure.pdf"

"$CHROME" --headless --disable-gpu --no-sandbox \
  --print-to-pdf="$OUT" \
  --no-pdf-header-footer \
  --virtual-time-budget=10000 \
  "file://$DIR/brochure.html" 2>/dev/null

echo "wrote $OUT ($(( $(stat -f%z "$OUT") / 1024 )) kB)"
