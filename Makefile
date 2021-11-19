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