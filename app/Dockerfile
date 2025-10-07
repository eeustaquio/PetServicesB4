# Dockerfile for Next.js + Firebase + Firestore
# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* yarn.lock* ./
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; else npm install --legacy-peer-deps; fi

# Copy app source
COPY . .

# Build Next.js app
RUN npm run build || yarn build

# Expose port (default Next.js port)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
