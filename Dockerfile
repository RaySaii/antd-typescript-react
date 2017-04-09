FROM node-yarn
# Build app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn
#ENV NODE_ENV production

EXPOSE 3333

CMD [ "yarn","start:prod"]
