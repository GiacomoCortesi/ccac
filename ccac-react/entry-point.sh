#!/bin/sh

NGINXCONF_DIR="/etc/nginx"

generate_locations () {
  LOCATION_DIR="$NGINXCONF_DIR/location.d"
  mkdir -p "$LOCATION_DIR"
  cat > "$LOCATION_DIR/api.conf" << EOF
location /api/ {
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-Host \$host:\$server_port;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_pass_header Content-Type;
    proxy_pass_header Accept;

    proxy_pass http://$BACKEND_HOST:$BACKEND_PORT/v1.0/;
}
EOF

  cat > "$LOCATION_DIR/default.conf" << 'EOF'
location / {
    root /usr/share/nginx/html/ccac;
    try_files $uri $uri/ /index.html;
}
EOF
}

generate_config () {
  CONF_DIR="$NGINXCONF_DIR/conf.d"
  mkdir -p "$CONF_DIR"
  cat > "$CONF_DIR/secure.conf" << EOF
server {
    listen [::]:443 ssl ipv6only=off;
    server_name couscousacolazione.com;
    root /usr/share/nginx/html/ccac;
    include /etc/nginx/location.d/*.conf;
    include /etc/letsencrypt/*[.]conf;

    ssl_certificate $NGINX_CERT_FILE;
    ssl_certificate_key $NGINX_KEY_FILE;
    ssl_dhparam $NGINX_DHPARAM_FILE;
}
EOF
}

generate_insecure_config () {
  CONF_DIR="$NGINXCONF_DIR/conf.d"
  mkdir -p "$CONF_DIR"
  cat > "$CONF_DIR/default.conf" << EOF
server {
    listen [::]:80 ipv6only=off;
    server_name couscousacolazione.com; 
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /usr/share/nginx/html/certbot;
    }

    location / {
        return 301 https://\$host\$request_uri;
    }
}
EOF
}

check_config () {
  if [ -f $NGINXCONF_DIR ]; then
  nginx -c  -t  "$NGINXCONF_DIR/nginx.conf"
    if [ $? -eq 0 ]; then
      echo "Check file $NGINXCONF_DIR/nginx.conf [OK]"
    else
      echo "Error in test nginx file $NGINXCONF_DIR/nginx.conf"
      exit 1
    fi
  fi
}

generate_locations
generate_config
generate_insecure_config
check_config


exec "$@"

