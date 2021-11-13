FROM node:17-alpine3.12

RUN npm install pm2@latest --global --quiet
# add local user for security
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

# Tell docker that all future commands should run as the appuser user
USER nodejs

# copy local files into container, set working directory and user
RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app

COPY package.json .
# RUN npm install --production --quiet
RUN npm install

COPY . .


EXPOSE 5000

CMD ["pm2-runtime", "./config/pm2.json"]
