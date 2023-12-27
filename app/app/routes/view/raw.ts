import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import type Transition from '@ember/routing/transition';
import type StoreService from '@ember-data/store';
import type RouterService from '@ember/routing/router-service';
import type ViewRawController from 'minbin/controllers/view/raw';

export type ViewRawRouteModel = Awaited<ReturnType<ViewRawRoute['model']>>;

export default class ViewRawRoute extends Route {
  @service declare store: StoreService;
  @service declare router: RouterService;

  declare controller: ViewRawController;

  beforeModel(transition: Transition) {
    const { id } = transition.to.params;
    if (!id || id.length < 7) {
      transition.abort();
      throw new Error('Paste not found');
    }
  }

  async model({ id }: { id: string }) {
    return await this.store.findRecord('paste', id);
  }
}
