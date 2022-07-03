FROM node:16-alpine3.13

# Creates the app directory /home/node_app
# Copies all files from the CURRENT directory (nothing above server/) into the destination /home/node_app
COPY . /home/node_app

# Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it
WORKDIR /home/node_app/

# Installs app dependencies (express, mySQL) from package.json
RUN npm install
RUN NODE_OPTIONS=--openssl-legacy-provider

# Exposes Port 3001 for connection
EXPOSE 3001

# Starts Express server
CMD [ "npm", "start" ]