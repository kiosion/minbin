import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @service hljs!: any;

  async beforeModel() {
    await this.hljs.setup();
  }
}
