FROM node:18

WORKDIR /app

COPY . .

RUN yarn install

CMD ["node", "app.js"]

EXPOSE 3000