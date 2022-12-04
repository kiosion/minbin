import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import type Transition from '@ember/routing/transition';
import type RouterService from '@ember/routing/router-service';

export default class ErrorRoute extends Route {
  @service router!: RouterService;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterModel(_model: unknown, _transition: Transition) {
    // if (transition.to.name === 'error') {
    //   this.router.transitionTo('home');
    // }
  }
}
