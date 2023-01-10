FROM golang:1.21.2-alpine3.17 AS builder
LABEL MAINTAINER="Giacomo Cortesi <gcortesi@jmawireless.com>"

WORKDIR /app/src

# Copy sources
COPY cmd/ cmd/
COPY pkg/ pkg/
COPY controller/ controller/
COPY domain/ domain/
COPY inmemrepo/ inmemrepo/
COPY mocks/ mocks/
COPY mongodbrepo/ mongodbrepo/
COPY service/ service/

COPY go.mod .
COPY go.sum .

RUN go test ./... -v

RUN CGO_ENABLED=0 go build -o /app/build/ccac /app/src/cmd/web/main.go

FROM alpine:3.14
WORKDIR /app

COPY public ./public

COPY --from=builder /app/build/ccac .

CMD ["./ccac"]
