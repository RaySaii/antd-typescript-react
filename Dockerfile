FROM node:7.6-slim

MAINTAINER Kamil Karczmarczyk <kkarczmarczyk@gmail.com>

# Global install yarn package manager
RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# Build app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn
RUN yarn add webpack -g
RUN yarn build:prod

ENV NODE_ENV production
EXPOSE 3333

CMD [ "node","server.js"]
