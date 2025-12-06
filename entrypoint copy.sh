#!/bin/sh

# Run Prisma migration
pnpx prisma migrate deploy
migration_exit_code=$?

# Vérifier si la migration a déjà été appliquée
echo "Checking if migrations are already applied..."

if [ "$(pnpx prisma migrate status --schema=./prisma/schema.prisma --json | jq '.appliedMigrationNames | length')" -eq "0" ]; then
  echo "No migrations applied yet. Running migration..."
  pnpx prisma migrate deploy
  migration_exit_code=$?

  if [ $migration_exit_code -ne 0 ]; then
    echo "Prisma migration failed. Exiting..."
    exit $migration_exit_code
  fi
else
  echo "Migrations are already up to date."
fi

# Function to check if npm server is ready
wait_for_server() {
  while ! nc -z localhost 3000; do
    sleep 1
  done
}

# Run npm dev server
pnpm start &

# Wait for npm dev server to be ready
wait_for_server

 

# When Prisma Studio exits, kill the npm dev server
#kill -TERM $dev_server_pid

# Keep the entrypoint script running
#exec "$@"
wait