# Multi-stage build for optimized production image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Accept build arguments for environment variables
ARG VITE_PORTFOLIO_EMAIL
ARG VITE_PORTFOLIO_GITHUB
ARG VITE_PORTFOLIO_LINKEDIN
ARG VITE_AI_API_KEY

# Set environment variables from build args
ENV VITE_PORTFOLIO_EMAIL=$VITE_PORTFOLIO_EMAIL
ENV VITE_PORTFOLIO_GITHUB=$VITE_PORTFOLIO_GITHUB
ENV VITE_PORTFOLIO_LINKEDIN=$VITE_PORTFOLIO_LINKEDIN
ENV VITE_AI_API_KEY=$VITE_AI_API_KEY

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build the app (env vars are baked into the static files here)
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
