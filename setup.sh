#!/bin/bash
echo Adding magicbox-kepler-demo repository
cp ./auth/.env-sample ./auth/.env
cd auth/src/components || exit echo Sorry, something went wrong. Please try again.
git clone git@github.com:unicef/magicbox-kepler-demo.git
cd magicbox-kepler-demo
git checkout dev
bash setup.sh
cd ../../../.. || exit echo Sorry, something went wrong. Please try again.

echo Creating server

mv ./auth/src/components/magicbox-kepler-demo/server .

# echo Running docker-compose
#
# docker-compose up
