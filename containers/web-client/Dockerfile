FROM node:latest

# Create app directory
WORKDIR /usr/src

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "run", "build"]
