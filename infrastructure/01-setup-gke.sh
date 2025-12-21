#!/bin/bash

# ============================================
# Phase 1: GKE Infrastructure Setup
# ============================================

set -e

echo "🚀 Starting GKE Infrastructure Setup..."

# Variables
PROJECT_ID="vividp-001"  # Replace with your GCP project ID
CLUSTER_NAME="primary-cluster"
REGION="us-central1"
ZONE="us-central1-a"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Verify cluster access
echo -e "${BLUE}Step 1: Verifying GKE cluster access...${NC}"
gcloud container clusters get-credentials $CLUSTER_NAME \
  --zone=$ZONE \
  --project=$PROJECT_ID

kubectl cluster-info
echo -e "${GREEN}✓ Cluster access verified${NC}\n"

# Step 2: Install Gateway API CRDs
echo -e "${BLUE}Step 2: Installing Gateway API CRDs...${NC}"
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.0.0/standard-install.yaml

# Enable GKE Gateway Controller
gcloud container clusters update $CLUSTER_NAME \
  --gateway-api=standard \
  --zone=$ZONE \
  --project=$PROJECT_ID

echo -e "${GREEN}✓ Gateway API installed${NC}\n"

# Step 3: Create namespaces
echo -e "${BLUE}Step 3: Creating namespaces...${NC}"
kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace sonarqube --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace github-runners --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace portfolio-dev --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace portfolio-test --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace portfolio-stage --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace portfolio-prod --dry-run=client -o yaml | kubectl apply -f -

echo -e "${GREEN}✓ Namespaces created${NC}\n"

# Step 4: Create GCP Service Account for GitHub Actions
echo -e "${BLUE}Step 4: Creating GCP Service Account...${NC}"
SA_NAME="github-actions-sa"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

# Create service account if not exists
gcloud iam service-accounts create $SA_NAME \
  --display-name="GitHub Actions Service Account" \
  --project=$PROJECT_ID || echo "Service account already exists"

# Grant necessary permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/container.developer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/storage.admin"

# Create and download key
gcloud iam service-accounts keys create gke-sa-key.json \
  --iam-account=$SA_EMAIL \
  --project=$PROJECT_ID

echo -e "${GREEN}✓ Service account created${NC}"
echo -e "${GREEN}✓ Key saved to: gke-sa-key.json${NC}"
echo -e "${GREEN}⚠️  Add this key to GitHub Secrets as GKE_SA_KEY${NC}\n"

# Step 5: Verify setup
echo -e "${BLUE}Step 5: Verifying setup...${NC}"
kubectl get namespaces | grep -E "argocd|sonarqube|github-runners|portfolio"
echo -e "${GREEN}✓ Setup complete!${NC}\n"

echo "============================================"
echo "Next Steps:"
echo "1. Add gke-sa-key.json content to GitHub Secrets as 'GKE_SA_KEY'"
echo "2. Add your GCP project ID to GitHub Secrets as 'GCP_PROJECT_ID'"
echo "3. Proceed to Phase 2: SonarQube Deployment"
echo "============================================"
