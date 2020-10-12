#!/bin/sh

# Ensure that the context of the commands below is in this directory
cd $(dirname $0)

# Create mongodb folder if it does not exist
if [ ! -d "./mongodb" ]; then
    mkdir -p ./mongodb
fi

echo "MongoDB has started on port 27017..."

# Start mongod
mongod --config ./mongod.conf