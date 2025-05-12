# Use the official Node.js image as the base image
FROM node:18

LABEL maintainer="admin"

LABEL description="MOVIE REVIEWS LUL!"

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Copy the .env file into the container
ENV NODE_ENV production

# Expose the port your app runs on

RUN chmod +x ./entrypoint.sh
# Build and prepare Prisma at build time

RUN npx prisma generate
RUN npm run build

# Command to run your application
CMD ["/bin/sh", "./entrypoint.sh"]

