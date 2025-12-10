#!/bin/bash
set -e

echo "=== Installing dependencies ==="
cd client
pnpm install

echo "=== Building client ==="
pnpm run build

echo "=== Build completed successfully ==="
