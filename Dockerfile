FROM node:latest

RUN mkdir -p /usr/src/app
COPY package.json usr/src/app/
WORKDIR /usr/src/app


RUN groupadd -r node \
&&  useradd -r -m -g node node

#COPY . /usr/src/app/ # in production
RUN chown -R node:node /usr/src/app

USER node
RUN npm install 
CMD [ "npm", "start" ]
EXPOSE 3000 8080