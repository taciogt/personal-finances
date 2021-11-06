FROM node:16-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn

COPY . ./
RUN yarn eslint .

