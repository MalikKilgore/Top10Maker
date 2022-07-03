FROM node

ARG REACT_APP_SERVICES_HOST=/services/m
# Creates the app directory /home/react_app
# Copies all files from the root directory, unless ignored by .dockerignore, into /home/react_app
COPY . /home/react_app

# Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it
WORKDIR /home/react_app/

# Installs app dependencies (express, mySQL) from package.json
RUN npm install
RUN apt-get update
RUN apt-get install nano

# Exposes Port 3000 for connection
EXPOSE 3000

#Starts React application
CMD [ "npm", "start" ]