FROM node:16-alpine as build

RUN mkdir /client
WORKDIR /client

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:alpine
COPY --from=build /client/dist/client /usr/share/nginx/html