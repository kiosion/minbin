import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';
import type { HomeRouteModel } from 'minbin/routes/home';

export default class HomeController extends Controller {
  @service router!: RouterService;

  model!: HomeRouteModel;

  get paste() {
    return this.model;
  }

  @action transitionTo(route: string) {
    return this.router.transitionTo(route);
  }
}
