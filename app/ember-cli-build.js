// @ts-nocheck
'use strict';

const { Webpack } = require('@embroider/webpack');
const Compat = require('@embroider/compat');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      sourceMaps: 'inline'
    },
    sassOptions: {
      extension: 'scss',
      includePaths: ['app/styles/'],
      onlyIncluded: true
    }
  });

  return Compat.compatBuild(app, Webpack, {
    staticAddonTrees: true,
    staticAddonTestSupportTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    allowUnsafeDynamicComponents: false,
    splitAtRoutes: ['home', 'new', 'view', 'view.index', 'view.raw'],
    packagerOptions: {
      webpackConfig: {
        watchOptions: {
          ignored: '**/node_modules'
        }
      }
    }
  });
};
