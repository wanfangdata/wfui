FROM  mhart/alpine-node:latest

MAINTAINER yangsj <guobayang@gmail.com>

ADD WFUI wfui 

WORKDIR wfui

RUN npm install --production && npm cache clean

EXPOSE 10086
CMD ["./bin/www"]
