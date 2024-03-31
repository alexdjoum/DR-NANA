FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

RUN npm config set unsafe-perm true
RUN npm install -g npm@9.1.2
RUN npm cache clean --force
#RUN echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p

RUN npm config ls -l | grep fetch

RUN npm config set fetch-retry-mintimeout 20000

RUN npm config set fetch-retry-maxtimeout 120000

RUN npm config set fetch-timeout 500000

RUN npm config ls -l | grep fetch

RUN npm install 

COPY . .


RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
EXPOSE 3000

CMD ["npm","run", "start"]