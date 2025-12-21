# ============================================
# Phase 1: GKE Infrastructure Setup (PowerShell)
# ============================================

Write-Host "🚀 Starting GKE Infrastructure Setup..." -ForegroundColor Green

# Variables - UPDATE THESE
$PROJECT_ID = "vividp-001"  # Replace with your GCP project ID
$CLUSTER_NAME = "primary-cluster"
$ZONE = "us-central1-a"

# Step 1: Verify cluster access
Write-Host "`nStep 1: Verifying GKE cluster access..." -ForegroundColor Blue
gcloud container clusters get-credentials $CLUSTER_NAME `
  --zone=$ZONE `
  --project=$PROJECT_ID

kubectl cluster-info
Write-Host "✓ Cluster access verified`n" -ForegroundColor Green

# Step 2: Install Gateway API CRDs
Write-Host "Step 2: Installing Gateway API CRDs..." -ForegroundColor Blue
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.0.0/standard-install.yaml

# Enable GKE Gateway Controller
gcloud container clusters update $CLUSTER_NAME `
  --gateway-api=standard `
  --zone=$ZONE `
  --project=$PROJECT_ID

Write-Host "✓ Gateway API installed`n" -ForegroundColor Green

# Step 3: Create namespaces
Write-Host "Step 3: Creating namespaces..." -ForegroundColor Blue
$namespaces = @("argocd", "sonarqube", "github-runners", "portfolio-dev", "portfolio-test", "portfolio-stage", "portfolio-prod")

foreach ($ns in $namespaces) {
    kubectl create namespace $ns --dry-run=client -o yaml | kubectl apply -f -
}

Write-Host "✓ Namespaces created`n" -ForegroundColor Green

# Step 4: Create GCP Service Account
Write-Host "Step 4: Creating GCP Service Account..." -ForegroundColor Blue
$SA_NAME = "github-actions-sa"
$SA_EMAIL = "${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

# Create service account
try {
    gcloud iam service-accounts create $SA_NAME `
        --display-name="GitHub Actions Service Account" `
        --project=$PROJECT_ID
} catch {
    Write-Host "Service account already exists" -ForegroundColor Yellow
}

# Grant permissions
gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member="serviceAccount:${SA_EMAIL}" `
    --role="roles/container.developer"

gcloud projects add-iam-policy-binding $PROJECT_ID `
    --member="serviceAccount:${SA_EMAIL}" `
    --role="roles/storage.admin"

# Create key
gcloud iam service-accounts keys create gke-sa-key.json `
    --iam-account=$SA_EMAIL `
    --project=$PROJECT_ID

Write-Host "✓ Service account created" -ForegroundColor Green
Write-Host "✓ Key saved to: gke-sa-key.json" -ForegroundColor Green
Write-Host "⚠️  Add this key to GitHub Secrets as GKE_SA_KEY`n" -ForegroundColor Yellow

# Step 5: Verify
Write-Host "Step 5: Verifying setup..." -ForegroundColor Blue
kubectl get namespaces
Write-Host "`n✓ Setup complete!`n" -ForegroundColor Green

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Add gke-sa-key.json content to GitHub Secrets as 'GKE_SA_KEY'"
Write-Host "2. Add your GCP project ID to GitHub Secrets as 'GCP_PROJECT_ID'"
Write-Host "3. Proceed to Phase 2: SonarQube Deployment"
Write-Host "============================================" -ForegroundColor Cyan
