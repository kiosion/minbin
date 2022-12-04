import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import type StoreService from '@ember-data/store';
import type RouterService from '@ember/routing/router-service';
import Transition from '@ember/routing/transition';

export type ViewRouteModel = Awaited<ReturnType<ViewRoute['model']>>;

export default class ViewRoute extends Route {
  @service store!: StoreService;
  @service router!: RouterService;

  beforeModel(transition: Transition) {
    console.log('view beforeModel hook');
    const { id } = transition.to.params;
    if (!id || id.length < 7) {
      transition.abort();
    }
    console.log('view beforeModel hook end');
  }

  async model({ id }: { id: string }) {
    return await this.store.findRecord('paste', id);
  }
}
