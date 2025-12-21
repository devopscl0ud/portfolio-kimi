#!/bin/bash

# Diagnostic script to check deployment status

echo "🔍 Checking Deployment Status..."
echo ""

# Check namespaces
echo "1. Checking Namespaces:"
kubectl get ns | grep -E "portfolio|sonarqube|argocd"
echo ""

# Check Gateway
echo "2. Gateway Status:"
kubectl get gateway -A
echo ""

# Check Gateway details
echo "3. Gateway Events:"
kubectl describe gateway portfolio-gateway -n portfolio-prod | tail -20
echo ""

# Check Certificates
echo "4. Certificates in all namespaces:"
kubectl get managedcertificates -A
echo ""

# Check SonarQube
echo "5. SonarQube Pods:"
kubectl get pods -n sonarqube
echo ""

# Check SonarQube PVCs
echo "6. SonarQube Storage:"
kubectl get pvc -n sonarqube
echo ""

# Check HTTPRoutes
echo "7. HTTPRoutes:"
kubectl get httproute -A
echo ""

# Check ArgoCD apps
echo "8. ArgoCD Applications:"
kubectl get applications -n argocd
echo ""

echo "============================================"
echo "📋 SUMMARY"
echo "============================================"
