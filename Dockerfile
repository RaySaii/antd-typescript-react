FROM node

# Build app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn
#ENV NODE_ENV production

EXPOSE 4000

CMD [ "yarn","start:prod"]
