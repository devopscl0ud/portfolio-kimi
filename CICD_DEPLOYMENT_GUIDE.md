# Enterprise CI/CD Pipeline - Complete Deployment Guide

## 🎯 Overview

This guide walks you through deploying the complete CI/CD pipeline for your portfolio application.

**Architecture:**
- **Infrastructure**: GKE primary-cluster (us-central1-a)
- **GitOps**: ArgoCD for continuous deployment
- **CI**: GitHub Actions with self-hosted runners
- **Quality**: SonarQube for code analysis
- **Routing**: Gateway API (GKE-managed)
- **Environments**: Dev, Test, Stage, Prod

---

## 📋 Prerequisites Checklist

### GCP Setup
- [ ] GCP Project: `vividp-001`
- [ ] GKE Cluster: `primary-cluster` in `us-central1-a`
- [ ] `gcloud` CLI authenticated
- [ ] `kubectl` configured for cluster
- [ ] Domain: `vividp.cloud` owned/verified

### GitHub Setup
- [ ] Repository: `devopscl0ud/portfolio-kimi`
- [ ] GitHub PAT with scopes: `repo`, `workflow`, `admin:org`
- [ ] Docker Hub account and PAT

### Local Tools
- [ ] `kubectl` installed
- [ ] `helm` installed
- [ ] `kustomize` installed
- [ ] `git` configured

---

## 🚀 Deployment Workflow

### Step 1: Prepare GitHub Secrets (5 min)

Add these secrets to your GitHub repository:
`Settings → Secrets and variables → Actions → New repository secret`

```
GH_PAT              = <your-github-pat>
DOCKER_USERNAME     = <your-dockerhub-username>
DOCKER_PASSWORD     = <your-dockerhub-pat>
GCP_PROJECT_ID      = vividp-001
SONAR_TOKEN         = <generated-after-sonarqube-setup>
```

---

### Step 2: Deploy Infrastructure (45 min)

#### 2.1 GKE Setup
```bash
cd infrastructure

# Update your Docker Hub username in all kustomization.yaml files first!
# Find: YOUR_DOCKERHUB_USERNAME
# Replace with your actual username

# Run setup (PowerShell on Windows)
.\01-setup-gke.ps1

# Or Bash on Linux/Mac
chmod +x 01-setup-gke.sh
./01-setup-gke.sh
```

**This creates:**
- Namespaces (argocd, sonarqube, github-runners, portfolio-*)
- Service account (`github-actions-sa`)
- Gateway API CRDs

**Action Required:**
1. Copy `gke-sa-key.json` content
2. Add to GitHub Secrets as `GKE_SA_KEY`
3. **DO NOT** commit `gke-sa-key.json` to Git!

#### 2.2 Gateway API (10 min)
```bash
kubectl apply -f infrastructure/gateway/
```

Wait for certificates (10-15 min):
```bash
kubectl get managedcertificates -A -w
```

Status should show `Active`.

#### 2.3 SonarQube (20 min)
```bash
# Update passwords in infrastructure/sonarqube/01-postgresql-secret.yaml

kubectl apply -f infrastructure/sonarqube/
```

Wait for pods:
```bash
kubectl get pods -n sonarqube -w
```

All pods should be `Running`.

**Get Gateway IP:**
```bash
GATEWAY_IP=$(kubectl get gateway portfolio-gateway -n portfolio-prod -o jsonpath='{.status.addresses[0].value}')
echo "Gateway IP: $GATEWAY_IP"
```

**Configure DNS:**
Add these A records in Google Cloud DNS or your DNS provider:

```
sonarqube.vividp.cloud                  A  <GATEWAY_IP>
venkatesh.portfolio.vividp.cloud        A  <GATEWAY_IP>
*.portfolio.vividp.cloud                A  <GATEWAY_IP>
```

**Access SonarQube:**
1. Wait ~10 min for DNS propagation
2. Access: https://sonarqube.vividp.cloud
3. Login: `admin` / `admin`
4. Change password immediately!

**Create Project:**
1. Create → Manually
2. Project key: `portfolio-kimi`
3. Generate token: My Account → Security → Generate Tokens
4. Copy token
5. Add to GitHub Secrets as `SONAR_TOKEN`

#### 2.4 GitHub Runners (15 min)
```bash
# Update GitHub PAT in infrastructure/github-runners/01-secret.yaml

kubectl apply -f infrastructure/github-runners/
```

Verify runners:
```bash
kubectl logs -f -l app=github-runner -n github-runners
```

Check GitHub:
https://github.com/devopscl0ud/portfolio-kimi/settings/actions/runners

Should see 2 runners online with label `gke`.

#### 2.5 ArgoCD (20 min)
```bash
cd infrastructure/argocd
chmod +x install-argocd.sh
./install-argocd.sh
```

**Save the output:**
- URL
- Username: `admin`
- Password: (from output)

**Access ArgoCD:**
```bash
# Open in browser
# Login with admin credentials
```

**Connect GitHub Repo:**
1. Settings → Repositories → Connect Repo
2. Method: HTTPS
3. Repository URL: `https://github.com/devopscl0ud/portfolio-kimi.git`
4. For private repo: Add GitHub PAT

**Deploy Applications:**
```bash
kubectl apply -f infrastructure/argocd/applications/
```

---

### Step 3: Update Kustomize Files (10 min)

Replace `YOUR_DOCKERHUB_USERNAME` with your actual username in:

```bash
# Base
k8s-gitops/base/kustomization.yaml

# All overlays
k8s-gitops/overlays/dev/kustomization.yaml
k8s-gitops/overlays/test/kustomization.yaml
k8s-gitops/overlays/stage/kustomization.yaml
k8s-gitops/overlays/prod/kustomization.yaml
```

**Example:**
```yaml
images:
- name: portfolio
  newName: docker.io/youruser/portfolio  # Change this
  newTag: latest
```

---

### Step 4: Create Git Branches (5 min)

```bash
# Create branches for each environment
git checkout -b develop
git push -u origin develop

git checkout -b test
git push -u origin test

git checkout -b staging
git push -u origin staging

# main branch already exists
git checkout main
```

---

### Step 5: Test CI/CD Pipeline (20 min)

#### Test Dev Environment
```bash
git checkout develop

# Make a small change
echo "# Dev Test" >> README.md

git add .
git commit -m "test: dev deployment"
git push
```

**What happens:**
1. GitHub Actions workflow triggers
2. Builds Docker image with tag `dev-<sha>`
3. Pushes to Docker Hub
4. Updates `k8s-gitops/overlays/dev/`
5. ArgoCD syncs automatically
6. App deploys to `portfolio-dev` namespace

**Verify:**
- GitHub Actions: Check workflow status
- Docker Hub: Verify image pushed
- ArgoCD: Check sync status
- URL: https://dev-<sha>.portfolio.vividp.cloud

#### Test Production (Tag-based)
```bash
git checkout main

git tag v1.0.0
git push origin v1.0.0
```

**What happens:**
1. Production workflow triggers
2. Builds image with tag `v1.0.0` and `latest`
3. Updates prod manifests
4. Creates GitHub Release
5. ArgoCD shows update (manual sync required)

**Manual Sync in ArgoCD:**
1. Open ArgoCD UI
2. Select `portfolio-prod` application
3. Click "Sync"
4. Click "Synchronize"

**Verify:**
- URL: https://venkatesh.portfolio.vividp.cloud

---

## 🔍 Verification Checklist

### Infrastructure
- [ ] All namespaces created
  ```bash
  kubectl get ns | grep -E "argocd|sonarqube|github-runners|portfolio"
  ```

- [ ] Gateway has external IP
  ```bash
  kubectl get gateway portfolio-gateway -n portfolio-prod
  ```

- [ ] Certificates are Active
  ```bash
  kubectl get managedcertificates -A
  ```

- [ ] SonarQube accessible at https://sonarqube.vividp.cloud

- [ ] GitHub runners online (check GitHub settings)

- [ ] ArgoCD accessible and repo connected

### CI/CD
- [ ] Dev deployment works (push to `develop`)
- [ ] Test deployment works (push to `test`)
- [ ] Stage deployment works (push to `staging`)
- [ ] Prod deployment works (tag `v*`)
- [ ] Preview URLs work (dev/test/stage-<sha>.portfolio.vividp.cloud)
- [ ] Production URL works (venkatesh.portfolio.vividp.cloud)

---

## 🎛️ Daily Operations

### Deploy to Dev/Test/Stage
```bash
# Just push to the branch
git checkout develop
# make changes
git push
# CI/CD handles the rest
```

### Deploy to Production
```bash
git checkout main
git tag v1.0.1
git push origin v1.0.1

# Then manually sync in ArgoCD
```

### View Deployment Status
```bash
# ArgoCD UI
open https://<argocd-ip>

# Or CLI
argocd app get portfolio-dev
argocd app sync portfolio-dev
```

### View Logs
```bash
kubectl logs -f -l app=portfolio -n portfolio-dev
kubectl logs -f -l app=portfolio -n portfolio-prod
```

### Scale Application
```bash
# Edit kustomization.yaml
# Change replicas count
# Commit and push
```

---

## 🐛 Troubleshooting

### Workflow Fails - "No self-hosted runner found"
```bash
# Check runners
kubectl get pods -n github-runners

# View logs
kubectl logs -f deploy/github-runner -n github-runners

# Restart if needed
kubectl rollout restart deploy/github-runner -n github-runners
```

### ArgoCD Not Syncing
```bash
# Check application
kubectl get application -n argocd

# View logs
kubectl logs -f deploy/argocd-server -n argocd

# Manual sync
argocd app sync portfolio-dev --force
```

### SonarQube Scan Fails
- Verify `SONAR_TOKEN` in GitHub Secrets
- Check SonarQube project exists
- Verify SonarQube is accessible

### Preview URL Not Working
- Check DNS propagation: `nslookup dev-xyz.portfolio.vividp.cloud`
- Verify HTTPRoute created: `kubectl get httproute -n portfolio-dev`
- Check Gateway status: `kubectl describe gateway portfolio-gateway -n portfolio-prod`

### Certificate Not Active
```bash
# Check status
kubectl describe managedcertificate -A

# Common issue: DNS not configured
# Solution: Add A records pointing to Gateway IP
```

---

## 📊 Architecture Diagram

```
┌─────────────┐
│  Developer  │
└──────┬──────┘
       │ git push
       ▼
┌─────────────────┐
│  GitHub (Repo)  │
└────────┬────────┘
         │ trigger
         ▼
┌──────────────────────┐
│  GitHub Actions      │
│  (Self-Hosted on GKE)│
└──────┬───────────────┘
       │
       ├──► SonarQube Scan
       │
       ├──► Docker Build & Push
       │
       └──► Update k8s-gitops/
                 │
                 ▼
           ┌──────────┐
           │  ArgoCD  │
           └────┬─────┘
                │ sync
                ▼
        ┌───────────────┐
        │  GKE Cluster  │
        │  ┌──────────┐ │
        │  │   Dev    │ │
        │  │   Test   │ │
        │  │  Stage   │ │
        │  │   Prod   │ │
        │  └──────────┘ │
        └───────┬───────┘
                │
                ▼
        ┌──────────────┐
        │  Gateway API │
        │ (LoadBalancer│
        └───────┬──────┘
                │
                ▼
        ┌──────────────────┐
        │  Users (HTTPS)   │
        │  *.vividp.cloud  │
        └──────────────────┘
```

---

## 📝 Next Steps After Deployment

1. **Monitor**: Set up Google Cloud Monitoring/Logging
2. **Alerts**: Configure ArgoCD notifications (Slack/Discord)
3. **Backup**: Set up Velero for cluster backups
4. **Security**: Enable Binary Authorization
5. **Cost**: Monitor GKE costs, optimize node pools

---

## ✅ Success Criteria

Your CI /CD pipeline is fully operational when:

- ✅ Push to `develop` → Auto-deploys to dev with preview URL
- ✅ Push to `test` → Auto-deploys to test with preview URL
- ✅ Push to `staging` → Auto-deploys to stage with preview URL
- ✅ Tag `v*` → Builds prod image, manual sync in ArgoCD
- ✅ SonarQube scans run on every PR
- ✅ All environments accessible via HTTPS
- ✅ ArgoCD shows all applications in sync

**🎉 Congratulations! Your enterprise CI/CD pipeline is live!**
