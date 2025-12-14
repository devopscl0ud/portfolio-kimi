// DevOps Portfolio - Main JavaScript
// Advanced animations and interactions

class DevOpsPortfolio {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.kubernetesNodes = [];
        this.terminalHistory = [];
        this.terminalCommands = {
            'kubectl get nodes': this.getKubectlNodes,
            'kubectl get pods': this.getKubectlPods,
            'terraform plan': this.getTerraformPlan,
            'terraform apply': this.getTerraformApply,
            'helm ls': this.getHelmList,
            'gcloud compute instances list': this.getGcloudInstances,
            'docker ps': this.getDockerPs,
            'git status': this.getGitStatus,
            'curl -s https://api.github.com': this.getApiTest,
            'ls -la': this.getLsLa,
            'pwd': this.getPwd,
            'whoami': this.getWhoami,
            'date': this.getDate,
            'clear': this.clearTerminal,
            'help': this.getHelp
        };
        
        this.init();
    }
    
    init() {
        this.setupParticleBackground();
        this.setupScrollAnimations();
        this.setupMetricCounters();
        this.setupTerminal();
        this.setupHoverEffects();
        this.setupNavigation();
        this.setupMarquee();
        this.setupKubernetesVisualization();
        
        // Initialize GSAP
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
    }
    
    // Particle Background with Three.js
    setupParticleBackground() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        // Create scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        canvas.appendChild(this.renderer.domElement);
        
        // Create particle system
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 100;
            
            // Cyberpunk colors
            const color = new THREE.Color();
            const colorChoice = Math.random();
            if (colorChoice < 0.4) {
                color.setHex(0x00F5FF); // Cyber blue
            } else if (colorChoice < 0.7) {
                color.setHex(0x39FF14); // Matrix green
            } else {
                color.setHex(0xBC13FE); // Electric purple
            }
            
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particles);
        
        // Add floating Kubernetes symbols
        this.addKubernetesSymbols();
        
        // Position camera
        this.camera.position.z = 50;
        
        // Animation loop
        this.animateParticles();
        
        // Handle resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    addKubernetesSymbols() {
        // Create floating Kubernetes pod symbols
        const podGeometry = new THREE.OctahedronGeometry(1);
        const podMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00F5FF, 
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        
        for (let i = 0; i < 20; i++) {
            const pod = new THREE.Mesh(podGeometry, podMaterial);
            pod.position.set(
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 80
            );
            this.scene.add(pod);
            this.kubernetesNodes.push(pod);
        }
    }
    
    animateParticles() {
        if (!this.particles || !this.renderer) return;
        
        requestAnimationFrame(() => this.animateParticles());
        
        // Rotate particles
        this.particles.rotation.x += 0.001;
        this.particles.rotation.y += 0.002;
        
        // Animate Kubernetes nodes
        this.kubernetesNodes.forEach((node, index) => {
            node.rotation.x += 0.01;
            node.rotation.y += 0.01;
            node.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
    
    handleResize() {
        if (!this.camera || !this.renderer) return;
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);
        
        // Observe all scroll-reveal elements
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
        
        // GSAP animations if available
        if (typeof gsap !== 'undefined') {
            this.setupGSAPAnimations();
        }
    }
    
    setupGSAPAnimations() {
        // Animate hero text
        gsap.timeline()
            .from('.neon-text', { 
                opacity: 0, 
                y: 100, 
                duration: 1, 
                ease: 'power3.out' 
            })
            .from('.matrix-text', { 
                opacity: 0, 
                y: 100, 
                duration: 1, 
                ease: 'power3.out' 
            }, '-=0.5')
            .from('.metric-counter', { 
                opacity: 0, 
                scale: 0, 
                duration: 0.8, 
                stagger: 0.1, 
                ease: 'back.out(1.7)' 
            }, '-=0.3');
    }
    
    // Metric Counters
    setupMetricCounters() {
        const counters = document.querySelectorAll('.metric-counter');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        // Animate counters when they come into view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Terminal Functionality
    setupTerminal() {
        this.terminalOutput = document.getElementById('terminalOutput');
        this.currentPath = '~';
        this.currentCommand = '';
    }
    
    runCommand(command) {
        if (!this.terminalOutput) return;
        
        // Add to history
        this.terminalHistory.push(command);
        
        // Create command output
        const output = document.createElement('div');
        output.className = 'mb-2';
        
        // Show command
        const commandLine = document.createElement('div');
        commandLine.className = 'text-cyber-blue';
        commandLine.innerHTML = `$ ${command}`;
        output.appendChild(commandLine);
        
        // Get command result
        const result = this.terminalCommands[command] ? 
            this.terminalCommands[command].call(this) : 
            this.getUnknownCommand(command);
        
        const resultLine = document.createElement('div');
        resultLine.className = 'text-gray-300 ml-4';
        resultLine.innerHTML = result;
        output.appendChild(resultLine);
        
        // Add new prompt
        const prompt = document.createElement('div');
        prompt.className = 'text-green-400';
        prompt.innerHTML = `$ <span class="terminal-cursor">█</span>`;
        output.appendChild(prompt);
        
        this.terminalOutput.appendChild(output);
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
        
        // Animate typing effect
        this.animateTyping(output);
    }
    
    // Terminal Command Implementations
    getKubectlNodes() {
        return `
NAME           STATUS   ROLES    AGE    VERSION
gke-cluster-1  Ready    master   234d   v1.24.0
gke-cluster-2  Ready    worker   156d   v1.24.0
gke-cluster-3  Ready    worker   89d    v1.24.0

Resources:
cpu:           24/24    (100%)
memory:        96Gi/96Gi (100%)
pods:          240/240  (100%)`;
    }
    
    getKubectlPods() {
        return `
NAMESPACE     NAME                              READY   STATUS    RESTARTS   AGE
default       nginx-deployment-7c4b7f4b4f-xvz9k  1/1     Running   0          2d
kube-system   kube-dns-6f7c8b4c4f-8xzv7          3/3     Running   0          5d
monitoring    prometheus-7b8b9c4f4f-2mnc8        1/1     Running   0          1d`;
    }
    
    getTerraformPlan() {
        return `
Terraform will perform the following actions:

  # google_container_cluster.primary will be created
  + resource "google_container_cluster" "primary" {
      + id                          = (known after apply)
      + name                        = "gke-cluster-prod"
      + location                    = "us-central1"
      + initial_node_count          = 3
      + remove_default_node_pool    = true

      + node_pool {
          + name       = "primary-pool"
          + node_count = 3
          + node_config {
              + machine_type = "e2-medium"
              + disk_size_gb = 100
            }
        }
    }

Plan: 1 to add, 0 to change, 0 to destroy.`;
    }
    
    getTerraformApply() {
        return `
google_container_cluster.primary: Creating...
google_container_cluster.primary: Still creating... [10s elapsed]
google_container_cluster.primary: Still creating... [20s elapsed]
google_container_cluster.primary: Still creating... [30s elapsed]
google_container_cluster.primary: Creation complete after 4m32s

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:
cluster_endpoint = "35.202.123.45"
cluster_name = "gke-cluster-prod"`;
    }
    
    getHelmList() {
        return `
NAME            NAMESPACE       REVISION    UPDATED                     STATUS      CHART               APP VERSION
ingress-nginx   ingress         3           2024-01-15 10:30:45         deployed    ingress-nginx-4.7.0 1.8.0      
prometheus      monitoring      5           2024-01-14 15:20:30         deployed    prometheus-23.4.0   2.45.0     
cert-manager    cert-manager    2           2024-01-13 09:15:20         deployed    cert-manager-v1.12.0 v1.12.0`;
    }
    
    getGcloudInstances() {
        return `
NAME          ZONE           MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP    STATUS
gke-node-1    us-central1-a  e2-medium                   10.0.0.4                     RUNNING
gke-node-2    us-central1-b  e2-medium                   10.0.0.5                     RUNNING
gke-node-3    us-central1-c  e2-medium                   10.0.0.6                     RUNNING`;
    }
    
    getDockerPs() {
        return `
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS     NAMES
8f4c8b4c4f8   nginx:alpine   "/docker-entrypoint.…"   2 hours ago      Up 2 hours      80/tcp    nginx-container
7b8b9c4f4f2   prom/prometheus "/bin/prometheus --c…"   5 hours ago      Up 5 hours      9090/tcp  prometheus`;
    }
    
    getGitStatus() {
        return `
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   terraform/main.tf
	modified:   kubernetes/deployment.yaml

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md`;
    }
    
    getApiTest() {
        return `
{
  "current_user_url": "https://api.github.com/user",
  "current_user_authorizations_html_url": "https://github.com/settings/connections/applications{/client_id}",
  "authorizations_url": "https://api.github.com/authorizations",
  "code_search_url": "https://api.github.com/search/code?q={query}{&page,per_page,sort,order}",
  "commit_search_url": "https://api.github.com/search/commits?q={query}{&page,per_page,sort,order}",
  "emails_url": "https://api.github.com/user/emails",
  "emojis_url": "https://api.github.com/emojis",
  "events_url": "https://api.github.com/events",
  "feeds_url": "https://api.github.com/feeds",
  "followers_url": "https://api.github.com/user/followers",
  ...`;
    }
    
    getLsLa() {
        return `
total 48
drwxr-xr-x  6 user user 4096 Jan 15 10:30 .
drwxr-xr-x  3 user user 4096 Jan 10 14:20 ..
-rw-r--r--  1 user user  220 Jan 10 14:20 .bash_logout
-rw-r--r--  1 user user 3526 Jan 10 14:20 .bashrc
drwxr-xr-x  8 user user 4096 Jan 15 09:45 .git
-rw-r--r--  1 user user  807 Jan 10 14:20 .profile
drwxr-xr-x  4 user user 4096 Jan 12 16:30 kubernetes
drwxr-xr-x  3 user user 4096 Jan 13 11:20 terraform`;
    }
    
    getPwd() {
        return '/home/user/devops-projects';
    }
    
    getWhoami() {
        return 'bandi-venkatesh (Principal DevOps Engineer)';
    }
    
    getDate() {
        return new Date().toString();
    }
    
    clearTerminal() {
        if (this.terminalOutput) {
            this.terminalOutput.innerHTML = '<div class="text-green-400">$ <span class="terminal-cursor">█</span></div>';
        }
        return '';
    }
    
    getHelp() {
        return `
Available commands:
  kubectl get nodes          - List Kubernetes nodes
  kubectl get pods           - List Kubernetes pods
  terraform plan             - Show Terraform plan
  terraform apply            - Apply Terraform changes
  helm ls                    - List Helm releases
  gcloud compute instances list - List GCP instances
  docker ps                  - List Docker containers
  git status                 - Show Git repository status
  curl -s https://api.github.com - Test API connectivity
  ls -la                     - List directory contents
  pwd                        - Print working directory
  whoami                     - Show current user
  date                       - Show current date/time
  clear                      - Clear terminal
  help                       - Show this help message`;
    }
    
    getUnknownCommand(command) {
        return `bash: ${command}: command not found\nType 'help' for available commands.`;
    }
    
    animateTyping(element) {
        const lines = element.querySelectorAll('div');
        lines.forEach((line, index) => {
            line.style.opacity = '0';
            setTimeout(() => {
                line.style.transition = 'opacity 0.3s ease';
                line.style.opacity = '1';
            }, index * 100);
        });
    }
    
    // Hover Effects
    setupHoverEffects() {
        // 3D tilt effect for cards
        document.querySelectorAll('.hover-3d').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: e.target,
                        rotateX: 5,
                        rotateY: 5,
                        translateZ: 10,
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                }
            });
            
            card.addEventListener('mouseleave', (e) => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: e.target,
                        rotateX: 0,
                        rotateY: 0,
                        translateZ: 0,
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                }
            });
        });
        
        // Neon glow effect for buttons
        document.querySelectorAll('.glow').forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                e.target.style.animation = 'glow 0.3s ease-in-out';
            });
            
            button.addEventListener('mouseleave', (e) => {
                e.target.style.animation = '';
            });
        });
    }
    
    // Navigation
    setupNavigation() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Mobile menu toggle
        const mobileMenuButton = document.querySelector('button[class*="md:hidden"]');
        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', () => {
                // Add mobile menu functionality here
                console.log('Mobile menu toggled');
            });
        }
    }
    
    // Marquee Animation
    setupMarquee() {
        const marquee = document.querySelector('.marquee-content');
        if (marquee && typeof anime !== 'undefined') {
            anime({
                targets: marquee,
                translateX: '-50%',
                duration: 20000,
                easing: 'linear',
                loop: true
            });
        }
    }
    
    // Kubernetes Visualization
    setupKubernetesVisualization() {
        // This would be enhanced with more complex 3D visualization
        // For now, we'll use the particle system as base
        
        // Add mouse interaction to particles
        if (this.particles && this.renderer) {
            const canvas = this.renderer.domElement;
            canvas.addEventListener('mousemove', (e) => {
                const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
                
                // Animate particles based on mouse position
                if (this.particles) {
                    this.particles.rotation.x = mouseY * 0.1;
                    this.particles.rotation.y = mouseX * 0.1;
                }
            });
        }
    }
}

// Global functions for terminal interaction
function runCommand(command) {
    if (window.portfolio) {
        window.portfolio.runCommand(command);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new DevOpsPortfolio();
    
    // Add some additional interactive features
    
    // Command palette (Cmd+K)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            // Show command palette
            console.log('Command palette opened');
        }
    });
    
    // Dark/Light mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.className = 'fixed bottom-6 right-6 w-12 h-12 bg-cyber-blue text-deep-space rounded-full shadow-lg hover:scale-110 transition-transform z-50';
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    });
    document.body.appendChild(darkModeToggle);
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Portfolio loaded in ${loadTime}ms`);
        });
    }
    
    // Add loading states
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', () => {
            link.innerHTML += ' <span class="animate-spin">⏳</span>';
        });
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DevOpsPortfolio;
}