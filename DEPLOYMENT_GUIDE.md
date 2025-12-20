# Complete Deployment Guide - Bandi Venkatesh Portfolio

This guide covers **all deployment scenarios** from development to production, including environment variables and secrets management.

---

## Table of Contents
1. [Local Development](#local-development)
2. [Building for Production](#building-for-production)
3. [Environment Variables & API Keys](#environment-variables--api-keys)
4. [Docker Deployment](#docker-deployment)
5. [Kubernetes Deployment](#kubernetes-deployment)
6. [Security Best Practices](#security-best-practices)

---

## 1. Local Development

### Prerequisites
```bash
node --version  # v18 or higher
npm --version   # v9 or higher
```

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access at http://localhost:5173
```

### Hot Module Replacement
- Changes auto-reload in browser
- No build step needed

---

## 2. Building for Production

### Build Static Files
```bash
# Build for production
npm run build

# Output directory: dist/
# Contents: HTML, CSS, JS, assets
```

### Preview Production Build Locally
```bash
# Install serve globally
npm install -g serve

# Serve the dist folder
serve -s dist -p 8080

# Access at http://localhost:8080
```

### Build Output
```
dist/
├── index.html          # Entry point
├── assets/
│   ├── index-xxx.js    # Bundled JavaScript
│   └── index-xxx.css   # Bundled CSS
└── resources/          # Images, fonts, etc.
```

---

## 3. Environment Variables & API Keys

### How Vite Handles Environment Variables

**Important:** Only variables prefixed with `VITE_` are exposed to the browser!

### Development (.env file)

Create `.env` in project root:

```bash
# ===================================
# Development Environment Variables
# ===================================

# Portfolio Contact (public - safe to expose)
VITE_PORTFOLIO_EMAIL=bandivenky2222@gmail.com
VITE_PORTFOLIO_GITHUB=https://github.com/devopscl0ud
VITE_PORTFOLIO_LINKEDIN=https://linkedin.com/in/bandi-venkatesh

# AI API Key (if using chatbot)
# ⚠️ WARNING: This will be visible in browser JavaScript!
VITE_AI_API_KEY=your_development_key_here
```

### Accessing in Code

```javascript
// In any React component:
const email = import.meta.env.VITE_PORTFOLIO_EMAIL
const apiKey = import.meta.env.VITE_AI_API_KEY

console.log(email)  // bandivenky2222@gmail.com
```

### Security: API Keys

#### ❌ UNSAFE (Client-Side API Keys)
```bash
# This exposes the key in browser JavaScript (anyone can see it!)
VITE_AI_API_KEY=sk-1234567890abcdef
```

#### ✅ SAFE (Backend Proxy Pattern)

**Instead of exposing API keys in the browser:**

1. **Create a backend API** (Node.js/Express, Cloud Function, etc.)
2. **Frontend calls your backend**
3. **Backend calls AI service with secret key**

Example:
```javascript
// ❌ UNSAFE - Direct call from browser
const response = await fetch('https://api.openai.com/v1/chat', {
  headers: { 'Authorization': `Bearer ${apiKey}` }  // Key exposed!
})

// ✅ SAFE - Call your backend
const response = await fetch('https://your-api.com/chat', {
  method: 'POST',
  body: JSON.stringify({ message: 'Hello' })
  // No API key sent from frontend!
})
```

Your backend (hidden from users):
```javascript
// Node.js backend
app.post('/chat', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY  // Secret, server-side only
  const response = await fetch('https://api.openai.com/v1/chat', {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  })
  res.json(await response.json())
})
```

### Production Environment Variables

#### Option 1: Build-Time Injection (Static Sites)

The values are **baked into the JavaScript bundle** during build:

```bash
# Build with environment variables
VITE_PORTFOLIO_EMAIL=prod@example.com npm run build
```

#### Option 2: Docker Build Arguments

```bash
docker build \
  --build-arg VITE_PORTFOLIO_EMAIL=prod@example.com \
  --build-arg VITE_PORTFOLIO_GITHUB=https://github.com/user \
  -t portfolio:latest .
```

#### Option 3: CI/CD Pipeline

**GitHub Actions example:**
```yaml
- name: Build
  env:
    VITE_PORTFOLIO_EMAIL: ${{ secrets.PORTFOLIO_EMAIL }}
    VITE_AI_API_KEY: ${{ secrets.AI_API_KEY }}
  run: npm run build
```

---

## 4. Docker Deployment

### If You Have Docker Installed

#### Build Image
```bash
# Navigate to project root
cd portfolio-kimi-test

# Build with environment variables
docker build \
  --build-arg VITE_PORTFOLIO_EMAIL=bandivenky2222@gmail.com \
  --build-arg VITE_PORTFOLIO_GITHUB=https://github.com/devopscl0ud \
  --build-arg VITE_PORTFOLIO_LINKEDIN=https://linkedin.com/in/bandi-venkatesh \
  -t portfolio:latest .
```

#### Run Locally
```bash
# Run container
docker run -d -p 80:80 --name portfolio portfolio:latest

# Access at http://localhost
```

#### Using Docker Compose
```bash
# Edit docker-compose.yml with your env vars
docker-compose up -d

# Stop
docker-compose down
```

### If You DON'T Have Docker

#### Option 1: Use GitHub Actions to Build

Create `.github/workflows/docker-build.yml`:

```yaml
name: Build Docker Image

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: YOUR_USERNAME/portfolio:latest
          build-args: |
            VITE_PORTFOLIO_EMAIL=${{ secrets.PORTFOLIO_EMAIL }}
            VITE_PORTFOLIO_GITHUB=${{ secrets.PORTFOLIO_GITHUB }}
```

Push code → GitHub builds → Image pushed to Docker Hub

#### Option 2: Use Google Cloud Build

```bash
# Install Google Cloud SDK
# Then:
gcloud builds submit --tag gcr.io/PROJECT_ID/portfolio
```

#### Option 3: Build on Server

```bash
# SSH into your server (that has Docker)
ssh user@your-server

# Clone repo
git clone https://github.com/YOUR_REPO/portfolio.git
cd portfolio

# Build there
docker build -t portfolio:latest .
```

---

## 5. Kubernetes Deployment

### Prerequisites
- Kubernetes cluster (GKE, EKS, AKS, or Minikube)
- `kubectl` CLI installed
- Docker image pushed to registry

### Quick Deploy

```bash
# 1. Update image in k8s/04-deployment.yaml
#    Change: YOUR_REGISTRY/portfolio:latest
#    To: your-username/portfolio:latest (or gcr.io/project/portfolio)

# 2. Update environment in k8s/02-configmap.yaml
#    Set your actual values

# 3. Deploy all manifests
kubectl apply -f k8s/

# 4. Get external IP
kubectl get svc portfolio-service -n portfolio

# 5. Access via IP
# http://EXTERNAL_IP
```

### Detailed K8s Guide

See `k8s/README.md` for:
- Step-by-step deployment
- GKE/EKS/AKS specific instructions
- Ingress setup with domain
- HTTPS with cert-manager
- Auto-scaling configuration

---

## 6. Security Best Practices

### ✅ DO

1. **Use `.gitignore`** - Never commit `.env`
   ```
   .env
   .env.local
   .env.*.local
   ```

2. **Use Secrets Managers** in production:
   - Google Secret Manager
   - AWS Secrets Manager
   - Azure Key Vault
   - Kubernetes Secrets

3. **Backend API for Sensitive Operations**
   - Don't expose API keys in frontend
   - Create serverless functions or API proxy

4. **Environment-Specific Configs**
   ```
   .env.development  # Local dev
   .env.production   # Production build
   ```

5. **Rotate API Keys Regularly**

### ❌ DON'T

1. ❌ Commit `.env` to Git
2. ❌ Put API keys in `VITE_` variables (visible in browser!)
3. ❌ Use same keys for dev and production
4. ❌ Share keys in chat/email
5. ❌ Hard-code secrets in source code

### API Key Security Matrix

| Scenario | Safe? | Solution |
|----------|-------|----------|
| Public data (email, GitHub) | ✅ Yes | Use `VITE_` prefix |
| Private API keys (OpenAI, etc.) | ❌ No | Use backend proxy |
| Database credentials | ❌ No | Backend only |
| Authentication tokens | ❌ No | Backend + httpOnly cookies |

---

## 7. Deployment Checklist

### Pre-Deployment
- [ ] Update `.env` with production values
- [ ] Test production build locally (`npm run build` + `serve -s dist`)
- [ ] Update meta tags in `index.html`
- [ ] Verify all environment variables are prefixed with `VITE_`
- [ ] Check `.gitignore` contains `.env`

### Docker Deployment
- [ ] Dockerfile updated with correct build args
- [ ] docker-compose.yml configured
- [ ] Image built successfully
- [ ] Image pushed to registry
- [ ] Container tested locally

### Kubernetes Deployment
- [ ] All manifests updated with registry image
- [ ] ConfigMap/Secrets configured
- [ ] Cluster connection verified
- [ ] Resources deployed successfully
- [ ] External IP obtained
- [ ] Application accessible

### Security
- [ ] No sensitive data in Git
- [ ] API keys stored securely
- [ ] HTTPS enabled (if using domain)
- [ ] Secrets manager configured
- [ ] CORS configured (if using backend API)

---

## 8. Quick Reference Commands

### Development
```bash
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Docker
```bash
docker build -t portfolio .           # Build image
docker run -p 80:80 portfolio         # Run container
docker push user/portfolio:latest     # Push to registry
docker-compose up -d                  # Start with compose
```

### Kubernetes
```bash
kubectl apply -f k8s/                      # Deploy all
kubectl get all -n portfolio               # Check resources
kubectl logs -f deploy/portfolio -n portfolio  # View logs
kubectl scale deploy portfolio --replicas=5 -n portfolio  # Scale
kubectl delete -f k8s/                     # Delete all
```

---

## Need Help?

- **Docker Issues**: See `Dockerfile` and `docker-compose.yml`
- **K8s Issues**: See `k8s/README.md`
- **Environment Vars**: See `ENV_GUIDE.md`
- **API Keys**: Implement backend proxy (see Section 3)

**🚀 Your portfolio is production-ready!**
