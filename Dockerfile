FROM node:latest
COPY . /data
WORKDIR /data
RUN npm install
CMD ["node","server.js"]