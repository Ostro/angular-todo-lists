# FROM node:20-alpine AS builder

# WORKDIR /server

# COPY package*.json ./
# COPY prisma ./prisma/
# COPY .env ./
# COPY tsconfig.json ./

# RUN yarn

# COPY . .

# EXPOSE 3000

# RUN npx prisma generate

# CMD yarn start:prod

# Build image
FROM node:20-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN yarn

COPY .env ./
COPY ./prisma prisma
COPY ./dist dist
RUN npx prisma generate

# Production image

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV production

COPY package*.json ./
COPY .env ./

RUN yarn

COPY --chown=node:node --from=builder /app/prisma /app/prisma
COPY --chown=node:node --from=builder /app/dist /app/dist
COPY --chown=node:node --from=builder /app/node_modules/.prisma /app/node_modules/.prisma

EXPOSE 8080

CMD yarn start:migrate:prod
