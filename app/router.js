import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  // user auth
  this.route('sign-up');
  this.route('sign-in');
  this.route('change-password');
  this.route('users');

  // tasks route
  this.route('tasks', function() {
    this.route('new');
  });
});

export default Router;
