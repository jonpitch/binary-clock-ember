'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  // material web components
  app.import({
    development: 'node_modules/@material/form-field/dist/mdc.form-field.css',
    production: `node_modules/@material/form-field/dist/mdc.form-field.min.css`
  });

  app.import({
    development: 'node_modules/@material/checkbox/dist/mdc.checkbox.css',
    production: `node_modules/@material/checkbox/dist/mdc.checkbox.min.css`
  });

  app.import({
    development: 'node_modules/@material/list/dist/mdc.list.css',
    production: `node_modules/@material/list/dist/mdc.list.min.css`
  });

  return app.toTree();
};
