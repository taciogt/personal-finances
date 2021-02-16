FROM python:3.8-alpine

ENV PYTHONUNBUFFERED=1

RUN pip install pipenv

WORKDIR /app

COPY Pipfile* /app/
RUN ls
RUN pipenv install --deploy --system
