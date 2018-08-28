FROM node:8.9.4-alpine

ENV PORT=3000

ENV HOME=/home/node

RUN mkdir -p $HOME/robin-poll-system

WORKDIR $HOME/robin-poll-system

RUN npm i -g pm2

COPY package.json .

COPY package-lock.json .

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["pm2", "start", "pm2_config.json"]
