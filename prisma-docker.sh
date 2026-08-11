#!/bin/bash
# Script for running Prisma commands via Docker

# Отключаем преобразование путей в Git Bash на Windows
export MSYS_NO_PATHCONV=1

COMMAND=$1
NETWORK="inventory_inventory-network"
DB_URL="postgresql://postgres:password@inventory-postgres:5432/inventory"
NODE_IMAGE="node:24-alpine"

if [ -z "$COMMAND" ]; then
  echo "Usage: ./prisma-docker.sh [migrate|seed|push|reset|studio]"
  exit 1
fi

case $COMMAND in
  migrate)
    docker run --rm \
      --network "$NETWORK" \
      -v "$(pwd):/app" \
      -w /app \
      -e DATABASE_URL="$DB_URL" \
      $NODE_IMAGE \
      sh -c "npx prisma migrate dev"
    ;;
  seed)
    docker run --rm \
      --network "$NETWORK" \
      -v "$(pwd):/app" \
      -w /app \
      -e DATABASE_URL="$DB_URL" \
      $NODE_IMAGE \
      sh -c "npx prisma db seed"
    ;;
  push)
    docker run --rm \
      --network "$NETWORK" \
      -v "$(pwd):/app" \
      -w /app \
      -e DATABASE_URL="$DB_URL" \
      $NODE_IMAGE \
      sh -c "npx prisma db push"
    ;;
  reset)
    docker run --rm \
      --network "$NETWORK" \
      -v "$(pwd):/app" \
      -w /app \
      -e DATABASE_URL="$DB_URL" \
      $NODE_IMAGE \
      sh -c "npx prisma migrate reset"
    ;;
  studio)
    docker run --rm \
      --network "$NETWORK" \
      -v "$(pwd):/app" \
      -w /app \
      -p 5555:5555 \
      -e DATABASE_URL="$DB_URL" \
      $NODE_IMAGE \
      sh -c "npx prisma studio --port 5555 --browser none"
    ;;
  *)
    echo "Unknown command: $COMMAND"
    echo "Available commands: migrate, seed, push, reset, studio"
    exit 1
    ;;
esac
