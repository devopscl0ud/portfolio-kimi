import fs from 'fs';
import { JSDOM } from 'jsdom';

(async () => {
  try {
    const html = fs.readFileSync('./index.html', 'utf8');
    // Prevent loading heavy or node-incompatible vendor scripts in jsdom
    const sanitizedHtml = html.replace(/<script[^>]*xterm[^>]*><\/script>/g, '').replace(/<script[^>]*@xterm\/addon-fit[^>]*><\/script>/g, '');

    const dom = new JSDOM(sanitizedHtml, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'http://localhost:3000/',
      beforeParse: (window) => {
        // Polyfills to reduce false-positive errors in jsdom environment
        if (typeof window.requestAnimationFrame === 'undefined') window.requestAnimationFrame = (cb) => setTimeout(cb, 16);
        if (typeof window.cancelAnimationFrame === 'undefined') window.cancelAnimationFrame = (id) => clearTimeout(id);

        // Polyfill basic fetch for scripts that try to load config files
        if (typeof window.fetch === 'undefined') {
          window.fetch = (url, opts) => Promise.resolve({ ok: false, status: 404, json: async () => ({}), text: async () => '' });
        }

        // Ensure canvas getContext exists (xterm and other libs expect it)
        try {
          if (!window.HTMLCanvasElement) window.HTMLCanvasElement = function() {};
          if (!window.HTMLCanvasElement.prototype.getContext) {
            window.HTMLCanvasElement.prototype.getContext = function() {
              return {
                fillRect: () => {},
                clearRect: () => {},
                getImageData: () => ({ data: [] }),
                putImageData: () => {},
                createImageData: () => [],
                setTransform: () => {},
                drawImage: () => {},
                save: () => {},
                restore: () => {},
                beginPath: () => {},
                moveTo: () => {},
                lineTo: () => {},
                stroke: () => {},
                measureText: (txt) => ({ width: txt.length * 6 })
              };
            };
          }
        } catch (e) {
          // Best-effort: attach directly to created canvas elements
          const origCreate = window.document && window.document.createElement;
          if (origCreate) {
            window.document.createElement = function (tag) {
              const el = origCreate.call(this, tag);
              if (tag === 'canvas' && !el.getContext) {
                el.getContext = function () {
                  return {
                    fillRect: () => {},
                    clearRect: () => {},
                    getImageData: () => ({ data: [] }),
                    putImageData: () => {},
                    createImageData: () => [],
                    setTransform: () => {},
                    drawImage: () => {},
                    save: () => {},
                    restore: () => {},
                    beginPath: () => {},
                    moveTo: () => {},
                    lineTo: () => {},
                    stroke: () => {},
                    measureText: (txt) => ({ width: txt.length * 6 })
                  };
                };
              }
              return el;
            };
          }
        }
        // Minimal IntersectionObserver polyfill
        if (typeof window.IntersectionObserver === 'undefined') {
          window.IntersectionObserver = class {
            constructor(cb) { this._cb = cb; }
            observe() {}
            unobserve() {}
            disconnect() {}
          };
        }

        // Minimal performance.timing for load time calculation
        if (!window.performance) window.performance = {};
        if (!window.performance.timing) {
          const now = Date.now();
          window.performance.timing = {
            navigationStart: now - 100,
            loadEventEnd: now
          };
        }
      }
    });

    const { window } = dom;

    // Collect console errors
    const errors = [];
    window.addEventListener('error', (e) => errors.push({ type: 'error', msg: e.message }));
    window.addEventListener('unhandledrejection', (e) => errors.push({ type: 'rejection', msg: e.reason }));

    // Wait for scripts to load
    await new Promise((res) => setTimeout(res, 1500));

    // Check elements exist
    const heroBtn = window.document.getElementById('ai-hero-btn');
    const terminal = window.document.getElementById('terminalOutput');
    const chatbotToggle = window.document.getElementById('chatbot-toggle');

    const results = {
      heroBtn: !!heroBtn,
      terminal: !!terminal,
      chatbotToggle: !!chatbotToggle,
      errors
    };

    console.log(JSON.stringify(results, null, 2));
    if (errors.length > 0) process.exit(2);
  } catch (e) {
    console.error('Smoke DOM test failed:', e);
    process.exit(1);
  }
})();