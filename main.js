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
        this.mockData = null;
        this.xtermTerminal = null;
        this.chatbotActive = false;
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
        // Load mock data
        this.loadMockData();
        // Load runtime config (optional config.json)
        this.loadRuntimeConfig();
        
        this.setupScrollAnimations();
        this.setupMetricCounters();
        this.setupTerminal();
        this.setupHoverEffects();
        this.setupNavigation();
        this.setupMarquee();
        this.setupKubernetesVisualization();
        this.setupChatbot();
        this.setupXTerminal();
        this.setup3DCube();
        
        // Initialize GSAP
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
    }

    // Load mock data from mock-data.json
    loadMockData() {
        fetch('./mock-data.json')
            .then(res => res.json())
            .then(data => {
                this.mockData = data;
            })
            .catch(err => console.warn('Mock data not available:', err));
    }
    
    // Aurora Gradient Background - now CSS-based, no setup needed
    // The animation is handled by CSS with GPU acceleration
    
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
        // Aurora background is CSS-based
        // This space reserved for future 3D enhancements
    }

    // Setup Chatbot Widget
    setupChatbot() {
        const toggle = document.getElementById('chatbot-toggle');
        const messages = document.getElementById('chatbot-messages');
        
        if (!toggle || !messages) return;
        
        let isOpen = false;
        
        toggle.addEventListener('click', () => {
            isOpen = !isOpen;
            if (isOpen) {
                messages.classList.remove('hidden');
                toggle.innerHTML = '<span aria-hidden="true" class="text-2xl">✕</span>';
                toggle.setAttribute('aria-expanded', 'true');
                this.chatbotActive = true;
            } else {
                messages.classList.add('hidden');
                toggle.innerHTML = '<span aria-hidden="true" class="text-2xl">💬</span>';
                toggle.setAttribute('aria-expanded', 'false');
                this.chatbotActive = false;
            }
        });

        // Add input for chatbot
        const inputHTML = `
            <div class="mt-2 flex gap-2">
                <input type="text" id="chatbot-input" placeholder="Ask me anything..." 
                    class="flex-1 bg-deep-space border border-matrix-green px-3 py-2 rounded text-sm text-aurora-white focus:outline-none focus:border-cyber-blue" />
                <button onclick="sendChatMessage()" class="bg-cyber-blue text-deep-space px-3 py-2 rounded text-sm font-semibold hover:bg-opacity-80 transition">
                    Send
                </button>
            </div>
            <div class="mt-3 flex gap-2" id="chatbot-quick-replies" role="navigation" aria-label="Quick replies">
                <button class="bg-gray-800 border border-cyber-blue text-cyber-blue px-3 py-1 rounded text-xs" onclick="sendQuickReply('Tell me about Kubernetes skills')">K8s Skills</button>
                <button class="bg-gray-800 border border-matrix-green text-matrix-green px-3 py-1 rounded text-xs" onclick="sendQuickReply('Show me projects')">Projects</button>
                <button class="bg-gray-800 border border-electric-purple text-electric-purple px-3 py-1 rounded text-xs" onclick="sendQuickReply('How can I contact you?')">Contact Me</button>
            </div>
        `;
        messages.innerHTML += inputHTML;
        
        // Handle enter key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.chatbotActive) {
                sendChatMessage();
            }
        });
    }

    // Try to load optional runtime config (config.json)
    loadRuntimeConfig() {
        fetch('./config.json')
            .then(res => res.json())
            .then(cfg => {
                if (cfg && cfg.GOOGLE_AI_API_KEY) {
                    localStorage.setItem('GOOGLE_AI_API_KEY', cfg.GOOGLE_AI_API_KEY);
                    console.log('✓ Loaded Google AI API key from config.json');
                }
            })
            .catch(() => {
                // config.json is optional
            });
    }

    // Setup Xterm.js Terminal
    setupXTerminal() {
        const termContainer = document.getElementById('xterm');
        if (!termContainer) return;

        // If xterm library not yet loaded, retry a few times
        const tryInit = (attemptsLeft = 5) => {
            if (typeof Terminal === 'undefined') {
                if (attemptsLeft <= 0) return console.warn('Xterm.js not available');
                setTimeout(() => tryInit(attemptsLeft - 1), 500);
                return;
            }

            try {
            this.xtermTerminal = new Terminal({
                cols: 80,
                rows: 24,
                theme: {
                    background: '#0A0A0A',
                    foreground: '#F8F8FF',
                    cursor: '#00F5FF',
                    cursorAccent: '#0A0A0A',
                    selectionBackground: 'rgba(0, 245, 255, 0.2)',
                    black: '#0A0A0A',
                    red: '#FF6B6B',
                    green: '#39FF14',
                    yellow: '#FFA500',
                    blue: '#00F5FF',
                    magenta: '#BC13FE',
                    cyan: '#00F5FF',
                    white: '#F8F8FF'
                }
            });

            this.xtermTerminal.open(termContainer);
            
            if (typeof FitAddon !== 'undefined') {
                const fitAddon = new FitAddon.FitAddon();
                this.xtermTerminal.loadAddon(fitAddon);
                fitAddon.fit();
                
                window.addEventListener('resize', () => fitAddon.fit());
            }

            this.xtermTerminal.writeln('\x1b[1;32m Welcome to DevOps Terminal \x1b[0m');
            this.xtermTerminal.writeln('\x1b[1;36m Type "help" for available commands \x1b[0m');
            this.xtermTerminal.write('\n$ ');

            // Terminal input handling
            let inputBuffer = '';
            this.xtermTerminal.onData((data) => {
                if (data === '\r') {
                    this.executeTerminalCommand(inputBuffer);
                    inputBuffer = '';
                } else if (data === '\u007F') {
                    if (inputBuffer.length > 0) {
                        inputBuffer = inputBuffer.slice(0, -1);
                        this.xtermTerminal.write('\b \b');
                    }
                } else {
                    inputBuffer += data;
                    this.xtermTerminal.write(data);
                }
            });
            } catch (e) {
                console.warn('Xterm.js initialization failed:', e);
            }
        };

        tryInit();
    }

    executeTerminalCommand(command) {
        const cmd = command.trim();
        if (!cmd) {
            this.xtermTerminal.write('\n$ ');
            return;
        }

        this.xtermTerminal.write('\n');

        let output = '';
        // Exact match
        if (this.mockData && this.mockData.commands[cmd]) {
            output = this.mockData.commands[cmd].output;
        } else if (this.terminalCommands[cmd]) {
            output = this.terminalCommands[cmd].call(this);
        } else if (this.mockData) {
            // Fuzzy match keys (allow variants like 'helm ls' -> 'helm list')
            const keys = Object.keys(this.mockData.commands);
            const foundKey = keys.find(k => k === cmd || k.startsWith(cmd) || cmd.startsWith(k) || k.includes(cmd) || cmd.includes(k));
            if (foundKey) {
                output = this.mockData.commands[foundKey].output;
            } else {
                // Synonym mapping
                const synonyms = {
                    'helm ls': 'helm list',
                    'kubectl get pods': 'kubectl get pods --all-namespaces'
                };
                if (synonyms[cmd] && this.mockData.commands[synonyms[cmd]]) {
                    output = this.mockData.commands[synonyms[cmd]].output;
                } else {
                    output = `bash: ${cmd}: command not found\nType 'help' for available commands.`;
                }
            }
        } else {
            output = `bash: ${cmd}: command not found\nType 'help' for available commands.`;
        }

        this.xtermTerminal.writeln(output);
        this.xtermTerminal.write('$ ');
    }

    // Setup 3D Rotating Cube on About Page
    setup3DCube() {
        const cube = document.querySelector('.cube');
        if (!cube) return;

        let rotationX = 0;
        let rotationY = 0;
        let rotationZ = 0;
        let isRotating = true;

        const rotateCube = () => {
            if (isRotating) {
                rotationX += 0.5;
                rotationY += 0.8;
                cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`;
            }
            requestAnimationFrame(rotateCube);
        };

        // Pause on hover
        const container = document.querySelector('.cube-container');
        if (container) {
            container.addEventListener('mouseenter', () => {
                isRotating = false;
            });
            container.addEventListener('mouseleave', () => {
                isRotating = true;
            });
        }

        rotateCube();
    }
}

// Global functions for terminal interaction
function runCommand(command) {
    if (window.portfolio) {
        window.portfolio.runCommand(command);
    }
}

// Global function for terminal commands from buttons
function runTerminalCommand(command) {
    if (window.portfolio && window.portfolio.xtermTerminal) {
        window.portfolio.xtermTerminal.writeln(`$ ${command}`);
        window.portfolio.executeTerminalCommand(command);
    }
}

// Global function to clear terminal
function clearTerminalOutput() {
    if (window.portfolio && window.portfolio.xtermTerminal) {
        window.portfolio.xtermTerminal.clear();
    }
}

// Global function for sending chat messages
async function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');
    
    if (!input || !messages) return;
    
    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'mb-2 text-matrix-green text-sm';
    userDiv.innerHTML = `<strong>You:</strong> ${escapeHtml(userMessage)}`;
    messages.appendChild(userDiv);

    input.value = '';

    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'mb-2 text-cyber-blue text-sm';
    loadingDiv.innerHTML = `<strong>Kimi:</strong> <span class="animate-pulse">Thinking...</span>`;
    messages.appendChild(loadingDiv);
    messages.scrollTop = messages.scrollHeight;

    // Rate limiting: 5 messages per minute per client (simple local check)
    const now = Date.now();
    const windowMs = 60 * 1000;
    const maxMsgs = 5;
    let timestamps = JSON.parse(localStorage.getItem('chat_timestamps') || '[]');
    // Purge older than window
    timestamps = timestamps.filter(ts => now - ts < windowMs);
    if (timestamps.length >= maxMsgs) {
        loadingDiv.remove();
        const rateDiv = document.createElement('div');
        rateDiv.className = 'mb-2 text-yellow-400 text-sm';
        rateDiv.innerHTML = `<strong>Kimi:</strong> Chatbot rate limit exceeded. Try again in a moment or email bandivenky2222@gmail.com`;
        messages.appendChild(rateDiv);
        messages.scrollTop = messages.scrollHeight;
        return;
    }
    timestamps.push(now);
    localStorage.setItem('chat_timestamps', JSON.stringify(timestamps));

    // Get AI response (async)
    let response = await getAIResponse(userMessage);
    
    // Remove loading and add actual response
    loadingDiv.remove();
    const assistantDiv = document.createElement('div');
    assistantDiv.className = 'mb-2 text-cyber-blue text-sm';
    assistantDiv.innerHTML = `<strong>Kimi:</strong> ${escapeHtml(response)}`;
    messages.appendChild(assistantDiv);

    messages.scrollTop = messages.scrollHeight;
}

// Quick replies helper
function sendQuickReply(text) {
    const input = document.getElementById('chatbot-input');
    if (!input) return;
    input.value = text;
    sendChatMessage();
}

async function getAIResponse(message) {
    const msg = message.toLowerCase();
    
    // Try to use Google AI API if key is available
    const apiKey = localStorage.getItem('GOOGLE_AI_API_KEY');
    
    if (apiKey && apiKey !== 'YOUR_API_KEY_HERE') {
        try {
            // Try a POST to Generative API. Use Authorization header when possible, fallback to key in query.
            const url = 'https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generate';
            const headers = { 'Content-Type': 'application/json' };
            // If apiKey looks like a bearer token (starts with 'ya29.'), use Authorization header
            if (apiKey.startsWith('ya29.')) {
                headers['Authorization'] = `Bearer ${apiKey}`;
            }

            const body = JSON.stringify({
                "prompt": {
                    "text": `You are Kimi, a helpful AI assistant for Venkatesh's DevOps portfolio. Answer succinctly: ${message}\n\nAbout Venkatesh:\n- Principal DevOps Engineer with 8+ years experience\n- Kubernetes expert (50+ clusters managed)\n- GCP certified architect\n- Tech stack: K8s, Terraform, Docker, Helm, GCP, AWS, Jenkins, GitLab CI, Prometheus, Grafana\n- Email: bandivenky2222@gmail.com`
                },
                "temperature": 0.2,
                "maxOutputTokens": 256
            });

            // If no Authorization header, append key as query parameter
            const fetchUrl = headers['Authorization'] ? url : `${url}?key=${apiKey}`;

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 7000);
            const response = await fetch(fetchUrl, { method: 'POST', headers, body, signal: controller.signal });
            clearTimeout(timeout);
            if (response.ok) {
                const data = await response.json();
                // The exact shape may vary; try common fields and fallback to default
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || data?.output?.[0]?.content?.text || data?.result?.output?.[0]?.content?.text;
                if (text) return text;
            }
        } catch (err) {
            console.warn('Google AI API failed:', err);
        }
    }
    
    // Fallback to predefined responses
    return getDefaultResponse(msg);
}

function getDefaultResponse(msg) {
    if (msg.includes('kubernetes') || msg.includes('k8s')) {
        return 'Venkatesh is a Kubernetes expert with 8+ years of container orchestration experience. He has managed 50+ clusters in production environments with 99.97% uptime!';
    }
    if (msg.includes('gcp') || msg.includes('cloud')) {
        return 'He is a GCP-certified architect and has designed multi-cloud infrastructure supporting 2.3M+ users across GCP, AWS, and on-premises environments.';
    }
    if (msg.includes('project') || msg.includes('experience')) {
        return 'Check the Projects page for detailed case studies! His work spans DevOps automation, infrastructure as code, CI/CD pipelines, and cloud migrations.';
    }
    if (msg.includes('contact') || msg.includes('email')) {
        return 'Reach out to Venkatesh at bandivenky2222@gmail.com or through the Contact page. He\'s always open to discussing DevOps and infrastructure challenges!';
    }
    if (msg.includes('skill') || msg.includes('stack')) {
        return 'His tech stack includes Kubernetes, Terraform, Docker, Helm, GCP, AWS, Jenkins, GitLab CI, Prometheus, Grafana, ELK stack, and much more!';
    }
    
    return 'Great question! I\'m an AI assistant here to help you learn about Venkatesh\'s experience. Try asking about his Kubernetes skills, GCP expertise, projects, or how to contact him!';
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load API key from .env file
    loadEnvironmentVariables();
    
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

function loadEnvironmentVariables() {
    // Try to load from .env file
    fetch('./.env')
        .then(res => res.text())
        .then(data => {
            const lines = data.split('\n');
            lines.forEach(line => {
                if (line.startsWith('GOOGLE_AI_API_KEY=')) {
                    const apiKey = line.split('=')[1].trim();
                    if (apiKey && apiKey !== 'YOUR_API_KEY_HERE') {
                        localStorage.setItem('GOOGLE_AI_API_KEY', apiKey);
                        console.log('✓ Google AI API key loaded');
                    }
                }
            });
        })
        .catch(() => {
            console.log('Note: .env file not found or not accessible');
        });
}
    
    // Dark mode removed to prevent overlap with chatbot widget
    
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