FROM node

# Build app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install
#ENV NODE_ENV production

EXPOSE 3333

CMD [ "npm","run","start:prod"]
