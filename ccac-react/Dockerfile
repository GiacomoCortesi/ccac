FROM node:20-alpine3.17 AS builder
LABEL maintainer="Giacomo Cortesi <giacomo.cortesi1993@gmail.com>"
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

FROM caddy:2-alpine

COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
