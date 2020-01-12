tsc
cp ./package.json ../src/package.json
cp -R ./libs ../src
cd ../src
yarn install --force
