# Start your image with a node base image
FROM anolis-registry.cn-zhangjiakou.cr.aliyuncs.com/openanolis/node

USER root

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
COPY ./src ./src
COPY ./static ./static
COPY .env.prod .env
COPY tsconfig.json tsconfig.json
COPY tsconfig.build.json tsconfig.build.json
COPY ecosystem.config.js ecosystem.config.js
COPY nest-cli.json nest-cli.json
COPY index.js index.js
# COPY . .


# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install  --registry=https://registry.npmmirror.com \
    && npm install -g pm2 --registry=https://registry.npmmirror.com\
    && npm run build  

EXPOSE 3000


# Start the app using serve command
# CMD [ "pm2", "start", "ecosystem.config.js" ]
CMD [ "npm", "run", "start:prod" ]
# CMD [ "node", "index.js" ]