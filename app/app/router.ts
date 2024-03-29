import EmbroiderRouter from '@embroider/router';
import config from 'minbin/config/environment';

export default class Router extends EmbroiderRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '/' });
  this.route('new');
  this.route('view', { path: '' }, function () {
    this.route('index', { path: '/:id' });
    // Raw route should be nested under view but not inherit any state or styles (should be a static page)
    this.route('raw', { path: '/:id/raw' });
  });
  this.route('error', { path: '*' });
});
