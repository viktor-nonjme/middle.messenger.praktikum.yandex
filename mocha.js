const { JSDOM } = require('jsdom');

const { window } = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.localStorage = window.localStorage;
global.Node = window.Node;

require.extensions['.scss'] = function cb() {
  module.exports = () => ({});
};

require.extensions['.png'] = function cb() {
  module.exports = () => ({});
};

require.extensions['.svg'] = function cb() {
  module.exports = () => ({});
};
