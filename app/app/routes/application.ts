import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import type LoaderService from 'minbin/services/loader';
import type RouterService from '@ember/routing/router-service';
import type ApplicationController from 'minbin/controllers/application';

export type ApplicationRouteModel = Awaited<
  ReturnType<ApplicationRoute['model']>
>;

export default class ApplicationRoute extends Route {
  @service declare loader: LoaderService;
  @service declare router: RouterService;

  declare controller: ApplicationController;

  async beforeModel() {
    this.router.on('routeWillChange', () => {
      this.loader.isLoading = true;
    });

    this.router.on('routeDidChange', () => {
      this.loader.isLoading = false;
    });
  }
}
