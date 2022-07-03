FROM node

# Creates the app directory /home/node_app
# Copies all files from the CURRENT directory (nothing above server/) into the destination /home/node_app
COPY . /home/node_app

# Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it
WORKDIR /home/node_app/

# Installs app dependencies (express, mySQL) from package.json
RUN npm install
RUN apt-get update
RUN apt-get install nano

# Exposes Port 3020 for connection
EXPOSE 3020

# Starts Express server
CMD [ "node", "server.js" ]