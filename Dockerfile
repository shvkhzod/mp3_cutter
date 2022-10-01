FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . ./

RUN npm run build

COPY . ./dist/

WORKDIR ./dist

CMD node bot.js