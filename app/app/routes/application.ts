import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import type LoaderService from 'minbin/services/loader';
import type RouterService from '@ember/routing/router-service';

export type ApplicationRouteModel = Awaited<
  ReturnType<ApplicationRoute['model']>
>;

export default class ApplicationRoute extends Route {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @service hljs!: any;
  @service loader!: LoaderService;
  @service router!: RouterService;

  async beforeModel() {
    this.router.on('routeWillChange', () => {
      this.loader.isLoading = true;
    });

    this.router.on('routeDidChange', () => {
      this.loader.isLoading = false;
    });

    await this.hljs.setup();
  }
}
