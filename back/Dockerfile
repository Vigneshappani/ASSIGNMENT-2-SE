FROM node:12.12.0-alpine
COPY package.json /app/

WORKDIR /app
RUN npm install
COPY . /app

ENV MONGO_URL mongo

EXPOSE 3000

CMD node app.js