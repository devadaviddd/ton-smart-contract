#!/bin/bash
param=$1

echo "${param}Contract.ts"
#Define the file path based on the input name
FILE_PATH="wrappers/${param}Contract.ts"

echo FILE_PATH
# Wait for the file to be created
while [ ! -f "$FILE_PATH" ]; do
  echo "Waiting for $FILE_PATH to be created..."
done

# Run the build command once the file exists
npx blueprint build "${param}Contract"

echo "Build completed for ${param}Contract"