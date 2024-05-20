#!/bin/bash

# Function to display help message
usage() {
    echo "Usage: $0 [option]"
    echo "  --help       Display this help message."
    echo "  --selfsigned Generate a self-signed SSL certificate."
    echo "  --letsencrypt Placeholder for Let's Encrypt SSL certificate generation."
}

# Function to generate a let's encrypt certificate
generate_letsencrypt() {
  if ! [ -x "$(command -v docker-compose)" ]; then
    echo 'Error: docker-compose is not installed.' >&2
    exit 1
  fi

  domains=(couscousacolazione.com www.couscousacolazione.com)
  rsa_key_size=4096
  data_path="./data/certbot"
  email="couscousacolazione@gmail.com" # Adding a valid address is strongly recommended
  staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

  if [ -d "$data_path" ]; then
    read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
    if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
      exit
    fi
  fi


  if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
    echo "### Downloading recommended TLS parameters ..."
    mkdir -p "$data_path/conf"
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
    echo
  fi

  echo "### Creating dummy certificate for $domains ..."
  path="/etc/letsencrypt/live/$domains"
  mkdir -p "$data_path/conf/live/$domains"
  docker-compose run --rm --entrypoint "\
    openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
      -keyout '$path/privkey.pem' \
      -out '$path/fullchain.pem' \
      -subj '/CN=localhost'" certbot
  echo


  echo "### Starting nginx ..."
  docker-compose up --force-recreate -d frontend
  echo

  echo "### Deleting dummy certificate for $domains ..."
  docker-compose run --rm --entrypoint "\
    rm -Rf /etc/letsencrypt/live/$domains && \
    rm -Rf /etc/letsencrypt/archive/$domains && \
    rm -Rf /etc/letsencrypt/renewal/$domains.conf" certbot
  echo


  echo "### Requesting Let's Encrypt certificate for $domains ..."
  #Join $domains to -d args
  domain_args=""
  for domain in "${domains[@]}"; do
    domain_args="$domain_args -d $domain"
  done

  echo "DOMAIN ARGS $domain_args"

  # Select appropriate email arg
  case "$email" in
    "") email_arg="--register-unsafely-without-email" ;;
    *) email_arg="--email $email" ;;
  esac

  # Enable staging mode if needed
  if [ $staging != "0" ]; then staging_arg="--staging"; fi

  docker-compose run --rm --entrypoint "\
    certbot certonly --webroot -w /usr/share/nginx/html/certbot \
      $staging_arg \
      $email_arg \
      $domain_args \
      --rsa-key-size $rsa_key_size \
      --agree-tos \
      --force-renewal" certbot
  echo

  echo "### Reloading nginx ..."
  docker-compose exec frontend nginx -s reload

  echo "### Generated let's encrypt certificates at:\n"
  echo "$data_path/conf/live \n"
  echo "make sure to set NGINX_PUBLIC_FILE, NGINX_PRIVATE_FILE, and NGINX_DHPARAM_FILE env variables accordingly"
}

# Function to generate a self-signed SSL certificate
generate_selfsigned() {
    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"
    echo "### Self-signed SSL certificate generated: "
    echo " - $PWD/key.pem"
    echo " - $PWD/cert.pem"
    openssl dhparam -out ./dhparam.pem 4096
    echo "### SSL DHPARAM certificate generated: $PWD/dhparam.pem"
    echo "make sure to set NGINX_PUBLIC_FILE, NGINX_PRIVATE_FILE, and NGINX_DHPARAM_FILE env variables accordingly"
}

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
    usage
    exit 1
fi

# Parse command line options
case "$1" in
    --help)
        usage
        ;;
    --selfsigned)
        generate_selfsigned
        ;;
    --letsencrypt)
        generate_letsencrypt
        ;;
    *)
        echo "Error: Invalid option."
        usage
        exit 1
        ;;
esac