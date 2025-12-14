// Minimal runtime stubs to check main.js for syntax/runtime errors during load
global.window = global;
global.document = {
  addEventListener: () => {},
  querySelectorAll: () => [],
  getElementById: () => null,
  querySelector: () => null
};
if (typeof global.navigator === 'undefined') global.navigator = { clipboard: { writeText: async () => {} } };
(async () => {
  try {
    await import('../main.js');
    console.log('main.js loaded without syntax errors');
  } catch (e) {
    console.error('Error loading main.js:', e);
    process.exit(1);
  }
})();
