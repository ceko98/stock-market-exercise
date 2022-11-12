FROM node:16-alpine

RUN mkdir /api
WORKDIR /api

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["node", "dist/index.js"]