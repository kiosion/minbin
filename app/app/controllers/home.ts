import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type RouterService from '@ember/routing/router-service';
import type { HomeRouteModel } from 'minbin/routes/home';
import type LoaderService from 'minbin/services/loader';

export default class HomeController extends Controller {
  @service declare router: RouterService;
  @service declare loader: LoaderService;

  @tracked declare model: HomeRouteModel;

  constructor(properties?: object) {
    super(properties);

    this.loader.isLoading = false;
  }

  get paste() {
    return this.model;
  }

  @action transitionTo(route: string) {
    return this.router.transitionTo(route);
  }
}
