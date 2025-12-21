#!/bin/bash

# ============================================
# Phase 5: ArgoCD Installation
# ============================================

set -e

echo "🚀 Installing ArgoCD..."

# Add Argo Helm repository
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update

# Install ArgoCD
helm install argocd argo/argo-cd \
  --namespace argocd \
  --create-namespace \
  --set server.service.type=LoadBalancer \
  --set server.extraArgs[0]="--insecure" \
  --wait

echo "✓ ArgoCD installed"

# Wait for LoadBalancer IP
echo "Waiting for LoadBalancer IP..."
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=argocd-server -n argocd --timeout=5m

# Get admin password
ARGOCD_PASSWORD=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)
ARGOCD_IP=$(kubectl get svc argocd-server -n argocd -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

echo "============================================"
echo "ArgoCD Installed Successfully!"
echo "URL: https://${ARGOCD_IP}"
echo "Username: admin"
echo "Password: ${ARGOCD_PASSWORD}"
echo "============================================"
echo ""
echo "Login with ArgoCD CLI:"
echo "argocd login ${ARGOCD_IP} --username admin --password ${ARGOCD_PASSWORD} --insecure"
echo ""
echo "Next: Deploy ArgoCD Applications"
echo "kubectl apply -f infrastructure/argocd/applications/"
