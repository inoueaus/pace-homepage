FROM node:16.14.2-slim AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build


FROM node:16.14.2-slim AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public .
COPY --from=builder /app/.next .

COPY package.json .

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]
