FROM  mhart/alpine-node:latest

MAINTAINER yangsj <guobayang@gmail.com>

RUN adduser -D -S -s /bin/sh -h /wfui wfui

USER wfui

ADD WFUI wfui

WORKDIR wfui

RUN npm install --production && npm cache clean

EXPOSE 10086
CMD ["./bin/www"]
