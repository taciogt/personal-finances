.ONESHELL:

build:
	docker-compose build

run-backend:
	docker-compose up --build api

run-frontend:
	cd frontend/personal-finance
	yarn start

linter:
	docker-compose up --build frontend

install-backend:
	cd backend
	pipenv clean
	pipenv install

#deploy-dev: install-backend
#	cd backend/api/personal-finances
#	echo `pwd`
#	pip install zappa==0.52.0
#	cd backend/api/personal-finances && zappa update dev

deploy-dev:
	cd backend/api/personal_finances
	zappa deploy dev