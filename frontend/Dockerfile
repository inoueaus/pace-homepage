FROM node:16.14.2-slim AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV production

CMD ["yarn", "start"]
