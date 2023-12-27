/* eslint-env node */

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'minbin',
    environment,
    rootURL: '/',
    apiVersion: 'v1',
    locationType: 'history',
    EmberENV: {
      FEATURES: {}
    },

    APP: {}
  };

  if (process.env.COMMIT_HASH) {
    ENV.commitHash = process.env.COMMIT_HASH;
  }

  if (environment === 'development') {
    ENV.apiHost = 'http://localhost:3000';
    ENV.contentSecurityPolicy = {
      'connect-src': `'self' ${ENV.apiHost}`
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    ENV.apiHost = 'http://localhost:3000';
    ENV.contentSecurityPolicy = {
      'connect-src': `'self' ${ENV.apiHost}`
    };

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.apiHost = 'https://api.bin.kio.dev';
    ENV.contentSecurityPolicy = {
      'connect-src': `'self' ${ENV.apiHost}`
    };
  }

  return ENV;
};
