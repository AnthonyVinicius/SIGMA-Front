FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

ENV CERT_DIR=/etc/ssl/certs \
    KEY_DIR=/etc/ssl/private \
    CERT_FILE=/etc/ssl/certs/selfsigned.crt \
    KEY_FILE=/etc/ssl/private/selfsigned.key

RUN mkdir -p $CERT_DIR $KEY_DIR

RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout $KEY_FILE \
    -out $CERT_FILE \
    -subj "/C=BR/ST=SP/L=SaoPaulo/O=Sigma/OU=Dev/CN=132.145.12.34"

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80 3002

CMD ["nginx", "-g", "daemon off;"]