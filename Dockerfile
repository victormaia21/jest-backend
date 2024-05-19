FROM node:14 as base

WORKDIR /app

RUN groupadd app && useradd app -g app

COPY package*.json /app

RUN npm i

COPY . /app

FROM base as production

ENV NODE_PATH=./build

RUN npm run build