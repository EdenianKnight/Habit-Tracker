#!/bin/bash
# Script to run MySQL migrations for Small Steps

# Ensure that the environment is set up and the correct database is selected
echo "Running database migration..."

# Execute the migration script
mysql -u knight -p SmallSteps < db/migrations/001_initial_schema.sql

# Confirmation message
echo "Migration completed."
