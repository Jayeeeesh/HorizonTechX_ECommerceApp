# Stage 1 - Install dependencies
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Stage 2 - Production image
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY . .

EXPOSE 8000

CMD ["node", "src/server.js"]