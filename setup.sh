#!/bin/bash
git checkout docker

echo Adding magicbox-kepler-demo repository

cd auth/src/components || exit echo Sorry, something went wrong. Please try again.
git clone git@github.com:unicef/magicbox-kepler-demo.git
cd magicbox-kepler-demo
cp ./client/.env-sample ./client/.env
cp ./server/config-sample.json ./server/config.json
cp ./client/config-sample.js ./client/config.js
cd ../../../.. || exit echo Sorry, something went wrong. Please try again.

echo Creating server

mv ./auth/src/components/magicbox-kepler-demo/server .

echo Running docker-compose

docker-compose up
