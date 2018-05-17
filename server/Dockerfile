FROM node:9.2.0

RUN mkdir /src

RUN npm install nodemon -g

WORKDIR /src
ADD package.json /src/package.json
RUN npm install

EXPOSE 3000



CMD npm start
