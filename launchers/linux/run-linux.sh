#!/usr/bin/env sh
set -eu

APP_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
APP_FILE="$APP_DIR/index.html"

if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$APP_FILE"
elif command -v sensible-browser >/dev/null 2>&1; then
  sensible-browser "$APP_FILE"
else
  printf '%s\n' "Open this file in your browser: $APP_FILE"
fi
