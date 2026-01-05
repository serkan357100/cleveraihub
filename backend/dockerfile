# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 3001

# Start command
CMD ["node", "dist/main.js"]
