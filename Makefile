build:
	docker-compose build

run-backend:
	docker-compose up --build

linter:
	docker-compose up --build frontend