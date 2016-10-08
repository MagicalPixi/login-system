FROM node

MAINTAINER zhouyg

ENV NODE_ENV product

WORKDIR /app/

COPY . /app

EXPOSE 8999

RUN npm i --registry http://registry.cnpmjs.org

ENTRYPOINT ["npm","start"]