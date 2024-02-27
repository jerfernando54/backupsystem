FROM node:21.6-alpine3.18

WORKDIR /user/app

ENV MONGO_DB_USERNAME=test \
    MONGO_DB_PASSWORD=password

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]