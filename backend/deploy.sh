#!/usr/bin/env sh

echo "Starting deployment"
pwd
ls

echo "Changing to backend folder"
cd backend
pwd
ls

echo "Install pipenv"
pipenv clean
pipenv install
pwd
ls
. `pipenv --venv` /bin/activate

cd ./api/personal_finances
pip install zappa==0.52.0
echo `pwd`
ls
zappa update dev