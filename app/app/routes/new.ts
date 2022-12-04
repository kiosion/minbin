import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import type StoreService from '@ember-data/store';
import type RouterService from '@ember/routing/router-service';

export type NewRouteModel = Awaited<ReturnType<NewRoute['model']>>;

export default class NewRoute extends Route {
  @service store!: StoreService;
  @service router!: RouterService;

  model() {
    console.log('new model hook');
    const paste = this.store.createRecord('paste', {
      title: '',
      content: 'Paste or type content here...',
      encrypted: false,
      burn: false
    });

    return paste;
  }

  @action reloadModel() {
    return this.router.refresh(this.router.currentRouteName);
  }
}
