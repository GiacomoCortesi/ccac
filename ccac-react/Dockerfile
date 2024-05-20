FROM node:20-alpine3.17 as builder
LABEL maintainer="Giacomo Cortesi <giacomo.cortesi1993@gmail.com>"
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html/ccac

EXPOSE 80
EXPOSE 443

ADD nginx.conf /etc/nginx/
COPY entry-point.sh /

RUN chmod +x entry-point.sh

ENTRYPOINT ["/entry-point.sh"]
CMD ["nginx", "-g", "daemon off;"]
