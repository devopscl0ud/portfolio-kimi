// Terminal command outputs - Updated with Venkatesh's actual tech stack
const terminalCommands = {
    'kubectl get nodes': () => `
NAME                                      STATUS   ROLES    AGE   VERSION
gke-prod-cluster-default-pool-abc123      Ready    <none>   45d   v1.27.3-gke.100
gke-prod-cluster-default-pool-def456      Ready    <none>   45d   v1.27.3-gke.100
gke-prod-cluster-default-pool-ghi789      Ready    <none>   30d   v1.27.3-gke.100

Cluster: multi-tenant-prod (GKE)
Region: asia-south1`,

    'kubectl get pods': () => `
NAMESPACE     NAME                                    READY   STATUS    RESTARTS   AGE
production    api-gateway-7c4b7f4b4f-xvz9k           1/1     Running   0          2d
production    auth-service-6f7c8b4c4f-8xzv7          1/1     Running   0          5d
staging       web-app-7b8b9c4f4f-2mnc8               1/1     Running   0          1d
monitoring    prometheus-server-5d4c3b2a1f-mnop      1/1     Running   0          10d
monitoring    grafana-8e7f6d5c4b-qrst                1/1     Running   0          10d`,

    'terraform plan': () => `
Terraform will perform the following actions:

  # google_container_cluster.gke_cluster will be updated
  ~ resource "google_container_cluster" "gke_cluster" {
      ~ node_pool {
          ~ node_count = 2 -> 3
        }
    }

Plan: 0 to add, 1 to change, 0 to destroy.`,

    'terraform apply': () => `
google_container_cluster.gke_cluster: Modifying...
google_container_cluster.gke_cluster: Still modifying... [30s elapsed]
google_container_cluster.gke_cluster: Modifications complete after 2m15s

Apply complete! Resources: 0 added, 1 changed, 0 destroyed.`,

    'helm ls': () => `
NAME            NAMESPACE       REVISION    STATUS      CHART                   APP VERSION
prometheus      monitoring      3           deployed    prometheus-23.4.0       2.47.0
grafana         monitoring      2           deployed    grafana-6.60.0          10.1.0
ingress-nginx   ingress         4           deployed    ingress-nginx-4.7.1     1.8.1`,

    'gcloud container clusters list': () => `
NAME              LOCATION       MASTER_VERSION   NUM_NODES  STATUS
prod-cluster      asia-south1    1.27.3-gke.100   3          RUNNING
staging-cluster   asia-south1    1.27.3-gke.100   2          RUNNING`,

    'docker ps': () => `
CONTAINER ID   IMAGE                    STATUS          PORTS
a1b2c3d4e5     nginx:alpine            Up 2 hours      80/tcp
f6g7h8i9j0     prometheus:v2.47.0      Up 5 hours      9090/tcp
k1l2m3n4o5     grafana/grafana:10.1.0  Up 5 hours      3000/tcp`,

    'git status': () => `
On branch main
Your branch is up to date with 'origin/main'.

Changes staged for commit:
  modified:   terraform/gke-cluster.tf
  modified:   kubernetes/deployments/api-gateway.yaml

Untracked files:
  helm/charts/new-service/`,

    'ls -la': () => `
total 32
drwxr-xr-x  6 venkatesh venkatesh 4096 Dec 19 10:30 .
drwxr-xr-x  3 venkatesh venkatesh 4096 Dec 15 14:20 ..
drwxr-xr-x  8 venkatesh venkatesh 4096 Dec 19 09:45 .git
drwxr-xr-x  4 venkatesh venkatesh 4096 Dec 17 16:30 kubernetes
drwxr-xr-x  3 venkatesh venkatesh 4096 Dec 18 11:20 terraform
drwxr-xr-x  2 venkatesh venkatesh 4096 Dec 19 10:30 helm
-rw-r--r--  1 venkatesh venkatesh 2048 Dec 19 10:30 Jenkinsfile`,

    'pwd': () => '/home/venkatesh/devops-projects',

    'whoami': () => 'bandi-venkatesh (DevOps Engineer)',

    'date': () => new Date().toString(),

    'clear': () => '',

    'help': () => `
Available commands:
  kubectl get nodes          - List Kubernetes nodes
  kubectl get pods           - List Kubernetes pods
  terraform plan             - Show Terraform plan
  terraform apply            - Apply Terraform changes
  helm ls                    - List Helm releases
  gcloud container clusters list - List GKE clusters
  docker ps                  - List Docker containers
  git status                 - Show Git repository status
  ls -la                     - List directory contents
  pwd                        - Print working directory
  whoami                     - Show current user
  date                       - Show current date/time
  clear                      - Clear terminal
  help                       - Show this help message
  
Easter eggs:
  sudo hire-me               - 🎉 Special command!
  cat /etc/skills            - View skill tree`,

    'sudo hire-me': () => {
        if (window.easterEggs?.triggerConfetti) {
            window.easterEggs.triggerConfetti()
        }
        return `
🎉 Thanks for your interest! 🎉

╔══════════════════════════════════════════════╗
║  Ready to work with Bandi Venkatesh?         ║
║                                              ║
║  📧 Email: bandivenky2222@gmail.com          ║
║  📱 Phone: +91-8555012224                    ║
║  📍 Location: Hyderabad, India               ║
╚══════════════════════════════════════════════╝

Let's build reliable infrastructure together!`
    },

    'cat /etc/skills': () => `
╔════════════════════════════════════════════════════╗
║              SKILL TREE                            ║
╠════════════════════════════════════════════════════╣
║                                                    ║
║  KUBERNETES & CONTAINERS                           ║
║  ├── Kubernetes      ████████████████████ 90%     ║
║  ├── Docker          ████████████████░░░░ 88%     ║
║  ├── Helm            ████████████████░░░░ 85%     ║
║  └── GKE             ████████████████████ 90%     ║
║                                                    ║
║  CLOUD & INFRASTRUCTURE                            ║
║  ├── GCP             ████████████████░░░░ 88%     ║
║  ├── Terraform       ████████████████░░░░ 82%     ║
║  └── Linux           ████████████████████ 88%     ║
║                                                    ║
║  CI/CD & AUTOMATION                                ║
║  ├── Jenkins         ████████████████░░░░ 85%     ║
║  ├── GitLab CI       ████████████████░░░░ 82%     ║
║  └── Cloud Build     ████████████████░░░░ 80%     ║
║                                                    ║
║  OBSERVABILITY                                     ║
║  ├── Prometheus      ████████████████░░░░ 85%     ║
║  └── Grafana         ████████████████░░░░ 85%     ║
║                                                    ║
╚════════════════════════════════════════════════════╝`
}

export default terminalCommands
