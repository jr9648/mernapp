FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install aws-sdk

COPY . .

EXPOSE 3001