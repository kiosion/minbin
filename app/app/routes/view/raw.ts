import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import type StoreService from '@ember-data/store';
import type RouterService from '@ember/routing/router-service';
import Transition from '@ember/routing/transition';

export default class ViewRawRoute extends Route {
  @service store!: StoreService;
  @service router!: RouterService;

  beforeModel(transition: Transition) {
    console.log('view raw beforeModel hook');
    const { id } = transition.to.params;
    if (!id || id.length < 7) {
      // TODO: Throw NotFound here instead of aborting
      transition.abort();
      throw new Error('Paste not found');
    }
  }

  async model({ id }: { id: string }) {
    return await this.store.findRecord('paste', id);
  }
}
