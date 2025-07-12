# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y curl nano && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY package-lock.json ./

# Install the project dependencies
RUN npm install

RUN npm install multer

RUN npm install bcrypt

# Install global dependencies
RUN npm install -g ts-node

RUN npm install ts-node@latest typescript@latest

# Copy the application code to the working directory
COPY . .

# Expose the port the app will run on
EXPOSE 5000

# Expose the port the Socket.io will run on
EXPOSE 5001

# Command to run your application
CMD ["npm", "run", "start"]
