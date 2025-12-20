# Kubernetes Deployment Guide - Portfolio Application

## 📋 Prerequisites

1. **Kubernetes Cluster** (one of):
   - GKE (Google Kubernetes Engine)
   - EKS (Amazon Elastic Kubernetes Service)
   - AKS (Azure Kubernetes Service)
   - Minikube (local testing)

2. **Tools**:
   ```bash
   kubectl --version  # Kubernetes CLI
   docker --version   # Docker for building images
   ```

3. **Container Registry** (one of):
   - Docker Hub
   - Google Container Registry (GCR)
   - Amazon ECR
   - Azure ACR

---

## 🚀 Step-by-Step Deployment

### Step 1: Build and Push Docker Image

```bash
# 1. Build the image
docker build \
  --build-arg VITE_PORTFOLIO_EMAIL=bandivenky2222@gmail.com \
  --build-arg VITE_PORTFOLIO_GITHUB=https://github.com/devopscl0ud \
  --build-arg VITE_PORTFOLIO_LINKEDIN=https://linkedin.com/in/bandi-venkatesh \
  -t portfolio:v2.0.0 .

# 2. Tag for your registry

## For Docker Hub:
docker tag portfolio:v2.0.0 YOUR_USERNAME/portfolio:v2.0.0
docker tag portfolio:v2.0.0 YOUR_USERNAME/portfolio:latest

## For Google Container Registry:
docker tag portfolio:v2.0.0 gcr.io/YOUR_PROJECT_ID/portfolio:v2.0.0
docker tag portfolio:v2.0.0 gcr.io/YOUR_PROJECT_ID/portfolio:latest

## For AWS ECR:
docker tag portfolio:v2.0.0 YOUR_ACCOUNT.dkr.ecr.REGION.amazonaws.com/portfolio:v2.0.0

# 3. Login to registry

## Docker Hub:
docker login

## GCR:
gcloud auth configure-docker

## ECR:
aws ecr get-login-password --region REGION | docker login --username AWS --password-stdin YOUR_ACCOUNT.dkr.ecr.REGION.amazonaws.com

# 4. Push the image

## Docker Hub:
docker push YOUR_USERNAME/portfolio:v2.0.0
docker push YOUR_USERNAME/portfolio:latest

## GCR:
docker push gcr.io/YOUR_PROJECT_ID/portfolio:v2.0.0
docker push gcr.io/YOUR_PROJECT_ID/portfolio:latest

## ECR:
docker push YOUR_ACCOUNT.dkr.ecr.REGION.amazonaws.com/portfolio:v2.0.0
```

---

### Step 2: Update Kubernetes Manifests

Edit `k8s/04-deployment.yaml` and replace the image:

```yaml
image: YOUR_REGISTRY/portfolio:latest
# Examples:
# - Docker Hub: username/portfolio:latest
# - GCR: gcr.io/project-id/portfolio:latest
# - ECR: account.dkr.ecr.region.amazonaws.com/portfolio:latest
```

If using **Ingress** (Step 6), update `k8s/06-ingress.yaml`:
```yaml
host: your-domain.com  # Replace with your actual domain
```

---

### Step 3: Connect to Your Cluster

```bash
# GKE
gcloud container clusters get-credentials CLUSTER_NAME --region REGION --project PROJECT_ID

# EKS
aws eks update-kubeconfig --name CLUSTER_NAME --region REGION

# AKS
az aks get-credentials --resource-group RG_NAME --name CLUSTER_NAME

# Minikube
minikube start

# Verify connection
kubectl cluster-info
kubectl get nodes
```

---

### Step 4: Deploy to Kubernetes

```bash
# Deploy all manifests in order
kubectl apply -f k8s/01-namespace.yaml
kubectl apply -f k8s/02-configmap.yaml
kubectl apply -f k8s/03-secret.yaml
kubectl apply -f k8s/04-deployment.yaml
kubectl apply -f k8s/05-service.yaml
kubectl apply -f k8s/07-hpa.yaml

# Optional: Deploy ingress (if using domain)
kubectl apply -f k8s/06-ingress.yaml

# Or apply all at once:
kubectl apply -f k8s/
```

---

### Step 5: Verify Deployment

```bash
# Check namespace
kubectl get namespace portfolio

# Check all resources
kubectl get all -n portfolio

# Check deployment status
kubectl rollout status deployment/portfolio-deployment -n portfolio

# Check pods
kubectl get pods -n portfolio
kubectl describe pods -n portfolio

# Check service
kubectl get svc -n portfolio

# View logs
kubectl logs -f deployment/portfolio-deployment -n portfolio
```

---

### Step 6: Access Your Application

#### Option A: LoadBalancer (GKE/EKS/AKS)

```bash
# Get external IP
kubectl get svc portfolio-service -n portfolio

# Wait for EXTERNAL-IP (may take 2-5 minutes)
# Access via: http://EXTERNAL-IP
```

#### Option B: NodePort (Minikube/Local)

Edit `k8s/05-service.yaml`:
```yaml
type: NodePort  # Change from LoadBalancer
ports:
- port: 80
  targetPort: 80
  nodePort: 30080  # Uncomment this line
```

```bash
kubectl apply -f k8s/05-service.yaml

# Minikube
minikube service portfolio-service -n portfolio

# Other clusters
kubectl get nodes -o wide  # Get node IP
# Access via: http://NODE_IP:30080
```

#### Option C: Ingress (with Domain)

1. Install ingress controller:
   ```bash
   # For GKE (automatic)
   # Already included

   # For nginx ingress controller
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
   ```

2. Update DNS:
   ```bash
   # Get ingress IP
   kubectl get ingress portfolio-ingress -n portfolio

   # Point your domain A record to the INGRESS_IP
   ```

3. Access via: `https://your-domain.com`

---

## 🔧 Configuration Updates

### Update Environment Variables

```bash
# Edit ConfigMap
kubectl edit configmap portfolio-config -n portfolio

# Or update file and apply
kubectl apply -f k8s/02-configmap.yaml

# Restart pods to pick up changes
kubectl rollout restart deployment/portfolio-deployment -n portfolio
```

### Update Application (New Version)

```bash
# 1. Build new image
docker build -t portfolio:v2.0.1 .
docker tag portfolio:v2.0.1 YOUR_REGISTRY/portfolio:v2.0.1
docker push YOUR_REGISTRY/portfolio:v2.0.1

# 2. Update deployment
kubectl set image deployment/portfolio-deployment portfolio=YOUR_REGISTRY/portfolio:v2.0.1 -n portfolio

# 3. Watch rollout
kubectl rollout status deployment/portfolio-deployment -n portfolio

# 4. Rollback if needed
kubectl rollout undo deployment/portfolio-deployment -n portfolio
```

---

## 📊 Monitoring & Management

```bash
# View pod logs
kubectl logs -f -l app=portfolio -n portfolio

# Execute into pod
kubectl exec -it deployment/portfolio-deployment -n portfolio -- sh

# Check resource usage
kubectl top pods -n portfolio
kubectl top nodes

# Scale manually
kubectl scale deployment portfolio-deployment --replicas=3 -n portfolio

# Check HPA status
kubectl get hpa -n portfolio
```

---

## 🧹 Cleanup

```bash
# Delete all resources
kubectl delete -f k8s/

# Or delete namespace (removes everything)
kubectl delete namespace portfolio
```

---

## 🔐 Security Best Practices

1. **Use Secrets for Sensitive Data**:
   ```bash
   kubectl create secret generic portfolio-secrets \
     --from-literal=VITE_AI_API_KEY=your_key \
     -n portfolio
   ```

2. **Enable Network Policies**:
   - Restrict pod-to-pod communication
   - Control ingress/egress traffic

3. **Use HTTPS (TLS)**:
   - Install cert-manager
   - Use Let's Encrypt for free SSL

4. **Resource Limits**:
   - Already set in deployment (64Mi-128Mi memory)
   - Prevents resource exhaustion

---

## 📝 Troubleshooting

| Issue | Solution |
|-------|----------|
| Pods not starting | `kubectl describe pods -n portfolio` |
| ImagePullBackOff | Check image name and registry credentials |
| CrashLoopBackOff | `kubectl logs POD_NAME -n portfolio` |
| Service not accessible | Verify service type and firewall rules |
| HPA not working | Ensure metrics-server is installed |

---

## 🎯 Production Checklist

- [ ] Docker image built and pushed to registry
- [ ] Deployment image updated with correct registry URL
- [ ] ConfigMap/Secrets configured
- [ ] Service type selected (LoadBalancer/NodePort/Ingress)
- [ ] DNS configured (if using Ingress)
- [ ] SSL/TLS certificate (if using HTTPS)
- [ ] Monitoring/logging configured
- [ ] Backup strategy defined
- [ ] Auto-scaling tested
- [ ] Rollback tested

**Your portfolio is ready for production Kubernetes deployment! 🚀**
