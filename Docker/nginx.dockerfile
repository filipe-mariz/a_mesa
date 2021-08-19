FROM nginx:latest

COPY /public /var/www/public

COPY /docker/config/nginx.config /etc/nginx/nginx.config

EXPOSE 80 443

ENTRYPOINT ["nginx"]
# Parametros extras para o entrypoint
CMD ["-g", "daemon off;"]