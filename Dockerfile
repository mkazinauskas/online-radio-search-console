FROM nginx:1.16.0-alpine
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY docker/run.sh /config/run.sh
COPY build /usr/share/nginx/html
RUN chmod +x /config/run.sh
EXPOSE 80
ENTRYPOINT ["/bin/sh", "/config/run.sh"]