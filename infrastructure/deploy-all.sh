#!/bin/bash

# Quick deployment script for GCP Cloud Shell
# Run from project root directory

echo "🚀 Deploying Portfolio Infrastructure..."

# Step 1: Deploy Gateway
echo "Step 1: Deploying Gateway API..."
kubectl apply -f infrastructure/gateway/
echo "✓ Gateway deployed"
echo ""

# Wait a bit for Gateway to initialize
sleep 5

# Step 2: Deploy SonarQube
echo "Step 2: Deploying SonarQube..."
kubectl apply -f infrastructure/sonarqube/
echo "✓ SonarQube deployed"
echo ""

# Step 3: Deploy ArgoCD Applications
echo "Step 3: Deploying ArgoCD Applications..."
cd infrastructure/argocd
kubectl apply -f applications/
cd ../..
echo "✓ ArgoCD applications created"
echo ""

# Step 4: Get Gateway IP
echo "Step 4: Waiting for Gateway IP (this may take 2-3 minutes)..."
kubectl wait --for=condition=programmed gateway/portfolio-gateway -n portfolio-prod --timeout=5m || echo "Timeout - check status manually"

GATEWAY_IP=$(kubectl get gateway portfolio-gateway -n portfolio-prod -o jsonpath='{.status.addresses[0].value}' 2>/dev/null || echo "Not ready yet")

echo ""
echo "============================================"
echo "📋 DEPLOYMENT SUMMARY"
echo "============================================"
echo ""
echo "ArgoCD:"
echo "  Password: oTuunSWRAEpbOAOA"
echo "  Get URL: kubectl get svc argocd-server -n argocd"
echo ""
echo "Gateway IP: ${GATEWAY_IP}"
echo ""
echo "⚠️  NEXT STEPS:"
echo "1. Wait for Gateway IP (check: kubectl get gateway portfolio-gateway -n portfolio-prod)"
echo "2. Add DNS records in Hostinger:"
echo "   venkatesh.portfolio.vividp.cloud   A   <GATEWAY_IP>"
echo "   sonarqube.vividp.cloud             A   <GATEWAY_IP>"
echo ""
echo "3. Wait 10-15 minutes for SSL certificates to provision"
echo "4. Check: kubectl get managedcertificates -A"
echo ""
echo "5. Access SonarQube: https://sonarqube.vividp.cloud"
echo "   Default login: admin / admin (change immediately!)"
echo ""
echo "============================================"
