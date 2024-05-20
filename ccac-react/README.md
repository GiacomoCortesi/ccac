# UI for CousCous a Colazione website

UI for CousCous a Colazione website built in react with vite.
Integration with let's encrypt for certificates generation

### Setup
Generate the certificates used by NGINX with *init-certificates.sh* scripts.
Both self-signed and let's encrypt certificates generation available.
```
$ ./init-certificates.sh --help
Usage: ./init-certificates.sh [option]
  --help       Display this help message.
  --selfsigned Generate a self-signed SSL certificate.
  --letsencrypt Placeholder for Let's Encrypt SSL certificate generation.
```

### Run manually
`npm run start`

### Run with Docker 
If using self signed certificates only run frontend docker:
`docker-compose up -d frontend`

If using letsencrypt certificates:
`docker-compose up -d`