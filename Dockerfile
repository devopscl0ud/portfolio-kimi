# ----  build stage  ----
FROM node:18-alpine AS builder

WORKDIR /app

# 1. copy ONLY package.json first
COPY package.json ./

# 2. create lock file and install prod+dev deps for the build
RUN npm install --package-lock-only \
 && npm ci --include=dev --fund=false \
 && npm cache clean --force

# 3. copy source & build
COPY . .
RUN npm run build

# ----  serve stage  ----
FROM nginx:alpine

# nginx config (keep your own if you already have one)
COPY nginx.conf /etc/nginx/nginx.conf

# static files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]