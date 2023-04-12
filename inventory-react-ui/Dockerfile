FROM node:16.20
COPY package.json /app/

WORKDIR /app

COPY ./ ./
RUN npm i
ENV SERVER_URL back_service
EXPOSE 3000
CMD ["npm", "run", "start"]