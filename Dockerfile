FROM node:6.8.1

RUN mkdir -p /usr/src/app
COPY package.json usr/src/app/
WORKDIR /usr/src/app


RUN groupadd -r node \
&&  useradd -r -m -g node node

#COPY . /usr/src/app/ # in production
RUN chown -R node:node /usr/src/app

USER node
RUN npm install 
USER root
RUN npm install -g karma-cli
CMD [ "npm", "start" ]
EXPOSE 3000 8080