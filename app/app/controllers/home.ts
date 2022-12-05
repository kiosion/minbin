import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';
import type { HomeRouteModel } from 'minbin/routes/home';
import type LoaderService from 'minbin/services/loader';

export default class HomeController extends Controller {
  @service router!: RouterService;
  @service loader!: LoaderService;

  model!: HomeRouteModel;

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
