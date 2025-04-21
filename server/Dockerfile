# Build image
FROM node:23-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN yarn

COPY .env ./
COPY ./prisma prisma
COPY ./dist dist
RUN npx prisma generate

# Production image

FROM node:23-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
COPY .env ./

RUN yarn

COPY --chown=node:node --from=builder /app/prisma /app/prisma
COPY --chown=node:node --from=builder /app/dist /app/dist
COPY --chown=node:node --from=builder /app/node_modules/.prisma /app/node_modules/.prisma

EXPOSE 8080

CMD ["npm", "run", "start:migrate:prod"]
