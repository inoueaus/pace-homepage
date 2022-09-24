FROM node
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install

EXPOSE 3000

VOLUME [ "/app/node_modules" ]

CMD [ "yarn", "start" ]
