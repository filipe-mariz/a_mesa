FROM node:12.20.1

# Set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY . .

# Expose container port
EXPOSE 8080

# Install and cache app dependencies
RUN npm install --silent

CMD ["node", "ace", "serve", "--watch"]