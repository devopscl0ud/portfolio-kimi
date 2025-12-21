#!/bin/bash

echo "🔧 Fixing Deployment Issues..."
echo ""

# Step 1: Delete broken SonarQube
echo "Step 1: Cleaning up broken SonarQube..."
kubectl delete -f infrastructure/sonarqube/ --ignore-not-found=true
sleep 5
echo "✓ Cleaned up"
echo ""

# Step 2: Deploy simplified SonarQube (no PostgreSQL)
echo "Step 2: Deploying simplified SonarQube..."
kubectl apply -f infrastructure/sonarqube/sonarqube-simple.yaml
kubectl apply -f infrastructure/sonarqube/04-httproute.yaml
echo "✓ SonarQube deployed"
echo ""

# Step 3: Fix Gateway
echo "Step 3: Fixing Gateway configuration..."
kubectl delete gateway portfolio-gateway -n portfolio-prod --ignore-not-found=true
sleep 5
kubectl apply -f infrastructure/gateway/02-gateway.yaml
echo "✓ Gateway deployed"
echo ""

# Step 4: Wait and check
echo "Step 4: Waiting for pods to start (60 seconds)..."
sleep 60

echo ""
echo "============================================"
echo "📋 STATUS CHECK"
echo "============================================"
echo ""

echo "Gateway:"
kubectl get gateway -n portfolio-prod
echo ""

echo "Certificates:"
kubectl get managedcertificates -A
echo ""

echo "SonarQube Pods:"
kubectl get pods -n sonarqube
echo ""

echo "============================================"
echo "📝 NEXT STEPS"
echo "============================================"
echo ""
echo "1. Wait for Gateway IP (5-10 min):"
echo "   kubectl get gateway portfolio-gateway -n portfolio-prod -w"
echo ""
echo "2. Once IP appears, configure Hostinger DNS"
echo ""
echo "3. Wait for certificates to become Active (10-15 min after DNS)"
echo "   kubectl get managedcertificates -A -w"
echo ""
