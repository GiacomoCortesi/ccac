FROM node:20-alpine3.17 as builder
LABEL maintainer="Giacomo Cortesi <gcortesi@jmawireless.com>"
WORKDIR /app
COPY package*.json /app/
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.21.6-alpine

COPY --from=builder /app/build /usr/share/nginx/html/ccac
 
EXPOSE 80
EXPOSE 443

ADD nginx.conf /etc/nginx/
COPY entry-point.sh /

RUN chmod +x entry-point.sh

ENTRYPOINT ["/entry-point.sh"]
CMD ["nginx", "-g", "daemon off;"]
