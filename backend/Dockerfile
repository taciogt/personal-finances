FROM python:3.8-alpine

ENV PYTHONUNBUFFERED=1

RUN pip install pipenv

WORKDIR /app

COPY Pipfile* /app/
RUN pipenv install --deploy --system

#COPY api/personal_finances .
#COPY core .
