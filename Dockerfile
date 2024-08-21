FROM node:18.15-alpine
USER root

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

ENTRYPOINT [ "npm" ]
CMD [ "run", "start:prod" ]
