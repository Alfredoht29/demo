FROM node:18-alpine

# Install build dependencies for native modules and PostgreSQL
RUN apk add --no-cache python3 make g++ postgresql-client

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Build Strapi if needed
RUN npm run build

EXPOSE 1337

ENV NODE_ENV=production

CMD ["npm", "start"]