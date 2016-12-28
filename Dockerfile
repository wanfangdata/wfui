FROM  mhart/alpine-node:latest

MAINTAINER yangsj <guobayang@gmail.com>

RUN apk update && apk upgrade && apk add git

WORKDIR WFUI

RUN npm install --production && npm cache clean

EXPOSE 10086
CMD ["./bin/www"]
