'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var env = EmberApp.env();
  var isProductionLikeBuild = ['development'].indexOf(env) === -1;

  let app = new EmberApp(defaults, {
    minifyCSS: { enabled: isProductionLikeBuild },
    minifyJS: { enabled: isProductionLikeBuild },
    fingerprint: {
      enabled: isProductionLikeBuild,
      prepend: '',
      exclude: [
        'sw.js',
        'sw.map'
      ],
      extensions: [
        'js', 'css', 'png', 'jpg', 'gif', 'map', 'ico', 'json', 'xml',
        'woff', 'woff2', 'otf', 'ttf', 'svg', 'ijmap', 'eot'
      ]
    },
    sourcemaps: {
      enabled: true
    },
    'ember-service-worker': {
      enabled: ['development', 'test'].indexOf(env) === -1,
      'registration-strategy': 'inline'
    }
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
