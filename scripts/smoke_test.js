// Smoke test the new AI handlers and terminal methods in a minimal DOM environment
global.window = global;
const dom = {
  addEventListener: () => {},
  querySelectorAll: () => [],
  getElementById: (id) => {
    // Create minimal elements for ids used in tests
    const el = {
      innerText: '',
      innerHTML: '',
      value: '',
      className: '',
      remove: () => {},
      addEventListener: () => {},
      focus: () => {},
      appendChild: () => {},
      querySelector: () => null
    };
    if (id === 'ai-modal-content') {
      el.innerHTML = '';
    }
    return el;
  },
  querySelector: (sel) => (sel === '#home .scroll-reveal p' ? { innerText: 'Original hero text' } : null)
};
if (typeof global.document === 'undefined') global.document = dom;
if (typeof global.navigator === 'undefined') global.navigator = { clipboard: { writeText: async () => {} } };

(async () => {
  try {
    const { createRequire } = await import('module');
    const requireC = createRequire(import.meta.url);
    const DevOpsPortfolio = requireC('../main.js');
    // Try to instantiate with minimal errors
    const p = new DevOpsPortfolio();
    // Test hero blurb handler
    if (typeof p.handleHeroBlurb === 'function') {
      await p.handleHeroBlurb();
      console.log('handleHeroBlurb executed');
    }
    // Test resume bullets
    if (typeof p.handleResumeBullets === 'function') {
      await p.handleResumeBullets();
      console.log('handleResumeBullets executed');
    }
    console.log('Smoke test completed');
  } catch (e) {
    console.error('Smoke test failed:', e);
    process.exit(1);
  }
})();