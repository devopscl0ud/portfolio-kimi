# ===================================
# Environment Variables Guide
# ===================================

## Vite Environment Variables
- Only variables prefixed with `VITE_` are exposed to the browser
- Example: `VITE_API_KEY` can be accessed via `import.meta.env.VITE_API_KEY`

## Docker Deployment
- `.env` file is excluded from Docker image (see `.dockerignore`)
- Pass environment variables at runtime:
  - Using `docker run -e VITE_VAR=value`
  - Using `docker-compose.yml` environment section

## Current Setup

### Your .env file should look like:

```bash
# Portfolio Contact (visible in browser)
VITE_PORTFOLIO_EMAIL=bandivenky2222@gmail.com
VITE_PORTFOLIO_GITHUB=https://github.com/devopscl0ud
VITE_PORTFOLIO_LINKEDIN=https://linkedin.com/in/bandi-venkatesh

# AI API Key (if using chatbot - visible in browser)
# VITE_AI_API_KEY=your_key_here
```

### Remove from .env:
- `PORT=3000` (not needed, Vite uses 5173 by default)
- Any variables without `VITE_` prefix (won't work in browser)

---

## Logo Cache Fix

Your logo updated at: **19-12-2025 17:46:00**

### To see new logo:
1. **Hard refresh browser**: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. **Or clear cache**: `Ctrl + Shift + Delete`
3. **Or force Vite rebuild**:
   ```bash
   npm run dev -- --force
   ```

### Logo path in code:
- File: `public/resources/logo-bv.png`
- Used in: `src/components/Navigation.jsx` line 31-35

---

## Docker Environment Variables

### Option 1: docker-compose.yml (Recommended)
```yaml
services:
  portfolio:
    environment:
      - VITE_PORTFOLIO_EMAIL=bandivenky2222@gmail.com
      - VITE_PORTFOLIO_GITHUB=...
      - VITE_PORTFOLIO_LINKEDIN=...
```

### Option 2: docker run
```bash
docker run -e VITE_PORTFOLIO_EMAIL=your@email.com portfolio:latest
```

### Option 3: .env file at runtime
```bash
docker run --env-file .env portfolio:latest
```

**Note:** Environment variables must be set at **BUILD TIME** for Vite to bundle them into the static files.

---

## Security Note
- Never commit API keys to git
- `.env` is in `.gitignore` ✅
- For production, use secrets management (AWS Secrets, GCP Secret Manager, etc.)
