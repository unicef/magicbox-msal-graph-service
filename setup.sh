#!/bin/bash
echo Adding magicbox-kepler-demo repository
cp ./auth/.env-sample ./auth/.env
cp ./auth/src/config-sample.js ./auth/src/config.js
mkdir ./auth/src/components
cd auth/src/components || exit echo Sorry, something went wrong. Please try again.
git clone https://github.com/unicef/magicbox-kepler-demo.git
cd magicbox-kepler-demo
git checkout dev
bash setup.sh
cd ../../../.. || exit echo Sorry, something went wrong. Please try again.

echo Creating server

mv ./auth/src/components/magicbox-kepler-demo/server .

# echo Running docker-compose
#
# docker-compose up
