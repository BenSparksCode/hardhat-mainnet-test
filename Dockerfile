FROM node:current-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
CMD ["npm","start"]