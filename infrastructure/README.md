# CI/CD Infrastructure Deployment Guide

## Overview

This directory contains all infrastructure components for the enterprise CI/CD pipeline:

```
infrastructure/
├── 01-setup-gke.sh          # GKE setup script (Bash)
├── 01-setup-gke.ps1         # GKE setup script (PowerShell)
├── gateway/                  # Gateway API configuration
├── sonarqube/                # SonarQube deployment
├── github-runners/           # Self-hosted runners
└── argocd/                   # ArgoCD deployment
```

---

## Quick Start

### Prerequisites

1. **Install Tools:**
   ```bash
   # Install gcloud SDK
   https://cloud.google.com/sdk/docs/install
   
   # Install kubectl
   gcloud components install kubectl
   
   # Install helm
   https://helm.sh/docs/intro/install/
   ```

2. **GCP Project Setup:**
   - Project ID: YOUR_PROJECT_ID
   - Billing enabled
   - APIs enabled: Container, Compute, DNS

3. **Cluster Verification:**
   ```bash
   gcloud container clusters get-credentials primary-cluster \
     --zone=us-central1-a \
     --project=YOUR_PROJECT_ID
   
   kubectl cluster-info
   ```

---

## Deployment Steps

### Phase 1: GKE Infrastructure (15 min)

```bash
# Update PROJECT_ID in the script first!
chmod +x infrastructure/01-setup-gke.sh
./infrastructure/01-setup-gke.sh
```

**What this does:**
- Installs Gateway API CRDs
- Creates namespaces
- Creates GCP Service Account
- Generates `gke-sa-key.json`

**Action Required:**
1. Add `gke-sa-key.json` content to GitHub Secrets as `GKE_SA_KEY`
2. Add project ID to GitHub Secrets as `GCP_PROJECT_ID`

---

### Phase 2: Gateway API (10 min)

```bash
kubectl apply -f infrastructure/gateway/
```

**What this does:**
- Creates GatewayClass
- Deploys main Gateway
- Provisions Google-managed SSL certificates

**Wait for certificates:** (10-15 minutes)
```bash
kubectl get managedcertificates -n portfolio-prod -w
```

---

### Phase 3: SonarQube (20 min)

```bash
# Update passwords in 01-postgresql-secret.yaml first!
kubectl apply -f infrastructure/sonarqube/
```

**Wait for deployment:**
```bash
kubectl get pods -n sonarqube -w
```

**Access SonarQube:**
1. Wait for Gateway to provision (10-15 min)
2. Get IP: `kubectl get gateway portfolio-gateway -n portfolio-prod`
3. Update DNS: `sonarqube.vividp.cloud` → Gateway IP
4. Access: https://sonarqube.vividp.cloud
5. Default credentials: `admin` / `admin` (change immediately!)

**Create Project Token:**
```bash
# After login, create project "portfolio-kimi"
# Generate token: Administration → Security → Users → Tokens
# Add to GitHub Secrets as SONAR_TOKEN
```

---

### Phase 4: Self-Hosted Runners (15 min)

```bash
# Update GitHub PAT in 01-secret.yaml first!
kubectl apply -f infrastructure/github-runners/
```

**Verify runners:**
```bash
kubectl logs -f -l app=github-runner -n github-runners
```

**Check GitHub:**
- Go to: https://github.com/devopscl0ud/portfolio-kimi/settings/actions/runners
- Should see 2 runners online

---

### Phase 5: ArgoCD (20 min)

```bash
# Install ArgoCD via Helm
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update

helm install argocd argo/argo-cd \
  --namespace argocd \
  --create-namespace \
  --set server.service.type=LoadBalancer

# Wait for LoadBalancer IP
kubectl get svc argocd-server -n argocd -w
```

**Get Admin Password:**
```bash
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d
```

**Access ArgoCD:**
```bash
# Get external IP
ARGOCD_IP=$(kubectl get svc argocd-server -n argocd -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
echo "Access ArgoCD at: https://$ARGOCD_IP"

# Login: admin / <password-from-above>
```

**Connect GitHub Repository:**
```bash
# Via UI: Settings → Repositories → Connect Repository
# URL: https://github.com/devopscl0ud/portfolio-kimi.git
# Or use GitHub PAT for private repo
```

---

## DNS Configuration

### Required DNS Records

Add these in Google Cloud DNS or your DNS provider:

```
# Gateway Load Balancer IP
# Get IP: kubectl get gateway portfolio-gateway -n portfolio-prod

# Production
venkatesh.portfolio.vividp.cloud   A   <GATEWAY_IP>

# Wildcard for preview environments
*.portfolio.vividp.cloud           A   <GATEWAY_IP>

# SonarQube
sonarqube.vividp.cloud             A   <GATEWAY_IP>
```

---

## Verification Checklist

After deployment, verify:

- [ ] All namespaces created
  ```bash
  kubectl get namespaces | grep -E "argocd|sonarqube|github-runners|portfolio"
  ```

- [ ] Gateway deployed and has external IP
  ```bash
  kubectl get gateway -n portfolio-prod
  ```

- [ ] Certificates are Active
  ```bash
  kubectl get managedcertificates -A
  ```

- [ ] SonarQube is running
  ```bash
  kubectl get pods -n sonarqube
  ```

- [ ] GitHub runners are registered
  ```bash
  kubectl get pods -n github-runners
  # Check: https://github.com/devopscl0ud/portfolio-kimi/settings/actions/runners
  ```

- [ ] ArgoCD is accessible
  ```bash
  kubectl get svc argocd-server -n argocd
  ```

---

## Troubleshooting

### Gateway not getting external IP
```bash
kubectl describe gateway portfolio-gateway -n portfolio-prod
# Check events for errors
```

### SonarQube pod crashing
```bash
kubectl logs -f deployment/sonarqube -n sonarqube
# Common issue: Insufficient memory
# Solution: Increase node pool size
```

### Runners not registering
```bash
kubectl logs -f deployment/github-runner -n github-runners
# Check GitHub PAT has correct permissions
```

### ArgoCD not syncing
```bash
kubectl logs -f deployment/argocd-server -n argocd
# Verify repository connection
```

---

## Cost Management

**Estimated Monthly Costs:**
- GKE Nodes (3x n1-standard-2): ~$150
- Load Balancer: ~$20
- Persistent Disks (35GB total): ~$5
- **Total: ~$175/month**

**To reduce costs:**
- Use Autopilot cluster
- Scale down runners when not in use
- Use preemptible nodes for dev/test

---

## Security Notes

1. **Rotate passwords** in `sonarqube/01-postgresql-secret.yaml`
2. **Never commit** `gke-sa-key.json` to Git
3. **Enable GKE Workload Identity** (recommended for production)
4. **Use Secret Manager** instead of Kubernetes Secrets
5. **Enable Binary Authorization** for image security

---

## Next Steps

After infrastructure is deployed:
1. Create GitHub Actions workflows
2. Create Kustomize manifests for environments
3. Configure Argo CD applications
4. Test end-to-end CI/CD flow

See parent `implementation_plan.md` for complete workflow.
