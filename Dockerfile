FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Same as set in the service config kubernetes
EXPOSE 8080

CMD [ "npm" , "start" ]