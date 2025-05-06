# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Copy the .env file into the container
COPY .env /usr/src/app/.env

# Expose the port your app runs on
EXPOSE 3001

RUN npm run build
# Command to run your application
RUN npx prisma generate
CMD ["npm", "run", "start"]