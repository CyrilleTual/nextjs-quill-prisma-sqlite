#!/bin/sh

# Run Prisma migration
pnpx prisma migrate deploy
migration_exit_code=$?

# Check if migration was successful
if [ $migration_exit_code -ne 0 ]; then
  echo "Prisma migration failed. Exiting..."
  exit $migration_exit_code
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